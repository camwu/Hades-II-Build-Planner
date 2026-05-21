import React from 'react';
import { motion } from 'motion/react';
import { useDraggable } from '@dnd-kit/core';
import { Lock } from 'lucide-react';
import { Boon, BoonPrerequisite, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { BOONS } from '../data/boonsData';

function formatPrerequisiteDescription(prereq: BoonPrerequisite) {
  const description = prereq.description;
  const requiredBoonNames = prereq.boonIds
    .map(id => BOONS.find(b => b.id === id)?.name)
    .filter((name): name is string => !!name);

  if (requiredBoonNames.length === 0) {
    return <span className="font-medium">{description}</span>;
  }

  // Create a regex pattern that matches exactly any of the required boon names
  const pattern = new RegExp(`(${requiredBoonNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = description.split(pattern);

  return (
    <span className="font-medium">
      {parts.map((part, index) => {
        if (requiredBoonNames.includes(part)) {
          return (
            <strong key={index} className="font-bold text-hades-text">
              {part}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export function StaticBoonListItem({ 
  boon, 
  isOverlay = false, 
  isLocked = false, 
  unmetPrerequisites = [] 
}: { 
  boon: Boon; 
  isOverlay?: boolean; 
  isLocked?: boolean; 
  unmetPrerequisites?: BoonPrerequisite[]; 
}) {
  const borderColor = getBoonBorderColor(boon.type);
  
  return (
    <div className={`p-3 rounded-xl transition-all duration-150 transform-gpu ${
      isOverlay 
        ? 'bg-hades-bg-light shadow-2xl z-50' 
        : 'bg-hades-bg-dark/80 border border-white/10 hover:border-white/20 group-hover:border-white/20'
    } ${isLocked ? 'border-red-950/45 bg-hades-bg-dark/60 shadow-[inset_0_0_12px_rgba(220,38,38,0.06)]' : ''}`}>
      <div className={`flex items-start gap-4 transform-gpu transition-opacity duration-150 ${isLocked ? 'opacity-50 saturate-[0.7]' : ''}`}>
        <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING}`}>
          {boon.icon ? (
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${isLocked ? 'border-red-900/40' : borderColor} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
              {isLocked && (
                <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center rounded-xl z-20">
                  <Lock className="w-5 h-5 text-red-500/80" />
                </div>
              )}
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center p-1 ${BOON_BORDER_WIDTH} border-white/5 ${BOON_ICON_ROUNDING} opacity-40`}>
              <GodIcon god={boon.gods[0]} className="w-10 h-10" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className={`text-sm font-bold uppercase truncate ${isLocked ? 'text-gray-500' : getBoonColor(boon.type)}`}>
              {boon.name}
            </h4>
            <span className={`text-[9px] font-mono uppercase leading-none font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${
              isLocked 
                ? 'bg-red-950/25 border-red-900/20 text-red-100/50' 
                : 'bg-hades-accent/10 border-hades-accent/20 text-hades-accent/80'
            }`}>
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
      <p className={`text-[12px] text-gray-400 leading-normal font-medium mt-2 transition-opacity duration-150 ${isLocked ? 'opacity-50 saturate-[0.7]' : ''}`}>
        <FormattedBoonEffect text={boon.effect} />
      </p>

      {isLocked && unmetPrerequisites.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-red-950/45 flex flex-col gap-1.5 text-xs font-sans text-gray-400">
          {unmetPrerequisites.map((prereq, index) => (
            <div key={index} className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0" />
              <span className="font-semibold text-red-400/80">Locked:</span>
              {formatPrerequisiteDescription(prereq)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DraggableBoonListItem({ 
  boon, 
  onClick, 
  isSelectable,
  isLocked = false,
  unmetPrerequisites = []
}: { 
  boon: Boon; 
  onClick?: () => void; 
  isSelectable?: boolean; 
  isLocked?: boolean;
  unmetPrerequisites?: BoonPrerequisite[];
  key?: any 
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boon.id,
    disabled: isLocked, // Disable dragging if locked
  });
  
  return (
    <motion.div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={isLocked ? undefined : onClick}
      whileHover={isLocked ? {} : { x: 6 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500,
        damping: 30
      }}
      className={`relative group transition-opacity duration-150 transform-gpu backface-hidden ${
        isDragging 
          ? 'opacity-20 pointer-events-none' 
          : isLocked
            ? 'cursor-not-allowed select-none'
            : isSelectable
              ? 'cursor-pointer'
              : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <StaticBoonListItem 
        boon={boon} 
        isLocked={isLocked} 
        unmetPrerequisites={unmetPrerequisites} 
      />
      {/* Selection indicator only for selectable, unlocked items */}
      {isSelectable && !isLocked && (
        <div className="absolute inset-0 rounded-xl border-2 border-hades-accent/30 group-hover:border-hades-accent pointer-events-none transition-colors duration-75" />
      )}
    </motion.div>
  );
}
