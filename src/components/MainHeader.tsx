import React from 'react';
import { Edit2, Link, X } from 'lucide-react';

interface MainHeaderProps {
  buildName: string;
  setBuildName: (name: string) => void;
  isEditingName: boolean;
  setIsEditingName: (editing: boolean) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  copyBuildLink: () => void;
  isCopied: boolean;
  purgeBuild: () => void;
  showPurgeConfirm: boolean;
}

export function MainHeader({
  buildName,
  setBuildName,
  isEditingName,
  setIsEditingName,
  nameInputRef,
  copyBuildLink,
  isCopied,
  purgeBuild,
  showPurgeConfirm
}: MainHeaderProps) {
  return (
    <header className="relative w-full flex-shrink-0 h-16 border-b border-hades-border bg-hades-bg-dark/85 backdrop-blur-md z-50 px-6 flex items-center justify-between">
      {/* Left side: Logo & Title */}
      <div className="h-full flex items-center gap-3 shrink-0 z-10">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-hades-bg-main">
          <img 
            src="/assets/ui/melinoe_icon.webp" 
            alt="Melinoë" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-xl font-medium text-gray-300 uppercase italic font-sc tracking-wide">
          Hades II <span className="text-hades-accent not-italic ml-2 font-sc tracking-wide">Build Planner</span>
        </h1>
      </div>

      {/* Middle: Build Name Editor (Centered absolutely for total horizontal stability) */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex items-center justify-center">
        <div className="pointer-events-auto relative w-80 flex items-center justify-center group h-10">
          {isEditingName ? (
            <input
              ref={nameInputRef}
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              className="text-base font-normal bg-hades-bg-main/50 border-b border-hades-accent outline-none text-white w-full uppercase h-10 px-8 font-sc text-center tracking-wider border-t-0 border-x-0 py-0 m-0 leading-10 focus:ring-0 focus:outline-none"
              autoFocus
            />
          ) : (
            <h2 
              onClick={() => setIsEditingName(true)}
              className="text-base font-normal text-gray-300 w-full text-center uppercase cursor-pointer hover:text-hades-accent transition-colors font-sc relative px-8 h-10 flex items-center justify-center border-t-0 border-x-0 border-b border-transparent py-0 m-0"
            >
              <span className="block truncate max-w-[200px] tracking-wider py-0 m-0 leading-10">
                {buildName || 'Untitled Build'}
              </span>
              <Edit2 className="w-3.5 h-3.5 opacity-40 group-hover:opacity-80 transition-opacity text-hades-accent absolute right-2 top-1/2 -translate-y-1/2" />
            </h2>
          )}
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="h-full flex items-center gap-3 shrink-0 z-10">
        <button 
          onClick={copyBuildLink}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all duration-200 uppercase font-display text-[9px] tracking-widest cursor-pointer ${
            isCopied 
              ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
              : 'bg-hades-accent/5 border-hades-accent/15 text-hades-accent/75 hover:border-hades-accent/40 hover:text-hades-accent hover:bg-hades-accent/10'
          }`}
        >
          <Link className={`w-3 h-3 ${isCopied ? 'scaled' : ''}`} />
          <span>
            {isCopied ? 'Link Copied!' : 'Copy Share Link'}
          </span>
        </button>

        <button 
          onClick={purgeBuild}
          className={`text-[9px] font-display uppercase tracking-widest transition-all duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded border cursor-pointer ${
            showPurgeConfirm 
              ? 'bg-hades-red/90 text-white border-white/25 animate-pulse' 
              : 'text-hades-red/80 hover:text-red-300 bg-hades-red/5 border-hades-red/10 hover:border-hades-red/25 hover:bg-hades-red/10'
          }`}
        >
          <X className="w-3 h-3" />
          <span>
            {showPurgeConfirm ? 'Confirm Purge?' : 'Purge Build'}
          </span>
        </button>
      </div>
    </header>
  );
}
