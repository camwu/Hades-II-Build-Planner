/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Cloud, 
  Flame, 
  Mountain, 
  Search, 
  Trash2, 
  X,
  Filter,
  Plus, 
  Swords, 
  Shield, 
  Wind, 
  Sparkles,
  Info,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Edit2,
  Github
} from 'lucide-react';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { BOONS } from './data/boonsData';
import { Boon, BoonType, GOD_COLORS, ELEMENT_COLORS, ElementType, GOD_SYMBOLS, ALL_ELEMENTS } from './types';

// Slot priority for sorting
const SLOT_PRIORITY: Record<string, number> = {
  'Attack': 1,
  'Special': 2,
  'Cast': 3,
  'Sprint': 4,
  'Magick': 5,
  'Non-Core': 6,
  'Infusion': 7,
  'Legendary': 8,
  'Duo': 9,
};

// Slot definitions
const CORE_SLOTS: { type: BoonType; name: string; icon: any }[] = [
  { type: 'Attack', name: 'Attack', icon: '/assets/slots/SlotIcon_Attack.webp' },
  { type: 'Special', name: 'Special', icon: '/assets/slots/SlotIcon_Special.webp' },
  { type: 'Cast', name: 'Cast', icon: '/assets/slots/SlotIcon_Cast.webp' },
  { type: 'Sprint', name: 'Sprint', icon: '/assets/slots/SlotIcon_Dash.webp' },
  { type: 'Magick', name: 'Magick', icon: '/assets/slots/SlotIcon_Magick.webp' },
];

const isValidForSlot = (boon: Boon, slot: string) => {
  if (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(slot)) {
    return boon.type === slot;
  }
  if (slot === 'Support') return boon.type === 'Non-Core';
  if (slot === 'LegendaryDuo') return boon.type === 'Legendary' || boon.type === 'Duo';
  if (slot === 'Infusion') return boon.type === 'Infusion';
  return false;
};

