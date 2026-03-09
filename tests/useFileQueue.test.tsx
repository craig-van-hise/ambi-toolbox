import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFileQueue } from '../hooks/useFileQueue';
import { useToolState } from '../contexts/ToolStateContext';
import { FileType } from '../tools/AmbiData/types';

// Mock useToolState
vi.mock('../contexts/ToolStateContext', () => ({
    useToolState: vi.fn()
}));

describe('useFileQueue', () => {
    let mockGlobalFiles: any[] = [];
    let mockSelectedFileId = '';
    const setGlobalFiles = vi.fn((updater) => {
        if (typeof updater === 'function') {
            mockGlobalFiles = updater(mockGlobalFiles);
        } else {
            mockGlobalFiles = updater;
        }
    });
    const setSelectedFileId = vi.fn((id) => {
        mockSelectedFileId = id;
    });

    beforeEach(() => {
        vi.clearAllMocks();
        mockGlobalFiles = [];
        mockSelectedFileId = '';
        (useToolState as any).mockReturnValue({
            globalFiles: mockGlobalFiles,
            setGlobalFiles,
            selectedFileId: mockSelectedFileId,
            setSelectedFileId
        });
    });

    it('should add files to the queue', () => {
        const { result } = renderHook(() => useFileQueue());
        const mockFile = { name: 'test.wav', path: '/path/to/test.wav' } as any;

        act(() => {
            result.current.addFiles([mockFile]);
        });

        expect(setGlobalFiles).toHaveBeenCalled();
        expect(mockGlobalFiles.length).toBe(1);
        expect(mockGlobalFiles[0].name).toBe('test');
        expect(mockGlobalFiles[0].type).toBe(FileType.Audio);
    });

    it('should identify video files', () => {
        const { result } = renderHook(() => useFileQueue());
        const mockVideo = { name: 'test.mp4', path: '/path/to/test.mp4' } as any;

        act(() => {
            result.current.addFiles([mockVideo]);
        });

        expect(mockGlobalFiles[0].type).toBe(FileType.Video);
    });

    it('should remove a file from the queue', () => {
        mockGlobalFiles = [{ id: '/path/1', name: 'test1' }];
        mockSelectedFileId = '/path/1';
        (useToolState as any).mockReturnValue({
            globalFiles: mockGlobalFiles,
            setGlobalFiles,
            selectedFileId: mockSelectedFileId,
            setSelectedFileId
        });

        const { result } = renderHook(() => useFileQueue());

        act(() => {
            result.current.removeFile('/path/1');
        });

        expect(setGlobalFiles).toHaveBeenCalled();
        expect(mockGlobalFiles.length).toBe(0);
        expect(setSelectedFileId).toHaveBeenCalledWith('');
    });

    it('should clear the queue', () => {
        mockGlobalFiles = [{ id: '/path/1' }, { id: '/path/2' }];
        const { result } = renderHook(() => useFileQueue());

        act(() => {
            result.current.clearQueue();
        });

        expect(setGlobalFiles).toHaveBeenCalledWith([]);
        expect(setSelectedFileId).toHaveBeenCalledWith('');
    });

    it('should set active file', () => {
        const { result } = renderHook(() => useFileQueue());

        act(() => {
            result.current.setActiveFile('/path/new');
        });

        expect(setSelectedFileId).toHaveBeenCalledWith('/path/new');
    });
});
