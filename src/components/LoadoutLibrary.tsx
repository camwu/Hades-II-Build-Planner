import React from 'react';
import { motion } from 'motion/react';
import { Search, X, ChevronDown, ChevronRight, ChevronLeft, Lock, Info } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { WeaponAspect, WeaponHammer, AnimalFamiliar } from '../types';
import { SIDEBAR_WIDTH, BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { WEAPON_ASPECTS, WEAPON_NAMES, WEAPON_ICONS, WEAPON_HAMMERS } from '../data/weaponsData';
import { ANIMAL_FAMILIARS } from '../data/animalFamiliars';
import { FormattedEffectText } from './FormattedEffectText';

interface DraggableAspectCardProps {
  aspect: WeaponAspect;
  isSelected: boolean;
  onClick: () => void;
  activeSlot: string | null;
  key?: any;
}

export function DraggableAspectCard({
  aspect,
  isSelected,
  onClick,
  activeSlot,
}: DraggableAspectCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: aspect.id,
    data: {
      type: 'loadout',
      loadoutType: 'Aspect',
      item: aspect,
    },
  });

  const isSelectable = activeSlot === 'Aspect';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`p-3 rounded-xl border text-left transition-all duration-155 cursor-pointer flex flex-col relative group overflow-hidden touch-none ${
        isDragging
          ? 'opacity-20 pointer-events-none'
          : isSelected
            ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30'
            : isSelectable
              ? 'bg-hades-bg-dark border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:border-emerald-500 hover:bg-hades-bg-dark/95'
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
            <div className="flex items-center gap-1.5">
              <img 
                src={WEAPON_ICONS[aspect.weapon] || "/assets/ui/BoonII.webp"}
                alt={aspect.weapon}
                className="w-3.5 h-3.5 object-contain shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/ui/BoonII.webp";
                }}
              />
              <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                {WEAPON_NAMES[aspect.weapon as any] || aspect.weapon}
              </span>
            </div>
          </div>

          <div className="h-3.5" />
        </div>
      </div>

      <p className="text-[12px] text-gray-400 leading-normal font-medium mt-2">
        <FormattedEffectText text={aspect.mechanics ? `${aspect.description}\n\n${aspect.mechanics}` : aspect.description} />
      </p>

      {/* Selectability Overlay Border */}
      {isSelectable && !isSelected && (
        <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/45 group-hover:border-emerald-400 pointer-events-none transition-colors duration-75 animate-pulse" />
      )}
    </div>
  );
}

interface DraggableHammerCardProps {
  hammer: WeaponHammer;
  isSelected: boolean;
  isEligible: boolean;
  status: { isEligible: boolean; reason: string };
  aspectRestriction: any;
  onClick: () => void;
  activeSlot: string | null;
  key?: any;
}

export function DraggableHammerCard({
  hammer,
  isSelected,
  isEligible,
  status,
  aspectRestriction,
  onClick,
  activeSlot,
}: DraggableHammerCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: hammer.id,
    disabled: !isEligible,
    data: {
      type: 'loadout',
      loadoutType: 'Hammer',
      item: hammer,
    },
  });

  const isSelectable = activeSlot === 'Hammer' && isEligible;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={isEligible ? onClick : undefined}
      className={`p-3 rounded-xl border text-left transition-all duration-155 flex flex-col relative group overflow-hidden touch-none ${
        isDragging
          ? 'opacity-20 pointer-events-none'
          : !isEligible
            ? 'bg-hades-bg-dark/60 border-red-950/45 cursor-not-allowed select-none'
            : isSelected
              ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30 cursor-pointer'
              : isSelectable
                ? 'bg-hades-bg-dark border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:border-emerald-500 hover:bg-hades-bg-dark/95 cursor-pointer'
                : 'bg-hades-bg-dark/80 border-white/10 hover:border-white/20 hover:bg-hades-bg-dark/95 cursor-pointer'
      }`}
    >
      <div className={`flex items-start gap-4 transition-opacity duration-150 ${!isEligible ? 'opacity-50' : ''}`}>
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
            <span className={`text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${
              !isEligible
                ? 'bg-red-950/25 border-red-900/20 text-red-100/50'
                : 'bg-hades-accent/10 border-hades-accent/20 text-hades-accent/80'
            }`}>
              HAMMER
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5">
            <div className="flex items-center gap-1.5">
              <img 
                src={WEAPON_ICONS[hammer.weapon] || "/assets/ui/Daedalus_Hammer.webp"}
                alt={hammer.weapon}
                className="w-3.5 h-3.5 object-contain shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/ui/Daedalus_Hammer.webp";
                }}
              />
              <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                {WEAPON_NAMES[hammer.weapon as any] || hammer.weapon}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {aspectRestriction ? (
              <>
                <img 
                  src={aspectRestriction.icon || WEAPON_ICONS[hammer.weapon] || "/assets/ui/BoonII.webp"}
                  alt={aspectRestriction.name}
                  className="w-3.5 h-3.5 object-contain shrink-0 rounded"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = WEAPON_ICONS[hammer.weapon] || "/assets/ui/BoonII.webp";
                  }}
                />
                <span className="text-[10px] font-display uppercase tracking-wider leading-none text-hades-accent font-semibold truncate max-w-[180px]">
                  Requires: {aspectRestriction.name}
                </span>
              </>
            ) : (
              <div className="opacity-40 flex items-center gap-1.5">
                <span className="text-[10px] font-display text-gray-500 uppercase tracking-wider leading-none">
                  Any Aspect
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={`text-[12px] text-gray-400 leading-normal font-medium mt-2 transition-opacity duration-150 ${!isEligible ? 'opacity-50' : ''}`}>
        <FormattedEffectText text={hammer.description} />
      </p>

      {!isEligible && (
        <div className="mt-2.5 pt-2 border-t border-red-950/45 text-xs font-sans text-gray-400">
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
              <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Requirements:</span>
            </div>
            <div className="text-gray-400 text-xs mb-1 font-medium leading-relaxed normal-case pl-5 -mt-1">
              Requires the following condition:
            </div>
            <div className="flex flex-col gap-1.5 select-none pl-5">
              <div className="flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg border transition-all duration-150 bg-zinc-950/45 border-zinc-900/60 text-gray-400/80">
                <X className="w-3.5 h-3.5 text-red-500/50 flex-shrink-0 mt-[2px]" />
                <span className="text-[11px] font-semibold leading-[18px]">
                  {status.reason}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selectability Overlay Border */}
      {isSelectable && !isSelected && (
        <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/45 group-hover:border-emerald-400 pointer-events-none transition-colors duration-75 animate-pulse" />
      )}
    </div>
  );
}

interface DraggableFamiliarCardProps {
  familiar: AnimalFamiliar;
  isSelected: boolean;
  onClick: () => void;
  activeSlot: string | null;
  key?: any;
}

export function DraggableFamiliarCard({
  familiar,
  isSelected,
  onClick,
  activeSlot,
}: DraggableFamiliarCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: familiar.id,
    data: {
      type: 'loadout',
      loadoutType: 'Familiar',
      item: familiar,
    },
  });

  const isSelectable = activeSlot === 'Familiar';

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`p-3 rounded-xl border text-left transition-all duration-155 cursor-pointer flex flex-col relative group overflow-hidden touch-none ${
        isDragging
          ? 'opacity-20 pointer-events-none'
          : isSelected
            ? 'bg-hades-bg-dark border-hades-accent shadow-[0_0_15px_rgba(224,180,94,0.15)] ring-1 ring-hades-accent/30'
            : isSelectable
              ? 'bg-hades-bg-dark border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.1)] hover:border-emerald-500 hover:bg-hades-bg-dark/95'
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
        <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5 gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-base font-bold normal-case tracking-wide truncate font-sc leading-tight ${isSelected ? 'text-hades-accent' : 'text-hades-text'}`}>
              {familiar.name}, the {familiar.type.charAt(0).toUpperCase() + familiar.type.slice(1)}
            </h4>
            <span className="text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border border-hades-accent/20 text-hades-accent/80 bg-hades-accent/10 flex-shrink-0">
              FAMILIAR
            </span>
          </div>
          {familiar.summary && (
            <p className="text-[11.5px] text-white/50 font-medium leading-relaxed font-sans">
              {familiar.summary}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/5 space-y-2">
        {familiar.skills.map(skill => (
          <div key={skill.id} className="flex items-start gap-3 text-[12px] text-gray-400 leading-normal">
            <div className={`w-5.5 h-5.5 ${BOON_ICON_ROUNDING} overflow-hidden border border-white/10 shrink-0 bg-hades-bg-dark`}>
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

      {/* Selectability Overlay Border */}
      {isSelectable && !isSelected && (
        <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/45 group-hover:border-emerald-400 pointer-events-none transition-colors duration-75 animate-pulse" />
      )}
    </div>
  );
}

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
  activeSlot: string | null;
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
  activeSlot,
}: LoadoutLibraryProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const filterHeaderRef = React.useRef<HTMLDivElement>(null);
  const libraryListContainerRef = React.useRef<HTMLDivElement>(null);

  const [isSearchTooltipActive, setIsSearchTooltipActive] = React.useState<boolean>(false);
  
  // Section expand/collapse states (only one can be expanded at a time)
  const [aspectsExpanded, setAspectsExpanded] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('hades_build_planner_aspects_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [hammersExpanded, setHammersExpanded] = React.useState<boolean>(() => {
    try {
      // If aspects is expanded, hammer must be collapsed
      const aspectsStored = localStorage.getItem('hades_build_planner_aspects_expanded');
      const aspectsActive = aspectsStored !== null ? JSON.parse(aspectsStored) : true;
      if (aspectsActive) return false;

      const stored = localStorage.getItem('hades_build_planner_hammers_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return false;
    }
  });

  const [familiarsExpanded, setFamiliarsExpanded] = React.useState<boolean>(() => {
    try {
      // If aspects or hammers is expanded, familiar must be collapsed
      const aspectsStored = localStorage.getItem('hades_build_planner_aspects_expanded');
      const aspectsActive = aspectsStored !== null ? JSON.parse(aspectsStored) : true;
      if (aspectsActive) return false;

      const hammersStored = localStorage.getItem('hades_build_planner_hammers_expanded');
      const hammersActive = hammersStored !== null ? JSON.parse(hammersStored) : true;
      if (hammersActive) return false;

      const stored = localStorage.getItem('hades_build_planner_familiars_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_aspects_expanded', JSON.stringify(aspectsExpanded));
    } catch {}
  }, [aspectsExpanded]);

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_hammers_expanded', JSON.stringify(hammersExpanded));
    } catch {}
  }, [hammersExpanded]);

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_familiars_expanded', JSON.stringify(familiarsExpanded));
    } catch {}
  }, [familiarsExpanded]);

  React.useEffect(() => {
    if (activeSlot === 'Aspect') {
      setAspectsExpanded(true);
      setHammersExpanded(false);
      setFamiliarsExpanded(false);
    } else if (activeSlot === 'Hammer') {
      setHammersExpanded(true);
      setAspectsExpanded(false);
      setFamiliarsExpanded(false);
    } else if (activeSlot === 'Familiar') {
      setFamiliarsExpanded(true);
      setAspectsExpanded(false);
      setHammersExpanded(false);
    }
  }, [activeSlot]);

  const toggleAspectsExpanded = () => {
    setAspectsExpanded((prev) => {
      const next = !prev;
      if (next) {
        setHammersExpanded(false);
        setFamiliarsExpanded(false);
      }
      return next;
    });
  };

  const toggleHammersExpanded = () => {
    setHammersExpanded((prev) => {
      const next = !prev;
      if (next) {
        setAspectsExpanded(false);
        setFamiliarsExpanded(false);
      }
      return next;
    });
  };

  const toggleFamiliarsExpanded = () => {
    setFamiliarsExpanded((prev) => {
      const next = !prev;
      if (next) {
        setAspectsExpanded(false);
        setHammersExpanded(false);
      }
      return next;
    });
  };

  // Search filtering logic
  const loadoutSearchResults = React.useMemo(() => {
    const normalizeText = (str: string): string => {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    const query = searchTerm.trim();
    const NormalizedQuery = normalizeText(query);

    // 1. Get Matching Aspects
    let matchedAspects = WEAPON_ASPECTS;
    if (NormalizedQuery) {
      matchedAspects = WEAPON_ASPECTS.filter(aspect => 
        normalizeText(aspect.name).includes(NormalizedQuery) ||
        normalizeText(aspect.weapon).includes(NormalizedQuery) ||
        normalizeText(aspect.description).includes(NormalizedQuery) ||
        (aspect.mechanics && normalizeText(aspect.mechanics).includes(NormalizedQuery))
      );
    }

    // 2. Get Matching Hammers
    const allHammers = Object.values(WEAPON_HAMMERS).flat();
    let matchedHammers = allHammers;
    if (NormalizedQuery) {
      matchedHammers = allHammers.filter(hammer => 
        normalizeText(hammer.name).includes(NormalizedQuery) ||
        normalizeText(hammer.weapon).includes(NormalizedQuery) ||
        normalizeText(hammer.description).includes(NormalizedQuery)
      );
    } else if (activeWeapon) {
      // If no query, but there is an active weapon, show all hammers matching active weapon
      matchedHammers = WEAPON_HAMMERS[activeWeapon] || [];
    } else {
      matchedHammers = allHammers;
    }

    // 3. Get Matching Familiars
    let matchedFamiliars = ANIMAL_FAMILIARS;
    if (NormalizedQuery) {
      matchedFamiliars = ANIMAL_FAMILIARS.filter(familiar => 
        normalizeText(familiar.name).includes(NormalizedQuery) ||
        familiar.skills.some(skill => 
          normalizeText(skill.name).includes(NormalizedQuery) ||
          normalizeText(skill.description).includes(NormalizedQuery)
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
          className={`pt-5 px-5 pb-3 border-b border-hades-border-light flex flex-col bg-hades-panel z-30 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}
        >
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-accent/50" />
              <input 
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
                type="text" 
                placeholder="Press / to search..."
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

        {/* Content container for categories under the search header */}
        <div 
          ref={libraryListContainerRef}
          className="flex-1 min-h-0 flex flex-col overflow-hidden bg-hades-bg-dark/20"
        >
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* 1. Weapon Aspects Group */}
            {loadoutSearchResults.aspects.length > 0 && (
              <motion.div 
                layout="position"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col min-h-0 flex-shrink-0 data-[expanded=true]:flex-1" 
                data-expanded={aspectsExpanded}
              >
                <div 
                  className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative"
                >
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={toggleAspectsExpanded}
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

                <div 
                  style={{ 
                    gridTemplateRows: aspectsExpanded ? '1fr' : '0fr',
                    display: 'grid'
                  }}
                  className="transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto data-[expanded=true]:flex-1 data-[expanded=false]:flex-none min-h-0"
                  data-expanded={aspectsExpanded}
                >
                  <div className="overflow-hidden flex flex-col h-full min-h-0">
                    <div 
                      onScroll={handleSidebarScroll}
                      className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-3 pb-5"
                    >
                      <div className="space-y-3">
                        {loadoutSearchResults.aspects.map(aspect => {
                          const isSelected = activeAspect === aspect.id;
                          return (
                            <DraggableAspectCard
                              key={aspect.id}
                              aspect={aspect}
                              isSelected={isSelected}
                              activeSlot={activeSlot}
                              onClick={() => {
                                setActiveWeapon(aspect.weapon);
                                setActiveAspect(aspect.id);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Daedalus Hammers Group */}
            {loadoutSearchResults.hammers.length > 0 && (
              <motion.div 
                layout="position"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col min-h-0 flex-shrink-0 data-[expanded=true]:flex-1" 
                data-expanded={hammersExpanded}
              >
                <div 
                  className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative"
                >
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={toggleHammersExpanded}
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

                <div 
                  style={{ 
                    gridTemplateRows: hammersExpanded ? '1fr' : '0fr',
                    display: 'grid'
                  }}
                  className="transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto data-[expanded=true]:flex-1 data-[expanded=false]:flex-none min-h-0"
                  data-expanded={hammersExpanded}
                >
                  <div className="overflow-hidden flex flex-col h-full min-h-0">
                    <div 
                      onScroll={handleSidebarScroll}
                      className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-3 pb-5"
                    >
                      <div className="space-y-3">
                      {loadoutSearchResults.hammers.map(hammer => {
                        const isSelected = selectedHammers.includes(hammer.id);
                        const status = getHammerStatus(hammer);
                        const isEligible = status.isEligible;
                        const aspectRestriction = hammer.onlyForAspect
                          ? WEAPON_ASPECTS.find(a => a.id === hammer.onlyForAspect)
                          : null;

                        return (
                          <DraggableHammerCard
                            key={hammer.id}
                            hammer={hammer}
                            isSelected={isSelected}
                            isEligible={isEligible}
                            status={status}
                            aspectRestriction={aspectRestriction}
                            activeSlot={activeSlot}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedHammers(prev => prev.filter(id => id !== hammer.id));
                              } else {
                                setSelectedHammers(prev => [...prev, hammer.id]);
                              }
                            }}
                          />
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}

            {/* 3. Animal Familiars Group */}
            {loadoutSearchResults.familiars.length > 0 && (
              <motion.div 
                layout="position"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col min-h-0 flex-shrink-0 data-[expanded=true]:flex-1" 
                data-expanded={familiarsExpanded}
              >
                <div 
                  className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative"
                >
                  <div className="flex items-center justify-between pl-5 pr-5 select-none">
                    <button
                      onClick={toggleFamiliarsExpanded}
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

                <div 
                  style={{ 
                    gridTemplateRows: familiarsExpanded ? '1fr' : '0fr',
                    display: 'grid'
                  }}
                  className="transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto data-[expanded=true]:flex-1 data-[expanded=false]:flex-none min-h-0"
                  data-expanded={familiarsExpanded}
                >
                  <div className="overflow-hidden flex flex-col h-full min-h-0">
                    <div 
                      onScroll={handleSidebarScroll}
                      className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-3 pb-5"
                    >
                      <div className="space-y-3">
                      {loadoutSearchResults.familiars.map(familiar => {
                        const isSelected = activeFamiliar === familiar.id;
                        return (
                          <DraggableFamiliarCard
                            key={familiar.id}
                            familiar={familiar}
                            isSelected={isSelected}
                            activeSlot={activeSlot}
                            onClick={() => {
                              if (isSelected) {
                                  setActiveFamiliar('none');
                              } else {
                                  setActiveFamiliar(familiar.id);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

            {loadoutSearchResults.aspects.length === 0 && 
             loadoutSearchResults.hammers.length === 0 && 
             loadoutSearchResults.familiars.length === 0 && (
              <div className="text-center text-gray-400 font-display text-xs uppercase tracking-tight py-12 px-5">
                No matching weapons, upgrades, or familiars found
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
