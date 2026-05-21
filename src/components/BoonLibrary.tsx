import React from 'react';
import { motion } from 'motion/react';
import { Search, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Boon, BoonPrerequisite } from '../types';
import { SIDEBAR_WIDTH } from '../constants';
import { DraggableBoonListItem } from './BoonListItem';

interface BoonLibraryProps {
  isPanelCollapsed: boolean;
  setIsPanelCollapsed: (val: boolean) => void;
  isButtonHovered: boolean;
  setIsButtonHovered: (val: boolean) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  hideAssigned: boolean;
  setHideAssigned: (val: boolean) => void;
  limitToGodPool: boolean;
  setLimitToGodPool: (val: boolean) => void;
  activeStandardOlympians: string[];
  filteredBoons: Boon[];
  activeSlot: string | null;
  selectBoon: (boon: Boon, slotId: string) => void;
  isScrolled: boolean;
  handleSidebarScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  selectedBoonIds: Set<string>;
}

export function BoonLibrary({
  isPanelCollapsed,
  setIsPanelCollapsed,
  isButtonHovered,
  setIsButtonHovered,
  searchTerm,
  setSearchTerm,
  hideAssigned,
  setHideAssigned,
  limitToGodPool,
  setLimitToGodPool,
  activeStandardOlympians,
  filteredBoons,
  activeSlot,
  selectBoon,
  isScrolled,
  handleSidebarScroll,
  searchInputRef,
  selectedBoonIds
}: BoonLibraryProps) {
  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isPanelCollapsed 
          ? (isButtonHovered ? 24 : 0) 
          : SIDEBAR_WIDTH,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      className="border-r border-hades-border bg-hades-panel flex flex-col z-30 relative flex-shrink-0"
    >
      {/* Toggle Button - High contrast background and accent border */}
      <button 
        onClick={() => {
          setIsPanelCollapsed(!isPanelCollapsed);
          setIsButtonHovered(false);
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`absolute top-[44px] z-50 w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
          isPanelCollapsed 
            ? 'left-4 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]' 
            : '-right-3 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
        }`}
        title={isPanelCollapsed ? "Expand Library" : "Collapse Library"}
      >
        {isPanelCollapsed ? (
          <ChevronRight className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        ) : (
          <ChevronLeft className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        )}
      </button>

      <div 
        style={{ width: SIDEBAR_WIDTH }}
        className={`h-full flex flex-col overflow-hidden will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
      >
        <div className={`p-6 border-b border-hades-border-light flex flex-col gap-3 bg-hades-panel z-20 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-accent/50" />
              <input 
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
                type="text" 
                placeholder="Press / to search boons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-10 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-hades-text/30 hover:text-hades-accent transition-colors p-0.5"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] font-sans text-hades-text/60 leading-relaxed px-1">
              Search by boon name, effect, god, slot (e.g. "attack"), or element
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer group px-1 w-fit">
                <input 
                  type="checkbox" 
                  checked={hideAssigned} 
                  onChange={(e) => setHideAssigned(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  hideAssigned 
                    ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                    : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                }`}>
                  {hideAssigned && (
                    <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors select-none">
                  Hide Assigned Boons
                </span>
              </label>

              <div className="flex items-center gap-2 px-1 w-fit">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <input 
                    type="checkbox" 
                    checked={limitToGodPool} 
                    onChange={(e) => setLimitToGodPool(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                    limitToGodPool 
                      ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                      : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                  }`}>
                    {limitToGodPool && (
                      <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors">
                    Limit Boons To God Pool
                  </span>
                </label>
                
                <div className="flex items-center gap-1.5 ml-0.5">
                  <span className={`text-[9px] font-semibold px-1 py-[0.5px] rounded-sm transition-colors ${activeStandardOlympians.length >= 4 ? 'bg-amber-400/15 text-amber-400 border border-amber-400/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                    {activeStandardOlympians.length}/4
                  </span>

                  {/* Info Button with Stylized Tooltip */}
                  <div className="relative group/tooltip inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-hades-bg-dark border border-white/15 rounded-lg text-[11px] leading-relaxed text-gray-300 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-50">
                      {/* Connector bridge to make hovering steady */}
                      <div className="absolute left-0 right-0 top-full h-2" />
                      <p className="font-sans">
                        Typically, only four Olympian gods (excluding Artemis, Athena, Dionysus, and Hermes) are included in the god pool each night. If checked, once you have boons from four gods, all other gods' boons are filtered out.
                      </p>
                      {/* Triangular pointer */}
                      <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-2 h-2 bg-hades-bg-dark border-r border-b border-white/15 rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed spacer area that doesn't disappear on scroll */}
        <div className="h-6 flex-shrink-0" />

        <div 
          onScroll={handleSidebarScroll}
          className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 transform-gpu"
        >
          <div className="space-y-3 transform-gpu">
            {filteredBoons.map(boon => {
              let isLocked = false;
              const unmetPrerequisites: BoonPrerequisite[] = [];
              if (boon.prerequisites && boon.prerequisites.length > 0) {
                boon.prerequisites.forEach(prereq => {
                  const meets = prereq.any
                    ? prereq.boonIds.some(id => selectedBoonIds.has(id))
                    : prereq.boonIds.every(id => selectedBoonIds.has(id));
                  if (!meets) {
                    isLocked = true;
                    unmetPrerequisites.push(prereq);
                  }
                });
              }

              return (
                <DraggableBoonListItem 
                  key={boon.id} 
                  boon={boon} 
                  onClick={() => activeSlot && selectBoon(boon, activeSlot)}
                  isSelectable={!!activeSlot}
                  isLocked={isLocked}
                  unmetPrerequisites={unmetPrerequisites}
                />
              );
            })}
            {filteredBoons.length === 0 && (
              <div className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-tight">
                No matches found
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
