import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable } from '@dnd-kit/core';
import { Plus, Trash2 } from 'lucide-react';
import { Boon, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { 
  BOON_ICON_ROUNDING, 
  BOON_BORDER_WIDTH,
  SLOT_COLLAPSED_WIDTH,
  SLOT_EXPANDED_WIDTH 
} from '../constants';

interface CoreSlotRowProps {
  slot: { type: string; name: string; icon: any };
  boon: Boon | null;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
  draggedBoon: Boon | null;
  isValid: boolean;
  key?: any;
}

export function CoreSlotRow({ slot, boon, isActive, onClick, onRemove, draggedBoon, isValid }: CoreSlotRowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: slot.type,
  });

  const [isHovered, setIsHovered] = useState(false);

  const isPotentialTarget = draggedBoon && isValid;
  const shouldHighlight = isOver && isPotentialTarget;
  const shouldDim = draggedBoon && !isValid;
  const isExpanded = isActive || isOver || isHovered;

  const renderSlotIcon = () => {
    if (boon) {
      const rarityGlow = boon.type === 'Legendary' ? 'shadow-[0_0_20px_rgba(255,180,0,0.5)]' : 
                        boon.type === 'Duo' ? 'shadow-[0_0_20px_rgba(150,255,100,0.5)]' : '';
      
      return (
        <div className={`absolute inset-0 ${BOON_ICON_ROUNDING} ${rarityGlow}`}>
          <motion.img 
            key={boon.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={boon.icon} 
            alt={boon.name} 
            className="w-full h-full object-contain relative z-10" 
            referrerPolicy="no-referrer" 
          />
          {/* Overlapping Icons */}
          <div className="absolute top-0 -right-0.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/10 transition-colors">
            <GodIcon god={boon.gods[0]} className="w-full h-full" />
          </div>
          {boon.element && (
            <div className="absolute bottom-0 -right-0.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/5 transition-colors">
              <ElementIcon element={boon.element} className={`w-full h-full ${ELEMENT_COLORS[boon.element]}`} />
            </div>
          )}
          {/* Rarity Border - Tightly matched to frame */}
          <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${getBoonBorderColor(boon.type)} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
        </div>
      );
    }
    
    if (typeof slot.icon === 'string') {
      return (
        <img 
          src={slot.icon} 
          alt={slot.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-200" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = slot.icon;
    return (
      <div className={`absolute inset-0 flex items-center justify-center p-5 ${BOON_BORDER_WIDTH} border-[#26262f] ${BOON_ICON_ROUNDING}`}>
        <IconComponent className="w-full h-full opacity-30 group-hover:opacity-50 transition-all duration-100 text-gray-500" />
      </div>
    );
  };

  return (
    <div className="h-[88px] w-full relative">
      <div 
        className={`group flex flex-col items-start absolute top-0 left-0 transition-opacity duration-100 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isExpanded ? 50 : 10 }}
      >
        <motion.div 
          ref={setNodeRef}
          onClick={onClick}
          initial={false}
          animate={{ 
            width: isExpanded ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isExpanded ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`relative flex items-start gap-4 cursor-pointer transition-all duration-300 ${
            isExpanded ? 'bg-hades-bg-dark/40 rounded-2xl' : ''
          }`}
        >
          {/* Background masking for unfurled state */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5" 
              />
            )}
          </AnimatePresence>
          
          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className={`relative flex-shrink-0 flex items-center justify-center ${BOON_ICON_ROUNDING} transition-all duration-300 ${
            shouldHighlight 
              ? `bg-hades-accent/20 ${BOON_BORDER_WIDTH} border-hades-accent border-solid shadow-[0_0_40px_rgba(16,185,129,0.4)] z-50` 
              : isPotentialTarget
                ? `bg-hades-accent/10 ${BOON_BORDER_WIDTH} border-hades-accent/40 border-dashed animate-pulse z-40`
                : isActive
                  ? `bg-hades-accent/5 ${BOON_BORDER_WIDTH} border-hades-accent border-solid z-50`
                  : 'border-0'
          }`}>
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
              {renderSlotIcon()}
            </div>
          </div>

          <div className="overflow-hidden flex-1">
            <div className="w-[340px] h-full flex flex-col justify-center pr-4 py-3">
              {boon ? (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  className="relative"
                >
                  <div className="text-[9px] font-mono text-hades-text/40 uppercase mb-0.5 font-bold">
                    {slot.name}
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
              ) : (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  className="flex items-center gap-3"
                >
                  <Plus className={`w-5 h-5 ${isActive ? 'text-hades-accent scale-110' : 'text-gray-800 opacity-40'}`} />
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-mono uppercase font-bold ${isActive ? 'text-hades-accent' : 'text-hades-accent/40'}`}>
                      {slot.name}
                    </span>
                    <span className="text-[9px] font-mono text-gray-700 uppercase">
                      Empty Slot
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
