import { IpcMainInvokeEvent } from 'electron';
import { spawn } from 'node:child_process';
import { getFfmpegPath, probeAudio } from './common';

export async function handleAmbiSwap(event: IpcMainInvokeEvent, options: {
    inputPath: string;
    direction: "AmbixToFuMa" | "FuMaToAmbix";
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { inputPath, direction } = options;

    try {
        // 1. Probe File
        const stats = await probeAudio(inputPath);
        const channels = stats.channels;

        // 2. Validate FuMa Limits
        if (direction === "AmbixToFuMa" && channels > 16) {
            return {
                success: false,
                error: "FuMa format supports a maximum of 3rd Order (16 channels)."
            };
        }

        // 3. Define Mappings & Gains
        // Normalization Gains (SN3D <-> MaxN)
        // AmbiX (SN3D) has W = 1.0. FuMa (MaxN) has W = 0.707 (approx 1/sqrt(2)).
        // AmbiX -> FuMa: W * 0.7071
        // FuMa -> AmbiX: W * 1.4142

        const gainToFuMa = "0.70710678";
        const gainToAmbiX = "1.41421356";

        let filter = "";

        // Channel Maps (Indices)
        // 1st Order (4ch)
        // AmbiX: W(0) Y(1) Z(2) X(3)
        // FuMa:  W(0) X(1) Y(2) Z(3)
        // Map AmbiX->FuMa: 0, 3, 1, 2
        // Map FuMa->AmbiX: 0, 2, 3, 1

        if (channels === 4) {
            if (direction === "AmbixToFuMa") {
                // c0=W*gain, c1=X(3), c2=Y(1), c3=Z(2)
                filter = `pan=4c|c0=${gainToFuMa}*c0|c1=c3|c2=c1|c3=c2`;
            } else {
                // c0=W*gain, c1=Y(2), c2=Z(3), c3=X(1)
                filter = `pan=4c|c0=${gainToAmbiX}*c0|c1=c2|c2=c3|c3=c1`; // Wait, let's trace carefully.
                // FuMa Input: W(0) X(1) Y(2) Z(3)
                // AmbiX Out:  W(0) Y(1) Z(2) X(3)
                // c0 = W * gain
                // c1 (AmbiX Y) needs FuMa Y (2) -> c2
                // c2 (AmbiX Z) needs FuMa Z (3) -> c3
                // c3 (AmbiX X) needs FuMa X (1) -> c1
                filter = `pan=4c|c0=${gainToAmbiX}*c0|c1=c2|c2=c3|c3=c1`;
            }
        }
        else if (channels === 9 || channels === 16) {
            // Higher Orders
            // ACN: 0(W), 1(Y), 2(Z), 3(X), 4(V), 5(T), 6(R), 7(S), 8(U)...

            // FuMa (MaxN) / ACN (SN3D) Mapping Tables
            // ACN Index:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
            // FuMa Index: 0  2  3  1  8  6  4  5  7 14 12 10 11 13 15 9  <-- This mapping is tricky to memorize, let's use the explicit logic.

            // Let's rely on published standard sequences:
            // ACN: W Y Z X V T R S U Q O M K L N P
            // FuMa: W X Y Z R S T U V K L M N O P Q

            // Map Logic: Output[i] = Input[Map[i]]

            // Case: AmbiX -> FuMa
            // Output is FuMa. 
            // Out[0] (W) = In[0] (W) * Gain
            // Out[1] (X) = In[3] (X)
            // Out[2] (Y) = In[1] (Y)
            // Out[3] (Z) = In[2] (Z)
            // Out[4] (R) = In[6] (R)
            // Out[5] (S) = In[7] (S)
            // Out[6] (T) = In[5] (T)
            // Out[7] (U) = In[8] (U)
            // Out[8] (V) = In[4] (V)
            // Out[9] (K) = In[10] (K)
            // Out[10] (L) = In[11] (L)
            // Out[11] (M) = In[9] (M)
            // Out[12] (N) = In[12] (N) (Wait, M is ACN 11, FuMa 11? No. Let's verify M)
            // M is usually l=3, m=-2. 
            // ACN 11 is l=3, m=-1? No.

            /* 
               Ref: https://en.wikipedia.org/wiki/Ambisonic_data_exchange_formats
               Order 1:
               ACN 1 (m=-1, Y) -> FuMa 2
               ACN 2 (m=0, Z)  -> FuMa 3 (Wait, FuMa Z is 3rd in list? W=0, X=1, Y=2, Z=3. Yes.)
               ACN 3 (m=1, X)  -> FuMa 1
            */

            // Let's define the Source->Target Indices maps

            // Ambix (ACN) Channel Indices: 0..15
            // Target FuMa Sequence from AmbiX Inputs:
            // FuMa Ch 0 (W) <- AmbiX 0
            // FuMa Ch 1 (X) <- AmbiX 3
            // FuMa Ch 2 (Y) <- AmbiX 1
            // FuMa Ch 3 (Z) <- AmbiX 2
            // FuMa Ch 4 (R) <- AmbiX 6
            // FuMa Ch 5 (S) <- AmbiX 7
            // FuMa Ch 6 (T) <- AmbiX 5
            // FuMa Ch 7 (U) <- AmbiX 8
            // FuMa Ch 8 (V) <- AmbiX 4
            // FuMa Ch 9 (K) <- AmbiX 10 (Wait, K is l=3, m=-3... No, let's use the explicit table from documentation if available, otherwise deduce)


            /* ACN:
               0: 0,0
               1: 1,-1 (Y)
               2: 1,0 (Z)
               3: 1,1 (X)
               4: 2,-2 (V)
               5: 2,-1 (T)
               6: 2,0 (R)
               7: 2,1 (S)
               8: 2,2 (U)
               9: 3,-3 (Q)
              10: 3,-2 (O)
              11: 3,-1 (M)
              12: 3,0 (K)
              13: 3,1 (L)
              14: 3,2 (N)
              15: 3,3 (P)
              
              FuMa:
              W (0,0)
              X (1,1)
              Y (1,-1)
              Z (1,0)
              R (2,0)
              S (2,1)
              T (2,-1)
              U (2,2)
              V (2,-2)
              K (3,0)
              L (3,1)
              M (3,-1)
              N (3,2)
              O (3,-2)
              P (3,3)
              Q (3,-3)
           */

            // Correct ACN->FuMa Map (Index in ACN that corresponds to FuMa 0..15):
            // F0 (W) <- A0
            // F1 (X) <- A3
            // F2 (Y) <- A1
            // F3 (Z) <- A2
            // F4 (R) <- A6
            // F5 (S) <- A7
            // F6 (T) <- A5
            // F7 (U) <- A8
            // F8 (V) <- A4
            // F9 (K) <- A12
            // F10 (L) <- A13
            // F11 (M) <- A11
            // F12 (N) <- A14
            // F13 (O) <- A10
            // F14 (P) <- A15
            // F15 (Q) <- A9

            const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];

            // FuMa -> AmbiX Map (Index in FuMa that corresponds to ACN 0..15):
            // A0 (W) <- F0
            // A1 (Y) <- F2
            // A2 (Z) <- F3
            // A3 (X) <- F1
            // A4 (V) <- F8
            // A5 (T) <- F6
            // A6 (R) <- F4
            // A7 (S) <- F5
            // A8 (U) <- F7
            // A9 (Q) <- F15
            // A10 (O) <- F13
            // A11 (M) <- F11
            // A12 (K) <- F9
            // A13 (L) <- F10
            // A14 (N) <- F12
            // A15 (P) <- F14

            const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];

            const mapIndices = direction === "AmbixToFuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
            const gain = direction === "AmbixToFuMa" ? gainToFuMa : gainToAmbiX;

            // Build Pan Filter
            // pan=N|c0=gain*c0|c1=cSrc|...

            let parts = [`c0=${gain}*c${mapIndices[0]}`]; // W channel gain

            // Rest check bounds
            for (let i = 1; i < channels; i++) {
                // Ensure we don't access out of bounds if file is weird (e.g. 9ch but asking for 16)
                // But channels is from probe, so mapIndices must accommodate.
                // We should slice mapIndices to channels?
                // Actually, if we have 9ch, we only map 0..8.
                // Note: The map array assumes full 3rd order.
                // 2nd Order is subset 0..8.
                // 1st Order is subset 0..3.

                parts.push(`c${i}=c${mapIndices[i]}`);
            }

            filter = `pan=${channels}c|${parts.join('|')}`;
        } else {
            return { success: false, error: `Unsupported channel count: ${channels}. Only 4, 9, or 16 channels supported for AmbiSwap.` };
        }

        const suffix = direction === "AmbixToFuMa" ? "_FuMa" : "_AmbiX";
        const outputPath = inputPath.replace(/\.[^/.]+$/, "") + `${suffix}.wav`;

        const ffmpegPath = getFfmpegPath();
        const args = [
            '-y',
            '-i', inputPath,
            '-c:a', 'pcm_s24le',
            '-filter_complex', filter,
            outputPath
        ];

        console.log(`[AmbiSwap] Spawning: ${ffmpegPath} ${args.join(' ')}`);

        return new Promise((resolve) => {
            const child = spawn(ffmpegPath, args);
            let stderr = '';

            child.stderr.on('data', d => stderr += d.toString());

            child.on('close', (code) => {
                if (code === 0) {
                    event.sender.send('task-progress', 1.0);
                    resolve({ success: true, data: { outputPath } });
                } else {
                    resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr}` });
                }
            });

            child.on('error', (err) => {
                resolve({ success: false, error: err.message });
            });
        });

    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
