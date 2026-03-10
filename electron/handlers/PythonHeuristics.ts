import { spawn } from 'node:child_process';
import { app } from '../shim';
import path from 'node:path';

/**
 * PythonHeuristics
 * Handles background analysis of audio files using specialized Python scripts.
 */

function getPythonScriptPath(scriptName: string): string {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'py', scriptName);
    }
    return path.join(process.cwd(), 'py', scriptName);
}

export async function runPythonHeuristics(filePath: string): Promise<any> {
    return new Promise((resolve) => {
        const scriptPath = getPythonScriptPath('ambi_data_heuristics.py');
        const child = spawn('python3', [scriptPath, filePath]);

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => { stdout += data.toString(); });
        child.stderr.on('data', (data) => { stderr += data.toString(); });

        child.on('close', (code) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(stdout));
                } catch (e) {
                    console.error('[PythonHeuristics] Failed to parse Python output:', e);
                    resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
                }
            } else {
                console.error('[PythonHeuristics] Python script failed:', stderr);
                resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
            }
        });

        child.on('error', (err) => {
            console.error('[PythonHeuristics] Python spawn error:', err);
            resolve({ format: 'Unknown', normalization: 'Unknown', sequence: 'Unknown', confidence: 0 });
        });
    });
}

export async function extractSpatialMetadata(): Promise<any> {
    // Placeholder - can be expanded for specific containers like Opus, MP4, etc.
    return {};
}
