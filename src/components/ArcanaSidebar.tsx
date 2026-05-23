import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Trash2 } from 'lucide-react';
import { ARCANA_CARDS } from '../data/arcanaData';
import { ArcanaCard } from '../types';
import { FormattedBoonEffect } from './FormattedBoonEffect';

const getActivationCondition = (num: string) => {
  switch (num) {
    case 'V':
      return "Auto-activates if at least 1 surrounding card is active.";
    case 'XIII':
      return "Auto-activates if VIII, XII, XIV, and XVIII are active.";
    case 'XX':
      return "Auto-activates if no more than 2 cards of each active cost are active.";
    case 'XXI':
      return "Auto-activates if at least 3 surrounding cards are active.";
    case 'XXIV':
      return "Auto-activates if any full row is active.";
    case 'XXV':
      return "Auto-activates if 1 to 3 cards are active total.";
    default:
      return "Automatically activates under special conditions.";
  }
};

interface ArcanaSidebarProps {
  activeArcana: number[];
  toggleArcana: (cardNumber: number) => void;
  selectAllArcana: () => void;
  clearAllArcana: () => void;
  isArcanaCollapsed: boolean;
  setIsArcanaCollapsed: (val: boolean) => void;
  isButtonHovered: boolean;
  setIsButtonHovered: (val: boolean) => void;
}

