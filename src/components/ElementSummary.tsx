import React, { useMemo } from 'react';
import { Boon, ElementType, ALL_ELEMENTS, ELEMENT_COLORS } from '../types';
import { ElementIcon } from './Icons';
import { BOON_ICON_ROUNDING } from '../constants';

interface ElementSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
}

export function ElementSummary({ coreBuild, additionalBoons }: ElementSummaryProps) {
  const counts = useMemo(() => {
    const summary = {} as Record<ElementType, number>;
    ALL_ELEMENTS.forEach(el => summary[el] = 0);
    
    // Core
    Object.values(coreBuild).forEach(b => {
      if (b?.element && b.type !== 'Infusion') summary[b.element]++;
    });

    // Additional
    additionalBoons.forEach(b => {
      if (b?.element && b.type !== 'Infusion') summary[b.element]++;
    });

    return summary;
  }, [coreBuild, additionalBoons]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-widest text-hades-accent font-bold ml-1">Elemental Infusions</span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15">
        {ALL_ELEMENTS.map((el) => {
        const count = counts[el];
        return (
          <div key={el} className="flex items-center gap-2">
            <div className={`w-7 h-7 ${BOON_ICON_ROUNDING} bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border transition-all duration-300 ${
              count > 0 
                ? `${ELEMENT_COLORS[el]} border-white/10 shadow-[0_0_15px_-5px_currentColor]` 
                : 'text-gray-600 border-white/5 opacity-40'
            }`}>
              <ElementIcon element={el} className="w-full h-full" />
            </div>
            <span className={`text-sm font-bold font-mono transition-colors duration-300 ${count > 0 ? 'text-gray-200' : 'text-gray-600'}`}>
              {count}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
}
