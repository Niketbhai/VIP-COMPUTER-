import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  
  return (
    <div className={`flex items-center select-none ${className}`} id="vip-brand-logo">
      <div className={`relative flex items-center justify-center transition-transform duration-300 ${
        isSm ? 'w-9 h-9' : isLg ? 'w-14 h-14' : 'w-11 h-11'
      }`}>
        {/* Custom yellow/gold V-ribbon logo SVG */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_8px_rgba(234,179,8,0.2)]">
          <defs>
            <linearGradient id="yellowVGrad" x1="0%" y1="100%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="#d97706" /> {/* amber-600 */}
              <stop offset="30%" stopColor="#f59e0b" /> {/* amber-500 */}
              <stop offset="70%" stopColor="#eab308" /> {/* yellow-500 */}
              <stop offset="100%" stopColor="#facc15" /> {/* yellow-400 */}
            </linearGradient>
          </defs>
          <path 
            d="M5 48 L17 38 L38 68 L82 12 C85 6 92 8 92 14 L55 92 C53 96 48 96 45 92 L5 48 Z" 
            fill="url(#yellowVGrad)" 
          />
        </svg>
        <div className="absolute -inset-1.5 bg-yellow-500/10 rounded-xl blur-md opacity-40 pointer-events-none"></div>
      </div>
    </div>
  );
};
