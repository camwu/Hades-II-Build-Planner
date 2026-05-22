import React from 'react';
import { Github } from 'lucide-react';

export function MainFooter() {
  const lastUpdatedStr = (() => {
    try {
      const raw = (import.meta as any).env.VITE_LAST_UPDATED;
      if (!raw) return 'May 17, 2026';
      const date = new Date(raw);
      if (isNaN(date.getTime())) return raw;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return 'May 17, 2026';
    }
  })();

  return (
    <footer className="py-3 bg-hades-bg-dark border-t border-hades-border px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6 text-[9px] font-display text-gray-400 opacity-70 uppercase">
        <a 
          href="https://github.com/camwu/Hades-II-Build-Planner" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-hades-accent transition-colors group"
        >
          <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>GitHub Repo</span>
        </a>
        <div className="hidden md:block w-px h-3 bg-hades-border opacity-30" />
        <span>Updated: {lastUpdatedStr}</span>
      </div>
      
      <p className="max-w-none text-center md:text-right text-[10px] text-gray-400 leading-[1.6] font-sans opacity-70 md:whitespace-nowrap">
        Hades II Build Planner is an unofficial, fan-developed project that is not affiliated with or endorsed by Supergiant Games. Hades II, its characters, and all art assets are property of Supergiant Games.
      </p>
    </footer>
  );
}
