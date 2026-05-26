import React, { useMemo, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Boon } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { OriginationTracker } from './OriginationTracker';

interface GodSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
  activeArcana?: number[];
}

const EXCLUDED_GODS = ['Artemis', 'Athena', 'Dionysus', 'Hermes', 'Hades'];

export function GodSummary({ coreBuild, additionalBoons, activeArcana = [] }: GodSummaryProps) {
  const activeOrderRef = useRef<string[]>([]);

  const { godData, poolLimitExceeded, godBoons } = useMemo(() => {
    const summary = {} as Record<string, number>;
    const boonsByGod = {} as Record<string, Boon[]>;
    
    const addGods = (boon: Boon | null) => {
      if (boon?.gods) {
        boon.gods.forEach(god => {
          summary[god] = (summary[god] || 0) + 1;
          if (!boonsByGod[god]) {
            boonsByGod[god] = [];
          }
          if (!boonsByGod[god].some(b => b.id === boon.id)) {
            boonsByGod[god].push(boon);
          }
        });
      }
    };

    Object.values(coreBuild).forEach(addGods);
    additionalBoons.forEach(addGods);

    const activeGodsList = Object.keys(summary).filter(god => summary[god] > 0);
    const activeGodsSet = new Set(activeGodsList);

    // Keep only elements of persistent order that are still present
    const kept = activeOrderRef.current.filter(god => activeGodsSet.has(god));
    
    // Find any new gods that are active but not yet in our persistent order
    // Order them by core slots first, then additional boons
    const orderedNewGods: string[] = [];
    const recordNewGod = (boon: Boon | null) => {
      if (boon?.gods) {
        boon.gods.forEach(god => {
          if (activeGodsSet.has(god) && !kept.includes(god) && !orderedNewGods.includes(god)) {
            orderedNewGods.push(god);
          }
        });
      }
    };

    const slotsInOrder = ['Attack', 'Special', 'Cast', 'Sprint', 'Magick'];
    slotsInOrder.forEach(slot => recordNewGod(coreBuild[slot]));
    additionalBoons.forEach(recordNewGod);

    const mergedOrder = [...kept, ...orderedNewGods];
    activeOrderRef.current = mergedOrder;

    const sortedData = Object.entries(summary)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => {
        const indexA = mergedOrder.indexOf(a[0]);
        const indexB = mergedOrder.indexOf(b[0]);
        const valA = indexA === -1 ? 999 : indexA;
        const valB = indexB === -1 ? 999 : indexB;
        return valA - valB;
      });

    const olympians = sortedData.filter(([god]) => !EXCLUDED_GODS.includes(god));
    
    return {
      godData: sortedData,
      poolLimitExceeded: olympians.length > 4,
      godBoons: boonsByGod
    };
  }, [coreBuild, additionalBoons]);

  const { standardGodsInPool, supportGodsInPool } = useMemo(() => {
    const standard = godData.filter(([god]) => !EXCLUDED_GODS.includes(god));
    const support = godData.filter(([god]) => EXCLUDED_GODS.includes(god));
    return { standardGodsInPool: standard, supportGodsInPool: support };
  }, [godData]);

  const renderGodItem = (god: string, count: number, index: number, total: number) => {
    const boons = godBoons[god] || [];
    
    let tooltipPositionClass = "left-1/2 -translate-x-1/2 mt-2";
    if (index === 0) {
      tooltipPositionClass = "left-0 mt-2";
    } else if (index === total - 1) {
      tooltipPositionClass = "right-0 mt-2";
    } else if (index === 1 && total > 3) {
      tooltipPositionClass = "left-0 mt-2";
    } else if (index === total - 2 && total > 3) {
      tooltipPositionClass = "right-0 mt-2";
    }

    return (
      <div key={god} className="group relative flex items-center gap-2 cursor-help">
        <div className="w-6 h-6 flex items-center justify-center z-20">
          <GodIcon god={god} className="w-full h-full object-contain" />
        </div>
        <span className="text-sm font-bold font-display text-gray-200">
          {count}
        </span>

        {/* God Tooltip */}
        <div className={`absolute top-full ${tooltipPositionClass} w-64 p-3.5 bg-hades-bg-dark border border-white/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <GodIcon god={god} className="w-full h-full object-contain" />
              </div>
              <span className={`text-sm font-bold tracking-widest text-gray-200 ${/\d/.test(god) ? 'font-display' : 'font-sc normal-case'}`}>{god}</span>
            </div>
            <span className="text-[11px] font-bold font-display px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
              {count} {count === 1 ? 'Boon' : 'Boons'}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-xs bg-white/5 p-2 rounded-lg">
            <span className="text-[10px] text-gray-400 uppercase font-display tracking-wider font-semibold">Contributing Boons:</span>
            <div className="flex flex-col gap-1.5">
              {boons.map((boon, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {boon.element && (
                      <div className="w-4 h-4 flex-shrink-0">
                        <ElementIcon element={boon.element} className="w-full h-full" />
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
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 ml-1 h-6">
        <div className="flex items-center gap-2">
          <img src="/assets/ui/Icon-Olympian.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
          <span className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold">God Pool</span>
          {poolLimitExceeded && (
            <div className="flex items-center gap-2 group relative">
              <AlertTriangle className="w-3.5 h-3.5 text-hades-red animate-pulse cursor-help" />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 w-80 p-3 bg-hades-bg-dark border border-hades-red/30 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto z-[100] text-[11px] leading-relaxed text-gray-300 translate-x-2 group-hover:translate-x-0">
                {/* Invisible bridge to keep tooltip open while moving mouse */}
                <div className="absolute -left-4 top-0 bottom-0 w-4" />
                
                <div className="font-bold text-hades-red mb-1 flex items-center gap-1.5 font-display uppercase tracking-tighter">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  God Pool Warning
                </div>
                <div className="mb-1.5">Standard god pool exceeded!</div>
                Typically, only four Olympian gods (excluding Artemis, Athena, Dionysus, Hermes, and Hades) are included in the god pool each night. See{' '}
                <a 
                  href="https://hades.fandom.com/wiki/Boons/Hades_II#God_Pool" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-hades-accent hover:underline pointer-events-auto"
                >
                  wiki
                </a>{' '}
                for more details.
              </div>
            </div>
          )}
        </div>
        <OriginationTracker coreBuild={coreBuild} additionalBoons={additionalBoons} activeArcana={activeArcana} />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15 min-h-[42px] self-start w-fit">
        {godData.length === 0 ? (
          <span className="text-[11px] text-gray-500 font-display">No Gods in Pool</span>
        ) : (
          <>
            {standardGodsInPool.map(([god, count], idx) => 
              renderGodItem(god, count, idx, godData.length)
            )}
            
            {standardGodsInPool.length > 0 && supportGodsInPool.length > 0 && (
              <div className="w-px h-5 bg-white/20 self-center shrink-0" />
            )}
            
            {supportGodsInPool.map(([god, count], idx) => 
              renderGodItem(god, count, standardGodsInPool.length + idx, godData.length)
            )}
          </>
        )}
      </div>
    </div>
  );
}
