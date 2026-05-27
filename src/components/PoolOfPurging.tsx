import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Skull } from 'lucide-react';
import { Boon } from '../types';
import { getBoonColor } from '../utils/boonUtils';

interface PoolOfPurgingProps {
  draggedBoon: Boon | null;
  draggedBoonType: string | null;
}

export function PoolOfPurgingBackdrop({ draggedBoon, draggedBoonType }: PoolOfPurgingProps) {
  const isActive = draggedBoon && (draggedBoonType === 'sortable' || draggedBoonType === 'core');

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Dark liquid crimson pool backdrop covering the entire section area */}
          <div className="absolute inset-0 bg-hades-bg/95 backdrop-blur-[2px]" />
          <div className="absolute inset-2 bg-gradient-to-t from-red-950/20 via-red-950/10 to-red-950/20 border border-dashed border-hades-red/40 rounded-3xl animate-pulse" />
          
          {/* Subtle red ambient glow center ripple */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_75%)] animate-pulse" style={{ animationDuration: '3s' }} />
          
          {/* Large background watermark skull (the skull we had before!) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
            <Skull className="w-[320px] h-[320px] md:w-[480px] md:h-[480px] text-hades-red" strokeWidth="0.5" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PoolOfPurgingMessage({ draggedBoon, draggedBoonType }: PoolOfPurgingProps) {
  const isActive = draggedBoon && (draggedBoonType === 'sortable' || draggedBoonType === 'core');

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: 100, opacity: 1, marginTop: 20 }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full relative overflow-hidden rounded-2xl border border-dashed border-hades-red/40 bg-hades-bg-dark/70 flex flex-col md:flex-row items-center justify-center gap-5 px-8 py-3 text-center md:text-left shadow-[inset_0_4px_16px_rgba(0,0,0,0.85),0_0_24px_rgba(239,68,68,0.02)] pointer-events-none"
        >
          {/* Inner crimson fluid glow inside the cut-out */}
          <div className="absolute inset-0 bg-radial-gradient from-hades-red/10 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Rippling pool ring */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 z-10">
            <div className="absolute inset-0 rounded-full bg-red-900/10 border border-hades-red/25 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-1.5 rounded-full bg-red-900/15 border border-hades-red/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.65)] animate-pulse" />
            <div className="absolute inset-3 rounded-full bg-hades-bg border border-hades-red/30 shadow-[inset_0_0_15px_rgba(239,68,68,0.25)] flex items-center justify-center">
              <Skull className="w-5 h-5 text-hades-red/80 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1 z-10">
            <h3 className="text-base font-display font-medium text-hades-red uppercase tracking-widest animate-pulse">
              Pool of Purging
            </h3>
            <p className="text-xs font-sans text-hades-text/75 max-w-xl leading-relaxed">
              Drop <span className={`${getBoonColor(draggedBoon.type)} font-semibold`}>{draggedBoon.name}</span> into the River Styx to purge it from your build.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
