import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Lock, Sparkles, ChevronRight, RefreshCw, ChevronUp } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { WEAPON_ASPECTS, WEAPON_NAMES, WEAPON_ICONS, WEAPON_HAMMERS } from '../data/weaponsData';
import { ANIMAL_FAMILIARS } from '../data/animalFamiliars';
import { WeaponAspect, WeaponHammer, AnimalFamiliar, AnimalFamiliarSkill } from '../types';
import { FormattedEffectText } from './FormattedEffectText';
import { 
  BOON_ICON_ROUNDING, 
  BOON_BORDER_WIDTH,
  SLOT_COLLAPSED_WIDTH,
  SLOT_EXPANDED_WIDTH 
} from '../constants';

interface ActiveAspectCardProps {
  aspect: WeaponAspect;
  setActiveWeapon: (weapon: string | null) => void;
  setActiveAspect: (aspectId: string | null) => void;
  setSelectedHammers: React.Dispatch<React.SetStateAction<string[]>>;
  isActive: boolean;
}

export function ActiveAspectCard({
  aspect,
  setActiveWeapon,
  setActiveAspect,
  setSelectedHammers,
  isActive
}: ActiveAspectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative" style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}>
      <div 
        className="group absolute top-0 left-0 transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isHovered ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 ${
            isHovered ? 'bg-hades-bg-dark/40 rounded-2xl' : 'pointer-events-auto'
          }`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2x" 
              />
            )}
          </AnimatePresence>

          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className="relative flex-shrink-0 flex items-center justify-center p-0"
          >
            {/* Always mounted synchronized pulse layers */}
            <div
              className={`absolute inset-0 rounded-[28%] bg-emerald-950/30 ring-[3px] ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.8)] animate-ring-pulse z-20 pointer-events-none transition-opacity duration-200 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden bg-hades-bg-main p-2 z-10`}>
              <img 
                src={aspect.icon} 
                alt={aspect.name} 
                className="w-full h-full object-contain relative z-10" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const wIcon = WEAPON_ICONS[aspect.weapon] || '/assets/ui/Icon-Olympian.webp';
                  e.currentTarget.src = wIcon;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-hades-accent/40 ${BOON_ICON_ROUNDING} pointer-events-none z-20`} />
            </div>
          </div>

          <div className={`flex-1 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                    {aspect.name}
                  </h4>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setActiveWeapon(null);
                      setActiveAspect(null);
                      setSelectedHammers([]);
                    }}
                    className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[17px] w-[17px] flex-shrink-0 cursor-pointer animate-fade-in"
                    title="Clear Weapon Aspect"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono mb-1.5">{aspect.weapon}</span>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal">
                  <FormattedEffectText text={aspect.description} />
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface ActiveHammerCardProps {
  hammer: WeaponHammer;
  onRemove: () => void;
  isActive: boolean;
}

export function ActiveHammerCard({
  hammer,
  onRemove,
  isActive
}: ActiveHammerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative" style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}>
      <div 
        className="group absolute top-0 left-0 transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isHovered ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 ${
            isHovered ? 'bg-hades-bg-dark/40 rounded-2xl' : 'pointer-events-auto'
          }`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2xl" 
              />
            )}
          </AnimatePresence>

          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className="relative flex-shrink-0 flex items-center justify-center p-0"
          >
            {/* Always mounted synchronized pulse layers */}
            <div
              className={`absolute inset-0 rounded-[28%] bg-emerald-950/30 ring-[3px] ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.8)] animate-ring-pulse z-20 pointer-events-none transition-opacity duration-200 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden bg-hades-bg-main p-2 z-10`}>
              <img 
                src={hammer.icon} 
                alt={hammer.name} 
                className="w-full h-full object-contain relative z-10" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/assets/ui/Icon-Olympian.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-hades-accent/40 ${BOON_ICON_ROUNDING} pointer-events-none z-20`} />
            </div>
          </div>

          <div className={`flex-1 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                    {hammer.name}
                  </h4>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[17px] w-[17px] flex-shrink-0 cursor-pointer animate-fade-in"
                    title="Remove Hammer Upgrade"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono mb-1.5">Daedalus Hammer Upgrade</span>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal font-sans">
                  <FormattedEffectText text={hammer.description} />
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface ActiveFamiliarCardProps {
  familiar: AnimalFamiliar;
  setActiveFamiliar: (familiarId: string) => void;
  isActive: boolean;
  isOver: boolean;
}

