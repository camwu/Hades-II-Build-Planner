/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { 
  DndContext, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
  pointerWithin,
  MeasuringStrategy
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove, 
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { BOONS } from './data/boonsData';
import { Boon, BoonType } from './types';
import { 
  SLOT_PRIORITY, 
  CORE_SLOTS, 
  SLOT_EXPANDED_WIDTH 
} from './constants';
import { isValidForSlot } from './utils/boonUtils';
import { StaticBoonListItem } from './components/BoonListItem';
import { CoreSlotRow } from './components/CoreSlotRow';
import { SortableBoonDisplayCard } from './components/BoonDisplayCard';
import { DroppableSlotCard } from './components/DroppableSlotCard';
import { ElementSummary } from './components/ElementSummary';
import { GodSummary } from './components/GodSummary';
import { StatusCurseSummary } from './components/StatusCurseSummary';
import { PurgePool } from './components/PurgePool';
import { MainHeader } from './components/MainHeader';
import { MainFooter } from './components/MainFooter';
import { BuildHeader } from './components/BuildHeader';
import { BoonLibrary } from './components/BoonLibrary';

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

  const [searchTerm, setSearchTerm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hideAssigned, setHideAssigned] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('ha') !== '0';
  });
  const [limitToGodPool, setLimitToGodPool] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lp') !== '0';
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

    // Search & Filters
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    if (!hideAssigned) {
      params.set('ha', '0');
    }
    if (!limitToGodPool) {
      params.set('lp', '0');
    }

    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  }, [coreBuild, additionalBoons, buildName, searchTerm, hideAssigned, limitToGodPool]);
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);
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
        if (draggedBoonRef.current) {
          setDndContextKey(prev => prev + 1);
          setDraggedBoon(null);
        }
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

  const activeStandardOlympians = useMemo(() => {
    const EXCLUDED_GODS = ['Artemis', 'Athena', 'Dionysus', 'Hermes', 'Hades', 'Chaos', 'Raki', 'Twilight Curse'];
    const active = new Set<string>();
    
    Object.values(coreBuild).forEach(b => {
      const boon = b as any;
      if (boon && boon.gods) {
        boon.gods.forEach((g: string) => {
          if (!EXCLUDED_GODS.includes(g)) {
            active.add(g);
          }
        });
      }
    });
    
    additionalBoons.forEach(b => {
      if (b && b.gods) {
        b.gods.forEach(g => {
          if (!EXCLUDED_GODS.includes(g)) {
            active.add(g);
          }
        });
      }
    });
    
    return Array.from(active);
  }, [coreBuild, additionalBoons]);

  const filteredBoons = useMemo(() => {
    return BOONS.filter(boon => {
      // Don't show already selected boons in the library if hideAssigned is toggled
      if (hideAssigned && selectedBoonIds.has(boon.id)) {
        return false;
      }

      // Limit to God Pool filter
      if (limitToGodPool && activeStandardOlympians.length >= 4) {
        const EXCLUDED_GODS = ['Artemis', 'Athena', 'Dionysus', 'Hermes', 'Hades', 'Chaos', 'Raki', 'Twilight Curse'];
        const hasLockedOlympian = boon.gods.some(god => 
          !EXCLUDED_GODS.includes(god) && !activeStandardOlympians.includes(god)
        );
        if (hasLockedOlympian) {
          return false;
        }
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
  }, [searchTerm, activeSlot, hideAssigned, selectedBoonIds, limitToGodPool, activeStandardOlympians]);

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
    setSearchTerm('');
    setActiveSlot(null);
    setHideAssigned(true);
    setLimitToGodPool(true);
    setShowPurgeConfirm(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const boon = BOONS.find(b => b.id === event.active.id);
    if (boon) setDraggedBoon(boon);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setDraggedBoon(null);

    if (!over) return;

    // Handle purging
    if (over.id === 'PurgePool') {
      const activeBoon = active.data.current?.boon || BOONS.find(b => b.id === active.id);
      if (activeBoon) {
        // If it's a sortable/assigned boon, remove it
        if (active.data.current?.type === 'sortable' || selectedBoonIds.has(active.id as string)) {
          // Check if it's a core boon
          const coreEntry = Object.entries(coreBuild).find(([_, b]) => (b as Boon)?.id === activeBoon.id);
          if (coreEntry) {
            removeBoon(coreEntry[0] as BoonType);
          } else {
            // Find index in additional boons
            const idx = additionalBoons.findIndex(b => b.id === activeBoon.id);
            if (idx !== -1) {
              removeAdditionalBoon(activeBoon, idx);
            }
          }
        }
      }
      return;
    }

    // Handle sorting first
    if (active.data.current?.type === 'sortable' && over.data.current?.type === 'sortable') {
      if (active.id !== over.id) {
        setAdditionalBoons((items) => {
          const oldIndex = items.findIndex(b => b.id === active.id);
          const newIndex = items.findIndex(b => b.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      return;
    }

    // Handle dropping new boons
    if (active) {
      const boon = BOONS.find(b => b.id === active.id);
      let targetSlotId = over.id as string;

      // If we're hovering over an existing sortable item, we treat it as being over the 'NonCore' slot
      if (over.data.current?.type === 'sortable') {
        targetSlotId = 'NonCore';
      }
      
      if (boon && isValidForSlot(boon, targetSlotId) && !selectedBoonIds.has(boon.id)) {
        selectBoon(boon, targetSlotId);
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
      collisionDetection={pointerWithin}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen bg-hades-bg text-hades-text font-sans overflow-hidden flex flex-col">
        <MainHeader />

        {/* Main Content */}
        <main className="flex-1 mt-16 flex overflow-hidden relative">
          <BoonLibrary
            isPanelCollapsed={isPanelCollapsed}
            setIsPanelCollapsed={setIsPanelCollapsed}
            isButtonHovered={isButtonHovered}
            setIsButtonHovered={setIsButtonHovered}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hideAssigned={hideAssigned}
            setHideAssigned={setHideAssigned}
            limitToGodPool={limitToGodPool}
            setLimitToGodPool={setLimitToGodPool}
            activeStandardOlympians={activeStandardOlympians}
            filteredBoons={filteredBoons}
            activeSlot={activeSlot}
            selectBoon={selectBoon}
            isScrolled={isScrolled}
            handleSidebarScroll={handleSidebarScroll}
            searchInputRef={searchInputRef}
          />

          {/* Right: Build View */}
          <section className="flex-1 overflow-auto p-6 md:px-8 py-6 custom-scrollbar relative">
            <div className="max-w-7xl mx-auto">
              <BuildHeader
                buildName={buildName}
                setBuildName={setBuildName}
                isEditingName={isEditingName}
                setIsEditingName={setIsEditingName}
                nameInputRef={nameInputRef}
                copyBuildLink={copyBuildLink}
                isCopied={isCopied}
                purgeBuild={purgeBuild}
                showPurgeConfirm={showPurgeConfirm}
              />

              {/* Elemental, God & Status Tracker */}
              <div className="mb-8 flex flex-wrap items-start gap-5 w-fit">
                <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                <GodSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                <StatusCurseSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
              </div>

              {/* Consolidated Build View */}
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-x-8 gap-y-16 items-start relative">
                
                {/* Left Side: Core Boon Slots (Narrow Column) */}
                <aside className="lg:sticky lg:top-8 flex-shrink-0 z-30 flex flex-col items-center">
                  <div className="flex flex-col gap-5 w-full items-center">
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
                      {/* Unified Boons Grid Area with Purge Pool and Non-Core Slot */}
                      <div className="flex items-start gap-16">
                        <div className="grid grid-flow-col grid-rows-5 gap-x-5 gap-y-5 auto-cols-max items-start">
                          {/* Selected Boons */}
                          <SortableContext 
                            items={additionalBoons.map(b => b.id)} 
                            strategy={rectSortingStrategy}
                          >
                            {additionalBoons.map((boon, idx) => (
                              <SortableBoonDisplayCard 
                                key={boon.id}
                                boon={boon} 
                                onRemove={() => removeAdditionalBoon(boon, idx)}
                              />
                            ))}
                          </SortableContext>
                          
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

                        <AnimatePresence>
                          {draggedBoon && selectedBoonIds.has(draggedBoon.id) && (
                            <PurgePool />
                          )}
                        </AnimatePresence>
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

        <MainFooter />
      </div>
    </DndContext>
  );
}


