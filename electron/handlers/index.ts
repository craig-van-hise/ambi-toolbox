import { IpcMainInvokeEvent } from 'electron';
import { handleAmbix2Opus } from './Ambix2Opus';
import { handleAmbix2Bin } from './Ambix2Bin';
import { handleAmbix2IAMF } from './Ambix2IAMF';
import { handleAmbix2CAF } from './Ambix2CAF';
import { handleAmbiOrder } from './AmbiOrder';
import { handleAmbiSwap } from './AmbiSwap';
import { handleAmbiRotate } from './AmbiRotate';

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