export function ActiveFamiliarCard({
  familiar,
  setActiveFamiliar,
  isActive,
  isOver
}: ActiveFamiliarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const showPulse = isActive || isOver;

  return (
    <div className="relative" style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}>
      <div 
        className="group absolute top-0 left-0 transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isHovered ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 ${
            isHovered ? 'bg-hades-bg-dark/40 rounded-2xl' : 'pointer-events-auto'
          }`}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2xl" 
              />
            )}
          </AnimatePresence>

          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className="relative flex-shrink-0 flex items-center justify-center p-0"
          >
            {/* Always mounted synchronized pulse layers */}
            <div
              className={`absolute inset-0 rounded-[28%] bg-emerald-950/30 ring-[3px] ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.8)] animate-ring-pulse z-20 pointer-events-none transition-opacity duration-200 ${
                showPulse ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden bg-hades-bg-main z-10`}>
              <div className={`absolute inset-0 ${BOON_ICON_ROUNDING} overflow-hidden`}>
                <img 
                  src={familiar.icon} 
                  alt={familiar.name} 
                  className="w-full h-full object-cover relative z-10" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/ui/Icon-Olympian.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              </div>
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-emerald-500/50 ${BOON_ICON_ROUNDING} pointer-events-none z-20`} />
            </div>
          </div>

          <div className={`flex-1 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                    {familiar.name}
                  </h4>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setActiveFamiliar('none');
                    }}
                    className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[17px] w-[17px] flex-shrink-0 cursor-pointer animate-fade-in"
                    title="Dismiss Familiar"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono mb-1.5">Animal Familiar</span>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal font-sans">
                  {familiar.summary ? `${familiar.summary}.` : "Your animal familiar is active."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface LoadoutTabProps {
  activeWeapon: string | null;
  setActiveWeapon: (weapon: string | null) => void;
  activeAspect: string | null;
  setActiveAspect: (aspectId: string | null) => void;
  selectedHammers: string[];
  setSelectedHammers: React.Dispatch<React.SetStateAction<string[]>>;
  activeFamiliar: string;
  setActiveFamiliar: (familiarId: string) => void;
  activeSlot: string | null;
  toggleActiveSlot: (slotId: string) => void;
}

export function LoadoutTab({
  activeWeapon,
  setActiveWeapon,
  activeAspect,
  setActiveAspect,
  selectedHammers,
  setSelectedHammers,
  activeFamiliar,
  setActiveFamiliar,
  activeSlot,
  toggleActiveSlot,
}: LoadoutTabProps) {
  const { setNodeRef: setAspectDropRef, isOver: isAspectOver } = useDroppable({
    id: 'loadout-slot-Aspect',
  });

  const { setNodeRef: setHammerDropRef, isOver: isHammerOver } = useDroppable({
    id: 'loadout-slot-Hammer',
  });

  const { setNodeRef: setFamiliarDropRef, isOver: isFamiliarOver } = useDroppable({
    id: 'loadout-slot-Familiar',
  });
  
  // Find active aspect object
  const activeAspectObj = useMemo(() => {
    if (!activeAspect) return null;
    return WEAPON_ASPECTS.find(a => a.id === activeAspect) || null;
  }, [activeAspect]);

  // Hammer selections logic
  const handleRemoveHammer = (hammerId: string) => {
    setSelectedHammers(prev => prev.filter(id => id !== hammerId));
  };

  // Compute eligible hammers for the active aspect and currently selected hammers
  const eligibleHammers = useMemo(() => {
    if (!activeWeapon) return [];
    const allHammersForWeapon = WEAPON_HAMMERS[activeWeapon] || [];
    
    return allHammersForWeapon.filter(hammer => {
      // 1. Exclude already selected hammers
      if (selectedHammers.includes(hammer.id)) return false;

      // 2. Filter by Aspect restriction (onlyForAspect)
      if (hammer.onlyForAspect && hammer.onlyForAspect !== activeAspect) {
        return false;
      }

      // 3. Filter by Aspect incompatibility
      if (hammer.incompatibleAspects && activeAspect && hammer.incompatibleAspects.includes(activeAspect)) {
        return false;
      }

      // 4. Filter by other selected hammers' incompatibilities
      const hasIncompatibleHammerSelected = selectedHammers.some(selId => {
        const selHammer = allHammersForWeapon.find(h => h.id === selId);
        // Check if previously selected hammer excludes current hammer
        if (selHammer?.incompatibleHammers?.includes(hammer.id)) return true;
        // Check if current hammer excludes previously selected hammer
        if (hammer.incompatibleHammers?.includes(selId)) return true;
        return false;
      });

      if (hasIncompatibleHammerSelected) return false;

      return true;
    });
  }, [activeWeapon, activeAspect, selectedHammers]);

  // Familiars details
  const activeFamiliarObj = useMemo(() => {
    if (activeFamiliar === 'none') return null;
    return ANIMAL_FAMILIARS.find(f => f.id === activeFamiliar) || null;
  }, [activeFamiliar]);


  // Render a single familiar skill card
  const renderSkillCard = (skill: AnimalFamiliarSkill) => {
    return (
      <div 
        key={skill.id}
        className="w-[280px] bg-hades-bg-dark/50 border border-hades-border-light/40 rounded-xl p-4 flex flex-col items-start text-left relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-[2px] w-full bg-gradient-to-r from-transparent via-hades-accent/10 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 w-full mb-2.5">
          <div className="w-10 h-10 rounded-lg bg-hades-bg-dark border border-hades-border-light/60 p-1 flex-shrink-0 relative overflow-hidden">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-full h-full object-contain relative z-10"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/assets/ui/Icon-Olympian.webp';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-gray-200 truncate font-display tracking-wide uppercase">{skill.name}</h5>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
          {skill.description ? (
            <FormattedEffectText text={skill.description} />
          ) : (
            'Familiar capability active during encounters.'
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="border border-hades-border rounded-xl p-6 md:p-8 bg-hades-panel shadow-2xl relative min-h-[440px] flex flex-col gap-8">
      
      {/* Container header subtle info */}
      <div className="flex items-center justify-between border-b border-hades-border-light/40 pb-4">
        <div>
          <h4 className="text-sm font-semibold text-hades-accent uppercase tracking-widest font-display">Nocturnal Tools & Loadout</h4>
          <p className="text-xs text-white/40 mt-1">Configure your active weapon aspect, Daedalus hammers, and animal familiar skills.</p>
        </div>
        {activeWeapon && (
          <button 
            onClick={() => {
              setActiveWeapon(null);
              setActiveAspect(null);
              setSelectedHammers([]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hades-red/20 hover:border-hades-red/40 bg-hades-red/5 hover:bg-hades-red/10 text-[10px] text-hades-red font-display uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Clear Weapon Loadout
          </button>
        )}
      </div>

      <div className="flex flex-col gap-10">
        
        {/* ROW 1: WEAPON */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono font-medium text-hades-accent/50 uppercase tracking-widest">Row I: Active Weapon & Aspects</span>
          
          <div className="flex flex-wrap items-center gap-6">
            
            {/* Core Weapon Aspect Slot */}
            {activeAspectObj ? (
              <div 
                ref={setAspectDropRef}
                onClick={() => toggleActiveSlot('Aspect')}
                className="relative"
                style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
              >
                <ActiveAspectCard 
                  aspect={activeAspectObj} 
                  setActiveWeapon={setActiveWeapon}
                  setActiveAspect={setActiveAspect}
                  setSelectedHammers={setSelectedHammers}
                  isActive={activeSlot === 'Aspect' || isAspectOver}
                />
              </div>
            ) : (
              <div 
                ref={setAspectDropRef}
                onClick={() => toggleActiveSlot('Aspect')}
                className={`w-[84px] h-[84px] bg-hades-bg-dark/80 border rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-md shrink-0 select-none cursor-pointer group transition-all duration-200 relative ${
                  activeSlot === 'Aspect' || isAspectOver
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)] bg-emerald-950/10'
                    : 'border-white/10 hover:border-hades-accent/40'
                }`}
              >
                {/* Synchronized green pulse layer */}
                <div
                  className={`absolute inset-0 rounded-[inherit] bg-emerald-950/20 ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 pointer-events-none transition-opacity duration-200 ${
                    activeSlot === 'Aspect' || isAspectOver ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-1 flex flex-col items-center justify-center border border-white/5 rounded-[inherit] z-30">
                  <Plus className={`w-5 h-5 transition-colors duration-200 group-hover:scale-110 ${
                    activeSlot === 'Aspect' || isAspectOver ? 'text-emerald-400' : 'text-hades-accent'
                  }`} />
                  <span className={`text-[8.5px] font-display uppercase tracking-widest font-bold mt-0.5 ${
                    activeSlot === 'Aspect' || isAspectOver ? 'text-emerald-400' : 'text-hades-accent/80'
                  }`}>Aspect</span>
                </div>
              </div>
            )}

            {/* Separator Line */}
            <div className="w-[1.5px] h-12 bg-hades-border-light/40 flex-shrink-0 self-center" />

            {/* Hammer Growth Slots */}
            <div className="flex-1 flex flex-wrap items-center gap-4">
              {/* Render Selected Hammers */}
              {selectedHammers.map((hammerId) => {
                if (!activeWeapon) return null;
                const hammer = (WEAPON_HAMMERS[activeWeapon] || []).find(h => h.id === hammerId);
                if (!hammer) return null;

                return (
                  <div 
                    key={hammerId}
                    className="relative"
                    style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
                  >
                    <ActiveHammerCard 
                      hammer={hammer}
                      onRemove={() => handleRemoveHammer(hammerId)}
                      isActive={activeSlot === 'Hammer' || isHammerOver}
                    />
                  </div>
                );
              })}

              {/* Next Grow Hammer Selection Slot */}
              {activeWeapon ? (
                eligibleHammers.length > 0 ? (
                  <div 
                    ref={setHammerDropRef}
                    onClick={() => toggleActiveSlot('Hammer')}
                    className={`w-[84px] h-[84px] bg-hades-bg-dark/80 border rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-md shrink-0 select-none cursor-pointer group transition-all duration-200 relative ${
                      activeSlot === 'Hammer' || isHammerOver
                        ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)] bg-emerald-950/10'
                        : 'border-white/10 hover:border-hades-accent/40'
                    }`}
                  >
                    {/* Synchronized green pulse layer */}
                    <div
                      className={`absolute inset-0 rounded-[inherit] bg-emerald-950/20 ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 pointer-events-none transition-opacity duration-200 ${
                        activeSlot === 'Hammer' || isHammerOver ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute inset-1 flex flex-col items-center justify-center border border-white/5 rounded-[inherit] z-30">
                      <Plus className={`w-5 h-5 transition-colors duration-200 group-hover:scale-110 ${
                        activeSlot === 'Hammer' || isHammerOver ? 'text-emerald-400' : 'text-hades-accent'
                      }`} />
                      <span className={`text-[8.5px] font-display uppercase tracking-widest font-bold mt-0.5 ${
                        activeSlot === 'Hammer' || isHammerOver ? 'text-emerald-400' : 'text-hades-accent/80'
                      }`}>Hammer</span>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-hades-bg-dark/20 border border-hades-border-light/20 rounded-xl text-center flex flex-col max-w-xs shrink-0 select-none">
                    <span className="text-[10px] text-white/30 font-display uppercase tracking-wider">No More Hammers</span>
                    <span className="text-[8.5px] text-white/20 mt-0.5 leading-relaxed">All eligible upgrades selected.</span>
                  </div>
                )
              ) : (
                <div className="px-4 py-3 bg-hades-bg-dark/30 border border-dashed border-hades-border-light/20 rounded-xl flex flex-col items-start max-w-xs justify-center text-left opacity-60">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[10px] text-white/40 font-semibold font-display uppercase tracking-widest">Hammers Locked</span>
                  </div>
                  <span className="text-[8.5px] text-white/30 mt-0.5 leading-relaxed">
                    Select a weapon to unlock upgrades.
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ROW 2: ANIMAL FAMILIAR */}
        <div className="flex flex-col gap-3 border-t border-hades-border-light/30 pt-8">
          <span className="text-[10px] font-mono font-medium text-hades-accent/50 uppercase tracking-widest">Row II: Animal Familiar</span>

          <div className="flex flex-wrap items-center gap-6">
            
            {/* Core Familiar Slot */}
            {activeFamiliarObj ? (
              <div 
                ref={setFamiliarDropRef}
                onClick={() => toggleActiveSlot('Familiar')}
                className="relative"
                style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
              >
                <ActiveFamiliarCard 
                  familiar={activeFamiliarObj} 
                  setActiveFamiliar={setActiveFamiliar}
                  isActive={activeSlot === 'Familiar'}
                  isOver={isFamiliarOver}
                />
              </div>
            ) : (
              <div 
                ref={setFamiliarDropRef}
                onClick={() => toggleActiveSlot('Familiar')}
                className={`w-[84px] h-[84px] bg-hades-bg-dark/80 border rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-md shrink-0 select-none cursor-pointer group transition-all duration-200 relative ${
                  activeSlot === 'Familiar' || isFamiliarOver
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)] bg-emerald-950/10'
                    : 'border-white/10 hover:border-hades-accent/40'
                }`}
              >
                {/* Synchronized green pulse layer */}
                <div
                  className={`absolute inset-0 rounded-[inherit] bg-emerald-950/20 ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 pointer-events-none transition-opacity duration-200 ${
                    activeSlot === 'Familiar' || isFamiliarOver ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-1 flex flex-col items-center justify-center border border-white/5 rounded-[inherit] z-30">
                  <Plus className={`w-5 h-5 transition-colors duration-200 group-hover:scale-110 ${
                    activeSlot === 'Familiar' || isFamiliarOver ? 'text-emerald-400' : 'text-hades-accent'
                  }`} />
                  <span className={`text-[8.5px] font-display uppercase tracking-widest font-bold mt-0.5 ${
                    activeSlot === 'Familiar' || isFamiliarOver ? 'text-emerald-400' : 'text-hades-accent/80'
                  }`}>Familiar</span>
                </div>
              </div>
            )}

            {/* Separator Line */}
            <div className="w-[1.5px] h-12 bg-hades-border-light/40 flex-shrink-0 self-center" />

            {/* Familiar Skills Grid */}
            <div className="flex-1 flex flex-wrap items-center gap-4">
              {activeFamiliarObj ? (
                activeFamiliarObj.skills.map((skill) => renderSkillCard(skill))
              ) : (
                <div className="px-5 py-4 bg-hades-bg-dark/30 border border-dashed border-hades-border-light/20 rounded-2xl flex flex-col items-start max-w-xs justify-center text-left opacity-60">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[10px] text-white/44 font-semibold font-display uppercase tracking-widest">Skills Locked</span>
                  </div>
                  <span className="text-[9px] text-white/30 mt-1 leading-relaxed">
                    Choose an animal familiar in the familiar slot to display native skill cards.
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ROW 3: KEEPSAKE PLACEHOLDER */}
        <div className="flex flex-col gap-3 border-t border-hades-border-light/30 pt-8 opacity-80">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-widest">Row III: Keepsake Inventory Slots</span>
            <span className="text-[8px] bg-hades-accent/10 text-hades-accent border border-hades-accent/20 px-1.5 py-[1px] font-display rounded-full uppercase tracking-wider">Planned</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            
            {/* Lock symbol indicator left side */}
            <div className="w-[84px] h-[84px] rounded-2xl border border-dashed border-hades-border-light/20 bg-hades-bg-dark/10 flex flex-col items-center justify-center p-2 text-center shrink-0">
              <Lock className="w-4 h-4 text-white/20 mb-1" />
              <span className="text-[8px] font-semibold text-white/30 uppercase tracking-wider font-display">Vaulted</span>
            </div>

            {/* Separator Line */}
            <div className="w-[1.5px] h-12 bg-hades-border-light/20 flex-shrink-0 self-center" />

            {/* Four floor slots (Erebus, Oceanus, Mourning Fields, Tartarus) */}
            <div className="flex-1 flex flex-wrap items-center gap-4">
              {[1, 2, 3, 4].map((floor) => (
                <div 
                  key={floor}
                  className="w-[84px] h-[84px] bg-hades-bg-dark/20 border border-hades-border-light/10 rounded-xl flex flex-col items-center justify-center text-center p-2 opacity-40 hover:opacity-100 transition-opacity duration-300 relative group select-none"
                >
                  <Lock className="w-3 h-3 text-white/20 mb-1 group-hover:text-hades-accent transition-colors" />
                  <span className="text-[9px] font-medium text-gray-400 font-display uppercase tracking-widest">Floor {floor}</span>
                  <span className="text-[7px] text-white/20 uppercase tracking-wider mt-0.5">Keepsake</span>
                  <div className="absolute top-0 right-0 h-1 w-full bg-hades-accent/10 rounded-t-xl" />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
