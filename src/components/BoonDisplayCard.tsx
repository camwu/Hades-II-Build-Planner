import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { Boon, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';

interface BoonDisplayCardProps {
  boon: Boon;
  onRemove: () => void;
  key?: any;
}

export function BoonDisplayCard({ boon, onRemove }: BoonDisplayCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rarityGlow = boon.type === 'Legendary' ? 'shadow-[0_0_20px_rgba(255,180,0,0.5)]' : 
                    boon.type === 'Duo' ? 'shadow-[0_0_20px_rgba(150,255,100,0.5)]' : '';

  return (
    <div className="h-[88px] w-full relative">
      <div 
        className="group absolute top-0 left-0 w-full transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? '440px' : '84px',
            height: isHovered ? 'auto' : '84px'
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`relative flex items-start w-full gap-4 transition-all duration-300 ${
            isHovered ? 'bg-hades-bg-dark/40 rounded-2xl' : ''
          }`}
        >
          {/* Background masking for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2xl" 
              />
            )}
          </AnimatePresence>

          {/* Icon Container */}
          <div className={`relative w-[84px] h-[84px] flex-shrink-0 transition-all duration-300 border-0`}>
            <div className={`w-full h-full relative rounded-[28%] ${rarityGlow}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain relative z-10" 
                referrerPolicy="no-referrer" 
              />
              {/* Overlapping icons */}
              <div className="absolute top-0 -right-0.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/10 transition-colors">
                <GodIcon god={boon.gods[0]} className="w-full h-full" />
              </div>
              {boon.element && (
                <div className="absolute bottom-0 -right-0.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/5 transition-colors">
                  <ElementIcon element={boon.element} className={`w-full h-full ${ELEMENT_COLORS[boon.element]}`} />
                </div>
              )}
              {/* Rarity Border */}
              <div className={`absolute inset-0 border-[3px] ${getBoonBorderColor(boon.type)} rounded-[28%] pointer-events-none z-10`} />
            </div>
          </div>

          <div className="overflow-hidden flex-1">
            <div className="w-[340px] h-full flex flex-col justify-center pr-4 py-3">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="text-[9px] font-mono text-hades-text/40 uppercase mb-0.5 font-bold">
                  {boon.type}
                </div>
                <h4 className={`text-sm font-black uppercase tracking-wider leading-tight ${getBoonColor(boon.type)}`}>
                  {boon.name}
                </h4>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal mt-1">
                  <FormattedBoonEffect text={boon.effect} />
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemove(); }}
                  className="absolute right-0 top-0 p-1 hover:text-hades-red text-gray-700 hover:bg-hades-red/10 rounded transition-all"
                  title="Remove Boon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
