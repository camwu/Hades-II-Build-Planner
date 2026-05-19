import React, { useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Boon, GOD_COLORS } from '../types';
import { GodIcon } from './Icons';
import { BOON_ICON_ROUNDING } from '../constants';

interface GodSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
}

const EXCLUDED_GODS = ['Artemis', 'Athena', 'Dionysus', 'Hermes', 'Hades', 'Chaos'];

export function GodSummary({ coreBuild, additionalBoons }: GodSummaryProps) {
  const { godData, poolLimitExceeded } = useMemo(() => {
    const summary = {} as Record<string, number>;
    
    const addGods = (boon: Boon | null) => {
      if (boon?.gods) {
        boon.gods.forEach(god => {
          summary[god] = (summary[god] || 0) + 1;
        });
      }
    };

    Object.values(coreBuild).forEach(addGods);
    additionalBoons.forEach(addGods);

    const sortedData = Object.entries(summary)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    const olympians = sortedData.filter(([god]) => !EXCLUDED_GODS.includes(god));
    
    return {
      godData: sortedData,
      poolLimitExceeded: olympians.length > 4
    };
  }, [coreBuild, additionalBoons]);

  if (godData.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 ml-1">
        <span className="text-xs font-mono uppercase tracking-widest text-hades-accent font-bold">God Pool</span>
        {poolLimitExceeded && (
          <div className="flex items-center gap-2 group relative">
            <AlertCircle className="w-3.5 h-3.5 text-hades-red animate-pulse cursor-help" />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-80 p-3 bg-hades-bg-dark border border-hades-red/30 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto z-[100] text-[11px] leading-relaxed text-gray-300 translate-x-2 group-hover:translate-x-0">
              {/* Invisible bridge to keep tooltip open while moving mouse */}
              <div className="absolute -left-4 top-0 bottom-0 w-4" />
              
              <div className="font-bold text-hades-red mb-1 flex items-center gap-1.5 font-mono uppercase tracking-tighter">
                <AlertCircle className="w-3 h-3" />
                God Pool Warning
              </div>
              Typically, only four Olympian gods (excluding Artemis, Athena, Dionysus, and Hermes) are included in the god pool each night. See{' '}
              <a 
                href="https://hades.fandom.com/wiki/Boons/Hades_II#God_Pool" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-hades-accent hover:underline pointer-events-auto"
              >
                wiki
              </a>{' '}
              for more info.
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15">
        {godData.map(([god, count]) => {
          const godColor = GOD_COLORS[god] || 'text-gray-400';
          return (
            <div key={god} className="flex items-center gap-2">
              <div className={`w-7 h-7 ${BOON_ICON_ROUNDING} bg-hades-bg-dark shadow-xl flex items-center justify-center p-0.5 z-20 border border-white/10 transition-all duration-300 ${godColor} shadow-[0_0_15px_-5px_currentColor]`}>
                <GodIcon god={god} className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-bold font-mono text-gray-200">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
