import React from 'react';

export function MainHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-hades-border bg-hades-bg-dark/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-hades-bg-main">
          <img 
            src="/assets/ui/melinoe_icon.webp" 
            alt="Melinoë" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-xl font-bold text-gray-300 uppercase italic">
          Hades II <span className="text-hades-accent not-italic ml-2">Build Planner</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
      </div>
    </header>
  );
}
