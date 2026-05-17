/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Droplets, 
  Cloud, 
  Flame, 
  Mountain, 
  Search, 
  Trash2, 
  Plus, 
  Swords, 
  Shield, 
  Wind, 
  Sparkles,
  Info,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown
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

// Slot definitions
const CORE_SLOTS: { type: BoonType; name: string; icon: any }[] = [
  { type: 'Attack', name: 'Attack', icon: '/assets/slots/SlotIcon_Attack.webp' },
  { type: 'Special', name: 'Special', icon: '/assets/slots/SlotIcon_Special.webp' },
  { type: 'Cast', name: 'Cast', icon: '/assets/slots/SlotIcon_Cast.webp' },
  { type: 'Sprint', name: 'Sprint', icon: '/assets/slots/SlotIcon_Dash.webp' },
  { type: 'Magick', name: 'Magick', icon: '/assets/slots/SlotIcon_Magick.webp' },
];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGod, setSelectedGod] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [selectedType, setSelectedType] = useState<BoonType | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [draggedBoon, setDraggedBoon] = useState<Boon | null>(null);

  const [isSlotTypeOpen, setIsSlotTypeOpen] = useState(true);
  const [isGodFilterOpen, setIsGodFilterOpen] = useState(true);
  const [isElementFilterOpen, setIsElementFilterOpen] = useState(true);
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSlot(null);
        setSelectedGod(null);
        setSelectedElement(null);
        setSelectedType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      const matchesSearch = boon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          boon.effect.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGod = !selectedGod || boon.gods.includes(selectedGod);
      const matchesElement = !selectedElement || boon.element === selectedElement;
      
      const currentActiveType = activeSlot && CORE_SLOTS.find(s => s.type === activeSlot)?.type;
      const typeToMatch = currentActiveType || selectedType;
      const matchesType = !typeToMatch || boon.type === typeToMatch;
      
      return matchesSearch && matchesGod && matchesElement && matchesType;
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
    setActiveSlot(prev => prev === slotId ? null : slotId);
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

  const isValidForSlot = (boon: Boon, slot: string) => {
    if (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(slot)) {
      return boon.type === slot;
    }
    if (slot === 'Support') return boon.type === 'Non-Core';
    if (slot === 'LegendaryDuo') return boon.type === 'Legendary' || boon.type === 'Duo';
    if (slot === 'Infusion') return boon.type === 'Infusion';
    return false;
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-hades-bg text-hades-text font-sans selection:bg-hades-accent/30 overflow-hidden flex flex-col">
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
            <h1 className="text-xl font-bold tracking-tight text-gray-300 uppercase italic">
              Hades II <span className="text-hades-accent not-italic ml-2">Build Planner</span>
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 mt-16 flex overflow-hidden relative">
          {/* Left: Boon Picker (Collapsible) */}
          <AnimatePresence initial={false}>
            <motion.aside 
              initial={false}
              animate={{ 
                width: isPanelCollapsed ? 0 : 450,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="border-r border-hades-border bg-hades-panel flex flex-col z-30 relative"
            >
              {/* Toggle Button - High contrast background and accent border */}
              <button 
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                className={`absolute top-24 z-50 w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
                  isPanelCollapsed 
                    ? 'left-6 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light' 
                    : '-right-3 rounded bg-hades-bg-dark border-hades-border-light hover:border-hades-accent hover:bg-hades-bg-light'
                }`}
                title={isPanelCollapsed ? "Expand Library" : "Collapse Library"}
              >
                {isPanelCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-hades-accent animate-pulse" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-hades-text group-hover:text-hades-accent transition-colors" />
                )}
              </button>

              <div className={`w-[450px] h-full flex flex-col transition-opacity duration-300 ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}>
                <div className="p-6 border-b border-hades-border flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-hades-accent font-bold">Boon Library</h3>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-text opacity-30" />
                    <input 
                      type="text" 
                      placeholder="Search Boons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-4 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <SidebarCollapsibleSection 
                      title="Slot Type" 
                      isOpen={isSlotTypeOpen} 
                      setIsOpen={setIsSlotTypeOpen}
                    >
                      <div className="flex flex-wrap gap-2">
                        {CORE_SLOTS.map(slot => (
                          <button 
                            key={slot.type}
                            onClick={() => setSelectedType(slot.type === selectedType ? null : slot.type)}
                            className={`h-9 px-3 text-xs uppercase font-mono tracking-wider flex items-center gap-2 rounded-lg border transition-all ${selectedType === slot.type ? 'bg-hades-accent/20 border-hades-accent/50 text-hades-accent shadow-[0_0_15px_-3px_rgba(255,189,1,0.2)]' : 'bg-hades-bg-dark/60 border-hades-border-light text-hades-text/60 hover:bg-hades-bg-dark hover:border-hades-text/30 hover:text-hades-text'}`}
                          >
                            {typeof slot.icon === 'string' ? (
                              <img 
                                src={slot.icon} 
                                className="w-4 h-4 object-contain filter brightness-125 contrast-125" 
                                alt="" 
                                referrerPolicy="no-referrer" 
                              />
                            ) : (
                              <slot.icon className="w-4 h-4" />
                            )}
                            {slot.name}
                          </button>
                        ))}
                        {(['Non-Core', 'Duo', 'Legendary', 'Infusion'] as BoonType[]).map(type => (
                          <button 
                            key={type}
                            onClick={() => setSelectedType(type === selectedType ? null : type)}
                            className={`h-9 px-3 text-xs uppercase font-mono tracking-wider rounded-lg border transition-all inline-flex items-center justify-center ${selectedType === type ? 'bg-hades-accent/20 border-hades-accent/50 text-hades-accent shadow-[0_0_15px_-3px_rgba(255,189,1,0.2)]' : 'bg-hades-bg-dark/60 border-hades-border-light text-hades-text/60 hover:bg-hades-bg-dark hover:border-hades-text/30 hover:text-hades-text'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </SidebarCollapsibleSection>

                    <SidebarCollapsibleSection 
                      title={
                        <div className="flex items-center gap-2">
                          <img src="/assets/ui/Icon-Olympian.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
                          <span>God</span>
                        </div>
                      } 
                      isOpen={isGodFilterOpen} 
                      setIsOpen={setIsGodFilterOpen}
                    >
                      <div className="flex flex-wrap gap-2">
                        {gods.map(god => (
                          <button 
                            key={god}
                            onClick={() => setSelectedGod(god === selectedGod ? null : god)}
                            className={`h-9 px-3 text-xs uppercase font-mono tracking-wider rounded-lg border transition-all flex items-center gap-2 ${selectedGod === god ? 'bg-hades-accent/20 border-hades-accent/50 text-hades-accent shadow-[0_0_15px_-3px_rgba(255,189,1,0.2)]' : 'bg-hades-bg-dark/60 border-hades-border-light text-hades-text/60 hover:bg-hades-bg-dark hover:border-hades-text/30 hover:text-hades-text'}`}
                          >
                            <GodIcon god={god} className="w-4 h-4 filter brightness-110" />
                            {god}
                          </button>
                        ))}
                      </div>
                    </SidebarCollapsibleSection>

                    <SidebarCollapsibleSection 
                      title={
                        <div className="flex items-center gap-2">
                          <img src="/assets/ui/ElementalEssence.webp" className="w-4 h-4 object-contain filter brightness-125" alt="" referrerPolicy="no-referrer" />
                          <span>Element</span>
                        </div>
                      } 
                      isOpen={isElementFilterOpen} 
                      setIsOpen={setIsElementFilterOpen}
                    >
                      <div className="flex gap-2.5">
                        {ALL_ELEMENTS.map(el => (
                          <button
                            key={el}
                            onClick={() => setSelectedElement(el === selectedElement ? null : el)}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300 relative group overflow-hidden ${
                              selectedElement === el 
                                ? 'bg-hades-accent/30 border-hades-accent text-hades-accent shadow-[0_0_20px_-3px_rgba(255,189,1,0.4)] ring-1 ring-hades-accent/20 scale-110 z-10' 
                                : 'bg-hades-bg-dark/60 border-hades-border-light text-hades-text/40 hover:border-hades-text hover:bg-hades-bg-dark hover:scale-105'
                            }`}
                            title={el}
                          >
                            {selectedElement === el && (
                              <motion.div 
                                layoutId="element-glow"
                                className="absolute inset-0 bg-hades-accent/5 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                            <ElementIcon element={el} className="w-4 h-4 relative z-10 filter brightness-125" />
                          </button>
                        ))}
                      </div>
                    </SidebarCollapsibleSection>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="space-y-3">
                    {filteredBoons.map(boon => (
                      <DraggableBoonListItem 
                        key={boon.id} 
                        boon={boon} 
                      />
                    ))}
                    {filteredBoons.length === 0 && (
                      <div className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-widest border border-dashed border-hades-border rounded-xl">
                        No matches found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>

          {/* Right: Build View */}
          <section className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-light tracking-[0.2em] text-gray-300 flex items-center gap-3 uppercase">
                  Current <span className="font-bold text-hades-accent">Build</span>
                </h2>
                <button 
                  onClick={purgeBuild}
                  className={`text-xs font-mono uppercase tracking-widest transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded border ${
                    showPurgeConfirm 
                      ? 'bg-hades-red text-white border-white/20 animate-pulse' 
                      : 'text-hades-red hover:text-red-300 bg-hades-red/5 border-hades-red/10 hover:border-hades-red/30'
                  }`}
                >
                  <Trash2 className={`w-4 h-4 ${showPurgeConfirm ? 'animate-bounce' : ''}`} />
                  {showPurgeConfirm ? 'Confirm Purge?' : 'Purge Build'}
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Left Side: Core Boon Slots (One Column) */}
                <aside className="w-full lg:w-[320px] lg:sticky lg:top-0 space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <Swords className="w-6 h-6 text-hades-accent" />
                    <h3 className="text-base font-mono uppercase tracking-[0.3em] text-gray-300 font-bold">
                      Core <span className="text-hades-accent/80">Slots</span>
                    </h3>
                    <div className="h-px flex-1 bg-hades-accent/20"></div>
                  </div>
                  
                  <div className="flex flex-col gap-8">
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

                {/* Right Side: All Other Boons */}
                <div className="flex-1 w-full flex flex-col gap-12">
                  <CollapsibleSection
                    title={<>Support <span className="text-hades-accent/80">Boons</span></>}
                    icon={Shield}
                    count={additionalBoons.filter(b => b.type === 'Non-Core').length}
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                  </CollapsibleSection>

                  <CollapsibleSection
                    title={<>Legendary & Duo <span className="text-hades-accent/80">Boons</span></>}
                    icon={Sparkles}
                    count={additionalBoons.filter(b => b.type === 'Legendary' || b.type === 'Duo').length}
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                  </CollapsibleSection>

                  <CollapsibleSection
                    title={<>Infusion <span className="text-hades-accent/80">Boons</span></>}
                    icon={Zap}
                    count={additionalBoons.filter(b => b.type === 'Infusion').length}
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                  </CollapsibleSection>

                  {/* Elements Summary at the bottom of the right section */}
                  <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                </div>
              </div>
            </div>
          </section>
        </main>

        <DragOverlay>
          {draggedBoon ? (
            <div className="w-[380px] pointer-events-none opacity-80 backdrop-blur-sm">
              <SimpleBoonCard boon={draggedBoon} />
            </div>
          ) : null}
        </DragOverlay>

        {/* Footer / Mobile Warning */}
        <footer className="h-10 bg-hades-bg-dark border-t border-hades-border px-6 flex items-center justify-center text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em]">
          Built for the Underworld &bull; Hades II Build Planner &bull; Alpha Build
        </footer>
      </div>
    </DndContext>
  );
}

function SimpleBoonCard({ boon }: any) {
  const godColor = GOD_COLORS[boon.gods[0]] || 'text-gray-200';
  return (
    <div className="p-4 rounded-xl border border-hades-accent/50 bg-hades-bg-light shadow-2xl">
      <div className="flex items-start gap-3 mb-2">
        {boon.icon ? (
          <div className="w-12 h-12 rounded-lg bg-hades-bg-dark border border-hades-border flex-shrink-0 p-1">
            <img 
              src={boon.icon} 
              alt={boon.name} 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer" 
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-hades-bg-dark border border-hades-border flex-shrink-0 flex items-center justify-center p-1">
            <GodIcon god={boon.gods[0]} className="w-8 h-8 opacity-20" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`text-sm font-bold tracking-wide uppercase italic ${godColor}`}>
              {boon.name}
            </h4>
            <div className="flex items-center gap-2">
              {boon.element && <ElementIcon element={boon.element} className={`w-4 h-4 ${ELEMENT_COLORS[boon.element]}`} />}
            </div>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed font-light line-clamp-2">
            {boon.effect}
          </p>
        </div>
      </div>
    </div>
  );
}

function DraggableBoonListItem({ boon }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: boon.id,
  });
  
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const godColor = GOD_COLORS[boon.gods[0]] || 'text-gray-200';
  
  return (
    <motion.div 
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl border transition-all cursor-grab active:cursor-grabbing group relative ${
        isDragging 
          ? 'opacity-0' 
          : 'border-hades-border bg-hades-bg-main hover:bg-hades-bg-light hover:border-hades-accent/30'
      }`}
    >
      <div className="flex items-start gap-4 mb-2 pb-2 border-b border-hades-border/50">
        <div className="relative">
          {boon.icon ? (
            <div className="w-12 h-12 rounded-lg bg-hades-bg-dark border border-hades-border p-1 group-hover:border-hades-accent/30 transition-colors">
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-hades-bg-dark border border-hades-border flex items-center justify-center p-1 group-hover:border-hades-accent/30 transition-colors">
              <GodIcon god={boon.gods[0]} className="w-8 h-8 opacity-20" />
            </div>
          )}
          {boon.element && (
            <div className="absolute -bottom-1 -right-1 bg-hades-bg-dark rounded-full p-0.5 border border-hades-border">
              <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`text-sm font-bold tracking-wide uppercase italic truncate ${godColor}`}>
              {boon.name}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-hades-bg-dark/50 border border-hades-border-light group-hover:bg-hades-bg-dark transition-colors">
              <GodIcon god={boon.gods[0]} className="w-3 h-3" />
              <span className="text-[9px] font-mono tracking-tighter uppercase text-gray-400 group-hover:text-gray-200 transition-colors">
                {boon.gods.join(' + ')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-300 leading-relaxed font-light line-clamp-2">
        {boon.effect}
      </p>
      <div className="mt-2 flex items-center justify-between">
         <span className="text-[8px] font-mono text-hades-accent/50 uppercase tracking-widest">{boon.type}</span>
      </div>
    </motion.div>
  );
}

function CoreSlotRow({ slot, boon, isActive, onClick, onRemove, draggedBoon, isValid }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: slot.type,
  });

  const shouldHighlight = isOver && draggedBoon && isValid;
  const shouldDim = draggedBoon && !isValid;

  const renderSlotIcon = () => {
    if (boon) {
      return (
        <>
          <motion.img 
            key={boon.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={boon.icon} 
            alt={boon.name} 
            className="absolute inset-0 w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          {/* Overlapping Icons like the game */}
          <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-hades-bg-dark border border-white/20 shadow-xl flex items-center justify-center p-1 z-20">
            <GodIcon god={boon.gods[0]} className="w-full h-full" />
          </div>
          {boon.element && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-hades-bg-dark border border-white/10 shadow-xl flex items-center justify-center p-1 z-20">
              <ElementIcon element={boon.element} className="w-full h-full" />
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
          className="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-125 opacity-60 group-hover:opacity-90 transition-all duration-300" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = slot.icon;
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <IconComponent className="w-full h-full opacity-50 group-hover:opacity-80 transition-all duration-300 text-gray-400" />
      </div>
    );
  };

  return (
    <div className={`group flex flex-col gap-2 ${shouldDim ? 'opacity-20 grayscale brightness-50 pointer-events-none scale-95' : ''}`}>
      <div className="flex items-center justify-between px-1">
        <span className={`text-[11px] font-mono tracking-[0.3em] uppercase font-bold transition-colors ${isActive ? 'text-hades-accent' : 'text-gray-500 group-hover:text-gray-300'}`}>
          {slot.name}
        </span>
        {boon && (
          <span className="text-[10px] font-bold text-hades-accent/40 font-mono tracking-tighter">LV.1</span>
        )}
      </div>
      
      <div 
        ref={setNodeRef}
        onClick={onClick}
        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
          shouldHighlight 
            ? 'bg-hades-accent/20 border-hades-accent border-solid shadow-[0_0_30px_rgba(255,189,1,0.2)] scale-[1.02]' 
            : boon 
              ? 'bg-hades-panel border-hades-border ring-1 ring-white/5 shadow-2xl' 
              : isActive
                ? 'bg-hades-accent/5 border-hades-accent/50 border-solid translate-x-1'
                : 'bg-hades-bg-dark border-hades-border-light hover:border-hades-accent/40 border-solid hover:bg-hades-bg-dark/60'
        }`}
      >
        {/* Icon Container */}
        <div className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden ${boon ? 'ring-1 ring-white/10' : ''}`}>
          {renderSlotIcon()}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 py-1">
          {boon ? (
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-sm font-black uppercase italic tracking-wider ${GOD_COLORS[boon.gods[0]] || 'text-gray-200'}`}>
                  {boon.name}
                </h4>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] opacity-80">
                  {boon.gods[0]}
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug pr-8 line-clamp-2 font-medium">
                {boon.effect}
              </p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="absolute right-2 top-2 p-1.5 hover:text-hades-red text-gray-600 hover:bg-hades-red/10 rounded transition-all"
                title="Remove Boon"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-3">
              <Plus className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'rotate-90 text-hades-accent scale-125' : 'text-gray-800'}`} />
              <div className="flex flex-col">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? 'text-hades-accent font-bold' : 'text-gray-600'}`}>
                  {isActive ? 'Awaiting Selection' : 'Slot Empty'}
                </span>
                <span className="text-[9px] text-gray-700 font-medium">Click to choose a {slot.name} Boon</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DroppableSlotCard({ id, slot, name, icon, boon, isActive, onClick, onRemove, draggedBoon, isValid }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const shouldHighlight = isOver && draggedBoon && isValid;
  const shouldDim = draggedBoon && !isValid;

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <img 
          src={icon} 
          alt={name} 
          className="w-7 h-7 object-contain filter brightness-125 contrast-125" 
          referrerPolicy="no-referrer" 
        />
      );
    }
    const IconComponent = icon;
    return <IconComponent className="w-7 h-7" />;
  };

  return (
    <div 
      ref={setNodeRef}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        shouldDim ? 'opacity-20 grayscale border-hades-border brightness-50 pointer-events-none scale-95' : ''
      } ${
        shouldHighlight 
          ? 'bg-hades-accent/20 border-hades-accent scale-[1.02] shadow-[0_0_30px_-5px_rgba(255,189,1,0.3)] ring-2 ring-hades-accent/50' 
          : isActive 
            ? 'bg-hades-accent/10 border-hades-accent/50 ring-1 ring-hades-accent/20' 
            : boon 
              ? 'bg-hades-panel border-hades-border-light hover:border-hades-accent/30 shadow-xl' 
              : 'bg-hades-panel border-dashed border-hades-border-light hover:border-hades-accent/30'
      }`}
    >
      <div className="relative z-10 flex flex-col h-full min-h-[120px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-hades-accent text-hades-bg-dark' : 'bg-hades-bg-main text-hades-text/40'}`}>
              {renderIcon()}
            </div>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${isActive ? 'text-hades-accent' : 'text-hades-text/40'}`}>
              {name}
            </span>
          </div>
          
          {boon && (
            <button 
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="p-1 hover:text-hades-red text-hades-text/20 hover:bg-hades-red/10 rounded transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {boon ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-3">
              {boon.icon ? (
                <div className="w-16 h-16 rounded-xl bg-hades-bg-main border border-hades-border p-1.5 flex-shrink-0 shadow-lg">
                  <img 
                    src={boon.icon} 
                    alt={boon.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-hades-bg-main border border-hades-border flex items-center justify-center p-1.5 flex-shrink-0 shadow-lg">
                  <GodIcon god={boon.gods[0]} className="w-10 h-10 opacity-20" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-bold mb-1 leading-tight ${GOD_COLORS[boon.gods[0]] || 'text-gray-200'}`}>
                  {boon.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-hades-bg-main border border-hades-border-light">
                    <GodIcon god={boon.gods[0]} className="w-3.5 h-3.5" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                      {boon.gods.join(' + ')}
                    </span>
                  </div>
                  {boon.element && (
                    <div className="flex items-center gap-1 bg-hades-bg-main px-2 py-0.5 rounded border border-hades-border-light">
                      <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
                      <span className={`text-[10px] uppercase font-mono ${ELEMENT_COLORS[boon.element]}`}>{boon.element}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-300 italic leading-relaxed line-clamp-3">
              {boon.effect}
            </p>
          </motion.div>
        ) : (
          <div className={`flex-1 flex flex-col items-center justify-center border border-dashed border-hades-border-light rounded-xl transition-colors ${shouldHighlight ? 'bg-hades-accent/20 border-hades-accent' : 'bg-hades-bg-main group-hover:bg-hades-accent/5'}`}>
            <Plus className={`w-6 h-6 transition-colors ${shouldHighlight ? 'text-hades-accent scale-125' : 'text-gray-700 group-hover:text-hades-accent'}`} />
            <span className={`text-[10px] font-mono mt-2 uppercase tracking-tight transition-colors ${shouldHighlight ? 'text-hades-accent font-bold' : 'text-gray-400'}`}>
              {shouldHighlight ? 'Drop Here' : 'Add from Library or Drag & Drop'}
            </span>
          </div>
        )}
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
        <h3 className="text-base font-mono uppercase tracking-[0.3em] text-gray-300 font-bold text-left">
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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

function SidebarCollapsibleSection({ 
  title, 
  isOpen, 
  setIsOpen, 
  children 
}: { 
  title: React.ReactNode; 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  children: React.ReactNode; 
}) {
  return (
    <div className={`flex flex-col rounded-xl border transition-all duration-300 ${
      isOpen 
        ? 'bg-hades-bg-main border-hades-border/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
        : 'bg-transparent border-transparent hover:bg-hades-bg-main/20 hover:border-hades-border/30'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group focus:outline-none p-3"
      >
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase font-mono tracking-[0.2em] transition-colors ${
            isOpen ? 'text-hades-accent font-bold' : 'text-hades-text/50 font-medium group-hover:text-hades-text/80'
          }`}>
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          className={`transition-colors ${
            isOpen ? 'text-hades-accent' : 'text-hades-text/20 group-hover:text-hades-text/40'
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1">
              {children}
            </div>
          </motion.div>
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
      className={`${className} object-contain opacity-80 group-hover:opacity-100 transition-opacity`}
      referrerPolicy="no-referrer"
    />
  );
}

function BoonDisplayCard({ boon, onRemove }: any) {
  return (
    <div className="group relative p-6 rounded-2xl border bg-hades-panel border-hades-border hover:border-hades-accent/30 shadow-xl transition-all duration-300 flex flex-col h-full min-h-[160px]">
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-hades-text/60">
              {boon.type}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-1 hover:text-hades-red text-hades-text/20 hover:bg-hades-red/10 rounded transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col"
        >
          <div className="flex items-start gap-4 mb-3">
            {boon.icon ? (
              <div className="w-16 h-16 rounded-xl bg-hades-bg-main border border-hades-border p-1.5 flex-shrink-0 shadow-lg">
                <img 
                  src={boon.icon} 
                  alt={boon.name} 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-hades-bg-main border border-hades-border flex items-center justify-center p-1.5 flex-shrink-0 shadow-lg">
                <GodIcon god={boon.gods[0]} className="w-10 h-10 opacity-20" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-bold mb-1 leading-tight ${GOD_COLORS[boon.gods[0]] || 'text-gray-200'}`}>
                {boon.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-hades-bg-main border border-hades-border-light">
                  <GodIcon god={boon.gods[0]} className="w-3.5 h-3.5" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    {boon.gods.join(' + ')}
                  </span>
                </div>
                {boon.element && (
                  <div className="flex items-center gap-1 bg-hades-bg-main px-2 py-0.5 rounded border border-hades-border-light">
                    <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
                    <span className={`text-[10px] uppercase font-mono ${ELEMENT_COLORS[boon.element]}`}>{boon.element}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-200 italic leading-relaxed line-clamp-4">
            {boon.effect}
          </p>
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
    <div className="p-6 rounded-2xl bg-hades-panel border border-hades-border flex items-center gap-8">
      <div className="flex flex-col w-full">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">Element Balance</span>
        <div className="flex items-center justify-between lg:justify-start lg:gap-12">
          {ALL_ELEMENTS.map((el) => {
            const count = counts[el];
            return (
              <div key={el} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-hades-bg-main border border-hades-border transition-all duration-500 ${count > 0 ? `${ELEMENT_COLORS[el]} shadow-[0_0_15px_-3px_currentColor]` : 'text-gray-600'}`}>
                  <ElementIcon element={el} className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-2xl font-bold font-mono transition-colors duration-500 ${count > 0 ? 'text-gray-100' : 'text-gray-700'}`}>{count}</div>
                  <div className="text-[9px] font-mono uppercase tracking-tighter text-gray-400">{el}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

