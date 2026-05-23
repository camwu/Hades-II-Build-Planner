import React, { useMemo } from 'react';
import { Boon, ElementType, ALL_ELEMENTS, ELEMENT_COLORS } from '../types';
import { ElementIcon, GodIcon } from './Icons';
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

  const contributingBoons = useMemo(() => {
    const map = {} as Record<ElementType, Boon[]>;
    ALL_ELEMENTS.forEach(el => map[el] = []);
    
    const addBoon = (b: Boon | null) => {
      if (b?.element && b.type !== 'Infusion') {
        map[b.element].push(b);
      }
    };

    Object.values(coreBuild).forEach(addBoon);
    additionalBoons.forEach(addBoon);

    return map;
  }, [coreBuild, additionalBoons]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 ml-1 h-6">
        <img src="/assets/ui/ElementalEssence.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
        <span className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold">Elemental Essences</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15 min-h-[42px] self-start w-fit">
        {ALL_ELEMENTS.map((el, index) => {
          const count = counts[el];
          const boons = contributingBoons[el] || [];
          
          let tooltipPositionClass = "left-1/2 -translate-x-1/2 mt-2";
          if (index === 0) {
            tooltipPositionClass = "left-0 mt-2";
          } else if (index === ALL_ELEMENTS.length - 1) {
            tooltipPositionClass = "right-0 mt-2";
          } else if (index === 1 && ALL_ELEMENTS.length > 3) {
            tooltipPositionClass = "left-0 mt-2";
          } else if (index === ALL_ELEMENTS.length - 2 && ALL_ELEMENTS.length > 3) {
            tooltipPositionClass = "right-0 mt-2";
          }
          
          return (
            <div key={el} className="group relative flex items-center gap-2 cursor-help">
              <div className={`w-6 h-6 flex items-center justify-center z-20 transition-all duration-300 ${
                count > 0 
                  ? `${ELEMENT_COLORS[el]}` 
                  : 'text-gray-600 opacity-40'
              }`}>
                <ElementIcon element={el} className="w-full h-full" />
              </div>
              <span className={`text-sm font-bold font-display transition-colors duration-300 ${count > 0 ? 'text-gray-200' : 'text-gray-600'}`}>
                {count}
              </span>

              {/* Element Tooltip */}
              <div className={`absolute top-full ${tooltipPositionClass} w-64 p-3.5 bg-hades-bg-dark border border-white/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${ELEMENT_COLORS[el]}`}>
                      <ElementIcon element={el} className="w-full h-full" />
                    </div>
                    <span className={`text-sm font-bold tracking-widest text-gray-200 ${/\d/.test(el) ? 'font-display' : 'font-sc normal-case'}`}>{el}</span>
                  </div>
                  <span className={`text-[11px] font-bold font-display px-1.5 py-0.5 rounded ${
                    count > 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-gray-500'
                  }`}>
                    {count} {count === 1 ? 'Boon' : 'Boons'}
                  </span>
                </div>
                {count > 0 ? (
                  <div className="flex flex-col gap-1.5 text-xs bg-white/5 p-2 rounded-lg">
                    <span className="text-[10px] text-gray-400 uppercase font-display tracking-wider font-semibold">Contributing Boons:</span>
                    <div className="flex flex-col gap-1.5">
                      {boons.map((boon, idx) => (
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
                ) : (
                  <div className="text-xs text-gray-400 bg-white/[0.02] p-2 rounded-lg text-center font-display">
                    No active boons
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
