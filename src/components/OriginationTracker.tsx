import React, { useMemo, useRef, useState } from 'react';
import { Skull, ChevronDown, ChevronRight } from 'lucide-react';
import { Boon } from '../types';
import { GodIcon } from './Icons';
import { STATUS_CURSES } from '../data/statusCursesData';
import { ARCANA_CARDS } from '../data/arcanaData';
import { OLYMPIAN_GODS } from '../constants';
import { FormattedEffectText } from './FormattedEffectText';
import { motion, AnimatePresence } from 'motion/react';

interface OriginationTrackerProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
  activeArcana?: number[];
}

export function OriginationTracker({ coreBuild, additionalBoons, activeArcana = [] }: OriginationTrackerProps) {
  const activeOrderRef = useRef<string[]>([]);
  const [expandedCurses, setExpandedCurses] = useState<Record<string, boolean>>({});

  const toggleCurse = (curseId: string) => {
    setExpandedCurses(prev => ({
      ...prev,
      [curseId]: !prev[curseId]
    }));
  };

  const activeBoons = useMemo(() => {
    const all = Object.values(coreBuild).filter((b): b is Boon => !!b);
    return [...all, ...additionalBoons];
  }, [coreBuild, additionalBoons]);

  const originationCard = useMemo(() => {
    return ARCANA_CARDS.find(card => card.id === 'origination');
  }, []);

  const activeCurses = useMemo(() => {
    const currentlyActiveIds = new Set(
      activeBoons
        .map(boon => boon.inflictsCurse)
        .filter((id): id is string => !!id)
    );

    const kept = activeOrderRef.current.filter(curseId => currentlyActiveIds.has(curseId));
    const orderedNewCurses: string[] = [];

    const recordNewCurse = (boon: Boon | null) => {
      if (boon?.inflictsCurse) {
        const curseId = boon.inflictsCurse;
        if (currentlyActiveIds.has(curseId) && !kept.includes(curseId) && !orderedNewCurses.includes(curseId)) {
          orderedNewCurses.push(curseId);
        }
      }
    };

    const slotsInOrder = ['Attack', 'Special', 'Cast', 'Sprint', 'Magick'];
    slotsInOrder.forEach(slot => recordNewCurse(coreBuild[slot]));
    additionalBoons.forEach(recordNewCurse);

    const mergedOrder = [...kept, ...orderedNewCurses];
    activeOrderRef.current = mergedOrder;

    const matchedCurses = STATUS_CURSES.filter(curse => currentlyActiveIds.has(curse.id));
    return [...matchedCurses].sort((a, b) => {
      const indexA = mergedOrder.indexOf(a.id);
      const indexB = mergedOrder.indexOf(b.id);
      const valA = indexA === -1 ? 999 : indexA;
      const valB = indexB === -1 ? 999 : indexB;
      return valA - valB;
    });
  }, [activeBoons, coreBuild, additionalBoons]);

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
      if (!OLYMPIAN_GODS.includes(curse.god)) return; // Only process Olympian curses
      const godsForCurse = curseGods.get(curse.id) || [];
      godsForCurse.forEach(g => {
        if (OLYMPIAN_GODS.includes(g)) {
          gods.add(g);
        }
      });
    });
    return Array.from(gods);
  }, [activeCurses, curseGods]);

  const activeOlympianCursesCount = useMemo(() => {
    return activeCurses.filter(curse => OLYMPIAN_GODS.includes(curse.god)).length;
  }, [activeCurses]);

  const isArcanaActive = activeArcana.includes(14);
  const isOriginationActive = uniqueGods.length >= 2;
  const isOriginationEffectActive = isOriginationActive && isArcanaActive;

  const originationContributingCurses = useMemo(() => {
    return activeCurses
      .filter(curse => OLYMPIAN_GODS.includes(curse.god))
      .map(curse => {
        const contributingBoons = activeBoons.filter(boon => boon.inflictsCurse === curse.id);
        return {
          curse,
          boons: contributingBoons
        };
      }).filter(item => item.boons.length > 0);
  }, [activeCurses, activeBoons]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -5 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -5 }}
        transition={{ duration: 0.2 }}
        className="relative group flex items-center justify-center cursor-help h-5 w-5"
      >
        <img 
          src="/assets/ui/Origination_Active_Icon.webp" 
          className={`w-4 h-4 object-contain rounded transition-all duration-300 ${
            isOriginationEffectActive 
              ? 'opacity-100 grayscale-0 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.65)]' 
              : 'opacity-40 grayscale'
          }`} 
          alt="Origination" 
          referrerPolicy="no-referrer"
        />

        {/* Origination Tooltip */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 p-4 bg-hades-bg-dark border border-emerald-500/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110] text-left pointer-events-none group-hover:pointer-events-auto select-text">
          {/* Invisible bridge to keep tooltip open while moving mouse */}
          <div className="absolute -top-2 left-0 right-0 h-2" />
          
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/ui/Origination_Active_Icon.webp" 
                className="object-contain" 
                style={{ width: '22px', height: '22px' }} 
                alt="Origination" 
                referrerPolicy="no-referrer" 
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-widest text-emerald-400 font-sc normal-case">
                  Origination
                </span>
              </div>
            </div>
            <span className={`text-[11px] font-display px-1.5 py-0.5 rounded font-bold ${
              isOriginationEffectActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-white/5 text-gray-500 border border-white/5'
            }`}>
              {isOriginationEffectActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>

          <div className="text-xs text-gray-300 leading-relaxed mb-3">
            <FormattedEffectText text={originationCard?.effect || ''} />
          </div>

          {/* Stats within Tooltip */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col gap-1.5 text-xs mb-3">
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Arcana Card (XIV):</span>
              <span className={isArcanaActive ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {isArcanaActive ? 'Activated' : 'Deactivated'}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Active Olympian Curses:</span>
              <span className={activeOlympianCursesCount >= 2 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {activeOlympianCursesCount} / 2
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Unique Olympian Gods:</span>
              <span className={isOriginationActive ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {uniqueGods.length} / 2
              </span>
            </div>
          </div>

          {/* Contributing Curses & Boons inside the tooltip */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 uppercase font-display tracking-wider font-semibold pl-1">Contributing Curses & Boons:</span>
            {originationContributingCurses.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {originationContributingCurses.map(({ curse, boons }) => {
                  const mainGod = curse.god;
                  const isExpanded = !!expandedCurses[curse.id];
                  return (
                    <div key={curse.id} className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 flex flex-col gap-2">
                      {/* Curse Name Header - Made clickable to toggle collapse */}
                      <div 
                        onClick={() => toggleCurse(curse.id)}
                        className="flex items-center justify-between cursor-pointer select-none group/curse"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover/curse:text-emerald-400 transition-colors" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/curse:text-emerald-400 transition-colors" />
                          )}
                          {mainGod ? (
                            <div className="w-4 h-4 flex-shrink-0">
                              <GodIcon god={mainGod} className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 flex-shrink-0 text-hades-red/70 flex items-center justify-center">
                              <Skull className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span className="text-xs font-sc normal-case font-bold tracking-wide text-gray-200 group-hover/curse:text-emerald-400 transition-colors">
                             {curse.name}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-display font-medium bg-white/5 px-1.5 py-0.5 rounded border border-white/5 flex-shrink-0 group-hover/curse:border-emerald-500/30 group-hover/curse:bg-emerald-500/10 transition-all">
                          {curse.duration || 'Active'}
                        </span>
                      </div>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                          {/* Curse Description */}
                          <div className="text-[11px] text-gray-350 leading-relaxed font-sans px-0.5">
                            <FormattedEffectText text={curse.description} />
                          </div>

                          {/* Contributing Boons List */}
                          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
                            {boons.map((boon, idx) => (
                              <div key={idx} className="flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2 min-w-0">
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
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs text-gray-500 bg-white/[0.01] p-1.5 rounded text-center">
                No active curses
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
