import React from 'react';
import { motion } from 'motion/react';
import { useDraggable } from '@dnd-kit/core';
import { Boon, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';

export function StaticBoonListItem({ boon, isOverlay = false }: { boon: Boon; isOverlay?: boolean }) {
  const borderColor = isOverlay ? 'border-hades-accent' : getBoonBorderColor(boon.type);
  const rarityGlow = boon.type === 'Legendary' ? 'shadow-[0_0_15px_rgba(255,180,0,0.4)]' : 
                    boon.type === 'Duo' ? 'shadow-[0_0_15px_rgba(150,255,100,0.4)]' : '';
  
  return (
    <div className={`p-3 rounded-xl transition-all duration-75 transform-gpu ${
      isOverlay ? 'bg-hades-bg-light shadow-2xl scale-[1.02] z-50' : 'bg-hades-bg-dark/40 border border-white/[0.03]'
    }`}>
      <div className="flex items-start gap-4 transform-gpu">
        <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 ${
          isOverlay ? `bg-white ${BOON_ICON_ROUNDING}` : `bg-hades-bg-dark ${BOON_ICON_ROUNDING}`
        }`}>
          {boon.icon ? (
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING} ${rarityGlow}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${borderColor} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center p-1 ${BOON_BORDER_WIDTH} border-[#26262f] ${BOON_ICON_ROUNDING} opacity-40`}>
              <GodIcon god={boon.gods[0]} className="w-10 h-10" />
            </div>
          )}
          {boon.element && (
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
              <span className="text-[10px] font-mono text-gray-500 uppercase leading-none">
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
      <p className="text-[11px] text-gray-400 leading-relaxed font-light line-clamp-2 mt-2">
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
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.98, x: 2 }}
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
