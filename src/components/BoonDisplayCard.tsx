import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Boon, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedEffectText } from './FormattedEffectText';
import { 
  BOON_ICON_ROUNDING, 
  BOON_BORDER_WIDTH,
  SLOT_COLLAPSED_WIDTH,
  SLOT_EXPANDED_WIDTH 
} from '../constants';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface BoonDisplayCardProps {
  boon: Boon;
  onRemove: () => void;
  isSorting?: boolean;
  key?: string | number;
}

export function SortableBoonDisplayCard({ boon, onRemove }: BoonDisplayCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: boon.id,
    data: {
      type: 'sortable',
      boon
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 100 : undefined
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BoonDisplayCard boon={boon} onRemove={onRemove} isSorting={true} />
    </div>
  );
}

export function BoonDisplayCard({ boon, onRemove, isSorting }: BoonDisplayCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rarityGlow = '';

  return (
    <div className="relative" style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}>
      <div 
        className="group absolute top-0 left-0 transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isHovered ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          className={`relative flex items-start gap-4 transition-[background-color,border-radius] duration-200 ${
            isHovered ? 'bg-hades-bg-dark/40 rounded-2xl' : 'pointer-events-auto'
          }`}
        >
          {/* Background masking for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2xl" 
              />
            )}
          </AnimatePresence>
 
          {/* Icon Container */}
          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className="relative flex-shrink-0 transition-none border-0"
          >
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain relative z-10" 
                referrerPolicy="no-referrer" 
              />
              {/* Overlapping icons */}
              <div className={`absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border-2 ${getBoonBorderColor(boon.type)} transition-colors`}>
                <GodIcon god={boon.gods[0]} className="w-full h-full" />
              </div>
              {boon.gods[1] && (
                <div className={`absolute top-[28px] -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border-2 ${getBoonBorderColor(boon.type)} transition-colors animate-fade-in`}>
                  <GodIcon god={boon.gods[1]} className="w-full h-full" />
                </div>
              )}
              {boon.element && boon.type !== 'Infusion' && (
                <div className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border-2 ${getBoonBorderColor(boon.type)} transition-colors`}>
                  <ElementIcon element={boon.element} className={`w-full h-full ${ELEMENT_COLORS[boon.element]}`} />
                </div>
              )}
              {/* Rarity Border */}
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${getBoonBorderColor(boon.type)} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
            </div>
          </div>

          <div className={`flex-1 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className={`text-base font-bold normal-case tracking-wide leading-tight font-sc ${getBoonColor(boon.type)}`}>
                    {boon.name}
                  </h4>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[9px] font-display text-hades-accent/80 uppercase leading-none font-bold bg-hades-accent/10 px-1.5 py-[3px] rounded border border-hades-accent/20 flex-shrink-0">
                      {boon.type}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRemove(); }}
                      className="text-hades-red/70 hover:text-hades-red bg-hades-red/5 hover:bg-hades-red/15 rounded border border-hades-red/10 hover:border-hades-red/20 transition-all flex items-center justify-center h-[17px] w-[17px] flex-shrink-0"
                      title="Remove Boon"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal">
                  <FormattedEffectText text={boon.effect} />
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
