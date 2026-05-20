import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable } from '@dnd-kit/core';
import { Skull } from 'lucide-react';

export function PurgePool() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'PurgePool',
  });

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`relative w-[210px] h-[396px] flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 rounded-3xl group ${
        isOver 
          ? 'bg-hades-red/[0.08] border-hades-red/50 shadow-[0_0_30px_rgba(255,100,100,0.15)]' 
          : 'bg-transparent border-white/10 hover:border-hades-red/30 hover:bg-hades-red/[0.03]'
      }`}
    >
      {/* Blood fountain effect background */}
      {isOver && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-3xl overflow-hidden"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-t from-hades-red/15 to-transparent blur-3xl" />
        </motion.div>
      )}

      <div className={`flex flex-col items-center gap-6 transition-transform duration-300 ${isOver ? 'scale-105' : ''} z-10`}>
        <div className="relative">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
            isOver 
              ? 'bg-hades-red/40 text-white/90 shadow-[0_0_20px_rgba(255,100,100,0.3)] rotate-[10deg]' 
              : 'bg-hades-red/5 text-hades-red/30 border border-hades-red/10'
          }`}>
            <Skull className="w-10 h-10" />
          </div>
          
          {/* Blood drops */}
          <AnimatePresence>
            {isOver && (
              <>
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 20, opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeIn" }}
                  className="absolute -bottom-2 left-4 w-2 h-2 rounded-full bg-hades-red/60"
                />
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 25, opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeIn", delay: 0.4 }}
                  className="absolute -bottom-2 right-4 w-1.5 h-1.5 rounded-full bg-hades-red/60"
                />
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center text-center px-4">
          <span className={`text-sm font-mono uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
            isOver ? 'text-gray-200' : 'text-hades-red/40 text-xs'
          }`}>
            Pool of Purging
          </span>
          <p className={`text-[10px] mt-2 leading-relaxed italic transition-colors duration-300 ${
            isOver ? 'text-hades-red/60' : 'text-gray-700'
          }`}>
            Sacrifice this boon
          </p>
        </div>
      </div>

      {/* Decorative corners - stylized as more gothic */}
      <div className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 transition-colors duration-300 ${isOver ? 'border-hades-red/40' : 'border-white/[0.05]'}`} />
      <div className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 transition-colors duration-300 ${isOver ? 'border-hades-red/40' : 'border-white/[0.05]'}`} />
      <div className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 transition-colors duration-300 ${isOver ? 'border-hades-red/40' : 'border-white/[0.05]'}`} />
      <div className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 transition-colors duration-300 ${isOver ? 'border-hades-red/40' : 'border-white/[0.05]'}`} />
      
      {/* Additional thematic details */}
      <div className={`absolute top-1/2 left-2 w-[1px] h-8 -translate-y-1/2 transition-colors duration-300 ${isOver ? 'bg-hades-red/40' : 'bg-transparent'}`} />
      <div className={`absolute top-1/2 right-2 w-[1px] h-8 -translate-y-1/2 transition-colors duration-300 ${isOver ? 'bg-hades-red/40' : 'bg-transparent'}`} />
    </motion.div>
  );
}
