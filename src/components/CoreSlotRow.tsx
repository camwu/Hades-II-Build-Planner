import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Plus, X } from 'lucide-react';
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
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: slot.type,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging
  } = useDraggable({
    id: boon?.id || `empty-${slot.type}`,
    disabled: !boon,
    data: {
      type: 'core',
      slot: slot.type,
      boon
    }
  });

  const [isHovered, setIsHovered] = useState(false);

  const isPotentialTarget = draggedBoon && isValid;
  const shouldHighlight = isOver && isPotentialTarget;
  const shouldDim = draggedBoon && !isValid;
  const isExpanded = (boon ? isActive : false) || isOver || isHovered;

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const renderSlotIcon = () => {
    if (boon) {
      const rarityGlow = '';
      
      return (
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${BOON_ICON_ROUNDING} overflow-hidden`}>
            <motion.img 
              key={boon.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={boon.icon} 
              alt={boon.name} 
              className="w-full h-full object-contain relative z-10" 
              referrerPolicy="no-referrer" 
            />
          </div>
          {/* Overlapping Icons */}
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
          {/* Rarity Border - Tightly matched to frame */}
          <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${getBoonBorderColor(boon.type)} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
        </div>
      );
    }
    
    if (typeof slot.icon === 'string') {
      const isSlotGlowActive = isActive || shouldHighlight || isPotentialTarget;
      return (
        <div className={`absolute inset-0 ${BOON_ICON_ROUNDING} overflow-hidden`}>
          <img 
            src={slot.icon} 
            alt={slot.name} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-200 ${isSlotGlowActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} 
            referrerPolicy="no-referrer" 
          />
        </div>
      );
    }
    const IconComponent = slot.icon;
    const isSlotGlowActive = isActive || shouldHighlight || isPotentialTarget;
    return (
      <div className={`absolute inset-0 flex items-center justify-center p-5 ${BOON_BORDER_WIDTH} border-white/5 ${BOON_ICON_ROUNDING} overflow-hidden`}>
        <IconComponent className={`w-full h-full transition-all duration-100 text-gray-500 ${isSlotGlowActive ? 'opacity-80 text-emerald-400' : 'opacity-30 group-hover:opacity-50'}`} />
      </div>
    );
  };

  return (
    <div className="relative" style={{ width: SLOT_COLLAPSED_WIDTH, height: SLOT_COLLAPSED_WIDTH }}>
      <div 
        ref={setDroppableRef}
        className={`group flex flex-col items-start absolute top-0 left-0 transition-opacity duration-100 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none' : ''}`}
        style={{ zIndex: isExpanded ? 50 : 10 }}
      >
        <motion.div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          initial={false}
          animate={{ 
            width: isExpanded ? SLOT_EXPANDED_WIDTH : SLOT_COLLAPSED_WIDTH,
            height: isExpanded ? 'auto' : SLOT_COLLAPSED_WIDTH
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          className={`relative flex items-start gap-4 cursor-pointer transition-[background-color,border-radius] duration-200 ${
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
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-2xl z-[-1] border border-white/5" 
              />
            )}
          </AnimatePresence>
          
          <div 
            ref={setDraggableRef}
            style={{ 
              width: SLOT_COLLAPSED_WIDTH, 
              height: SLOT_COLLAPSED_WIDTH,
              ...style
            }}
            {...attributes}
            {...listeners}
            className={`relative flex-shrink-0 flex items-center justify-center ${BOON_ICON_ROUNDING} transition-[background-color,box-shadow,ring] duration-200`}
          >
            <AnimatePresence>
              {(shouldHighlight || isActive || isPotentialTarget) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 rounded-[inherit] bg-emerald-950/30 ring-[3px] ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.8)] animate-ring-pulse z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} z-30`}>
              {renderSlotIcon()}
            </div>
          </div>

          <div className={`flex-1 ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="w-[340px] flex flex-col justify-center pr-4 py-3 min-h-[84px]">
              {boon ? (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
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
              ) : (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  className="relative"
                >
                  <div className="text-sm font-black uppercase tracking-wider leading-tight text-hades-accent mb-1 font-display">
                    {slot.name}
                  </div>
                  <p className="text-[12px] text-white/40 leading-normal font-normal mt-1">
                    Click to select boon or drag and drop from sidebar
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
