/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Search, 
  X, 
  Plus, 
  Swords, 
  Shield, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Github,
  Link
} from 'lucide-react';
import { 
  DndContext, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { BOONS } from './data/boonsData';
import { Boon, BoonType, ElementType, ALL_ELEMENTS } from './types';
import { 
  SLOT_PRIORITY, 
  CORE_SLOTS, 
  SIDEBAR_WIDTH, 
  SLOT_EXPANDED_WIDTH 
} from './constants';
import { isValidForSlot, getBoonColor } from './utils/boonUtils';
import { GodIcon, ElementIcon } from './components/Icons';
import { StaticBoonListItem, DraggableBoonListItem } from './components/BoonListItem';
import { CoreSlotRow } from './components/CoreSlotRow';
import { BoonDisplayCard } from './components/BoonDisplayCard';
import { DroppableSlotCard } from './components/DroppableSlotCard';
import { ElementSummary } from './components/ElementSummary';
import { GodSummary } from './components/GodSummary';

export default function App() {
  const [coreBuild, setCoreBuild] = useState<Record<string, Boon | null>>(() => {
    const params = new URLSearchParams(window.location.search);
    const coreParam = params.get('c');
    const initialCore: Record<string, Boon | null> = {
      Attack: null,
      Special: null,
      Cast: null,
      Sprint: null,
      Magick: null,
    };
    if (coreParam) {
      // Handle both old full UUIDs and new short codes
      const slotMap: Record<string, string> = {
        at: 'Attack', sp: 'Special', ca: 'Cast', sr: 'Sprint', ma: 'Magick'
      };
      
      coreParam.split(',').forEach(pair => {
        const [slotKey, code] = pair.split(':');
        if (slotKey && code) {
          const slotName = slotMap[slotKey] || slotKey;
          let boon;
          if (code.length > 20) { // Likely a UUID
            boon = BOONS.find(b => b.id === code);
          } else { // Likely a base36 index
            const index = parseInt(code, 36);
            boon = BOONS[index];
          }
          if (boon) initialCore[slotName] = boon;
        }
      });
    }
    return initialCore;
  });
  const [additionalBoons, setAdditionalBoons] = useState<Boon[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const addParam = params.get('a');
    if (addParam) {
      return addParam.split(',')
        .map(code => {
          if (code.length > 20) { // UUID
            return BOONS.find(b => b.id === code);
          } else { // Base36 Index
            const index = parseInt(code, 36);
            return BOONS[index];
          }
        })
        .filter((b): b is Boon => !!b);
    }
    return [];
  });

  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [buildName, setBuildName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('n') || 'Untitled Build';
  });

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Name
    if (buildName && buildName !== 'Untitled Build') {
      params.set('n', buildName);
    }

    // Core
    const coreParts: string[] = [];
    const slotAbbr: Record<string, string> = {
      Attack: 'at', Special: 'sp', Cast: 'ca', Sprint: 'sr', Magick: 'ma'
    };
    
    Object.entries(coreBuild).forEach(([slot, boon]) => {
      if (boon) {
        const index = BOONS.findIndex(b => b.id === (boon as Boon).id);
        if (index !== -1) {
          coreParts.push(`${slotAbbr[slot] || slot}:${index.toString(36)}`);
        }
      }
    });
    if (coreParts.length > 0) {
      params.set('c', coreParts.join(','));
    }

    // Additional
    if (additionalBoons.length > 0) {
      const addParts = additionalBoons.map(boon => {
        const index = BOONS.findIndex(b => b.id === boon.id);
        return index !== -1 ? index.toString(36) : '';
      }).filter(Boolean);
      
      if (addParts.length > 0) {
        params.set('a', addParts.join(','));
      }
    }

    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }, [coreBuild, additionalBoons, buildName]);
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [draggedBoon, setDraggedBoon] = useState<Boon | null>(null);
  const draggedBoonRef = useRef<Boon | null>(null);
  const [dndContextKey, setDndContextKey] = useState(0);

  useEffect(() => {
    draggedBoonRef.current = draggedBoon;
  }, [draggedBoon]);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleSidebarScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Scroll state no longer affects layout to prevent flickering, 
    // but we can keep it for subtle header styling if needed
    const scrollPos = e.currentTarget.scrollTop;
    if (!isScrolled && scrollPos > 20) {
      setIsScrolled(true);
    } else if (isScrolled && scrollPos < 10) {
      setIsScrolled(false);
    }
  };
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        // Only trigger if not already focused on an input/textarea
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
      if (e.key === 'Escape') {
        if (document.activeElement === searchInputRef.current) {
          setSearchTerm('');
          searchInputRef.current?.blur();
          return;
        }
        setActiveSlot(null);
      }
    };

    const handleBlur = () => {
      if (draggedBoonRef.current) {
        setDndContextKey(prev => prev + 1);
        setDraggedBoon(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const gods = useMemo(() => {
    const list = new Set<string>();
    BOONS.forEach(b => b.gods.forEach(g => list.add(g)));
    return Array.from(list).sort();
  }, []);

  const selectedBoonIds = useMemo(() => {
    const ids = new Set<string>();
    Object.values(coreBuild).forEach(b => { 
      if (b) ids.add((b as Boon).id); 
    });
    additionalBoons.forEach(b => ids.add(b.id));
    return ids;
  }, [coreBuild, additionalBoons]);

  const filteredBoons = useMemo(() => {
    return BOONS.filter(boon => {
      // Don't show already selected boons in the library
      if (selectedBoonIds.has(boon.id)) {
        return false;
      }

      const searchTerms = searchTerm.toLowerCase().replace(/Ω/g, 'omega').replace(/ω/g, 'omega').split(/\s+/).filter(t => t.length > 0);
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => {
        const check = (text: string) => text.toLowerCase().replace(/Ω/g, 'omega').replace(/ω/g, 'omega').includes(term);
        return check(boon.name) || 
               check(boon.effect) ||
               boon.gods.some(god => check(god)) ||
               check(boon.type) ||
               (boon.type === 'Non-Core' && check('support')) ||
               (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(boon.type) && check('core')) ||
               (boon.element && check(boon.element));
      });
      
      const matchesType = (activeSlot ? isValidForSlot(boon, activeSlot) : true);
      
      return matchesSearch && matchesType;
    }).sort((a, b) => {
      const priorityA = SLOT_PRIORITY[a.type] || 99;
      const priorityB = SLOT_PRIORITY[b.type] || 99;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, activeSlot]);

  const selectBoon = (boon: Boon, slotId: string) => {
    if (slotId === 'NonCore') {
      setAdditionalBoons(prev => [...prev, boon]);
    } else {
      setCoreBuild(prev => ({ ...prev, [slotId]: boon }));
    }
    setActiveSlot(null);
  };

  const toggleActiveSlot = (slotId: string) => {
    setActiveSlot(prev => {
      const next = prev === slotId ? null : slotId;
      if (next) setIsPanelCollapsed(false);
      return next;
    });
  };

  const removeBoon = (slotId: string, index?: number) => {
    if (slotId === 'NonCore' && index !== undefined) {
      // Logic for removing additional boons is handled by removeAdditionalBoon
    } else {
      setCoreBuild(prev => ({ ...prev, [slotId]: null }));
    }
  };

  const removeAdditionalBoon = (boon: Boon, originalIndex: number) => {
    setAdditionalBoons(prev => prev.filter((_, i) => i !== originalIndex));
  };

  const purgeBuild = () => {
    if (!showPurgeConfirm) {
      setShowPurgeConfirm(true);
      setTimeout(() => setShowPurgeConfirm(false), 3000);
      return;
    }
    setCoreBuild({
      Attack: null,
      Special: null,
      Cast: null,
      Sprint: null,
      Magick: null,
    });
    setAdditionalBoons([]);
    setBuildName('Untitled Build');
    setShowPurgeConfirm(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const boon = BOONS.find(b => b.id === event.active.id);
    if (boon) setDraggedBoon(boon);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setDraggedBoon(null);

    if (over && active) {
      const boon = BOONS.find(b => b.id === active.id);
      const slotId = over.id as string;
      
      if (boon && isValidForSlot(boon, slotId) && !selectedBoonIds.has(boon.id)) {
        selectBoon(boon, slotId);
      }
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  const copyBuildLink = () => {
    const baseUrl = 'https://hades-ii-build-planner-54268731549.us-west2.run.app/';
    const shareUrl = `${baseUrl}${window.location.search}`;
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <DndContext 
      key={dndContextKey}
      sensors={sensors}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen bg-hades-bg text-hades-text font-sans overflow-hidden flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-hades-border bg-hades-bg-dark/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-hades-bg-main">
              <img 
                src="/assets/ui/melinoe_icon.webp" 
                alt="Melinoë" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-300 uppercase italic">
              Hades II <span className="text-hades-accent not-italic ml-2">Build Planner</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 mt-16 flex overflow-hidden relative">
          {/* Left: Boon Picker (Collapsible) */}
          <motion.aside 
            initial={false}
            animate={{ 
              width: isPanelCollapsed ? 0 : SIDEBAR_WIDTH,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="border-r border-hades-border bg-hades-panel flex flex-col z-30 relative flex-shrink-0"
          >
            {/* Toggle Button - High contrast background and accent border */}
            <button 
              onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              className={`absolute top-[44px] z-50 w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
                isPanelCollapsed 
                  ? 'left-4 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]' 
                  : '-right-3 rounded bg-hades-bg-dark border-hades-border-light hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
              }`}
              title={isPanelCollapsed ? "Expand Library" : "Collapse Library"}
            >
                {isPanelCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-hades-accent animate-pulse" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-hades-text group-hover:text-hades-accent transition-colors" />
                )}
              </button>

            <div 
              style={{ width: SIDEBAR_WIDTH }}
              className={`h-full flex flex-col overflow-hidden will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
            >
                <div className={`p-6 border-b border-hades-border-light flex flex-col gap-3 bg-hades-panel z-20 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}>
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-accent/50" />
                      <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Press / to search boons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-10 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-hades-text/30 hover:text-hades-accent transition-colors p-0.5"
                          title="Clear search"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-sans text-hades-text/60 leading-relaxed px-1">
                      Search by boon name, effect, god, slot (e.g. "attack"), or element
                    </p>
                  </div>
                </div>

                {/* Fixed spacer area that doesn't disappear on scroll */}
                <div className="h-6 flex-shrink-0" />

                <div 
                  onScroll={handleSidebarScroll}
                  className="flex-1 overflow-y-auto custom-scrollbar px-5 pb-8 transform-gpu"
                >
                  <div className="space-y-3 transform-gpu">
                    {filteredBoons.map(boon => (
                      <DraggableBoonListItem 
                        key={boon.id} 
                        boon={boon} 
                        onClick={() => activeSlot && selectBoon(boon, activeSlot)}
                        isSelectable={!!activeSlot}
                      />
                    ))}
                    {filteredBoons.length === 0 && (
                      <div className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-tight text-gray-400">
                        No matches found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>

          {/* Right: Build View */}
          <section className="flex-1 overflow-auto p-6 md:px-8 py-6 custom-scrollbar relative">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-2 mb-10">
                <div className="flex flex-col gap-2 group">
                  <div className="flex items-center gap-3 h-10">
                    {isEditingName ? (
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={buildName}
                        onChange={(e) => setBuildName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                        className="text-2xl font-light bg-transparent border-b border-hades-accent outline-none text-white w-full max-w-md uppercase py-0"
                        autoFocus
                      />
                    ) : (
                      <h2 
                        onClick={() => setIsEditingName(true)}
                        className="text-2xl font-light text-gray-300 flex items-center gap-3 uppercase cursor-pointer hover:text-hades-accent transition-colors h-full"
                      >
                        {buildName || 'Untitled Build'}
                        <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </h2>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={copyBuildLink}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-200 uppercase font-mono text-[9px] tracking-widest ${
                      isCopied 
                        ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                        : 'bg-hades-accent/5 border-hades-accent/20 text-hades-accent/70 hover:border-hades-accent/50 hover:text-hades-accent'
                    }`}
                  >
                    <Link className={`w-3 h-3 ${isCopied ? 'animate-bounce' : ''}`} />
                    {isCopied ? 'Link Copied!' : 'Copy Share Link'}
                  </button>

                  <button 
                    onClick={purgeBuild}
                    className={`text-[9px] font-mono uppercase tracking-widest transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded border ${
                      showPurgeConfirm 
                        ? 'bg-hades-red text-white border-white/20 animate-pulse' 
                        : 'text-hades-red/80 hover:text-red-300 bg-hades-red/5 border-hades-red/10 hover:border-hades-red/30'
                    }`}
                  >
                    <X className={`w-3 h-3 ${showPurgeConfirm ? 'animate-bounce' : ''}`} />
                    {showPurgeConfirm ? 'Confirm Purge?' : 'Purge Build'}
                  </button>
                </div>
              </div>

              {/* Elemental & God Tracker */}
              <div className="mb-8 flex items-start gap-4 w-fit">
                <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                <GodSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
              </div>

              {/* Consolidated Build View */}
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-x-8 gap-y-16 items-start relative">
                
                {/* Left Side: Core Boon Slots (Narrow Column) */}
                <aside className="lg:sticky lg:top-8 flex-shrink-0 z-30 flex flex-col items-center">
                  <div className="flex flex-col gap-3 w-full items-center">
                    {CORE_SLOTS.map((slot) => (
                      <CoreSlotRow 
                        key={slot.type}
                        slot={slot}
                        boon={coreBuild[slot.type]}
                        isActive={activeSlot === slot.type}
                        onClick={() => toggleActiveSlot(slot.type)}
                        onRemove={() => removeBoon(slot.type)}
                        draggedBoon={draggedBoon}
                        isValid={draggedBoon ? isValidForSlot(draggedBoon, slot.type) && !selectedBoonIds.has(draggedBoon.id) : true}
                      />
                    ))}
                  </div>
                </aside>

                {/* Right Side: Reorganized Sections */}
                <div className="flex-1 w-full lg:pl-8 lg:border-l lg:border-white/10">
                  <div className="w-full">
                    <div className="flex flex-col gap-12">
                      {/* Unified Boons Grid */}
                      <div className="grid grid-flow-col grid-rows-5 gap-x-3 gap-y-3 auto-cols-max items-start">
                        {/* Selected Boons */}
                        {additionalBoons.map((boon, idx) => (
                          <div key={`${boon.id}-${idx}`}>
                            <BoonDisplayCard 
                              boon={boon} 
                              onRemove={() => removeAdditionalBoon(boon, idx)}
                            />
                          </div>
                        ))}

                        {/* Unified Non-Core Slot */}
                        <div>
                          <DroppableSlotCard 
                            id="NonCore"
                            slot="NonCore"
                            name="Non-Core Slot"
                            icon={Plus}
                            isActive={activeSlot === 'NonCore'}
                            onClick={() => toggleActiveSlot('NonCore')}
                            draggedBoon={draggedBoon}
                            isValid={draggedBoon ? isValidForSlot(draggedBoon, 'NonCore') && !selectedBoonIds.has(draggedBoon.id) : true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <DragOverlay>
          {draggedBoon ? (
            <div style={{ width: SLOT_EXPANDED_WIDTH }} className="pointer-events-none opacity-90 backdrop-blur-sm cursor-grabbing">
              <StaticBoonListItem boon={draggedBoon} isOverlay />
            </div>
          ) : null}
        </DragOverlay>

        {/* Footer */}
        <footer className="py-3 bg-hades-bg-dark border-t border-hades-border px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[9px] font-mono text-gray-400 uppercase flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-hades-accent transition-colors group"
            >
              <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>GitHub Repo</span>
            </a>
            <div className="hidden md:block w-px h-3 bg-hades-border opacity-30" />
            <span>Updated: May 17, 2026</span>
          </div>
          
          <p className="max-w-[700px] text-center md:text-right text-[8px] text-gray-500 leading-[1.6] font-sans uppercase opacity-40">
            Hades II Build Planner is an unofficial, fan-developed project that is not affiliated with or endorsed by Supergiant Games. Hades II, its characters, and all art assets are owned by Supergiant Games.
          </p>
        </footer>
      </div>
    </DndContext>
  );
}


