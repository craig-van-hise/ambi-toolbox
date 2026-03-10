import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

// Mock Electron API
(window as any).electronAPI = {
    onProgress: vi.fn(() => () => { }),
    on: vi.fn(() => () => { }),
};

// Mock child components that might need complex context or electron APIs
vi.mock('../src/components/Sidebar', () => ({
    Sidebar: () => <div data-testid="sidebar">Sidebar</div>
}));

// Mock ToolView to isolate App layout testing
vi.mock('../src/components/ToolViews', () => ({
    ToolView: () => <div data-testid="tool-view">Tool View</div>
}));

describe('Phase 1: Global App Structure', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render correct 3-column layout', () => {
        render(<App />);

        // Check grid classes
        const rootContainer = document.querySelector('.grid');
        expect(rootContainer).not.toBeNull();
        expect(rootContainer?.className).toContain('grid-cols-[250px_1fr_300px]');

        // Check Right Sidebar
        const rightSidebar = screen.getByTestId('right-sidebar');
        expect(rightSidebar).not.toBeNull();
    });
});
