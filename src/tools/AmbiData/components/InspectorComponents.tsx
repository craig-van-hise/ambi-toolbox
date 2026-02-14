import React from 'react';
import { Pencil, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2, AlertOctagon } from './Icons';

// --- Card Component ---
// --- Card Component ---
interface CardProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    loading?: boolean;
}

export const InspectorCard: React.FC<CardProps> = ({ title, children, defaultOpen = true, icon, loading }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="bg-studio-bg-lighter border border-white/10 rounded-lg overflow-hidden mb-5 shadow-lg transition-all">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-studio-bg-lighter to-studio-bg hover:from-white/5 hover:to-white/5 transition-all border-b border-white/5"
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="opacity-80">{icon}</span>}
                    <span className="text-sm font-bold text-neutral-100 uppercase tracking-widest">{title}</span>
                    {loading && <span className="ml-2 text-xs text-indigo-400 animate-pulse">(Analyzing...)</span>}
                </div>
                {isOpen ? <ChevronDown size={16} className="text-indigo-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
            </button>

            {isOpen && (
                <div className="p-5 animate-in fade-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

// --- Data Field Components ---

interface DataFieldProps {
    label: string;
    value: string | number | React.ReactNode;
    isEditable?: boolean;
    type?: 'text' | 'textarea' | 'number' | 'select';
    options?: string[]; // For select
    warningLevel?: 'none' | 'warning' | 'error' | 'success'; // For health coding
    onChange?: (value: any) => void;
    isAnalyzing?: boolean; // Show loading state
}

export const DataField: React.FC<DataFieldProps> = ({
    label,
    value,
    isEditable = false,
    type = 'text',
    options = [],
    warningLevel = 'none',
    onChange,
    isAnalyzing = false
}) => {

    // EDITABLE MODE - Form Style
    if (isEditable) {
        let inputElement;

        const safeValue = value === undefined || value === null ? '' : value;

        if (type === 'select') {
            inputElement = (
                <div className="relative w-full">
                    <select
                        className="w-full bg-studio-bg border border-white/20 text-neutral-100 text-sm rounded px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 appearance-none pr-8 font-mono shadow-inner"
                        value={safeValue as string}
                        onChange={(e) => onChange && onChange(e.target.value)}
                    >
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
            );
        } else if (type === 'textarea') {
            inputElement = (
                <textarea
                    className="w-full bg-studio-bg border border-white/20 text-neutral-100 text-sm rounded px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 min-h-[80px] font-mono shadow-inner resize-y"
                    value={safeValue as string}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            );
        } else if (type === 'number') {
            inputElement = (
                <div className="flex items-center">
                    <input
                        type="number"
                        step="0.5"
                        className="w-full bg-studio-bg border border-white/20 text-neutral-100 text-sm rounded px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 font-mono shadow-inner"
                        value={safeValue as number}
                        onChange={(e) => onChange && onChange(parseFloat(e.target.value))}
                    />
                    <span className="ml-3 text-xs text-neutral-500 font-mono">dB</span>
                </div>
            );
        } else {
            inputElement = (
                <input
                    type="text"
                    className="w-full bg-studio-bg border border-white/20 text-neutral-100 text-sm rounded px-3 py-2 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 font-mono shadow-inner"
                    value={safeValue as string}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            );
        }

        return (
            <div className="bg-studio-bg/30 border border-white/10 rounded-md p-3 flex flex-col justify-start relative group hover:border-indigo-400/30 transition-all">
                <div className="flex items-center mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mr-2 opacity-80">{label}</span>
                    <Pencil size={12} className="text-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                    {inputElement}
                </div>
            </div>
        );
    }

    // READ-ONLY MODE - Dashboard Tile Style
    let textColor = 'text-neutral-200';
    let Icon = null;
    let borderColor = 'border-white/10';
    let bgColor = 'bg-studio-bg/50';

    if (warningLevel === 'error') {
        textColor = 'text-red-400';
        borderColor = 'border-red-900/30';
        bgColor = 'bg-red-950/10';
        Icon = AlertOctagon;
    } else if (warningLevel === 'warning') {
        textColor = 'text-yellow-400';
        borderColor = 'border-yellow-900/30';
        bgColor = 'bg-yellow-950/10';
        Icon = AlertTriangle;
    } else if (warningLevel === 'success') {
        textColor = 'text-green-400';
        borderColor = 'border-green-900/30';
        bgColor = 'bg-green-950/10';
        Icon = CheckCircle2;
    }

    // Determine display value - show loading if analyzing
    const displayValue = isAnalyzing ? (
        <span className="animate-pulse text-studio-text/40">Analyzing...</span>
    ) : value;

    return (
        <div className={`${bgColor} ${borderColor} border rounded-md p-3 flex flex-col justify-between shadow-sm hover:border-white/20 transition-all group`}>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1 truncate group-hover:text-neutral-400 transition-colors">{label}</div>
            <div className="flex-1 flex items-center min-h-[24px]">
                {Icon && <Icon size={16} className={`mr-2 flex-shrink-0 ${textColor}`} />}
                <div className={`font-mono text-sm leading-tight break-all ${textColor} font-medium`}>
                    {displayValue}
                </div>
            </div>
        </div>
    );
};

// --- Horizontal Row Container ---
export const HorizontalRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {children}
        </div>
    );
};
