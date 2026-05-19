import React, { useMemo } from 'react';
import { Boon, GOD_COLORS } from '../types';
import { GodIcon } from './Icons';
import { BOON_ICON_ROUNDING } from '../constants';

interface GodSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
}

export function GodSummary({ coreBuild, additionalBoons }: GodSummaryProps) {
  const godData = useMemo(() => {
    const summary = {} as Record<string, number>;
    
    // Helper to add gods from a boon
    const addGods = (boon: Boon | null) => {
      if (boon?.gods) {
        boon.gods.forEach(god => {
          summary[god] = (summary[god] || 0) + 1;
        });
      }
    };

    // Core
    Object.values(coreBuild).forEach(addGods);

    // Additional
    additionalBoons.forEach(addGods);

    // Convert to sorted array of [god, count] only for gods with counts > 0
    return Object.entries(summary)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  }, [coreBuild, additionalBoons]);

  if (godData.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-mono uppercase tracking-widest text-hades-accent/60 font-bold ml-1">God Pool</span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/40 border border-white/5">
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
