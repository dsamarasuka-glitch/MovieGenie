
import React from 'react';

const FilmReelIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

export const Header = (): React.ReactNode => {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center gap-4 mb-2">
        <FilmReelIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
          MovieGenie
        </h1>
      </div>
      <p className="text-gray-400 text-lg">
        Turn your ideas into cinematic shorts with the power of Veo AI.
      </p>
    </header>
  );
};
   