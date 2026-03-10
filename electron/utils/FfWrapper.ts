import { spawn } from 'node:child_process';
import { getFfmpegPath } from '../handlers/common';
import { IpcMainInvokeEvent } from '../shim';

export interface FfWrapperOptions {
    args: string[];
    duration?: number;       // Total duration in seconds for progress calculation
    event?: IpcMainInvokeEvent; // If provided, sends 'task-progress' via IPC
    toolId?: string;         // If provided, includes toolId in progress updates
    progressBase?: number;   // Base progress (e.g. 0.0 to 1.0)
    progressScale?: number;  // How much of the total progress this operation represents
    onProgress?: (progress: number) => void;
    onLog?: (log: string) => void;
}

export class FfWrapper {
    /**
     * Executes FFmpeg with the given options, parsing stderr to provide progress updates.
     */
    static async run(options: FfWrapperOptions): Promise<void> {
        const {
            args,
            duration,
            event,
            toolId,
            progressBase = 0,
            progressScale = 1,
            onProgress,
            onLog
        } = options;

        const ffmpegPath = getFfmpegPath();

        return new Promise<void>((resolve, reject) => {
            const child = spawn(ffmpegPath, args);

            child.stderr.on('data', (d) => {
                const line = d.toString();

                // Logging callback
                if (onLog) {
                    onLog(line);
                }

                // Progress parsing
                if (duration && duration > 0) {
                    const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
                    if (timeMatch) {
                        const h = parseFloat(timeMatch[1]);
                        const m = parseFloat(timeMatch[2]);
                        const s = parseFloat(timeMatch[3]);
                        const currentSeconds = h * 3600 + m * 60 + s;

                        let fileProgress = currentSeconds / duration;

                        // Sanitize
                        if (isNaN(fileProgress)) fileProgress = 0;
                        fileProgress = Math.min(Math.max(fileProgress, 0), 1);

                        const totalProgress = progressBase + (fileProgress * progressScale);

                        if (onProgress) {
                            onProgress(totalProgress);
                        }

                        if (event && event.sender) {
                            const payload: any = { progress: totalProgress };
                            if (toolId) payload.toolId = toolId;
                            event.sender.send('task-progress', payload);
                        }
                    }
                }
            });

            child.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error(`FFmpeg exited with code ${code}`));
            });

            child.on('error', (err) => reject(new Error(`Failed to spawn FFmpeg: ${err.message}`)));
        });
    }
}
