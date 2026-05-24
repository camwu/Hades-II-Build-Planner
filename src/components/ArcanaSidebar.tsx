import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, X, Hand, MessageCircle, Lock, LockKeyholeOpen } from 'lucide-react';
import { ARCANA_CARDS } from '../data/arcanaData';
import { ArcanaCard } from '../types';
import { FormattedEffectText } from './FormattedEffectText';

const getActivationCondition = (num: string) => {
  switch (num) {
    case 'V':
      return "Auto-activates if at least 1 surrounding card is active.";
    case 'XIII':
      return "Auto-activates if you have active cards of costs 1, 2, 3, 4, and 5 Grasp.";
    case 'XX':
      return "Auto-activates if no more than 2 cards of each active cost are active.";
    case 'XXI':
      return "Auto-activates if at least 3 surrounding cards are active.";
    case 'XXIV':
      return "Auto-activates if any other row or column is fully active.";
    case 'XXV':
      return "Auto-activates if 1 to 3 cards are active total.";
    default:
      return "Automatically activates under special conditions.";
  }
};

interface ArcanaSidebarProps {
  activeArcana: number[];
  toggleArcana: (cardNumber: number) => void;
  clearAllArcana: () => void;
  isArcanaCollapsed: boolean;
  setIsArcanaCollapsed: (val: boolean) => void;
  isButtonHovered: boolean;
  setIsButtonHovered: (val: boolean) => void;
  maxGrasp: number;
  setMaxGrasp: (val: number) => void;
  graspLimitError: number;
}

