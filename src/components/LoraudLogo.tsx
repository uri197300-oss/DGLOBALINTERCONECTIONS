import React from 'react';

interface LoraudLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const LoraudLogo: React.FC<LoraudLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Icon */}
      <div className={`${currentSize.box} rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 flex items-center justify-center p-1.5 shadow-md border border-slate-800 dark:border-slate-200 transition-colors`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main D outer arc */}
          <path 
            d="M 32 18 L 52 18 C 72 18, 82 32, 82 50 C 82 68, 72 82, 52 82 L 32 82 C 30 82, 28 80, 28 78 L 28 22 C 28 20, 30 18, 32 18 Z" 
            stroke="currentColor" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner vertical bar */}
          <line x1="38" y1="24" x2="38" y2="76" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          
          {/* Internal leaf/flourish curve inside the D */}
          <path 
            d="M 38 68 C 42 55, 52 48, 58 35 C 53 45, 45 52, 38 52" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-serif font-bold ${currentSize.text} tracking-wider text-slate-900 dark:text-white uppercase leading-none`}>
            D LORAUD
          </span>
          <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">
            DGlobalConections
          </span>
        </div>
        {showSubtitle && (
          <p className={`${currentSize.sub} text-slate-500 dark:text-slate-400 font-sans tracking-widest uppercase leading-tight mt-1 font-semibold`}>
            TIENDA OFICIAL • ID: 685476429
          </p>
        )}
      </div>
    </div>
  );
};

export default LoraudLogo;
