import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Lock, Sparkles, ChevronRight, RefreshCw, ChevronUp } from 'lucide-react';
import { WEAPON_ASPECTS, WEAPON_NAMES, WEAPON_ICONS, WEAPON_HAMMERS } from '../data/weaponsData';
import { ANIMAL_FAMILIARS } from '../data/animalFamiliars';
import { WeaponAspect, WeaponHammer, AnimalFamiliar, AnimalFamiliarSkill } from '../types';
import { FormattedEffectText } from './FormattedEffectText';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';

interface LoadoutTabProps {
  activeWeapon: string | null;
  setActiveWeapon: (weapon: string | null) => void;
  activeAspect: string | null;
  setActiveAspect: (aspectId: string | null) => void;
  selectedHammers: string[];
  setSelectedHammers: React.Dispatch<React.SetStateAction<string[]>>;
  activeFamiliar: string;
  setActiveFamiliar: (familiarId: string) => void;
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
}: LoadoutTabProps) {
  
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
              <div className="group relative w-[84px] h-[84px] cursor-pointer">
                {/* Hover Container */}
                <div className="absolute top-0 left-0 transition-opacity duration-200 z-10 group-hover:z-50">
                  <motion.div 
                    initial={false}
                    animate={{ 
                      width: '84px',
                      height: '84px'
                    }}
                    whileHover={{ 
                      width: '420px', 
                      height: 'auto'
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 hover:bg-hades-bg-dark/95 hover:backdrop-blur-md rounded-2xl bg-hades-bg-dark/50 border border-hades-border-light/50 p-0 hover:p-4 overflow-hidden shadow-xl hover:border-hades-accent/80"
                  >
                    {/* Weapon Icon inside collapsed box */}
                    <div className="w-[84px] h-[84px] flex-shrink-0 flex items-center justify-center relative rounded-xl overflow-hidden p-[3px]">
                      <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden border border-hades-accent/20 bg-hades-bg-main p-1.5`}>
                        <img 
                          src={activeAspectObj.icon} 
                          alt={activeAspectObj.name} 
                          className="w-full h-full object-contain relative z-10" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const wIcon = WEAPON_ICONS[activeAspectObj.weapon] || '/assets/ui/Icon-Olympian.webp';
                            e.currentTarget.src = wIcon;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      </div>
                      {/* Inner Small Aspect Indicator inside icon */}
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hades-accent/20 flex items-center justify-center border border-hades-accent/40 z-20`}>
                        <span className="text-[8px] font-bold text-hades-accent">⚔️</span>
                      </div>
                      {/* Custom border styling */}
                      <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-hades-accent/40 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                    </div>

                    {/* Uncurled / Hovered Full Description Content */}
                    <div className="flex-1 hidden group-hover:flex flex-col justify-center pr-4 py-2 min-h-[50px] animate-fade-in w-[310px]">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                          {activeAspectObj.name}
                        </h4>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveWeapon(null);
                            setActiveAspect(null);
                            setSelectedHammers([]);
                          }}
                          className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[18px] w-[18px] flex-shrink-0 cursor-pointer"
                          title="Clear Weapon Aspect"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="text-[8.5px] text-white/30 uppercase tracking-widest font-mono mb-1.5">{activeAspectObj.weapon}</span>
                      <p className="text-[11px] text-gray-300 leading-normal font-medium whitespace-normal">
                        <FormattedEffectText text={activeAspectObj.description} />
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div 
                className="w-[84px] h-[84px] bg-hades-bg-dark/40 border border-dashed border-hades-border-light text-white/20 rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-sm shrink-0 select-none cursor-default"
              >
                <Plus className="w-5 h-5 text-white/20" />
                <span className="text-[8px] font-display uppercase tracking-widest text-[#9898a0]/40">Aspect</span>
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
                    className="group relative w-[84px] h-[84px] cursor-pointer"
                  >
                    {/* Hover Container */}
                    <div className="absolute top-0 left-0 transition-opacity duration-200 z-10 group-hover:z-50">
                      <motion.div 
                        initial={false}
                        animate={{ 
                          width: '84px',
                          height: '84px'
                        }}
                        whileHover={{ 
                          width: '420px', 
                          height: 'auto'
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 hover:bg-hades-bg-dark/95 hover:backdrop-blur-md rounded-2xl bg-hades-bg-dark/50 border border-hades-border-light/50 p-0 hover:p-4 overflow-hidden shadow-xl hover:border-hades-accent/80"
                      >
                        {/* Hammer Icon inside collapsed box */}
                        <div className="w-[84px] h-[84px] flex-shrink-0 flex items-center justify-center relative rounded-xl overflow-hidden p-[3px]">
                          <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden border border-hades-accent/20 bg-hades-bg-main p-1.5`}>
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
                          </div>
                          {/* Inner Small Aspect Indicator inside icon */}
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hades-accent/20 flex items-center justify-center border border-hades-accent/40 z-20`}>
                            <span className="text-[8px] font-bold text-hades-accent">🔨</span>
                          </div>
                          {/* Sledge hammer custom border styling */}
                          <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-hades-accent/40 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                        </div>

                        {/* Uncurled / Hovered Full Description Content */}
                        <div className="flex-1 hidden group-hover:flex flex-col justify-center pr-4 py-2 min-h-[50px] animate-fade-in w-[310px]">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                              {hammer.name}
                            </h4>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleRemoveHammer(hammerId); }}
                              className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[18px] w-[18px] flex-shrink-0 cursor-pointer"
                              title="Remove Hammer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="text-[8.5px] text-white/30 uppercase tracking-widest font-mono mb-1.5">Daedalus Hammer Upgrade</span>
                          <p className="text-[11px] text-gray-300 leading-normal font-medium whitespace-normal">
                            <FormattedEffectText text={hammer.description} />
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}

              {/* Next Grow Hammer Selection Slot */}
              {activeWeapon ? (
                eligibleHammers.length > 0 ? (
                  <div 
                    className="w-[84px] h-[84px] bg-hades-bg-dark/40 border border-dashed border-hades-border-light text-white/20 rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-sm shrink-0 select-none cursor-default"
                  >
                    <Plus className="w-5 h-5 text-white/20" />
                    <span className="text-[8px] font-display uppercase tracking-widest text-[#9898a0]/40">Hammer</span>
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
              <div className="group relative w-[84px] h-[84px] cursor-pointer">
                {/* Hover Container */}
                <div className="absolute top-0 left-0 transition-opacity duration-200 z-10 group-hover:z-50">
                  <motion.div 
                    initial={false}
                    animate={{ 
                      width: '84px',
                      height: '84px'
                    }}
                    whileHover={{ 
                      width: '420px', 
                      height: 'auto'
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 hover:bg-hades-bg-dark/95 hover:backdrop-blur-md rounded-2xl bg-hades-bg-dark/50 border border-hades-border-light/50 p-0 hover:p-4 overflow-hidden shadow-xl hover:border-hades-accent/80"
                  >
                    {/* Familiar Icon inside collapsed box */}
                    <div className="w-[84px] h-[84px] flex-shrink-0 flex items-center justify-center relative rounded-xl overflow-hidden p-[3px]">
                      <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden border border-hades-accent/20 bg-hades-bg-main p-1.5`}>
                        <img 
                          src={activeFamiliarObj.icon} 
                          alt={activeFamiliarObj.name} 
                          className="w-full h-full object-cover relative z-10" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/ui/Icon-Olympian.webp';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      </div>
                      {/* Inner Small Familiar Indicator inside icon */}
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-hades-accent/20 flex items-center justify-center border border-hades-accent/40 z-20`}>
                        <span className="text-[8px] font-bold text-hades-accent">🐾</span>
                      </div>
                      {/* Custom border styling */}
                      <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} border-hades-accent/40 ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
                    </div>

                    {/* Uncurled / Hovered Full Description Content */}
                    <div className="flex-1 hidden group-hover:flex flex-col justify-center pr-4 py-2 min-h-[50px] animate-fade-in w-[310px]">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-hades-accent tracking-wide leading-tight font-sc uppercase">
                          {activeFamiliarObj.name}
                        </h4>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveFamiliar('none');
                          }}
                          className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[18px] w-[18px] flex-shrink-0 cursor-pointer"
                          title="Dismiss Familiar"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="text-[8.5px] text-white/30 uppercase tracking-widest font-mono mb-1.5">Animal Familiar</span>
                      <p className="text-[11px] text-gray-300 leading-normal font-medium whitespace-normal">
                        Your animal familiar is active.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div 
                className="w-[84px] h-[84px] bg-hades-bg-dark/40 border border-dashed border-hades-border-light text-white/20 rounded-[28%] flex flex-col items-center justify-center gap-1 shadow-sm shrink-0 select-none cursor-default"
              >
                <Plus className="w-5 h-5 text-white/20" />
                <span className="text-[8px] font-display uppercase tracking-widest text-[#9898a0]/40">Familiar</span>
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
