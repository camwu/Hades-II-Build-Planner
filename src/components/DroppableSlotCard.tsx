import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable } from '@dnd-kit/core';
import { Boon } from '../types';
import { 
  BOON_ICON_ROUNDING, 
  BOON_BORDER_WIDTH,
  SLOT_COLLAPSED_WIDTH,
  SLOT_EXPANDED_WIDTH 
} from '../constants';

interface DroppableSlotCardProps {
  id: string;
  slot: string;
  name: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
  draggedBoon: Boon | null;
  isValid: boolean;
}

export function DroppableSlotCard({ id, name, icon, isActive, onClick, draggedBoon, isValid }: DroppableSlotCardProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const [isHovered, setIsHovered] = useState(false);
  const isPotentialTarget = draggedBoon && isValid;
  const shouldHighlight = isOver && isPotentialTarget;
  const shouldDim = draggedBoon && !isValid;
  const isExpanded = false || isOver || isHovered;

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <img 
          src={icon} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-200" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = icon;
    return (
      <div className={`absolute inset-0 flex items-center justify-center p-5 ${BOON_BORDER_WIDTH} border-white/5 ${BOON_ICON_ROUNDING}`}>
        <IconComponent className="w-full h-full opacity-30 group-hover:opacity-50 transition-all duration-100 text-gray-500" />
      </div>
    );
  };

  return (
    <div className="h-[88px] relative" style={{ width: SLOT_COLLAPSED_WIDTH }}>
      <div 
        className={`group flex flex-col absolute top-0 left-0 transition-opacity duration-100 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none' : ''}`}
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
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          className={`relative flex items-start gap-4 cursor-pointer transition-all duration-300 ${
            isExpanded ? 'bg-hades-bg-dark/40 rounded-2xl' : 'pointer-events-auto'
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative flex-shrink-0 flex items-center justify-center ${BOON_ICON_ROUNDING} transition-all duration-300 ${
             shouldHighlight 
               ? `bg-white/10 ${BOON_BORDER_WIDTH} border-white/40 border-solid shadow-[0_0_40px_rgba(255,255,255,0.4)] z-50` 
               : isPotentialTarget
                 ? `bg-white/5 ${BOON_BORDER_WIDTH} border-white/20 border-dashed animate-pulse z-40`
                 : isActive 
                   ? `bg-white/5 ${BOON_BORDER_WIDTH} border-white/40 border-solid z-50` 
                   : `${BOON_BORDER_WIDTH} border-transparent`
          }`}>
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} overflow-hidden`}>
              {renderIcon()}
            </div>
          </div>

          <div className={`flex-1 ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              <motion.div 
                initial={false}
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                className="relative"
              >
                <div className="text-sm font-black uppercase tracking-wider leading-tight text-hades-accent mb-1">
                  {name}
                </div>
                <p className="text-[12px] text-white/40 leading-normal font-normal mt-1">
                  Click to select boon or drag and drop from sidebar
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
