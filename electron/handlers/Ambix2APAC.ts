import { IpcMainInvokeEvent } from '../shim';
import path from 'path';
import { spawn } from 'child_process';
import { app } from '../shim';
import { determineOutputPath } from './common';

export async function handleAmbix2APAC(event: IpcMainInvokeEvent, options: {
    files: string[];
    bitrate: string;
    settings?: { outputDir?: string; autoCreateFolder?: boolean };
}): Promise<{ success: boolean; error?: string; data?: any }> {
    const { files, bitrate, settings } = options;
    const sender = event.sender;

    // Map bitrate string to integer (per channel)
    // Options: "Low (64 kbps)", "Medium (96 kbps)", "High (128 kbps)", "Pro (192 kbps)"
    let bitrateVal = 96000; // Default Medium
    if (bitrate && bitrate.includes("64")) bitrateVal = 64000;
    if (bitrate && bitrate.includes("96")) bitrateVal = 96000;
    if (bitrate && bitrate.includes("128")) bitrateVal = 128000;
    if (bitrate && bitrate.includes("192")) bitrateVal = 192000;

    console.log(`[Ambix2APAC] Selected Bitrate: ${bitrate} -> ${bitrateVal} bps/channel`);

    // Path to binary
    const isDev = !app.isPackaged;
    // In dev: assets/bin/apac-enc
    // In prod: resources/assets/bin/apac-enc (usually)
    // We'll rely on common patterns or just strict paths.
    // PROJECT_STATE says: "Binaries ... expected in assets/bin/"
    const binPath = isDev
        ? path.join(process.cwd(), 'assets', 'bin', 'apac-enc')
        : path.join(process.resourcesPath, 'assets', 'bin', 'apac-enc');

    console.log(`[Ambix2APAC] Binary Path: ${binPath}`);

    // VERIFY BINARY EXISTS
    const fs = await import('fs');
    if (!fs.existsSync(binPath)) {
        console.error(`[Ambix2APAC] Binary NOT FOUND at: ${binPath}`);
        return { success: false, error: `Binary not found at ${binPath}` };
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = path.basename(file);

        // Output path logic
        const outFile = determineOutputPath(file, settings, 'APAC', '_apac.mp4');

        sender.send('task-status', { toolId: 'ambix2apac', msg: `Encoding ${i + 1}/${files.length}: ${path.basename(file)}` });

        console.log(`[Ambix2APAC] Spawning: ${binPath} "${file}" "${outFile}" ${bitrateVal}`);

        try {
            await new Promise<void>((resolve, reject) => {
                const child = spawn(binPath, [file, outFile, bitrateVal.toString()]);

                child.stdout.on('data', (d) => {
                    const str = d.toString();
                    console.log(`[Ambix2APAC] stdout: ${str.trim()}`);

                    // Parse Progress
                    const match = str.match(/Progress:\s*(\d+)%/);
                    if (match) {
                        const progress = parseInt(match[1], 10);
                        sender.send('task-progress', { toolId: 'ambix2apac', progress });
                    }
                });
                child.stderr.on('data', (d) => console.error(`[Ambix2APAC] stderr: ${d}`));

                child.on('error', (err) => {
                    console.error(`[Ambix2APAC] Spawn Error:`, err);
                    reject(err);
                });

                child.on('close', (code) => {
                    console.log(`[Ambix2APAC] Process closed with code: ${code}`);
                    if (code === 0) resolve();
                    else reject(new Error(`Process exited with code ${code}`));
                });
            });
        } catch (err: any) {
            console.error(`[Ambix2APAC] Catch Error:`, err);
            return { success: false, error: `Failed to encode ${fileName}: ${err.message}` };
        }

        sender.send('task-progress', { toolId: 'ambix2apac', progress: (i + 1) / files.length });
    }

    return { success: true };
};
