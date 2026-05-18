import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Layers } from 'lucide-react';

interface SidebarFilterDropdownProps {
  title: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  children: React.ReactNode;
  summary?: string | null;
  icon?: React.ReactNode;
}

export function SidebarFilterDropdown({ 
  title, 
  isOpen, 
  setIsOpen, 
  children,
  summary,
  icon
}: SidebarFilterDropdownProps) {
  const hasValue = summary && summary !== 'Any';
  
  return (
    <div className="relative">
      <div className={`flex flex-col rounded-xl border transition-all duration-200 ${
        isOpen 
          ? 'bg-hades-bg-main border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_10px_20px_-5px_rgba(0,0,0,0.5)]' 
          : hasValue 
            ? 'bg-white/5 border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]'
            : 'bg-hades-bg-dark border-hades-border-light hover:border-hades-border hover:bg-hades-bg-light'
      }`}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full group focus:outline-none transition-all duration-200 p-2.5 min-h-[52px]"
        >
          <div className="flex flex-col gap-1 items-start overflow-hidden">
            <div className={`uppercase font-mono transition-all duration-200 text-xs ${
              isOpen || hasValue ? 'text-white/80 font-bold' : 'text-hades-text/50 font-semibold'
            }`}>
              {title}
            </div>
            <div className={`flex items-center gap-2 text-xs font-bold truncate max-w-full font-mono uppercase transition-all duration-200 ${
              hasValue ? 'text-hades-accent' : 'text-gray-400 opacity-60'
            }`}>
              <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                hasValue ? 'bg-white/10' : 'bg-black/20 text-white/10'
              }`}>
                {hasValue && icon ? (
                  <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
                ) : (
                  <Layers className="w-3 h-3 opacity-40" />
                )}
              </div>
              <span>{isOpen ? 'Select...' : (summary || 'Any')}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${isOpen || hasValue ? 'text-white/80' : 'text-gray-500'} group-hover:text-white transition-colors`}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-[-100%] sm:right-0 mt-2 bg-hades-bg-main border border-hades-border shadow-2xl rounded-xl z-[70] overflow-hidden"
            >
              <div className="p-1.5 flex flex-col max-h-[300px] overflow-y-auto custom-scrollbar gap-1">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
