import React, { useState, useEffect, useRef } from 'react';

interface KnobProps {
    value: number;
    min: number;
    max: number;
    onChange: (val: number) => void;
    size?: number;
    color?: string; // Hex color for the active arc
}

export const Knob: React.FC<KnobProps> = ({
    value,
    min,
    max,
    onChange,
    size = 100,
    color = '#ef4444' // Tailwind red-500 default
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef<number>(0);
    const startVal = useRef<number>(0);

    // Calculate angle from value
    // Map min..max to -135deg .. +135deg (270 degree range)
    const range = max - min;
    const angleRange = 270;
    const startAngle = -135;

    // Normalize value 0..1
    const normalized = (value - min) / range;
    const currentAngle = startAngle + (normalized * angleRange);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startY.current = e.clientY;
        startVal.current = value;
        document.body.style.cursor = 'ns-resize';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaY = startY.current - e.clientY; // Up is positive
            // Sensitivity removed (unused)

            // Pixels per unit? No, let's do pixels per range percent


            // 200px drag = full range
            const dragPercent = deltaY / 200;
            const valDelta = dragPercent * range;

            let newVal = startVal.current + valDelta;
            newVal = Math.max(min, Math.min(newVal, max));

            onChange(Math.round(newVal)); // Integer steps for now
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, min, max, range, onChange]);

    // SVG Math for Arc
    const radius = 40;
    const center = 50;
    const strokeWidth = 8;

    const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, r, endAngle);
        const end = polarToCartesian(x, y, r, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    return (
        <div
            className="relative select-none cursor-ns-resize"
            style={{ width: size, height: size }}
            onMouseDown={handleMouseDown}
        >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
                {/* Background Track */}
                <path
                    d={describeArc(center, center, radius, -135, 135)}
                    fill="none"
                    stroke="#333"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Active Arc */}
                <path
                    d={describeArc(center, center, radius, -135, currentAngle)}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
                />

                {/* Indicator Line on Knob Body (Optional, simplified to just arc for now to match modern look) */}
                {/* Center Tick */}
                <line
                    x1={center} y1={center}
                    x2={center + (radius - 12) * Math.cos((currentAngle - 90) * Math.PI / 180)}
                    y2={center + (radius - 12) * Math.sin((currentAngle - 90) * Math.PI / 180)}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};
