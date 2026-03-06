import { IpcMainInvokeEvent } from '../shim';
import path from 'node:path';
import { spawn } from 'node:child_process';
// No longer using getBinaryPath, probeAudio, determineOutputPath from common here
// as they are handled inside the python script for batch processing


export async function handleAmbix2BW64(event: IpcMainInvokeEvent, options: {
    files: string[];
    normalization: 'SN3D' | 'N3D';
    nfcDistance?: number;
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, normalization, nfcDistance, settings } = options;

    try {
        if (!files || files.length === 0) throw new Error("No files provided");

        const scriptPath = path.join(process.cwd(), 'py', 'ambix2bw64.py');

        // Prepare parameters
        const pythonArgs = [
            scriptPath,
            '--files', JSON.stringify(files),
            '--norm', normalization
        ];

        if (nfcDistance !== undefined) {
            pythonArgs.push('--nfcDist', nfcDistance.toString());
        }

        if (settings?.outputDir) {
            pythonArgs.push('--outDir', settings.outputDir);
        }

        await new Promise<void>((resolve, reject) => {
            const child = spawn('python3', pythonArgs);

            child.stdout.on('data', d => {
                const chunk = d.toString();
                console.log(`[Ambix2BW64] ${chunk}`);
                // Parse progress if possible (simple line-based)
                if (chunk.includes('Converting:')) {
                    event.sender.send('task-status', { toolId: 'ambix2bw64', msg: chunk.trim() });
                }
            });

            child.stderr.on('data', d => {
                const chunk = d.toString();
                console.error(`[Ambix2BW64] stderr: ${chunk}`);
            });

            child.on('close', code => {
                if (code === 0) resolve();
                else reject(new Error(`Conversion failed with code ${code}. Check if 'ear-utils' is installed (pip install ear-utils).`));
            });

            child.on('error', err => reject(err));
        });

        return { success: true };


    } catch (e: any) {
        console.error("[Ambix2BW64] Error:", e);
        return { success: false, error: e.message };
    }
}
