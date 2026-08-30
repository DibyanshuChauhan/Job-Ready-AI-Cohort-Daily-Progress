import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="ml-auto flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white uppercase transition-colors py-2 px-3.5 border border-zinc-300 dark:border-zinc-800/40 rounded-full bg-transparent cursor-pointer"
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.036 5.036l1.591 1.591m10.744 10.744l1.591 1.591M3 12h2.25m13.5 0H21M5.036 18.964l1.591-1.591M16.78 7.22l1.591-1.591M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
          </svg>
          <span>LUX PROTOCOL</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <span>NOX PROTOCOL</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
