import React, { useMemo } from 'react';
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

export function StatusCurseSummary({ coreBuild, additionalBoons }: StatusCurseSummaryProps) {
  const activeBoons = useMemo(() => {
    const all = Object.values(coreBuild).filter((b): b is Boon => !!b);
    return [...all, ...additionalBoons];
  }, [coreBuild, additionalBoons]);

  const originationCard = useMemo(() => {
    return ARCANA_CARDS.find(card => card.id === 'origination');
  }, []);

  const activeCurses = useMemo(() => {
    return STATUS_CURSES.filter(curse => {
      // Check if any boon mentions the curse name or if the curse's gods are in the build and the boon implies it
      // For now, a simple text check in the boon effect is probably best
      return activeBoons.some(boon => 
        boon.effect.toLowerCase().includes(curse.name.toLowerCase()) ||
        // Special cases like Scorch, Weak, etc. often have specific keywords
        (curse.name === 'Weak' && boon.effect.toLowerCase().includes('weak')) ||
        (curse.name === 'Scorch' && boon.effect.toLowerCase().includes('scorch')) ||
        (curse.name === 'Blitz' && boon.effect.toLowerCase().includes('blitz')) ||
        (curse.name === 'Freeze' && boon.effect.toLowerCase().includes('freeze')) ||
        (curse.name === 'Hitch' && boon.effect.toLowerCase().includes('hitch'))
      );
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

  if (activeCurses.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 ml-1">
        <img 
          src="/assets/ui/Origination_Active_Icon.webp" 
          className="w-4 h-4 object-contain filter brightness-110 rounded-sm" 
          alt="Origination Icon" 
          referrerPolicy="no-referrer"
        />
        <span className="text-xs font-mono uppercase tracking-widest text-hades-accent font-bold">Status Curses</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15">
        {activeCurses.map((curse) => {
          const mainGod = curse.gods[0];
          const godColor = mainGod ? (GOD_COLORS[mainGod] || 'text-gray-400') : 'text-gray-400';
          
          return (
            <motion.div
              key={curse.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-hades-bg-dark border border-hades-red/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-hades-red">{curse.name}</span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">{curse.duration}</span>
              </div>
              <div className="text-[10px] text-gray-300 leading-relaxed">
                <FormattedBoonEffect text={curse.description} />
              </div>
              {curse.gods.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/5 flex gap-2">
                  <span className="text-[9px] text-gray-500 uppercase">Gods:</span>
                  <div className="flex gap-1">
                    {curse.gods.map(god => (
                      <span 
                        key={god} 
                        className={`text-[9px] font-bold uppercase ${GOD_COLORS[god] || 'text-hades-accent/70'}`}
                      >
                        {god}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )})}

        {/* Separator */}
        <div className="h-5 w-[1px] bg-white/10 mx-1 self-center" />

        {/* Origination Block */}
        <div className={`group relative flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-300 cursor-help ${
          isOriginationActive 
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
            : 'bg-white/[0.02] border border-white/5 text-gray-500 grayscale'
        }`}>
          <div className="relative w-4 h-4 flex items-center justify-center">
            <img 
              src="/assets/ui/Origination_Active_Icon.webp" 
              className={`w-4 h-4 object-contain rounded transition-all duration-500 ${isOriginationActive ? 'animate-pulse scale-105' : 'opacity-40'}`} 
              alt="Origination" 
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${
              isOriginationActive ? 'text-amber-400' : 'text-gray-500'
            }`}>
              Origination
            </span>
          </div>

          {/* Origination Tooltip */}
          <div className="absolute top-full right-0 mt-2 w-72 p-4 bg-hades-bg-dark border border-amber-500/30 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none text-left">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <img src="/assets/ui/Origination_Active_Icon.webp" className="w-5 h-5 object-contain" alt="Origination" referrerPolicy="no-referrer" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {originationCard ? `${originationCard.number}. ${originationCard.name}` : 'Origination'}
                  </span>
                  {originationCard && (
                    <span className="text-[8px] text-gray-400/80 font-mono uppercase tracking-wider">
                      Cost: {originationCard.cost} Grasp
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                isOriginationActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-gray-500'
              }`}>
                {isOriginationActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-[10px] text-gray-300 leading-relaxed mb-3">
              <FormattedBoonEffect text={originationCard?.effect || ''} />
            </div>
            <div className="flex flex-col gap-1 text-[9px] text-gray-400 bg-white/5 p-2 rounded-lg">
              <div className="flex justify-between">
                <span>Active Curses:</span>
                <span className="text-gray-300">{activeCurses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Gods:</span>
                <span className={isOriginationActive ? 'text-amber-300 font-bold' : 'text-gray-300'}>
                  {uniqueGods.length} / 2
                </span>
              </div>
              {uniqueGods.length > 0 && (
                <div className="mt-1 pt-1 border-t border-white/5 flex gap-1 flex-wrap items-center">
                  <span className="text-gray-500">Contributing Gods:</span>
                  <div className="flex gap-1 flex-wrap">
                    {uniqueGods.map(god => (
                      <span key={god} className={`font-bold ${GOD_COLORS[god] || 'text-white'}`}>
                        {god}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
