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
        </div>
        
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className={`text-sm font-bold uppercase truncate ${getBoonColor(boon.type)}`}>
              {boon.name}
            </h4>
            <span className="text-[9px] font-mono text-hades-accent/80 uppercase leading-none font-bold bg-hades-accent/10 px-1.5 py-0.5 rounded border border-hades-accent/20 flex-shrink-0">
              {boon.type}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {boon.gods.map((god, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <GodIcon god={god} className="w-3 h-3" />
                  <span className="text-[10px] font-mono text-hades-text/70 uppercase leading-none">
                    {god}
                  </span>
                </div>
              ))}
            </div>
            {boon.element ? (
              <div className="flex items-center gap-1.5">
                <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
                <span className="text-[10px] font-mono text-hades-text/70 uppercase leading-none">
                  {boon.element}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 opacity-40">
                <span className="text-[10px] font-mono text-gray-500 uppercase leading-none">
                  No Element
                </span>
              </div>
            )}
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
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.98 }}
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