const getBoonColor = (type: BoonType | string) => {
  switch (type) {
    case 'Infusion': return 'text-hades-infusion';
    case 'Duo': return 'text-hades-duo';
    case 'Legendary': return 'text-hades-legendary';
    default: return 'text-gray-200';
  }
};

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
              width: isPanelCollapsed ? 0 : 450,
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
              className={`w-[450px] h-full flex flex-col overflow-hidden will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
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
                        if (typeof s.icon === 'string') return <img src={s.icon} className="w-3.5 h-3.5 object-contain filter brightness-125" />;
                        return <s.icon className="w-3.5 h-3.5" />;
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
                            {typeof slot.icon === 'string' ? (
                              <img 
                                src={slot.icon} 
                                className="w-6 h-6 object-contain filter brightness-125" 
                                alt="" 
                                referrerPolicy="no-referrer" 
                              />
                            ) : (
                              <slot.icon className="w-6 h-6" />
                            )}
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
          <section className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
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
                <div className="flex-1 w-full flex flex-col gap-16 lg:pl-8 lg:border-l lg:border-white/5">
                  {/* Section 1: Support Boons */}
                  <div className="w-full">
                    <div className="flex items-center gap-4 mb-6">
                      <Shield className="w-5 h-5 text-hades-accent" />
                      <h3 className="text-sm font-mono uppercase text-gray-400 font-bold tracking-widest italic">
                        Support <span className="text-hades-accent/70 not-italic">Boons</span>
                      </h3>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {additionalBoons.map((boon, idx) => boon.type === 'Non-Core' && (
                        <BoonDisplayCard 
                          key={`${boon.id}-${idx}`}
                          boon={boon} 
                          onRemove={() => removeAdditionalBoon(boon, idx)}
                        />
                      ))}
                      <DroppableSlotCard 
                        id="Support"
                        slot="Support"
                        name="Support Slot"
                        icon={Plus}
                        boon={null}
                        isActive={activeSlot === 'Support'}
                        onClick={() => toggleActiveSlot('Support')}
                        onRemove={() => {}}
                        draggedBoon={draggedBoon}
                        isValid={draggedBoon ? isValidForSlot(draggedBoon, 'Support') : true}
                      />
                    </div>
                  </div>

                  {/* Section 2: Legendary & Duo */}
                  <div className="w-full">
                    <div className="flex items-center gap-4 mb-6">
                      <Sparkles className="w-5 h-5 text-hades-accent" />
                      <h3 className="text-sm font-mono uppercase text-gray-400 font-bold tracking-widest italic">
                        Legendary & Duo <span className="text-hades-accent/70 not-italic">Boons</span>
                      </h3>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {additionalBoons.map((boon, idx) => (boon.type === 'Legendary' || boon.type === 'Duo') && (
                        <BoonDisplayCard 
                          key={`${boon.id}-${idx}`}
                          boon={boon} 
                          onRemove={() => removeAdditionalBoon(boon, idx)}
                        />
                      ))}
                      <DroppableSlotCard 
                        id="LegendaryDuo"
                        slot="LegendaryDuo"
                        name="Legendary/Duo Slot"
                        icon={Plus}
                        boon={null}
                        isActive={activeSlot === 'LegendaryDuo'}
                        onClick={() => toggleActiveSlot('LegendaryDuo')}
                        onRemove={() => {}}
                        draggedBoon={draggedBoon}
                        isValid={draggedBoon ? isValidForSlot(draggedBoon, 'LegendaryDuo') : true}
                      />
                    </div>
                  </div>

                  {/* Section 3: Infusion & Elemental summary */}
                  <div className="w-full">
                    <div className="flex items-center gap-4 mb-6">
                      <Zap className="w-5 h-5 text-hades-accent" />
                      <h3 className="text-sm font-mono uppercase text-gray-400 font-bold tracking-widest italic whitespace-nowrap">
                        Infusion <span className="text-hades-accent/70 not-italic">Boons</span>
                      </h3>
                      <div className="h-px flex-1 bg-white/5"></div>
                    </div>

                    {/* Integrated Elemental Grid */}
                    <div className="flex flex-col gap-8">
                      <div className="bg-hades-bg-dark/40 rounded-2xl p-6 border border-white/5">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Droplets className="w-3 h-3" />
                          Elemental Resonance
                        </div>
                        <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {additionalBoons.map((boon, idx) => boon.type === 'Infusion' && (
                          <BoonDisplayCard 
                            key={`${boon.id}-${idx}`}
                            boon={boon} 
                            onRemove={() => removeAdditionalBoon(boon, idx)}
                          />
                        ))}
                        <DroppableSlotCard 
                          id="Infusion"
                          slot="Infusion"
                          name="Infusion Slot"
                          icon={Plus}
                          boon={null}
                          isActive={activeSlot === 'Infusion'}
                          onClick={() => toggleActiveSlot('Infusion')}
                          onRemove={() => {}}
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
            <div className="w-[380px] pointer-events-none opacity-90 backdrop-blur-sm cursor-grabbing">
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

function StaticBoonListItem({ boon, isOverlay = false }: { boon: Boon; isOverlay?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-75 transform-gpu ${
      isOverlay 
        ? 'border-hades-accent shadow-2xl bg-hades-bg-light scale-[1.02]' 
        : 'border-hades-border bg-hades-bg-main'
    }`}>
      <div className="flex items-start gap-4 mb-2 pb-2 border-b border-hades-border/30 transform-gpu">
        <div className="relative">
          {boon.icon ? (
            <div className="w-14 h-14 rounded-lg bg-hades-bg-dark border border-hades-border p-1 group-hover:border-hades-accent/30 transition-colors duration-100">
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-hades-bg-dark border border-hades-border flex items-center justify-center p-1 group-hover:border-hades-accent/30 transition-colors duration-100">
              <GodIcon god={boon.gods[0]} className="w-10 h-10 opacity-20" />
            </div>
          )}
          {boon.element && (
            <div className="absolute -bottom-1 -right-1 bg-hades-bg-dark rounded-full p-0.5 border border-hades-border shadow-lg transition-colors duration-100">
              <ElementIcon element={boon.element} className={`w-3.5 h-3.5 ${ELEMENT_COLORS[boon.element]}`} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-bold uppercase truncate mb-1 ${getBoonColor(boon.type)}`}>
            {boon.name}
          </h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <GodIcon god={boon.gods[0]} className="w-3 h-3" />
              <span className="text-[10px] font-mono text-gray-400 uppercase leading-none">
                {boon.gods[0]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-hades-accent/70 uppercase leading-none font-bold">
                {boon.type}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-300 leading-relaxed font-light line-clamp-2 min-h-[2.4em]">
        {boon.effect}
      </p>
    </div>
  );
}

function DraggableBoonListItem({ boon, onClick, isSelectable }: any) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boon.id,
  });
  
  return (
    <motion.div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.98, x: 2 }}
      transition={{ 
        type: 'tween', 
        ease: "easeOut",
        duration: 0.1
      }}
      className={`relative group transition-all duration-75 transform-gpu backface-hidden ${
        isDragging 
          ? 'opacity-20 pointer-events-none' 
          : isSelectable
            ? 'cursor-pointer'
            : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <StaticBoonListItem boon={boon} />
      {/* Selection indicator only for selectable items */}
      {isSelectable && (
        <div className="absolute inset-0 rounded-xl border-2 border-hades-accent/30 group-hover:border-hades-accent pointer-events-none transition-colors duration-75" />
      )}
    </motion.div>
  );
}

function CoreSlotRow({ slot, boon, isActive, onClick, onRemove, draggedBoon, isValid }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: slot.type,
  });

  const [isHovered, setIsHovered] = useState(false);

  const isPotentialTarget = draggedBoon && isValid;
  const shouldHighlight = isOver && isPotentialTarget;
  const shouldDim = draggedBoon && !isValid;
  const isExpanded = isActive || isOver || isHovered;

  const renderSlotIcon = () => {
    if (boon) {
      return (
        <>
          <div className="absolute inset-0">
            <motion.img 
              key={boon.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={boon.icon} 
              alt={boon.name} 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer" 
            />
          </div>
          {/* Overlapping Icons like the game - scaled up slightly and adjusted for visibility */}
          <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/10 group-hover:border-white/20 transition-colors">
            <GodIcon god={boon.gods[0]} className="w-full h-full transition-all group-hover:brightness-125" />
          </div>
          {boon.element && (
            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/5 group-hover:border-white/10 transition-colors">
              <ElementIcon element={boon.element} className={`w-full h-full ${ELEMENT_COLORS[boon.element]} transition-all group-hover:brightness-125`} />
            </div>
          )}
        </>
      );
    }
    
    if (typeof slot.icon === 'string') {
      return (
        <img 
          src={slot.icon} 
          alt={slot.name} 
          className="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-125 opacity-70 group-hover:opacity-100 transition-all duration-200" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = slot.icon;
    return (
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <IconComponent className="w-full h-full opacity-30 group-hover:opacity-50 transition-all duration-100 text-gray-500" />
      </div>
    );
  };

  return (
    <div className="h-[88px] w-full relative">
      <div 
        className={`group flex flex-col items-start absolute top-0 left-0 transition-opacity duration-100 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isExpanded ? 50 : 10 }}
      >
        <motion.div 
          ref={setNodeRef}
          onClick={onClick}
          initial={false}
          animate={{ 
            width: isExpanded ? '380px' : '88px',
            height: isExpanded ? 'auto' : '88px'
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`relative flex items-start gap-4 p-1 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            shouldHighlight 
              ? 'bg-hades-accent/20 border-hades-accent border-solid shadow-[0_0_40px_rgba(16,185,129,0.4)] z-50' 
              : isPotentialTarget
                ? 'bg-hades-accent/10 border-hades-accent/40 border-dashed shadow-[0_0_25px_rgba(16,185,129,0.25)] animate-pulse z-40'
                : isActive
                  ? 'bg-hades-accent/5 border-hades-accent border-solid z-50'
                  : isExpanded
                    ? 'bg-hades-bg-dark/60 border-white/10 shadow-2xl'
                    : 'bg-transparent border-transparent shadow-none'
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
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-xl z-[-1]" 
              />
            )}
          </AnimatePresence>

          {/* Icon Container - Size match */}
          <div className="relative w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
            {renderSlotIcon()}
          </div>

          {/* Content Area - Uses a fixed width inner container to prevent reflow during expansion */}
          <div className="overflow-hidden flex-1">
            <div className="w-[300px] h-full flex flex-col justify-center pr-4 py-3">
              {boon ? (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  className="relative"
                >
                  <div className="text-[9px] font-mono text-hades-text/40 uppercase mb-0.5 font-bold">
                    {slot.name}
                  </div>
                  <h4 className={`text-sm font-black uppercase tracking-wider leading-tight ${getBoonColor(boon.type)}`}>
                    {boon.name}
                  </h4>
                  <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal mt-1">
                    {boon.effect}
                  </p>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="absolute right-0 top-0 p-1 hover:text-hades-red text-gray-700 hover:bg-hades-red/10 rounded transition-all"
                    title="Remove Boon"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  className="flex items-center gap-3"
                >
                  <Plus className={`w-5 h-5 ${isActive ? 'text-hades-accent scale-110' : 'text-gray-800 opacity-40'}`} />
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-mono uppercase font-bold ${isActive ? 'text-hades-accent' : 'text-hades-accent/40'}`}>
                      {slot.name}
                    </span>
                    <span className="text-[9px] font-mono text-gray-700 uppercase">
                      Empty Slot
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DroppableSlotCard({ id, slot, name, icon, isActive, onClick, draggedBoon, isValid }: any) {
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
          className="w-8 h-8 object-contain filter brightness-125 contrast-125" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = icon;
    return <IconComponent className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity text-gray-500" />;
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
            width: isExpanded ? '380px' : '88px',
            height: isExpanded ? 'auto' : '88px'
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`relative flex items-start gap-4 p-1 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            shouldHighlight 
              ? 'bg-hades-accent/20 border-hades-accent border-solid shadow-[0_0_40px_rgba(16,185,129,0.4)] z-50' 
              : isPotentialTarget
                ? 'bg-hades-accent/10 border-hades-accent/40 border-dashed shadow-[0_0_25px_rgba(16,185,129,0.25)] animate-pulse z-40'
                : isActive 
                  ? 'bg-hades-accent/5 border-hades-accent border-solid z-50' 
                  : isExpanded
                    ? 'bg-hades-bg-dark/60 border-white/10 shadow-2xl'
                    : 'bg-transparent border-transparent shadow-none'
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
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-xl z-[-1]" 
              />
            )}
          </AnimatePresence>

          <div className="relative w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
            {renderIcon()}
          </div>

          <div className="overflow-hidden flex-1">
            <div className="w-[280px] h-full flex flex-col justify-center pr-4 py-3">
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

function CollapsibleSection({ 
  title, 
  icon: Icon, 
  children, 
  count,
  defaultOpen = true 
}: { 
  title: React.ReactNode; 
  icon: any; 
  children: React.ReactNode; 
  count?: number;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-12">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 mb-8 group focus:outline-none"
      >
        <Icon className={`w-6 h-6 transition-colors ${isOpen ? 'text-hades-accent' : 'text-gray-500 group-hover:text-hades-accent/70'}`} />
        <h3 className="text-base font-mono uppercase text-gray-300 font-bold text-left">
          {title}
        </h3>
        <div className="h-px flex-1 bg-hades-accent/20"></div>
        <div className="flex items-center gap-4">
          {count !== undefined && count > 0 && (
            <span className="text-[10px] font-mono text-gray-400 bg-hades-bg-main px-2 py-0.5 rounded-full border border-hades-border">
              {count}
            </span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-hades-accent/40 group-hover:text-hades-accent transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarFilterDropdown({ 
  title, 
  isOpen, 
  setIsOpen, 
  children,
  summary,
  icon
}: { 
  title: React.ReactNode; 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void; 
  children: React.ReactNode;
  summary?: string | null;
  icon?: React.ReactNode;
}) {
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
            <span className={`uppercase font-mono transition-all duration-200 text-xs ${
              isOpen || hasValue ? 'text-white/80 font-bold' : 'text-hades-text/50 font-semibold'
            }`}>
              {title}
            </span>
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

function ElementIcon({ element, className }: { element: ElementType; className?: string }) {
  return (
    <img 
      src={`/assets/elements/Element_${element}.webp`}
      alt={element}
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

function GodIcon({ god, className }: { god: string; className?: string }) {
  const symbol = GOD_SYMBOLS[god];
  if (!symbol) return null;
  return (
    <img 
      src={symbol}
      alt={god}
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

function BoonDisplayCard({ boon, onRemove }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-[88px] w-full relative">
      <div 
        className="group absolute top-0 left-0 w-full transition-opacity duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            width: isHovered ? '440px' : '88px',
            height: isHovered ? 'auto' : '88px'
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className={`relative flex items-start w-full gap-4 p-1 rounded-xl border-2 transition-all duration-300 ${
            isHovered 
              ? 'bg-hades-bg-dark/60 border-hades-accent/30 shadow-2xl' 
              : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Background masking for hovered state */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-hades-bg-dark/95 backdrop-blur-md rounded-xl z-[-1]" 
              />
            )}
          </AnimatePresence>

          {/* Icon Container - No overflow-hidden to let built-in art border shine */}
          <div className="relative w-[80px] h-[80px] flex-shrink-0">
            <div className="w-full h-full">
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            {/* Overlapping icons - relative to the slightly smaller artwork container */}
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/10 group-hover:border-white/20 transition-colors">
              <GodIcon god={boon.gods[0]} className="w-full h-full transition-all group-hover:brightness-125" />
            </div>
            {boon.element && (
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-hades-bg-dark shadow-xl flex items-center justify-center p-1 z-20 border border-white/5 group-hover:border-white/10 transition-colors">
                <ElementIcon element={boon.element} className={`w-full h-full ${ELEMENT_COLORS[boon.element]} transition-all group-hover:brightness-125`} />
              </div>
            )}
          </div>

          <div className="overflow-hidden flex-1">
            <div className="w-[340px] h-full flex flex-col justify-center pr-4 py-3">
              <motion.div 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="relative"
              >
                <div className="text-[9px] font-mono text-hades-text/40 uppercase mb-0.5 font-bold">
                  {boon.type}
                </div>
                <h4 className={`text-sm font-black uppercase tracking-wider leading-tight ${getBoonColor(boon.type)}`}>
                  {boon.name}
                </h4>
                <p className="text-[12px] text-gray-400 leading-normal font-medium whitespace-normal mt-1">
                  {boon.effect}
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemove(); }}
                  className="absolute right-0 top-0 p-1 hover:text-hades-red text-gray-700 hover:bg-hades-red/10 rounded transition-all"
                  title="Remove Boon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ElementSummary({ coreBuild, additionalBoons }: { coreBuild: Record<string, Boon | null>; additionalBoons: Boon[] }) {
  const counts = useMemo(() => {
    const summary = {} as Record<ElementType, number>;
    ALL_ELEMENTS.forEach(el => summary[el] = 0);
    
    // Core
    Object.values(coreBuild).forEach(b => {
      if (b?.element) summary[b.element]++;
    });

    // Additional
    additionalBoons.forEach(b => {
      if (b?.element) summary[b.element]++;
    });

    return summary;
  }, [coreBuild, additionalBoons]);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 p-4 rounded-xl bg-hades-panel/40 border border-hades-border/40">
      {ALL_ELEMENTS.map((el) => {
        const count = counts[el];
        return (
          <div key={el} className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded bg-hades-bg-main border border-hades-border/50 transition-all duration-300 ${count > 0 ? `${ELEMENT_COLORS[el]} shadow-[0_0_10px_-2px_currentColor]` : 'text-gray-600 opacity-40'}`}>
              <ElementIcon element={el} className="w-4 h-4" />
            </div>
            <div className="flex flex-col -space-y-1">
              <div className={`text-base font-bold font-mono transition-colors duration-300 ${count > 0 ? 'text-gray-100' : 'text-gray-600'}`}>{count}</div>
              <div className="text-[9px] font-mono uppercase text-gray-500 tracking-tighter">{el}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

