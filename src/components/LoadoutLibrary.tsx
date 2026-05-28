import React from 'react';
import { motion } from 'motion/react';
import { Search, X, ChevronDown, ChevronRight, ChevronLeft, Lock, Info } from 'lucide-react';
import { WeaponAspect, WeaponHammer } from '../types';
import { SIDEBAR_WIDTH, BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { WEAPON_ASPECTS, WEAPON_NAMES, WEAPON_ICONS, WEAPON_HAMMERS } from '../data/weaponsData';
import { ANIMAL_FAMILIARS } from '../data/animalFamiliars';
import { FormattedEffectText } from './FormattedEffectText';

interface LoadoutLibraryProps {
  isPanelCollapsed: boolean;
  setIsPanelCollapsed: (val: boolean) => void;
  isButtonHovered: boolean;
  setIsButtonHovered: (val: boolean) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeWeapon: string | null;
  setActiveWeapon: (weapon: string | null) => void;
  activeAspect: string | null;
  setActiveAspect: (aspectId: string | null) => void;
  selectedHammers: string[];
  setSelectedHammers: React.Dispatch<React.SetStateAction<string[]>>;
  activeFamiliar: string;
  setActiveFamiliar: (fa: string) => void;
  isScrolled: boolean;
  handleSidebarScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function LoadoutLibrary({
  isPanelCollapsed,
  setIsPanelCollapsed,
  isButtonHovered,
  setIsButtonHovered,
  searchTerm,
  setSearchTerm,
  activeWeapon,
  setActiveWeapon,
  activeAspect,
  setActiveAspect,
  selectedHammers,
  setSelectedHammers,
  activeFamiliar,
  setActiveFamiliar,
  isScrolled,
  handleSidebarScroll,
  searchInputRef,
}: LoadoutLibraryProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const filterHeaderRef = React.useRef<HTMLDivElement>(null);
  const libraryListContainerRef = React.useRef<HTMLDivElement>(null);

  const [isSearchTooltipActive, setIsSearchTooltipActive] = React.useState<boolean>(false);
  
  // Section expand/collapse states (each is top-level sub-group under the header)
  const [aspectsExpanded, setAspectsExpanded] = React.useState<boolean>(true);
  const [hammersExpanded, setHammersExpanded] = React.useState<boolean>(true);
  const [familiarsExpanded, setFamiliarsExpanded] = React.useState<boolean>(true);

  // Search filtering logic
  const loadoutSearchResults = React.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    // 1. Get Matching Aspects
    let matchedAspects = WEAPON_ASPECTS;
    if (query) {
      matchedAspects = WEAPON_ASPECTS.filter(aspect => 
        aspect.name.toLowerCase().includes(query) ||
        aspect.weapon.toLowerCase().includes(query) ||
        aspect.description.toLowerCase().includes(query) ||
        (aspect.mechanics && aspect.mechanics.toLowerCase().includes(query))
      );
    }

    // 2. Get Matching Hammers
    const allHammers = Object.values(WEAPON_HAMMERS).flat();
    let matchedHammers = allHammers;
    if (query) {
      matchedHammers = allHammers.filter(hammer => 
        hammer.name.toLowerCase().includes(query) ||
        hammer.weapon.toLowerCase().includes(query) ||
        hammer.description.toLowerCase().includes(query)
      );
    } else if (activeWeapon) {
      // If no query, but there is an active weapon, show all hammers matching active weapon
      matchedHammers = WEAPON_HAMMERS[activeWeapon] || [];
    } else {
      matchedHammers = allHammers;
    }

    // 3. Get Matching Familiars
    let matchedFamiliars = ANIMAL_FAMILIARS;
    if (query) {
      matchedFamiliars = ANIMAL_FAMILIARS.filter(familiar => 
        familiar.name.toLowerCase().includes(query) ||
        familiar.skills.some(skill => 
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query)
        )
      );
    }

    return {
      aspects: matchedAspects,
      hammers: matchedHammers,
      familiars: matchedFamiliars,
    };
  }, [searchTerm, activeWeapon]);

  const getHammerStatus = React.useCallback((hammer: WeaponHammer) => {
    if (!activeWeapon) {
      return { isEligible: false, reason: "Requires selecting a weapon aspect first" };
    }
    if (hammer.weapon !== activeWeapon) {
      return { isEligible: false, reason: `Requires equipped ${hammer.weapon}` };
    }
    if (hammer.onlyForAspect && hammer.onlyForAspect !== activeAspect) {
      const aspName = WEAPON_ASPECTS.find(a => a.id === hammer.onlyForAspect)?.name || hammer.onlyForAspect;
      return { isEligible: false, reason: `Requires Aspect: ${aspName}` };
    }
    if (hammer.incompatibleAspects && activeAspect && hammer.incompatibleAspects.includes(activeAspect)) {
      const aspName = WEAPON_ASPECTS.find(a => a.id === activeAspect)?.name || activeAspect;
      return { isEligible: false, reason: `Incompatible with equipped ${aspName}` };
    }
    
    // Check other selected hammers
    const allHammersForWeapon = WEAPON_HAMMERS[activeWeapon] || [];
    const selectedIncompatible = selectedHammers.find(selId => {
      const selHammer = allHammersForWeapon.find(h => h.id === selId);
      if (selHammer?.incompatibleHammers?.includes(hammer.id)) return true;
      if (hammer.incompatibleHammers?.includes(selId)) return true;
      return false;
    });

    if (selectedIncompatible) {
      const incHammerName = allHammersForWeapon.find(h => h.id === selectedIncompatible)?.name || selectedIncompatible;
      return { isEligible: false, reason: `Incompatible with selected ${incHammerName}` };
    }

    return { isEligible: true, reason: "" };
  }, [activeWeapon, activeAspect, selectedHammers]);

  const totalCount = loadoutSearchResults.aspects.length + loadoutSearchResults.hammers.length + loadoutSearchResults.familiars.length;

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isPanelCollapsed 
          ? (isButtonHovered ? 24 : 0) 
          : SIDEBAR_WIDTH,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      className="border-r border-hades-border bg-hades-panel flex flex-col z-40 relative flex-shrink-0"
    >
      {/* Toggle Button - High contrast background and accent border */}
      <button 
        onClick={() => {
          setIsPanelCollapsed(!isPanelCollapsed);
          setIsButtonHovered(false);
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`absolute top-[40px] ${isSearchTooltipActive ? 'z-10' : 'z-50'} w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
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

      {/* Sidebar Inner Content Container */}
      <div 
        ref={sidebarRef}
        style={{ width: SIDEBAR_WIDTH }}
        className={`h-full flex flex-col overflow-visible will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
      >
        {/* Search Header Container (Frozen) */}
        <div 
          ref={filterHeaderRef}
          className={`pt-5 px-5 pb-3 border-b border-hades-border-light flex flex-col bg-hades-panel z-20 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}
        >
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-accent/50" />
              <input 
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
                type="text" 
                placeholder="Press / to search weapons, aspects & upgrades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-16 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-hades-text/30 hover:text-hades-red transition-colors p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                
                <div 
                  className="relative group/tooltip inline-flex items-center"
                  onMouseEnter={() => setIsSearchTooltipActive(true)}
                  onMouseLeave={() => setIsSearchTooltipActive(false)}
                >
                  <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-[-10px] top-full mt-3.5 w-80 bg-hades-bg-dark border border-hades-border-light rounded-lg p-3.5 shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                    {/* Connector bridge to make hovering steady */}
                    <div className="absolute left-0 right-0 bottom-full h-3.5" />
                    {/* Triangular pointer pointing up */}
                    <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                    
                    <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                      Armament search info
                    </p>
                    <p className="text-[11px] font-sans text-hades-text/85 mb-2.5 leading-snug">
                      Filter armaments dynamically by name, description, weapon type, or Daedalus Hammer upgrade effects.
                    </p>
                    
                    <div className="pt-2 border-t border-hades-border-light/25">
                      <p className="text-[10px] font-semibold text-hades-accent mb-2 uppercase tracking-wider font-display">
                        Search Operators
                      </p>
                      
                      <table className="w-full text-left border-collapse text-[10px] text-hades-text/85">
                        <thead>
                          <tr className="border-b border-hades-border-light/15 text-[8.5px] uppercase font-display text-hades-text/50 tracking-wider">
                            <th className="py-1 pb-1.5 font-semibold w-[65px]">Operator</th>
                            <th className="py-1 pb-1.5 font-semibold pl-2">Description & Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hades-border-light/10">
                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">" "</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Exact phrase match</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80"><span className="text-hades-accent font-semibold">"</span>aspect of melinoe<span className="text-hades-accent font-semibold">"</span></span>
                              </p>
                            </td>
                          </tr>

                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">AND</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Matches both terms (capitalized)</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80">staff <span className="text-hades-accent font-semibold">AND</span> hammer</span>
                              </p>
                            </td>
                          </tr>

                           <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">OR / |</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Matches either term (capitalized)</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80">melinoe <span className="text-hades-accent font-semibold">OR</span> artemis</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable container for the categories directly under the search header */}
        <div 
          ref={libraryListContainerRef}
          onScroll={handleSidebarScroll}
          className="flex-1 overflow-y-auto custom-scrollbar bg-hades-bg-dark/15"
        >
          <div className="flex flex-col transform-gpu">
            {/* 1. Weapon Aspects Group */}
            {loadoutSearchResults.aspects.length > 0 && (
              <div className="flex flex-col">
                <div className="border-b border-hades-border-light py-3 bg-hades-bg-dark/50 flex flex-col relative sticky top-0 z-10 backdrop-blur-sm">
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={() => setAspectsExpanded(!aspectsExpanded)}
                      className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center cursor-pointer hover:text-hades-accent/80 transition-colors select-none text-left w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src="/assets/ui/NocturnalArmsIcon.webp" 
                          alt="Weapon Aspects" 
                          className="w-4.5 h-4.5 object-contain shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        WEAPON ASPECTS ({loadoutSearchResults.aspects.length})
                      </div>
                      {aspectsExpanded ? (
                        <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                <div className={`transition-all duration-200 px-5 ${aspectsExpanded ? 'pt-3 pb-5' : 'py-0 h-0 overflow-hidden'}`}>
                  {aspectsExpanded && (
                    <div className="space-y-3">
                      {loadoutSearchResults.aspects.map(aspect => {
                        const isSelected = activeAspect === aspect.id;
                        return (
                          <div
                            key={aspect.id}
                            onClick={() => {
                              setActiveWeapon(aspect.weapon);
                              setActiveAspect(aspect.id);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col relative group overflow-hidden ${
                              isSelected
                                ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30'
                                : 'bg-hades-bg-dark/80 border-white/10 hover:border-white/20 hover:bg-hades-bg-dark/95'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING}`}>
                                <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
                                  <img
                                    src={aspect.icon || WEAPON_ICONS[aspect.weapon] || "/assets/ui/BoonII.webp"}
                                    alt={aspect.name}
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = WEAPON_ICONS[aspect.weapon] || "/assets/ui/BoonII.webp";
                                    }}
                                  />
                                  <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-white/10 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 h-14 flex flex-col justify-between py-0.5">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-base font-bold normal-case tracking-wide truncate font-sc leading-tight ${isSelected ? 'text-hades-accent' : 'text-hades-text'}`}>
                                    {aspect.name}
                                  </h4>
                                  <span className="text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border border-hades-accent/20 text-hades-accent/80 bg-hades-accent/10 flex-shrink-0">
                                    ASPECT
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-2.5">
                                  <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                                    {WEAPON_NAMES[aspect.weapon] || aspect.weapon}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-[12px] text-gray-400 leading-normal font-medium mt-2">
                              <FormattedEffectText text={aspect.mechanics ? `${aspect.description}\n\n${aspect.mechanics}` : aspect.description} />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Daedalus Hammers Group */}
            {loadoutSearchResults.hammers.length > 0 && (
              <div className="flex flex-col border-t border-hades-border-light">
                <div className="border-b border-hades-border-light py-3 bg-hades-bg-dark/50 flex flex-col relative sticky top-0 z-10 backdrop-blur-sm">
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={() => setHammersExpanded(!hammersExpanded)}
                      className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center cursor-pointer hover:text-hades-accent/80 transition-colors select-none text-left w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src="/assets/ui/Daedalus_Hammer.webp" 
                          alt="Daedalus Hammers" 
                          className="w-4.5 h-4.5 object-contain shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        DAEDALUS HAMMERS ({loadoutSearchResults.hammers.length})
                      </div>
                      {hammersExpanded ? (
                        <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                <div className={`transition-all duration-200 px-5 ${hammersExpanded ? 'pt-3 pb-5' : 'py-0 h-0 overflow-hidden'}`}>
                  {hammersExpanded && (
                    <div className="space-y-3">
                      {loadoutSearchResults.hammers.map(hammer => {
                        const isSelected = selectedHammers.includes(hammer.id);
                        const status = getHammerStatus(hammer);
                        const isEligible = status.isEligible;

                        return (
                          <div
                            key={hammer.id}
                            onClick={() => {
                              if (!isEligible) return;
                              if (isSelected) {
                                setSelectedHammers(prev => prev.filter(id => id !== hammer.id));
                              } else {
                                setSelectedHammers(prev => [...prev, hammer.id]);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col relative group overflow-hidden ${
                              !isEligible
                                ? 'opacity-40 bg-hades-bg-dark/60 border-red-950/45 cursor-not-allowed select-none'
                                : isSelected
                                  ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30 cursor-pointer'
                                  : 'bg-hades-bg-dark/80 border-white/10 hover:border-white/20 hover:bg-hades-bg-dark/95 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING}`}>
                                <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
                                  <img
                                    src={hammer.icon || "/assets/ui/Daedalus_Hammer.webp"}
                                    alt={hammer.name}
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/assets/ui/Daedalus_Hammer.webp";
                                    }}
                                  />
                                  <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-white/10 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 h-14 flex flex-col justify-between py-0.5">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-base font-bold normal-case tracking-wide truncate font-sc leading-tight ${isSelected ? 'text-hades-accent' : 'text-hades-text'}`}>
                                    {hammer.name}
                                  </h4>
                                  <span className="text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border border-hades-accent/20 text-hades-accent/80 bg-hades-accent/10 flex-shrink-0">
                                    HAMMER
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-2.5">
                                  <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                                    {WEAPON_NAMES[hammer.weapon] || hammer.weapon}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-[12px] text-gray-400 leading-normal font-medium mt-2">
                              <FormattedEffectText text={hammer.description} />
                            </p>

                            {!isEligible && (
                              <div className="mt-2.5 pt-2 border-t border-red-950/45 flex items-center gap-1.5 text-[9.5px] font-mono uppercase font-bold text-hades-red">
                                <Lock className="w-3 h-3 text-hades-red shrink-0" />
                                <span>{status.reason}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Animal Familiars Group */}
            {loadoutSearchResults.familiars.length > 0 && (
              <div className="flex flex-col border-t border-hades-border-light">
                <div className="border-b border-hades-border-light py-3 bg-hades-bg-dark/50 flex flex-col relative sticky top-0 z-10 backdrop-blur-sm">
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={() => setFamiliarsExpanded(!familiarsExpanded)}
                      className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center cursor-pointer hover:text-hades-accent/80 transition-colors select-none text-left w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src="/assets/ui/Icon-Familiars.webp" 
                          alt="Animal Familiars" 
                          className="w-4.5 h-4.5 object-contain shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        ANIMAL FAMILIARS ({loadoutSearchResults.familiars.length})
                      </div>
                      {familiarsExpanded ? (
                        <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                <div className={`transition-all duration-200 px-5 ${familiarsExpanded ? 'pt-3 pb-5' : 'py-0 h-0 overflow-hidden'}`}>
                  {familiarsExpanded && (
                    <div className="space-y-3">
                      {loadoutSearchResults.familiars.map(familiar => {
                        const isSelected = activeFamiliar === familiar.id;
                        return (
                          <div
                            key={familiar.id}
                            onClick={() => {
                              if (isSelected) {
                                  setActiveFamiliar('none');
                              } else {
                                  setActiveFamiliar(familiar.id);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col relative group overflow-hidden ${
                              isSelected
                                ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30'
                                : 'bg-hades-bg-dark/80 border-white/10 hover:border-white/20 hover:bg-hades-bg-dark/95'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING}`}>
                                <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
                                  <img
                                    src={familiar.icon || "/assets/ui/Icon-Familiars.webp"}
                                    alt={familiar.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/assets/ui/Icon-Familiars.webp";
                                    }}
                                  />
                                  <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-white/10 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 h-14 flex flex-col justify-between py-0.5">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-base font-bold normal-case tracking-wide truncate font-sc leading-tight ${isSelected ? 'text-hades-accent' : 'text-hades-text'}`}>
                                    {familiar.name}
                                  </h4>
                                  <span className="text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border border-hades-accent/20 text-hades-accent/80 bg-hades-accent/10 flex-shrink-0">
                                    FAMILIAR
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-2.5">
                                  <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                                    ANIMAL COMPANION
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-white/5 space-y-2">
                              {familiar.skills.map(skill => (
                                <div key={skill.id} className="flex items-start gap-3 text-[12px] text-gray-400 leading-normal">
                                  <div className="w-5.5 h-5.5 rounded-full overflow-hidden border border-white/10 shrink-0 bg-hades-bg-dark">
                                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-hades-accent font-bold uppercase tracking-wider text-[11px] block leading-normal mb-0.5">
                                      {skill.name}
                                    </span>
                                    <span className="text-gray-400 text-[12px] leading-normal font-medium">
                                      <FormattedEffectText text={skill.description} />
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {loadoutSearchResults.aspects.length === 0 && 
             loadoutSearchResults.hammers.length === 0 && 
             loadoutSearchResults.familiars.length === 0 && (
              <div className="text-center text-gray-400 font-display text-xs uppercase tracking-tight py-12 px-5">
                No matching weapons, upgrades, or companions found
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