export function ArcanaSidebar({
  activeArcana,
  toggleArcana,
  selectAllArcana,
  clearAllArcana,
  isArcanaCollapsed,
  setIsArcanaCollapsed,
  isButtonHovered,
  setIsButtonHovered,
}: ArcanaSidebarProps) {
  const [hoveredCard, setHoveredCard] = useState<ArcanaCard | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Pad numbers with zero, e.g., 1 -> "01"
  const getCardImageSrc = (cardNumber: number, isActive: boolean) => {
    const padded = cardNumber.toString().padStart(2, '0');
    return `/assets/arcana/card${padded}${isActive ? '' : '_inactive'}.png`;
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isArcanaCollapsed
          ? (isButtonHovered ? 24 : 0)
          : 480, // Expanded width for larger cards and tight grid
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      className="border-l border-hades-border bg-hades-panel flex flex-col h-full z-30 relative flex-shrink-0"
    >
      {/* Toggle Button on Left Edge of the right sidebar */}
      <button
        onClick={() => {
          setIsArcanaCollapsed(!isArcanaCollapsed);
          setIsButtonHovered(false);
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`absolute top-[44px] z-50 w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
          isArcanaCollapsed
            ? '-left-6 rounded-l bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
            : '-left-3 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
        }`}
        title={isArcanaCollapsed ? "Expand Altar of Ashes" : "Collapse Altar of Ashes"}
      >
        {isArcanaCollapsed ? (
          <ChevronLeft className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        ) : (
          <ChevronRight className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        )}
      </button>

      {/* Main Container Content */}
      <div
        className={`h-full w-[480px] flex flex-col overflow-hidden will-change-transform justify-between ${
          isArcanaCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
        }`}
      >
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-hades-border-light bg-hades-panel flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-hades-accent" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-hades-accent font-display">
                Altar of Ashes
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans font-semibold text-gray-400">
                Active: {activeArcana.length}/25
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={selectAllArcana}
              className="flex-1 py-1 px-2.5 bg-hades-accent/5 hover:bg-hades-accent/15 border border-hades-accent/20 hover:border-hades-accent/50 rounded text-[10px] uppercase font-display tracking-wider text-hades-accent transition-all duration-200"
            >
              Activate All
            </button>
            <button
              onClick={clearAllArcana}
              className="flex-1 py-1 px-2.5 bg-red-400/5 hover:bg-red-400/15 border border-red-400/25 hover:border-red-400/50 rounded text-[10px] uppercase font-display tracking-wider text-hades-red transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3 h-3" />
              Deselect All
            </button>
          </div>
        </div>

        {/* 5x5 Matrix Grid Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 flex items-center justify-center bg-hades-bg-dark/10">
          <div className="grid grid-cols-5 gap-1.5 w-full self-start">
            {Array.from({ length: 25 }, (_, i) => {
              const cardNumber = i + 1;
              const isActive = activeArcana.includes(cardNumber);
              const cardData = ARCANA_CARDS[i] || {
                number: cardNumber.toString(),
                name: `Card ${cardNumber}`,
                effect: 'No effect defined.',
                cost: 0
              };

              const isZeroCost = cardData.cost === 0;
              const hasFailed = imageErrors[cardNumber];

              return (
                <button
                  key={cardNumber}
                  onClick={() => !isZeroCost && toggleArcana(cardNumber)}
                  onMouseEnter={() => setHoveredCard(cardData)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative outline-none bg-transparent aspect-[219/341] w-full rounded-md overflow-hidden transition-all duration-300 transform-gpu cursor-pointer ${
                    isZeroCost
                      ? 'cursor-default opacity-80 hover:opacity-100'
                      : 'hover:scale-[1.08]'
                  } ${
                    isActive
                      ? 'shadow-[0_0_16px_rgba(16,185,129,0.85),_0_0_28px_rgba(16,185,129,0.45)] border border-hades-accent/40 opacity-100 z-10'
                      : 'border border-white/5 opacity-65 hover:opacity-100 hover:border-white/20'
                  }`}
                  aria-label={`${cardData.number}. ${cardData.name}`}
                >
                  {!hasFailed ? (
                    <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
                      {/* Inactive card image background */}
                      <img
                        src={getCardImageSrc(cardNumber, false)}
                        alt={`${cardData.number}. ${cardData.name} Inactive`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: isActive ? 0 : 1 }}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setImageErrors(prev => ({ ...prev, [cardNumber]: true }));
                        }}
                      />
                      {/* Active card image crossfade */}
                      <img
                        src={getCardImageSrc(cardNumber, true)}
                        alt={`${cardData.number}. ${cardData.name} Active`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: isActive ? 1 : 0 }}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setImageErrors(prev => ({ ...prev, [cardNumber]: true }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c24] to-[#0d0d12] flex flex-col items-center justify-center border border-hades-accent/30 p-1.5 select-none pointer-events-none">
                      <span className="text-[#e3b869] font-display text-xs font-bold tracking-wider leading-none">
                        {cardData.number}
                      </span>
                      <span className="text-[7.5px] text-gray-400 uppercase font-sans text-center mt-1 scale-90 leading-tight line-clamp-2 px-0.5">
                        {cardData.name}
                      </span>
                    </div>
                  )}

                  {/* High contrast Roman numeral overlay on card hover */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="text-white text-xs font-bold font-display tracking-widest px-1.5 py-0.5 border border-white/20 rounded">
                      {cardData.number}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Details Panel */}
        <div className="px-6 py-4 border-t border-hades-border-light bg-hades-bg-dark/40 flex-shrink-0 min-h-[154px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {hoveredCard ? (
              <motion.div
                key={hoveredCard.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-1 pb-1.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-display text-hades-accent border border-hades-accent/30 px-1.5 py-0.5 rounded bg-hades-accent/5">
                        {hoveredCard.number}
                      </span>
                      <span className="text-base font-bold font-display text-gray-100 uppercase tracking-wide leading-tight">
                        {hoveredCard.name}
                      </span>
                    </div>
                    {hoveredCard.cost === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-hades-accent">
                        Auto-activated
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] font-sans text-gray-300 font-medium leading-normal max-h-[74px] overflow-y-auto custom-scrollbar pr-1 whitespace-normal">
                    <FormattedBoonEffect text={hoveredCard.effect} />
                  </div>
                </div>
                {hoveredCard.cost === 0 && (
                  <div className="mt-1.5 text-[10px] text-hades-accent bg-hades-accent/10 px-2 py-1 rounded border border-hades-accent/20 font-medium font-sans">
                    ⚡ Awakening: {hoveredCard.awakening || getActivationCondition(hoveredCard.number)}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-4"
              >
                <span className="text-xs font-sans font-semibold text-gray-400">
                  hover over card for details
                </span>
                <span className="text-xs font-sans font-semibold text-gray-500 mt-1">
                  Click a card to toggle activation status
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
