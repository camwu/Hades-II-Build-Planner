import React, { useMemo } from 'react';
import { Boon, ElementType, ALL_ELEMENTS, ELEMENT_COLORS } from '../types';
import { ElementIcon } from './Icons';
import { BOON_ICON_ROUNDING } from '../constants';

interface ElementSummaryProps {
  coreBuild: Record<string, Boon | null>;
  additionalBoons: Boon[];
}

const ELEMENT_DESCRIPTIONS: Record<ElementType, string> = {
  Earth: 'Associated with defensive, sturdy, and physical capabilities. Primarily found on boons from Demeter, Hera, or Hephaestus.',
  Water: 'Associated with healing, crowd control, and pure physical impact. Primarily found on boons from Poseidon, Hera, or Aphrodite.',
  Air: 'Associated with speed, swift strikes, and chain lightning. Primarily found on boons from Zeus, Apollo, or Hermes.',
  Fire: 'Associated with destructive force, explosive attacks, and residual combustion. Primarily found on boons from Hestia or Hephaestus.',
  Aether: 'Associated with cosmic connection, legendaries, and complex synergies. Found on rare, high-tier, or transcendent boons.'
};

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
      <div className="flex items-center gap-2 ml-1">
        <img src="/assets/ui/ElementalEssence.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
        <span className="text-xs font-mono uppercase tracking-widest text-hades-accent font-bold">Elements</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-2 rounded-2xl bg-hades-bg-dark/70 border border-white/15">
        {ALL_ELEMENTS.map((el) => {
          const count = counts[el];
          const boons = contributingBoons[el] || [];
          
          return (
            <div key={el} className="group relative flex items-center gap-2 cursor-help">
              <div className={`w-6 h-6 flex items-center justify-center z-20 transition-all duration-300 ${
                count > 0 
                  ? `${ELEMENT_COLORS[el]}` 
                  : 'text-gray-600 opacity-40'
              }`}>
                <ElementIcon element={el} className="w-full h-full" />
              </div>
              <span className={`text-sm font-bold font-mono transition-colors duration-300 ${count > 0 ? 'text-gray-200' : 'text-gray-600'}`}>
                {count}
              </span>

              {/* Element Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-hades-bg-dark border border-white/15 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${ELEMENT_COLORS[el]}`}>
                      <ElementIcon element={el} className="w-full h-full" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-200">{el}</span>
                  </div>
                  <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    count > 0 ? 'bg-amber-500/15 text-amber-300' : 'bg-white/5 text-gray-500'
                  }`}>
                    {count} Active
                  </span>
                </div>
                
                <p className="text-[10px] text-gray-400 leading-relaxed mb-3">
                  {ELEMENT_DESCRIPTIONS[el]}
                </p>

                {count > 0 ? (
                  <div className="flex flex-col gap-1 text-[9px] bg-white/5 p-2 rounded-lg">
                    <span className="text-gray-500 uppercase font-mono tracking-wider">Boons in Build:</span>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1">
                      {boons.map((boon, idx) => (
                        <div key={idx} className="flex justify-between items-center gap-2">
                          <span className="font-bold text-gray-200 truncate">{boon.name}</span>
                          <span className="text-[8px] text-gray-500">{boon.gods.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-[9px] text-gray-500 bg-white/[0.02] p-2 rounded-lg text-center font-mono">
                    No active boons of this element
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
