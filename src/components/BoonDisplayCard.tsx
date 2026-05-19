import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
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
          transition={{ duration: 0.1, ease: "easeOut" }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          className={`relative flex items-start gap-4 transition-all duration-300 ${
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
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5 shadow-2xl" 
              />
            )}
          </AnimatePresence>
 
          {/* Icon Container */}
          <div 
            style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}
            className="relative flex-shrink-0 transition-all duration-300 border-0"
          >
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
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
              {boon.element && boon.type !== 'Infusion' && (
                <div className="absolute bottom-0 -right-0.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/5 transition-colors">
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
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
