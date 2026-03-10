import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { handleAmbix2Opus } from './Ambix2Opus';
import { handleAmbix2Bin } from './Ambix2Bin';
import { handleAmbix2IAMF } from './Ambix2IAMF';
import { handleAmbix2CAF } from './Ambix2CAF';
import { handleAmbiOrder } from './AmbiOrder';
import { handleAmbiSwap } from './AmbiSwap';
import { handleAmbiRotate } from './AmbiRotate';
import { handleAmbix2APAC } from './Ambix2APAC';
import { handleAmbix2Ogg } from './Ambix2Ogg';
import { handleStereo2Ambix } from './Stereo2Ambix';
import { handleAmbiLevel } from './AmbiLevel';
import { handleAmbix2BW64 } from './Ambix2BW64';
import { analyzeAmbiFile } from './AmbiData';

import { registerFileHandlers } from './FileHandler';
import { registerDialogHandlers } from './DialogHandler';
import { registerTrimHandlers } from './TrimHandler';

// Handler Interface
export type TaskHandler = (event: IpcMainInvokeEvent, options: any) => Promise<{ success: boolean; error?: string; data?: any }>;

const handlers: Record<string, TaskHandler> = {};

// Register Handlers
handlers['ambix2opus'] = handleAmbix2Opus;
handlers['ambix2bin'] = handleAmbix2Bin;
handlers['ambix2iamf'] = handleAmbix2IAMF;
handlers['ambix2caf'] = handleAmbix2CAF;
handlers['ambiorder'] = handleAmbiOrder;
handlers['ambiswap'] = handleAmbiSwap;
handlers['ambirotate'] = handleAmbiRotate;
handlers['ambix2apac'] = handleAmbix2APAC;
handlers['ambix2ogg'] = handleAmbix2Ogg;
handlers['stereo2ambix'] = handleStereo2Ambix;
handlers['ambilevel'] = handleAmbiLevel;
handlers['ambix2bw64'] = handleAmbix2BW64;

/**
 * Unified Registration entry point
 */
export function registerAllHandlers() {
    // 1. Task Dispatcher
    ipcMain.handle('run-task', async (event, toolId, options) => {
        return await dispatchTask(event, toolId, options);
    });

    // 2. Specialized Handlers
    registerFileHandlers();
    registerDialogHandlers();
    registerTrimHandlers();

    // 3. AmbiData Analysis
    ipcMain.handle('analyze-ambi-file', async (event, filePath: string) => {
        return await analyzeAmbiFile(event, filePath);
    });
}

export function registerHandler(toolId: string, handler: TaskHandler) {
    handlers[toolId] = handler;
}

export async function dispatchTask(event: IpcMainInvokeEvent, toolId: string, options: any) {
    const handler = handlers[toolId];
    if (!handler) {
        console.warn(`[Dispatcher] No handler found for toolId: ${toolId}`);
        return { success: false, error: `Tool ${toolId} not implemented yet.` };
    }

    try {
        console.log(`[Dispatcher] Dispatching ${toolId} task...`);
        return await handler(event, options);
    } catch (err: any) {
        console.error(`[Dispatcher] Error in ${toolId}:`, err);
        return { success: false, error: err.message };
    }
}
