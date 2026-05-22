import React from 'react';
import { motion } from 'motion/react';
import { useDraggable } from '@dnd-kit/core';
import { Lock, Check, X, Pin } from 'lucide-react';
import { Boon, BoonPrerequisite, ELEMENT_COLORS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedBoonEffect } from './FormattedBoonEffect';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { BOONS } from '../data/boonsData';

function formatPrerequisiteDescription(prereq: BoonPrerequisite, isDuo = false, removeRequires = false) {
  let description = prereq.description;
  if (removeRequires) {
    if (description.startsWith('Requires ')) {
      description = description.slice(9);
    } else if (description.startsWith('requires ')) {
      description = description.slice(9);
    }
  }
  const requiredBoons = prereq.boonIds
    .map(id => BOONS.find(b => b.id === id))
    .filter((b): b is Boon => !!b);

  const requiredBoonNames = requiredBoons.map(b => b.name);
  const uniqueGods = isDuo ? Array.from(new Set(requiredBoons.flatMap(b => b.gods))) : [];

  // Parse pattern for highlighting
  const pattern = requiredBoonNames.length > 0 
    ? new RegExp(`(${requiredBoonNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    : null;
  const parts = pattern ? description.split(pattern) : [];

  return (
    <>
      {uniqueGods.map((god, gIdx) => {
        const capitalizedGod = god.charAt(0).toUpperCase() + god.slice(1).toLowerCase();
        const isLast = gIdx === uniqueGods.length - 1;
        return (
          <span key={gIdx} className={`inline select-none${isLast ? '' : ' mr-1'}`}>
            {gIdx > 0 && <span className="text-gray-500 mx-1">/</span>}
            <GodIcon god={god} className="w-3.5 h-3.5 object-contain inline-block align-middle -mt-[1px] mr-1" />
            <strong className="font-bold text-gray-200">{capitalizedGod}</strong>
          </span>
        );
      })}{uniqueGods.length > 0 && (
        <span className="text-gray-400 font-normal select-none">:</span>
      )}{' '}
      <span className="text-gray-300">
        {requiredBoonNames.length === 0 ? (
          <FormattedBoonEffect text={description.replace(/(\d+)/g, '*$1*')} />
        ) : (
          parts.map((part, index) => {
            if (requiredBoonNames.includes(part)) {
              return (
                <strong key={index} className="font-bold text-hades-text">
                  {part}
                </strong>
              );
            }
            return <span key={index}>{part}</span>;
          })
        )}
      </span>
    </>
  );
}

export function StaticBoonListItem({ 
  boon, 
  isOverlay = false, 
  isLocked = false, 
  prerequisitesStatus = [] 
}: { 
  boon: Boon; 
  isOverlay?: boolean; 
  isLocked?: boolean; 
  prerequisitesStatus?: { prereq: BoonPrerequisite; met: boolean }[]; 
}) {
  const borderColor = getBoonBorderColor(boon.type);
  
  return (
    <div className={`p-3 rounded-xl transition-all duration-150 ${
      isOverlay 
        ? 'bg-hades-bg-light shadow-2xl z-50' 
        : isLocked
          ? 'bg-hades-bg-dark/60 border border-red-950/45'
          : 'bg-hades-bg-dark/80 border border-white/10 hover:border-white/20 group-hover:border-white/20'
    }`}>
      <div className="flex items-start gap-4 transition-opacity duration-150">
        <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING} ${isLocked ? 'opacity-50' : ''}`}>
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
        
        <div className={`flex-1 min-w-0 py-0.5 ${isLocked ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className={`text-sm font-bold uppercase truncate font-display ${getBoonColor(boon.type)}`}>
              {boon.name}
            </h4>
            <span className={`text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${
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
                  <span className="text-[10px] font-display text-hades-text/70 uppercase leading-none">
                    {god}
                  </span>
                </div>
              ))}
            </div>
            {boon.element ? (
              <div className="flex items-center gap-1.5">
                <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
                <span className="text-[10px] font-display text-hades-text/70 uppercase leading-none">
                  {boon.element}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 opacity-40">
                <span className="text-[10px] font-display text-gray-500 uppercase leading-none">
                  No Element
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className={`text-[12px] text-gray-400 leading-normal font-medium mt-2 transition-opacity duration-150 ${isLocked ? 'opacity-50' : ''}`}>
        <FormattedBoonEffect text={boon.effect} />
      </p>

      {isLocked && prerequisitesStatus.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-red-950/45 text-xs font-sans text-gray-400">
          {prerequisitesStatus.length === 1 ? (
            <div className={`flex items-start gap-2 ${prerequisitesStatus[0].met ? 'line-through opacity-45' : ''}`}>
              <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
              <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked:</span>
              <div className="flex-1 text-xs text-gray-400 leading-normal font-medium">
                {formatPrerequisiteDescription(prerequisitesStatus[0].prereq, boon.type === 'Duo')}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Requirements:</span>
              </div>
              <ul className="pl-0 space-y-1.5 text-gray-400 leading-normal">
                {prerequisitesStatus.map(({ prereq, met }, index) => (
                  <li key={index} className={`flex items-start gap-2.5 ${met ? 'line-through opacity-45 text-gray-500/95' : ''}`}>
                    {met ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-red-500/70 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 text-xs text-gray-300 leading-normal font-medium">
                      {formatPrerequisiteDescription(prereq, boon.type === 'Duo', true)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
  prerequisitesStatus = [],
  isPinned = false,
  onPinToggle
}: { 
  boon: Boon; 
  onClick?: () => void; 
  isSelectable?: boolean; 
  isLocked?: boolean;
  prerequisitesStatus?: { prereq: BoonPrerequisite; met: boolean }[];
  isPinned?: boolean;
  onPinToggle?: () => void;
  key?: any 
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boon.id,
    disabled: isLocked,
  });
  
  return (
    <motion.div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={isLocked ? undefined : onClick}
      whileHover={isLocked ? { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.3, ease: 'easeInOut' } } : { x: 6 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500,
        damping: 30
      }}
      className={`relative group transition-opacity duration-150 ${
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
        prerequisitesStatus={prerequisitesStatus} 
      />
      
      {/* Pin button on top left (hover/pinned active) */}
      {onPinToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          className={`absolute -top-1 -left-1 z-40 w-5 h-5 flex items-center justify-center p-0 rounded-full border transition-all duration-150 shadow-md ${
            isPinned 
              ? 'opacity-100 text-hades-accent border-hades-accent/80 bg-hades-bg-light' 
              : 'opacity-0 md:group-hover:opacity-100 text-hades-text/40 border-white/10 bg-hades-bg-dark hover:text-hades-accent hover:border-hades-accent/40'
          }`}
          title={isPinned ? "Unpin Boon" : "Pin Boon to top"}
        >
          <Pin className={`w-3 h-3 rotate-45 scale-[0.8] ${isPinned ? 'fill-current' : ''}`} />
        </button>
      )}

      {/* Selection indicator only for selectable, unlocked items */}
      {isSelectable && !isLocked && (
        <div className="absolute inset-0 rounded-xl border-2 border-hades-accent/30 group-hover:border-hades-accent pointer-events-none transition-colors duration-75" />
      )}
    </motion.div>
  );
}
