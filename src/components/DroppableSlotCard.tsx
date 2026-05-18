import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable } from '@dnd-kit/core';
import { Boon } from '../types';

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
  const isExpanded = isActive || isOver || isHovered;

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
      <div className="absolute inset-0 flex items-center justify-center p-5 border-[3px] border-[#26262f] rounded-[28%]">
        <IconComponent className="w-full h-full opacity-30 group-hover:opacity-50 transition-all duration-100 text-gray-500" />
      </div>
    );
  };

  return (
    <div className="h-[88px] w-full relative">
      <div 
        className={`group flex flex-col absolute top-0 left-0 transition-opacity duration-100 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isExpanded ? 50 : 10 }}
      >
        <motion.div 
          ref={setNodeRef}
          onClick={onClick}
          initial={false}
          animate={{ 
            width: isExpanded ? '440px' : '84px',
            height: isExpanded ? 'auto' : '84px'
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

          <div className={`relative w-[84px] h-[84px] flex-shrink-0 flex items-center justify-center rounded-[28%] transition-all duration-300 ${
             shouldHighlight 
               ? 'bg-hades-accent/20 border-[3px] border-hades-accent border-solid shadow-[0_0_40px_rgba(16,185,129,0.4)] z-50' 
               : isPotentialTarget
                 ? 'bg-hades-accent/10 border-[3px] border-hades-accent/40 border-dashed animate-pulse z-40'
                 : isActive 
                   ? 'bg-hades-accent/5 border-[3px] border-hades-accent border-solid z-50' 
                   : 'border-0'
          }`}>
            <div className="w-full h-full relative rounded-[28%] overflow-hidden">
              {renderIcon()}
            </div>
          </div>

          <div className="overflow-hidden flex-1">
            <div className="w-[340px] h-full flex flex-col justify-center pr-4 py-3">
              <motion.div 
                initial={false}
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                className="flex flex-col"
              >
                <span className={`text-[11px] font-mono uppercase ${isActive || isHovered || isOver ? 'text-hades-accent font-bold' : 'text-gray-600'}`}>
                  {isActive ? 'Awaiting Selection' : name}
                </span>
                <span className="text-[9px] font-mono text-gray-700 uppercase">
                  Empty Slot
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
