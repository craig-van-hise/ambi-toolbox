
import React, { useState, useEffect, useRef } from 'react';

interface TimeInputProps {
    value: number; // In seconds
    onChange: (newValue: number) => void;
    max?: number;
    min?: number;
    label?: string;
    disabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
    value,
    onChange,
    max = Infinity,
    min = 0,
    label,
    disabled = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef<number | null>(null);
    const startValue = useRef<number | null>(null);

    // Format seconds to MM:SS.ms
    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        const ms = Math.floor((time % 1) * 100);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    // Parse MM:SS.ms or just seconds
    const parseTime = (str: string): number | null => {
        // Try MM:SS.ms
        const parts = str.split(':');
        if (parts.length === 2) {
            const m = parseFloat(parts[0]);
            const s = parseFloat(parts[1]);
            if (!isNaN(m) && !isNaN(s)) return (m * 60) + s;
        }
        // Try raw seconds
        const s = parseFloat(str);
        if (!isNaN(s)) return s;
        return null;
    };

    // Sync input when not editing
    useEffect(() => {
        if (!isEditing && !isDragging) {
            setInputValue(formatTime(value));
        }
    }, [value, isEditing, isDragging]);

    // Drag Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isEditing || disabled) return;
        setIsDragging(true);
        startY.current = e.clientY;
        startValue.current = value;

        document.body.style.cursor = 'ns-resize';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (startY.current === null || startValue.current === null) return;

        const deltaY = startY.current - e.clientY; // Up adds, down subtracts
        // Sensitivity: 1px = 0.1s? Maybe finer. 
        // Let's do dynamic: faster drag = faster change? No, keep simple first.
        const sensitivity = 0.05;

        let newValue = startValue.current + (deltaY * sensitivity);
        newValue = Math.max(min, Math.min(newValue, max));

        onChange(newValue);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        startY.current = null;
        startValue.current = null;
        document.body.style.cursor = 'default';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    // Input Logic
    const handleBlur = () => {
        setIsEditing(false);
        const parsed = parseTime(inputValue);
        if (parsed !== null) {
            const clamped = Math.max(min, Math.min(parsed, max));
            onChange(clamped);
        } else {
            // Revert
            setInputValue(formatTime(value));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider select-none">
                    {label}
                </label>
            )}
            <div
                className={`
                    w-full bg-[#1E1E1E] border rounded px-4 py-2 text-sm font-mono text-center
                    transition-colors
                    ${isEditing ? 'border-teal-500 ring-1 ring-teal-500' : 'border-studio-border hover:border-gray-500'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : isEditing ? 'cursor-text' : 'cursor-ns-resize'}
                `}
                onMouseDown={handleMouseDown}
                onDoubleClick={() => { if (!disabled) setIsEditing(true); }}
            >
                {isEditing ? (
                    <input
                        autoFocus
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent text-center outline-none text-white placeholder-gray-600"
                    />
                ) : (
                    <span className="select-none pointer-events-none text-white">
                        {formatTime(value)}
                    </span>
                )}
            </div>
        </div>
    );
};
