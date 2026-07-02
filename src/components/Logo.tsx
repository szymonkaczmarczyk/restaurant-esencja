import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src={showText ? "/logo.png" : "/icon.png"}
        alt="Logo Esencja"
        className="h-full w-auto object-contain filter drop-shadow-md"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      {showText && (
        <span className="font-serif font-light text-2xl tracking-widest text-primary dark:text-gold uppercase">
          Esencja
        </span>
      )}
    </div>
  );
};
