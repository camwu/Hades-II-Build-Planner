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
  Trash2, 
  Filter,
  Plus, 
  Swords, 
  Shield, 
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Github
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
import { SidebarFilterDropdown } from './components/SidebarFilterDropdown';

export default function App() {
  const [coreBuild, setCoreBuild] = useState<Record<string, Boon | null>>({
    Attack: null,
    Special: null,
    Cast: null,
    Sprint: null,
    Magick: null,
  });
  const [additionalBoons, setAdditionalBoons] = useState<Boon[]>([]);

  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [buildName, setBuildName] = useState('Untitled Build');
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGod, setSelectedGod] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [selectedType, setSelectedType] = useState<BoonType | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [draggedBoon, setDraggedBoon] = useState<Boon | null>(null);
  const draggedBoonRef = useRef<Boon | null>(null);
  const [dndContextKey, setDndContextKey] = useState(0);

  useEffect(() => {
    draggedBoonRef.current = draggedBoon;
  }, [draggedBoon]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSlotTypeOpen, setIsSlotTypeOpen] = useState(false);

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
  const [isGodFilterOpen, setIsGodFilterOpen] = useState(false);
  const [isElementFilterOpen, setIsElementFilterOpen] = useState(false);
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
        setSelectedGod(null);
        setSelectedElement(null);
        setSelectedType(null);
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

  const filteredBoons = useMemo(() => {
    return BOONS.filter(boon => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        boon.name.toLowerCase().includes(search) || 
        boon.effect.toLowerCase().includes(search) ||
        boon.gods.some(god => god.toLowerCase().includes(search)) ||
        boon.type.toLowerCase().includes(search) ||
        (boon.type === 'Non-Core' && 'support'.includes(search)) ||
        (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(boon.type) && 'core'.includes(search)) ||
        (boon.element && boon.element.toLowerCase().includes(search));
      const matchesGod = !selectedGod || boon.gods.includes(selectedGod);
      const matchesElement = !selectedElement || boon.element === selectedElement;
      
      const matchesType = activeSlot 
        ? isValidForSlot(boon, activeSlot) 
        : (!selectedType || boon.type === selectedType);
      
      return matchesSearch && matchesGod && matchesElement && matchesType;
    }).sort((a, b) => {
      const priorityA = SLOT_PRIORITY[a.type] || 99;
      const priorityB = SLOT_PRIORITY[b.type] || 99;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedGod, selectedElement, selectedType, activeSlot]);

  const selectBoon = (boon: Boon, slotId: string) => {
    if (['Support', 'LegendaryDuo', 'Infusion'].includes(slotId)) {
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
    if (['Support', 'LegendaryDuo', 'Infusion'].includes(slotId) && index !== undefined) {
      // Find the absolute index in additionalBoons for the filtered item
      // But it's easier to just pass the boon object or unique id
      // For now we'll filter by a combined filter + index if we must, 
      // but let's pass the boon ID or the item itself to removeBoon
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
      
      if (boon && isValidForSlot(boon, slotId)) {
        selectBoon(boon, slotId);
      }
    }
  };

  return (
    <DndContext 
      key={dndContextKey}
      sensors={sensors}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen bg-hades-bg text-hades-text font-sans selection:bg-hades-accent/30 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-hades-border bg-hades-bg-dark/80 backdrop-blur-md z-50 px-6 flex items-center text-gray-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-hades-bg-main">
              <img 
                src="/assets/ui/melinoe_icon.webp" 
                alt="Melino\u00eb" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-300 uppercase italic">
              Hades II <span className="text-hades-accent not-italic ml-2">Build Planner</span>
            </h1>
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
              className={`absolute top-[76px] z-50 w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
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
              className={`w-[${SIDEBAR_WIDTH}px] h-full flex flex-col overflow-hidden will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
            >
                <div className={`p-6 border-b border-hades-border-light flex flex-col gap-3 bg-hades-panel z-20 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs uppercase font-mono text-hades-accent font-bold flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5" />
                        Filters
                      </h2>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-text opacity-30" />
                      <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Press / to search boons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-4 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <SidebarFilterDropdown 
                      title={
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 opacity-50" />
                          <span>Slot</span>
                        </div>
                      }
                      isOpen={isSlotTypeOpen} 
                      setIsOpen={setIsSlotTypeOpen}
                      summary={selectedType ? selectedType : activeSlot}
                      icon={activeSlot ? (() => {
                        const s = CORE_SLOTS.find(item => item.type === activeSlot);
                        if (!s) return null;
                        return <img src={s.icon} className="w-3.5 h-3.5 object-contain filter brightness-125" />;
                      })() : null}
                    >
                      <button
                        onClick={() => {
                          setSelectedType(null);
                          setActiveSlot(null);
                          setIsSlotTypeOpen(false);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${!selectedType && !activeSlot ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                      >
                        <div className="w-6 h-6 flex items-center justify-center border border-white/10 rounded bg-white/5">
                          <Layers className="w-3 h-3 opacity-40" />
                        </div>
                        Any Slot
                      </button>
                      
                      {CORE_SLOTS.map(slot => {
                        const isSlotActive = activeSlot === slot.type;
                        const isTypeSelected = selectedType === slot.type;
                        const isActive = isSlotActive || isTypeSelected;
                        return (
                          <button 
                            key={slot.type}
                            onClick={() => {
                              if (isSlotActive) {
                                setActiveSlot(null);
                              } else {
                                setSelectedType(isTypeSelected ? null : slot.type);
                                setActiveSlot(null);
                              }
                              setIsSlotTypeOpen(false);
                            }}
                            className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${isActive ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                          >
                            <img 
                              src={slot.icon} 
                              className="w-6 h-6 object-contain filter brightness-125" 
                              alt="" 
                              referrerPolicy="no-referrer" 
                            />
                            {slot.name}
                          </button>
                        );
                      })}
                      {(['Non-Core', 'Infusion', 'Legendary', 'Duo'] as BoonType[]).map(type => {
                        const isSlotActive = (type === 'Non-Core' && activeSlot === 'Support') || 
                                           ((type === 'Duo' || type === 'Legendary') && activeSlot === 'LegendaryDuo') ||
                                           (type === 'Infusion' && activeSlot === 'Infusion');
                        const isTypeSelected = selectedType === type;
                        const isActive = isSlotActive || isTypeSelected;
                        return (
                          <button 
                            key={type}
                            onClick={() => {
                              if (isSlotActive) {
                                setActiveSlot(null);
                              } else {
                                setSelectedType(isTypeSelected ? null : type);
                                setActiveSlot(null);
                              }
                              setIsSlotTypeOpen(false);
                            }}
                            className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${isActive ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                          >
                            <div className="w-6 h-6" />
                            {type}
                          </button>
                        );
                      })}
                    </SidebarFilterDropdown>

                    <SidebarFilterDropdown 
                      title={
                        <div className="flex items-center gap-2">
                          <img src="/assets/ui/Icon-Olympian.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
                          <span>God</span>
                        </div>
                      } 
                      isOpen={isGodFilterOpen} 
                      setIsOpen={setIsGodFilterOpen}
                      summary={selectedGod}
                      icon={selectedGod ? <GodIcon god={selectedGod} className="w-4 h-4 filter brightness-125" /> : null}
                    >
                      <button
                        onClick={() => {
                          setSelectedGod(null);
                          setIsGodFilterOpen(false);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${!selectedGod ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                      >
                        <div className="w-6 h-6 flex items-center justify-center border border-white/10 rounded bg-white/5">
                          <Layers className="w-3 h-3 opacity-40" />
                        </div>
                        Any God
                      </button>
                      {gods.map(god => (
                        <button 
                          key={god}
                          onClick={() => {
                            setSelectedGod(god === selectedGod ? null : god);
                            setIsGodFilterOpen(false);
                          }}
                          className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${selectedGod === god ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                        >
                          <GodIcon god={god} className="w-6 h-6 filter brightness-150" />
                          {god}
                        </button>
                      ))}
                    </SidebarFilterDropdown>

                    <SidebarFilterDropdown 
                      title={
                        <div className="flex items-center gap-2">
                          <img src="/assets/ui/ElementalEssence.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
                          <span>Element</span>
                        </div>
                      } 
                      isOpen={isElementFilterOpen} 
                      setIsOpen={setIsElementFilterOpen}
                      summary={selectedElement}
                      icon={selectedElement ? <ElementIcon element={selectedElement} className="w-4 h-4" /> : null}
                    >
                      <button
                        onClick={() => {
                          setSelectedElement(null);
                          setIsElementFilterOpen(false);
                        }}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${!selectedElement ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                      >
                        <div className="w-6 h-6 flex items-center justify-center border border-white/10 rounded bg-white/5">
                          <Layers className="w-3 h-3 opacity-40" />
                        </div>
                        Any Element
                      </button>
                      {ALL_ELEMENTS.map(el => (
                        <button
                          key={el}
                          onClick={() => {
                            setSelectedElement(el === selectedElement ? null : el);
                            setIsElementFilterOpen(false);
                          }}
                          className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors font-mono text-[10px] uppercase tracking-wider ${selectedElement === el ? 'bg-hades-accent/20 text-hades-accent' : 'hover:bg-white/5 text-hades-text/60'}`}
                        >
                          <ElementIcon element={el} className="w-6 h-6" />
                          {el}
                        </button>
                      ))}
                    </SidebarFilterDropdown>
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
          <section className="flex-1 overflow-auto p-8 custom-scrollbar relative">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
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
                <button 
                  onClick={purgeBuild}
                  className={`text-xs font-mono uppercase transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded border ${
                    showPurgeConfirm 
                      ? 'bg-hades-red text-white border-white/20 animate-pulse' 
                      : 'text-hades-red hover:text-red-300 bg-hades-red/5 border-hades-red/10 hover:border-hades-red/30'
                  }`}
                >
                  <Trash2 className={`w-4 h-4 ${showPurgeConfirm ? 'animate-bounce' : ''}`} />
                  {showPurgeConfirm ? 'Confirm Purge?' : 'Purge Build'}
                </button>
              </div>

              {/* Consolidated Build View */}
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-x-8 gap-y-16 items-start relative">
                
                {/* Left Side: Core Boon Slots (Narrow Column) */}
                <aside className="lg:sticky lg:top-8 flex-shrink-0 z-30 flex flex-col items-center">
                  <div className="flex flex-col items-center gap-2 mb-8 w-full" title="Core Boons">
                    <Swords className="w-5 h-5 text-hades-accent" />
                    <h3 className="text-[10px] font-mono uppercase text-hades-accent font-black tracking-[0.2em]">
                      CORE
                    </h3>
                  </div>
                  
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
                        isValid={draggedBoon ? isValidForSlot(draggedBoon, slot.type) : true}
                      />
                    ))}
                  </div>
                </aside>

                {/* Right Side: Reorganized Sections */}
                <div className="flex-1 w-full lg:pl-16 lg:border-l lg:border-white/5">
                  <div className="w-full">
                    {/* Header for Non-Core Boons - Aligned with Core header rhythm */}
                    <div className="flex flex-col items-start gap-2 mb-8 w-full" title="Non-Core Boons">
                      <Sparkles className="w-5 h-5 text-hades-accent" />
                      <h3 className="text-[10px] font-mono uppercase text-hades-accent font-black tracking-[0.2em]">
                        NON-CORE
                      </h3>
                    </div>

                    <div className="flex flex-col gap-12">
                      {/* Integrated Elemental Grid (Info Panel) */}
                      <div className="bg-hades-bg-dark/20 rounded-2xl p-6 border border-white/5">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Droplets className="w-3 h-3" />
                          Elemental Resonance
                        </div>
                        <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                      </div>

                      {/* Unified Boons Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-3">
                        {/* Selected Boons */}
                        {additionalBoons.map((boon, idx) => (
                          <BoonDisplayCard 
                            key={`${boon.id}-${idx}`}
                            boon={boon} 
                            onRemove={() => removeAdditionalBoon(boon, idx)}
                          />
                        ))}

                        {/* Slots - Arranged to potentially occupy the grid starts */}
                        <DroppableSlotCard 
                          id="Support"
                          slot="Support"
                          name="Support Slot"
                          icon={Shield}
                          isActive={activeSlot === 'Support'}
                          onClick={() => toggleActiveSlot('Support')}
                          draggedBoon={draggedBoon}
                          isValid={draggedBoon ? isValidForSlot(draggedBoon, 'Support') : true}
                        />
                        
                        <DroppableSlotCard 
                          id="LegendaryDuo"
                          slot="LegendaryDuo"
                          name="Leg./Duo Slot"
                          icon={Sparkles}
                          isActive={activeSlot === 'LegendaryDuo'}
                          onClick={() => toggleActiveSlot('LegendaryDuo')}
                          draggedBoon={draggedBoon}
                          isValid={draggedBoon ? isValidForSlot(draggedBoon, 'LegendaryDuo') : true}
                        />

                        <DroppableSlotCard 
                          id="Infusion"
                          slot="Infusion"
                          name="Infusion Slot"
                          icon={Zap}
                          isActive={activeSlot === 'Infusion'}
                          onClick={() => toggleActiveSlot('Infusion')}
                          draggedBoon={draggedBoon}
                          isValid={draggedBoon ? isValidForSlot(draggedBoon, 'Infusion') : true}
                        />
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


