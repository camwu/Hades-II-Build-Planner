import React from 'react';
import { motion } from 'motion/react';
import { useDraggable } from '@dnd-kit/core';
import { Boon, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';

export function StaticBoonListItem({ boon, isOverlay = false }: { boon: Boon; isOverlay?: boolean }) {
  const borderColor = getBoonBorderColor(boon.type);
  const rarityGlow = '';
  
  return (
    <div className={`p-3 rounded-xl transition-all duration-150 transform-gpu ${
      isOverlay ? 'bg-hades-bg-light shadow-2xl z-50' : 'bg-hades-bg-dark/80 border border-white/10 hover:border-white/20 group-hover:border-white/20'
    }`}>
      <div className="flex items-start gap-4 transform-gpu">
        <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING}`}>
          {boon.icon ? (
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${borderColor} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center p-1 ${BOON_BORDER_WIDTH} border-white/5 ${BOON_ICON_ROUNDING} opacity-40`}>
              <GodIcon god={boon.gods[0]} className="w-10 h-10" />
            </div>
          )}
          {boon.element && boon.type !== 'Infusion' && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-hades-bg-dark rounded-full p-0.5 border border-hades-border shadow-lg z-20">
              <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className={`text-sm font-bold uppercase truncate ${getBoonColor(boon.type)}`}>
              {boon.name}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <GodIcon god={boon.gods[0]} className="w-3 h-3" />
              <span className="text-[10px] font-mono text-hades-text/70 uppercase leading-none">
                {boon.gods[0]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-hades-accent/70 uppercase leading-none font-bold">
                {boon.type}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-gray-400 leading-normal font-medium mt-2">
        <FormattedBoonEffect text={boon.effect} />
      </p>
    </div>
  );
}

export function DraggableBoonListItem({ boon, onClick, isSelectable }: { boon: Boon; onClick?: () => void; isSelectable?: boolean; key?: any }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boon.id,
  });
  
  return (
    <motion.div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
      transition={{ 
        type: 'tween', 
        ease: "easeOut",
        duration: 0.1
      }}
      className={`relative group transition-all duration-75 transform-gpu backface-hidden ${
        isDragging 
          ? 'opacity-20 pointer-events-none' 
          : isSelectable
            ? 'cursor-pointer'
            : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <StaticBoonListItem boon={boon} />
      {/* Selection indicator only for selectable items */}
      {isSelectable && (
        <div className="absolute inset-0 rounded-xl border-2 border-hades-accent/30 group-hover:border-hades-accent pointer-events-none transition-colors duration-75" />
      )}
    </motion.div>
  );
}
