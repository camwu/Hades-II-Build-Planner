import React, { useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Boon, StatusCurse, GOD_COLORS } from '../types';
import { STATUS_CURSES } from '../data/statusCursesData';
import { ARCANA_CARDS } from '../data/arcanaData';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { Skull } from 'lucide-react';
import { GodIcon } from './Icons';

interface StatusCurseSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
}

const EXCLUDED_CURSE_BOONS = new Set([
  'Broken Resolve',
  'Sweet Surrender',
  'Nervous Wreck',
  'Back Burner',
  'Grievous Blow',
  'Profuse Bleeding',
  'Cold Storage',
  'Winter Harvest',
  'Dying Wish',
  'Hereditary Bane',
  'Arc Flash',
  'Burning Desire',
  'Rude Awakening',
  'Warm Breeze',
  'Heinous Affront',
  'Cryo Pounder',
  'Tropical Cyclone',
  'Incandescent Aura',
  'Freezer Burn',
  'Killer Current',
  'Scalding Vapor',
  'Romantic Spark'
].map(name => name.toLowerCase()));

export function StatusCurseSummary({ coreBuild, additionalBoons }: StatusCurseSummaryProps) {
  const activeBoons = useMemo(() => {
    const all = Object.values(coreBuild).filter((b): b is Boon => !!b);
    return [...all, ...additionalBoons];
  }, [coreBuild, additionalBoons]);

  const originationCard = useMemo(() => {
    return ARCANA_CARDS.find(card => card.id === 'origination');
  }, []);

  const activeOrderRef = useRef<string[]>([]);

  const activeCurses = useMemo(() => {
    const unfiltered = STATUS_CURSES.filter(curse => {
      return activeBoons.some(boon => {
        const nameLower = boon.name.toLowerCase();
        if (EXCLUDED_CURSE_BOONS.has(nameLower)) {
          return false;
        }

        if (nameLower === 'thermal dynamics') {
          return curse.name === 'Scorch';
        }

        return boon.effect.toLowerCase().includes(curse.name.toLowerCase()) ||
          (curse.name === 'Weak' && boon.effect.toLowerCase().includes('weak')) ||
          (curse.name === 'Scorch' && boon.effect.toLowerCase().includes('scorch')) ||
          (curse.name === 'Blitz' && boon.effect.toLowerCase().includes('blitz')) ||
          (curse.name === 'Freeze' && boon.effect.toLowerCase().includes('freeze')) ||
          (curse.name === 'Hitch' && boon.effect.toLowerCase().includes('hitch'));
      });
    });

    const currentActiveIds = new Set(unfiltered.map(c => c.id));
    const kept = activeOrderRef.current.filter(id => currentActiveIds.has(id));
    const newIds = unfiltered.filter(c => !kept.includes(c.id)).map(c => c.id);
    const merged = [...kept, ...newIds];
    activeOrderRef.current = merged;

    return [...unfiltered].sort((a, b) => {
      const indexA = merged.indexOf(a.id);
      const indexB = merged.indexOf(b.id);
      const valA = indexA === -1 ? 999 : indexA;
      const valB = indexB === -1 ? 999 : indexB;
      return valA - valB;
    });
  }, [activeBoons]);

  const curseGods = useMemo(() => {
    const godsMap = new Map<string, string[]>();
    activeCurses.forEach(curse => {
      const matchingBoons = activeBoons.filter(boon => 
        boon.effect.toLowerCase().includes(curse.name.toLowerCase()) ||
        (curse.name === 'Weak' && boon.effect.toLowerCase().includes('weak')) ||
        (curse.name === 'Scorch' && boon.effect.toLowerCase().includes('scorch')) ||
        (curse.name === 'Blitz' && boon.effect.toLowerCase().includes('blitz')) ||
        (curse.name === 'Freeze' && boon.effect.toLowerCase().includes('freeze')) ||
        (curse.name === 'Hitch' && boon.effect.toLowerCase().includes('hitch'))
      );
      
      const godsForThisCurse = new Set<string>();
      matchingBoons.forEach(boon => {
        boon.gods.forEach(g => {
          if (curse.gods.includes(g)) {
            godsForThisCurse.add(g);
          }
        });
      });
      
      // Fallback if no matching boons directly matched but curse is active
      if (godsForThisCurse.size === 0 && curse.gods.length > 0) {
        const preferredGod = curse.gods.find(g => g !== 'Raki') || curse.gods[0];
        godsForThisCurse.add(preferredGod);
      }
      
      godsMap.set(curse.id, Array.from(godsForThisCurse));
    });
    return godsMap;
  }, [activeCurses, activeBoons]);

  const uniqueGods = useMemo(() => {
    const gods = new Set<string>();
    activeCurses.forEach(curse => {
      const godsForCurse = curseGods.get(curse.id) || [];
      godsForCurse.forEach(g => gods.add(g));
    });
    return Array.from(gods);
  }, [activeCurses, curseGods]);

  const isOriginationActive = uniqueGods.length >= 2;

  const originationContributingBoons = useMemo(() => {
    return activeBoons.filter(boon => {
      const nameLower = boon.name.toLowerCase();
      if (EXCLUDED_CURSE_BOONS.has(nameLower)) {
        return false;
      }
      return activeCurses.some(curse => {
        if (nameLower === 'thermal dynamics') {
          return curse.name === 'Scorch';
        }
        return boon.effect.toLowerCase().includes(curse.name.toLowerCase()) ||
          (curse.name === 'Weak' && boon.effect.toLowerCase().includes('weak')) ||
          (curse.name === 'Scorch' && boon.effect.toLowerCase().includes('scorch')) ||
          (curse.name === 'Blitz' && boon.effect.toLowerCase().includes('blitz')) ||
          (curse.name === 'Freeze' && boon.effect.toLowerCase().includes('freeze')) ||
          (curse.name === 'Hitch' && boon.effect.toLowerCase().includes('hitch'));
      });
    });
  }, [activeBoons, activeCurses]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 ml-1">
        <img 
          src="/assets/ui/Origination_Active_Icon.webp" 
          className="w-4 h-4 object-contain filter brightness-110 rounded-sm" 
          alt="Origination Icon" 
          referrerPolicy="no-referrer"
        />
        <span className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold">Status Curses</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15 min-h-[42px]">
        {activeCurses.length === 0 ? (
          <span className="text-[11px] text-gray-500 font-mono">No Active Curses</span>
        ) : (
          activeCurses.map((curse) => {
          const mainGod = curse.gods[0];
          const godColor = mainGod ? (GOD_COLORS[mainGod] || 'text-gray-400') : 'text-gray-400';
          
          return (
            <div
              key={curse.id}
              className="group relative flex items-center gap-2 cursor-help"
            >
              {mainGod ? (
                <div className={`w-6 h-6 flex items-center justify-center z-20 transition-all duration-300 ${godColor}`}>
                  <GodIcon god={mainGod} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center rounded bg-hades-red/5 border border-hades-red/20 text-hades-red/70">
                  <Skull className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-sm font-bold font-mono text-gray-200">
                {curse.name}
              </span>
              
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-3.5 bg-hades-bg-dark border border-white/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {mainGod ? (
                      <div className={`w-4 h-4 ${godColor}`}>
                        <GodIcon god={mainGod} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 text-hades-red/70">
                        <Skull className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-200 font-display">{curse.name}</span>
                  </div>
                  <span className="text-[11px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 capitalize">
                    {curse.duration || 'Active'}
                  </span>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed mb-3">
                  <FormattedBoonEffect text={curse.description} />
                </div>

                {(() => {
                  const contributingBoons = activeBoons.filter(boon => {
                    const nameLower = boon.name.toLowerCase();
                    if (EXCLUDED_CURSE_BOONS.has(nameLower)) {
                      return false;
                    }
                    if (nameLower === 'thermal dynamics') {
                      return curse.name === 'Scorch';
                    }
                    return boon.effect.toLowerCase().includes(curse.name.toLowerCase()) ||
                      (curse.name === 'Weak' && boon.effect.toLowerCase().includes('weak')) ||
                      (curse.name === 'Scorch' && boon.effect.toLowerCase().includes('scorch')) ||
                      (curse.name === 'Blitz' && boon.effect.toLowerCase().includes('blitz')) ||
                      (curse.name === 'Freeze' && boon.effect.toLowerCase().includes('freeze')) ||
                      (curse.name === 'Hitch' && boon.effect.toLowerCase().includes('hitch'));
                  });

                  if (contributingBoons.length === 0) return null;

                  return (
                    <div className="flex flex-col gap-1.5 text-xs bg-white/5 p-2 rounded-lg">
                      <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold">Contributing Boons:</span>
                      <div className="flex flex-col gap-1.5">
                        {contributingBoons.map((boon, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {boon.gods?.[0] && (
                                <div className="w-4 h-4 flex-shrink-0">
                                  <GodIcon god={boon.gods[0]} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <span className="font-bold text-gray-200 truncate text-xs">{boon.name}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">{boon.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        }))}

        {/* Separator */}
        <div className="h-5 w-[1px] bg-white/10 mx-1 self-center" />

        {/* Origination Block */}
        <div className={`group relative flex items-center gap-2 px-3 py-1 rounded-lg cursor-help ${
          isOriginationActive 
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
            : 'bg-white/[0.02] border border-white/5 text-gray-500 grayscale'
        }`}>
          <div className="relative w-4 h-4 flex items-center justify-center">
            <img 
              src="/assets/ui/Origination_Active_Icon.webp" 
              className={`w-4 h-4 object-contain rounded ${isOriginationActive ? 'opacity-100' : 'opacity-40'}`} 
              alt="Origination" 
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className={`text-[10px] font-bold uppercase tracking-wider font-display ${
              isOriginationActive ? 'text-amber-400' : 'text-gray-500'
            }`}>
              Origination
            </span>
          </div>

          {/* Origination Tooltip */}
          <div className="absolute top-full right-0 mt-2 w-80 p-4 bg-hades-bg-dark border border-amber-500/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left">
            {/* Invisible bridge to keep tooltip open while moving mouse */}
            <div className="absolute -top-2 left-0 right-0 h-2" />
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <img src="/assets/ui/Origination_Active_Icon.webp" className="w-5.5 h-5.5 object-contain" style={{ width: '22px', height: '22px' }} alt="Origination" referrerPolicy="no-referrer" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold uppercase tracking-widest text-amber-400 font-display">
                    Origination
                  </span>
                </div>
              </div>
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded font-bold ${
                isOriginationActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-gray-500'
              }`}>
                {isOriginationActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-xs text-gray-300 leading-relaxed mb-3">
              <FormattedBoonEffect text={originationCard?.effect || ''} />
            </div>
            <div className="flex flex-col gap-2 text-xs bg-white/5 p-2.5 rounded-lg border border-white/5">
              <div className="flex flex-col gap-1 text-[10.5px] text-gray-400 pb-2 border-b border-white/5">
                <div className="flex justify-between">
                  <span>Active Curses:</span>
                  <span className="text-gray-300 font-bold">{activeCurses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unique Gods:</span>
                  <span className={isOriginationActive ? 'text-amber-300 font-bold' : 'text-gray-300 font-bold'}>
                    {uniqueGods.length} / 2
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider font-semibold">Contributing Boons:</span>
                {originationContributingBoons.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {originationContributingBoons.map((boon, idx) => (
                      <div key={idx} className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {boon.gods?.[0] && (
                            <div className="w-4 h-4 flex-shrink-0">
                              <GodIcon god={boon.gods[0]} className="w-full h-full object-contain" />
                            </div>
                          )}
                          <span className="font-bold text-gray-200 truncate text-xs">{boon.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">{boon.type}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 bg-white/[0.02] p-1.5 rounded text-center font-mono">
                    No active boons
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
