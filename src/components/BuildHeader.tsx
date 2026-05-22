import React from 'react';
import { Edit2, Link, X } from 'lucide-react';

interface BuildHeaderProps {
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

export function BuildHeader({
  buildName,
  setBuildName,
  isEditingName,
  setIsEditingName,
  nameInputRef,
  copyBuildLink,
  isCopied,
  purgeBuild,
  showPurgeConfirm
}: BuildHeaderProps) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex flex-col gap-2 group">
        <div className="flex items-center gap-3 h-10">
          {isEditingName ? (
            <input
              ref={nameInputRef}
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              className="text-2xl font-light bg-transparent border-b border-hades-accent outline-none text-white w-full max-w-md uppercase py-0 font-display"
              autoFocus
            />
          ) : (
            <h2 
              onClick={() => setIsEditingName(true)}
              className="text-2xl font-light text-gray-300 flex items-center gap-3 uppercase cursor-pointer hover:text-hades-accent transition-colors h-full font-display"
            >
              {buildName || 'Untitled Build'}
              <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
            </h2>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={copyBuildLink}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-200 uppercase font-display text-[9px] tracking-widest ${
            isCopied 
              ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
              : 'bg-hades-accent/5 border-hades-accent/20 text-hades-accent/70 hover:border-hades-accent/50 hover:text-hades-accent'
          }`}
        >
          <Link className={`w-3 h-3 ${isCopied ? 'animate-bounce' : ''}`} />
          {isCopied ? 'Link Copied!' : 'Copy Share Link'}
        </button>

        <button 
          onClick={purgeBuild}
          className={`text-[9px] font-display uppercase tracking-widest transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded border ${
            showPurgeConfirm 
              ? 'bg-hades-red text-white border-white/20 animate-pulse' 
              : 'text-hades-red/80 hover:text-red-300 bg-hades-red/5 border-hades-red/10 hover:border-hades-red/30'
          }`}
        >
          <X className={`w-3 h-3 ${showPurgeConfirm ? 'animate-bounce' : ''}`} />
          {showPurgeConfirm ? 'Confirm Purge?' : 'Purge Build'}
        </button>
      </div>
    </div>
  );
}