export function ArcanaSidebar({
  activeArcana,
  toggleArcana,
  clearAllArcana,
  isArcanaCollapsed,
  setIsArcanaCollapsed,
  isButtonHovered,
  setIsButtonHovered,
  maxGrasp,
  setMaxGrasp,
  graspLimitError,
}: ArcanaSidebarProps) {
  const [hoveredCard, setHoveredCard] = useState<ArcanaCard | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  React.useEffect(() => {
    if (graspLimitError > 0) {
      setIsErrorActive(true);
      const timer = setTimeout(() => setIsErrorActive(false), 450);
      return () => clearTimeout(timer);
    }
  }, [graspLimitError]);

  React.useEffect(() => {
    setShakeTrigger(0);
  }, [hoveredCard?.id]);

  const handleClearClick = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    } else {
      clearAllArcana();
      setShowClearConfirm(false);
    }
  };

  const currentGrasp = activeArcana.reduce((sum, cardNumber) => {
    const card = ARCANA_CARDS[cardNumber - 1];
    return sum + (card ? card.cost : 0);
  }, 0);

  const prevGraspRef = React.useRef(currentGrasp);

  // Initialize and track grasp counts to trigger green pulse conditionally
  React.useEffect(() => {
    if (prevGraspRef.current !== currentGrasp) {
      prevGraspRef.current = currentGrasp;
      if (!isErrorActive) {
        setPulseActive(true);
        const timer = setTimeout(() => setPulseActive(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentGrasp, isErrorActive]);

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
          : 450, // Resized to 450px
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      className={`border-hades-border bg-hades-panel flex flex-col h-full z-30 relative flex-shrink-0 ${
        isArcanaCollapsed ? 'border-l-0' : 'border-l'
      }`}
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
            ? 'right-4 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
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
        className={`h-full w-[450px] flex flex-col overflow-hidden will-change-transform justify-between ${
          isArcanaCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
        }`}
      >
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-hades-border-light bg-hades-panel flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Left Column: Title and horizontal controls below it */}
            <div className="flex flex-col gap-3">
              {/* Title Row */}
              <div className="flex items-center gap-2">
                <Hand className="w-4 h-4 text-hades-accent" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-hades-accent font-display">
                  Altar of Ashes
                </h2>
              </div>

              {/* Controls Row */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearClick}
                  className={`h-[26px] py-1 px-3 rounded text-[10px] uppercase font-display tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 border ${
                    showClearConfirm
                      ? 'bg-hades-red text-white border-white/20 animate-pulse'
                      : 'text-hades-red bg-red-400/5 hover:bg-red-400/15 border-red-400/25 hover:border-red-400/50'
                  }`}
                >
                  <X className={`w-3 h-3 ${showClearConfirm ? 'animate-bounce' : ''}`} />
                  {showClearConfirm ? 'Confirm Reset?' : 'Reset Arcana'}
                </button>
              </div>
            </div>

            {/* Right Column: Prominent circular gauge with change animations */}
            <motion.div 
              key="grasp-gauge"
              animate={isErrorActive ? {
                x: [0, -2, 2, -1.5, 1.5, 0],
                scale: [1, 1.04, 1],
              } : pulseActive ? { 
                scale: [1, 1.12, 1],
              } : {
                x: 0,
                scale: 1,
              }}
              transition={isErrorActive ? { duration: 0.35, ease: 'easeInOut' } : { duration: 0.25, ease: 'easeInOut' }}
              className="relative w-[58px] h-[58px] flex-shrink-0 flex items-center justify-center"
            >
              {/* Soft borderless ambient pulsing glow */}
              {isErrorActive && (
                <motion.div
                  key={`error-glow-${graspLimitError}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 0.35, 0],
                    scale: [0.9, 1.15, 1.25],
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full blur-md bg-red-500/30 pointer-events-none"
                />
              )}
              {pulseActive && (
                <motion.div
                  key={`pulse-glow-${currentGrasp}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.9, 1.15, 1.25],
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full blur-md bg-hades-accent/20 pointer-events-none"
                />
              )}
              <MessageCircle 
                className={`w-full h-full -rotate-45 transition-colors ${
                  isErrorActive 
                    ? 'duration-150 text-red-500/60 fill-red-500/5 drop-shadow-[0_1px_4px_rgba(239,68,68,0.1)]' 
                    : 'duration-300 text-hades-accent/50 fill-hades-accent/5 drop-shadow-[0_1px_4px_rgba(16,185,129,0.08)]'
                }`}
                strokeWidth={isErrorActive ? 1.4 : 1.25}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`text-[18px] font-sans font-black leading-none tracking-tight transition-colors ${
                  isErrorActive ? 'duration-150 text-red-200/90' : 'duration-300 text-white'
                }`}>
                  {currentGrasp}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 5x5 Matrix Grid Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 flex items-center justify-center bg-hades-bg-dark/10">
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
                <div 
                  key={cardNumber} 
                  className={`relative group/card-wrapper w-full transition-all duration-300 transform-gpu ${
                    isZeroCost 
                      ? 'hover:z-30' 
                      : 'hover:scale-[1.08] hover:z-30'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (isZeroCost) {
                        if (!isActive) {
                          setShakeTrigger(prev => prev + 1);
                        }
                      } else {
                        toggleArcana(cardNumber);
                      }
                    }}
                    onMouseEnter={() => setHoveredCard(cardData)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group w-full relative outline-none bg-transparent aspect-[219/341] rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
                      isZeroCost
                        ? 'opacity-80 hover:opacity-100 font-sc'
                        : ''
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
                      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c24] to-[#0d0d12] flex flex-col items-center justify-center border border-hades-accent/30 p-1 select-none pointer-events-none">
                        <span className="text-[#e3b869] font-display text-[10px] font-bold tracking-wider leading-none">
                          {cardData.number}
                        </span>
                        <span className="text-[7px] text-gray-400 font-bold normal-case font-sc text-center mt-0.5 scale-90 leading-tight line-clamp-2 px-0.5">
                          {cardData.name}
                        </span>
                      </div>
                    )}
 
                    {/* High contrast Roman numeral overlay on card hover */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <span className="text-white text-[11px] font-bold font-display tracking-widest">
                        {cardData.number}
                      </span>
                    </div>
                  </button>
 
                  {/* Grasp Cost Badge positioned on vertex with hover overlapping resolved by z-index */}
                  <div 
                    className={`absolute -top-0.5 -right-0.5 w-[24px] h-[24px] rounded-full flex items-center justify-center z-20 select-none shadow-md transition-all duration-300 pointer-events-none ${
                      isActive 
                        ? 'bg-[#030712] border border-hades-accent text-hades-accent shadow-[0_0_8px_rgba(16,185,129,0.35)]' 
                        : 'bg-[#0e0e14]/95 border border-white/15 text-gray-400'
                    }`}
                  >
                    <span className="text-[12px] font-sans font-extrabold leading-none flex items-center justify-center h-full w-full text-center">
                      {cardData.cost}
                    </span>
                  </div>
                </div>
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
                className="w-full flex-shrink-0"
              >
                <motion.div
                  key={shakeTrigger}
                  animate={{
                    x: shakeTrigger > 0 ? [0, -6, 6, -5, 5, -3, 3, 0] : 0
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="p-3.5 rounded-xl bg-hades-bg-dark/80 border border-white/10 hover:border-white/15 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-col gap-2 pb-2.5 border-b border-white/[0.06]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold normal-case tracking-wide truncate font-sc leading-tight text-white">
                            {hoveredCard.name}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-2.5">
                          {(() => {
                            const cardIndex = ARCANA_CARDS.findIndex(c => c.id === hoveredCard.id) + 1;
                            const isCardActive = activeArcana.includes(cardIndex);
                            return isCardActive ? (
                              <span className="text-[9px] font-display font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 select-none shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                                Activated
                              </span>
                            ) : (
                              <span className="text-[9px] font-display font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded border bg-hades-red/5 border-hades-red/20 text-hades-red select-none">
                                Deactivated
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="text-[12px] font-sans text-gray-400 font-medium leading-normal mt-3.5 max-h-[74px] overflow-y-auto custom-scrollbar pr-1 whitespace-normal">
                      <FormattedEffectText text={hoveredCard.effect} />
                    </div>
                  </div>
                  {hoveredCard.cost === 0 && (() => {
                    const cardIndex = ARCANA_CARDS.findIndex(c => c.id === hoveredCard.id) + 1;
                    const isCardActive = activeArcana.includes(cardIndex);
                    
                    return (
                      <div className="mt-3 text-xs font-sans text-gray-400 transition-all duration-300">
                        <div className={`flex flex-col gap-1.5 p-2.5 rounded border transition-all duration-300 ${
                          isCardActive 
                            ? 'bg-emerald-950/10 border-emerald-500/20 text-gray-400' 
                            : 'bg-red-950/10 border-red-900/20'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {isCardActive ? (
                                <LockKeyholeOpen className="w-3.5 h-3.5 text-emerald-400/85 flex-shrink-0" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0" />
                              )}
                              <span className={`font-semibold flex-shrink-0 transition-colors ${
                                isCardActive ? 'text-emerald-400/80' : 'text-red-400/80'
                              }`}>
                                {isCardActive ? 'Unlocked Requirements' : 'Locked Requirements'}
                              </span>
                            </div>
                          </div>
                          <div className="pl-5.5 text-xs leading-normal font-medium transition-all duration-300 text-gray-300">
                            <FormattedEffectText text={hoveredCard.awakening || getActivationCondition(hoveredCard.number)} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-4"
              >
                <span className="text-xs font-sans font-medium text-gray-300">
                  Hover over card for details
                </span>
                <span className="text-xs font-sans font-medium text-gray-400 mt-1">
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
