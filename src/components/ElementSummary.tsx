import React, { useMemo } from 'react';
import { Boon, ElementType, ALL_ELEMENTS, ELEMENT_COLORS } from '../types';
import { ElementIcon } from './Icons';

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
      if (b?.element) summary[b.element]++;
    });

    // Additional
    additionalBoons.forEach(b => {
      if (b?.element) summary[b.element]++;
    });

    return summary;
  }, [coreBuild, additionalBoons]);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-4 rounded-xl bg-hades-panel/40 border border-hades-border/40">
      {ALL_ELEMENTS.map((el) => {
        const count = counts[el];
        return (
          <div key={el} className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded bg-hades-bg-main border border-hades-border/50 transition-all duration-300 ${count > 0 ? `${ELEMENT_COLORS[el]} shadow-[0_0_10px_-2px_currentColor]` : 'text-gray-600 opacity-40'}`}>
              <ElementIcon element={el} className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className={`text-base font-bold font-mono transition-colors duration-300 ${count > 0 ? 'text-gray-100' : 'text-gray-600'}`}>{count}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
