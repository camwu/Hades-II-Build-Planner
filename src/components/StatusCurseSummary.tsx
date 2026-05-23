import React, { useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Boon, StatusCurse, GOD_COLORS } from '../types';
import { STATUS_CURSES } from '../data/statusCursesData';
import { ARCANA_CARDS } from '../data/arcanaData';
import { FormattedEffectText } from './FormattedEffectText';
import { Skull } from 'lucide-react';
import { GodIcon } from './Icons';

interface StatusCurseSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
  activeArcana?: number[];
}

export function StatusCurseSummary({ coreBuild, additionalBoons, activeArcana = [] }: StatusCurseSummaryProps) {
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
      return activeBoons.some(boon => boon.inflictsCurse === curse.id);
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
      const matchingBoons = activeBoons.filter(boon => boon.inflictsCurse === curse.id);
      
      const godsForThisCurse = new Set<string>();
      matchingBoons.forEach(boon => {
        boon.gods.forEach(g => {
          if (curse.god === g) {
            godsForThisCurse.add(g);
          }
        });
      });
      
      // Fallback if no matching boons directly matched but curse is active
      if (godsForThisCurse.size === 0 && curse.god) {
        godsForThisCurse.add(curse.god);
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
      return activeCurses.some(curse => boon.inflictsCurse === curse.id);
    });
  }, [activeBoons, activeCurses]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5 ml-1 select-none h-6">
        <div className="flex items-center gap-2">
          <img src="/assets/ui/Icon-Olympian.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
          <span className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold">Status Curses</span>
        </div>

        <AnimatePresence initial={false}>
          {activeArcana.includes(14) && (
            <motion.div
              key="origination-icon-only"
              initial={{ opacity: 0, scale: 0.9, x: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -5 }}
              transition={{ duration: 0.2 }}
              className="relative group flex items-center justify-center cursor-help h-5 w-5"
            >
              <img 
                src="/assets/ui/Origination_Active_Icon.webp" 
                className={`w-4 h-4 object-contain rounded transition-all duration-300 ${
                  isOriginationActive 
                    ? 'opacity-100 grayscale-0 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]' 
                    : 'opacity-45 grayscale'
                }`} 
                alt="Origination" 
                referrerPolicy="no-referrer"
              />

              {/* Origination Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 p-4 bg-hades-bg-dark border border-amber-500/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left pointer-events-none group-hover:pointer-events-auto">
                {/* Invisible bridge to keep tooltip open while moving mouse */}
                <div className="absolute -top-2 left-0 right-0 h-2" />
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <img src="/assets/ui/Origination_Active_Icon.webp" className="w-5.5 h-5.5 object-contain" style={{ width: '22px', height: '22px' }} alt="Origination" referrerPolicy="no-referrer" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-bold tracking-widest text-amber-400 font-sc normal-case">
                        Origination
                      </span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-display px-1.5 py-0.5 rounded font-bold ${
                    isOriginationActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-gray-500'
                  }`}>
                    {isOriginationActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <div className="text-xs text-gray-300 leading-relaxed mb-3">
                  <FormattedEffectText text={originationCard?.effect || ''} />
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
                    <span className="text-[10px] text-gray-400 uppercase font-display tracking-wider font-semibold">Contributing Boons:</span>
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
                              <span className="font-bold text-gray-200 truncate text-xs font-sc">
                                {boon.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-display flex-shrink-0">{boon.type}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 bg-white/[0.02] p-1.5 rounded text-center font-display">
                        No active boons
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15 min-h-[42px] self-start w-fit">
        {activeCurses.length === 0 ? (
          <span className="text-[11px] text-gray-500 font-display">No Active Curses</span>
        ) : (
          activeCurses.map((curse, index) => {
          const mainGod = curse.god;
          const godColor = mainGod ? (GOD_COLORS[mainGod] || 'text-gray-400') : 'text-gray-400';
          
          let tooltipPositionClass = "left-1/2 -translate-x-1/2 mt-2";
          if (index === 0) {
            tooltipPositionClass = "left-0 mt-2";
          } else if (index === activeCurses.length - 1) {
            tooltipPositionClass = "right-0 mt-2";
          } else if (index === 1 && activeCurses.length > 3) {
            tooltipPositionClass = "left-0 mt-2";
          } else if (index === activeCurses.length - 2 && activeCurses.length > 3) {
            tooltipPositionClass = "right-0 mt-2";
          }
          
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
              <span className={`text-sm font-bold text-gray-200 ${/\d/.test(curse.name) ? 'font-display' : 'font-sc normal-case'}`}>
                {curse.name}
              </span>
              
              {/* Tooltip */}
              <div className={`absolute top-full ${tooltipPositionClass} w-72 p-3.5 bg-hades-bg-dark border border-white/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
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
                    <span className={`text-sm font-bold tracking-widest text-gray-200 ${/\d/.test(curse.name) ? 'font-display' : 'font-sc normal-case'}`}>{curse.name}</span>
                  </div>
                  <span className="text-[11px] font-bold font-display px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 capitalize">
                    {curse.duration || 'Active'}
                  </span>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed mb-3">
                  <FormattedEffectText text={curse.description} />
                </div>

                {(() => {
                  const contributingBoons = activeBoons.filter(boon => boon.inflictsCurse === curse.id);

                  if (contributingBoons.length === 0) return null;

                  return (
                    <div className="flex flex-col gap-1.5 text-xs bg-white/5 p-2 rounded-lg">
                      <span className="text-[10px] text-gray-400 uppercase font-display tracking-wider font-semibold">Contributing Boons:</span>
                      <div className="flex flex-col gap-1.5">
                        {contributingBoons.map((boon, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {boon.gods?.[0] && (
                                <div className="w-4 h-4 flex-shrink-0">
                                  <GodIcon god={boon.gods[0]} className="w-full h-full object-contain" />
                                </div>
                              )}
                              <span className="font-bold text-gray-200 truncate text-xs font-sc">
                                {boon.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-display flex-shrink-0">{boon.type}</span>
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
      </div>
    </div>
  );
}
