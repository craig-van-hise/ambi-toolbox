import React, { useRef, useState, useEffect } from 'react';

interface TimelineProps {
    duration: number;        // Total seconds
    currentTime: number;     // Current playback time
    loopIn: number;          // Loop Start time
    loopOut: number;         // Loop End time
    isLooping: boolean;
    onSeek: (time: number) => void;
    onLoopChange: (inTime: number, outTime: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
    duration, currentTime, loopIn, loopOut, isLooping, onSeek, onLoopChange
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<'playhead' | 'in' | 'out' | null>(null);

    // Helper: Convert Mouse X to Time
    const getNewTime = (clientX: number) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        return ratio * duration;
    };

    // Global Drag Handlers
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            const t = getNewTime(e.clientX);

            if (dragging === 'playhead') {
                onSeek(t);
            } else if (dragging === 'in') {
                // Constraint: In < Out
                const newIn = Math.min(t, loopOut - 0.1);
                onLoopChange(newIn, loopOut);
            } else if (dragging === 'out') {
                // Constraint: Out > In
                const newOut = Math.max(t, loopIn + 0.1);
                onLoopChange(loopIn, newOut);
            }
        };

        const handleMouseUp = () => {
            setDragging(null);
        };

        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, duration, loopIn, loopOut, onSeek, onLoopChange]);

    // Percentages for CSS positioning
    const pct = (t: number) => (duration > 0 ? (t / duration) * 100 : 0);

    return (
        <div className="w-full h-12 relative flex items-center select-none group" ref={trackRef}>
            {/* 1. Track Background */}
            <div className="w-full h-2 bg-[#374151] rounded-full overflow-hidden relative cursor-pointer"
                onMouseDown={(e) => {
                    // Clicking track jumps playhead
                    if (e.target === trackRef.current || (e.target as HTMLElement).classList.contains('bg-[#374151]') || (e.target as HTMLElement).classList.contains('bg-studio-dark')) {
                        onSeek(getNewTime(e.clientX));
                        setDragging('playhead');
                    }
                }}>

                {/* 2. Loop Region Highlight */}
                {isLooping && (
                    <div
                        className="absolute top-0 h-full bg-green-500/20 pointer-events-none"
                        style={{ left: `${pct(loopIn)}%`, width: `${pct(loopOut - loopIn)}%` }}
                    />
                )}

                {/* 3. Playhead Progress Fill (Optional) */}
                <div
                    className="absolute top-0 h-full bg-blue-500/30 pointer-events-none"
                    style={{ width: `${pct(currentTime)}%` }}
                />
            </div>

            {/* 4. Loop Flags (Only show if looping enabled) */}
            {isLooping && (
                <>
                    {/* Left Flag (In) - Right Pointing Triangle */}
                    <div
                        className="absolute top-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-green-500 cursor-ew-resize hover:scale-110 transition-transform z-20"
                        style={{ left: `calc(${pct(loopIn)}% - 0px)` }} // Align left edge
                        onMouseDown={(e) => { e.stopPropagation(); setDragging('in'); }}
                        title="Loop Start"
                    />

                    {/* Right Flag (Out) - Left Pointing Triangle */}
                    <div
                        className="absolute top-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-red-500 cursor-ew-resize hover:scale-110 transition-transform z-20"
                        style={{ left: `calc(${pct(loopOut)}% - 12px)` }} // Align right edge (width of border)
                        onMouseDown={(e) => { e.stopPropagation(); setDragging('out'); }}
                        title="Loop End"
                    />
                </>
            )}

            {/* 5. Playhead Knob (Draggable) */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-grab active:cursor-grabbing z-30 transform hover:scale-110 transition-transform"
                style={{ left: `calc(${pct(currentTime)}% - 8px)` }}
                onMouseDown={(e) => { e.stopPropagation(); setDragging('playhead'); }}
            />
        </div>
    );
};
