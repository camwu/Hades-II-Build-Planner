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
import { Boon, BoonType, ElementType } from './types';
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
import { ArcanaSidebar } from './components/ArcanaSidebar';

const ZERO_COST_CARDS = [5, 13, 20, 21, 24, 25];

const getSurroundingCards = (cardNumber: number): number[] => {
  const r = Math.floor((cardNumber - 1) / 5);
  const col = (cardNumber - 1) % 5;
  const list: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const ncol = col + dc;
      if (nr >= 0 && nr < 5 && ncol >= 0 && ncol < 5) {
        list.push(nr * 5 + ncol + 1);
      }
    }
  }
  return list;
};

const ARCANA_COSTS: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 3, 5: 0,
  6: 2, 7: 2, 8: 1, 9: 5, 10: 2,
  11: 1, 12: 4, 13: 0, 14: 5, 15: 3,
  16: 3, 17: 5, 18: 3, 19: 5, 20: 0,
  21: 0, 22: 4, 23: 4, 24: 0, 25: 0
};

export function resolveAllActiveArcana(manualSelection: number[]): number[] {
  let activeSet = new Set(manualSelection.filter(num => !ZERO_COST_CARDS.includes(num)));

  let changed = true;
  let iterations = 0;
  while (changed && iterations < 10) {
    changed = false;
    const currentActive = Array.from(activeSet);

    for (const cardNum of ZERO_COST_CARDS) {
      if (activeSet.has(cardNum)) continue;

      let shouldActivate = false;

      if (cardNum === 5) {
        // V. The Moon: "Activate any surrounding cards" -> at least one surrounding card is active
        const surrounding = getSurroundingCards(5);
        shouldActivate = surrounding.some(n => activeSet.has(n));
      } else if (cardNum === 13) {
        // XIII. The Centaur: "Activate Cards that use 1 through 5 Grasp."
        // We need at least one active card of each Grasp cost from 1 to 5.
        const activeCosts = new Set<number>();
        for (const num of activeSet) {
          const cost = ARCANA_COSTS[num];
          if (cost >= 1 && cost <= 5) {
            activeCosts.add(cost);
          }
        }
        shouldActivate = [1, 2, 3, 4, 5].every(c => activeCosts.has(c));
      } else if (cardNum === 20) {
        // XX. The Queen: "Activate no more than two cards of the same Grasp cost."
        const costCounts: Record<number, number> = {};
        for (const act of currentActive) {
          const cost = ARCANA_COSTS[act] || 0;
          if (cost > 0) {
            costCounts[cost] = (costCounts[cost] || 0) + 1;
          }
        }
        shouldActivate = currentActive.length > 0 && Object.values(costCounts).every(cnt => cnt <= 2);
      } else if (cardNum === 21) {
        // XXI. The Fates: "Activate three surrounding cards."
        const surrounding = getSurroundingCards(21);
        const activeCount = surrounding.filter(n => activeSet.has(n)).length;
        shouldActivate = activeCount >= 3;
      } else if (cardNum === 24) {
        // XXIV. Divinity: "Activate all 5 Cards in any other row or column."
        // Divinity is in Row 4, Column 3. Other rows are 0, 1, 2, 3. Other columns are 0, 1, 2, 4.

        // Check rows 0, 1, 2, 3
        for (let r = 0; r < 4; r++) {
          let allActive = true;
          for (let c = 0; c < 5; c++) {
            const num = r * 5 + c + 1;
            if (!activeSet.has(num)) {
              allActive = false;
              break;
            }
          }
          if (allActive) {
            shouldActivate = true;
            break;
          }
        }

        // Check columns 0, 1, 2, 4
        if (!shouldActivate) {
          const columnsToCheck = [0, 1, 2, 4];
          for (const c of columnsToCheck) {
            let allActive = true;
            for (let r = 0; r < 5; r++) {
              const num = r * 5 + c + 1;
              if (!activeSet.has(num)) {
                allActive = false;
                break;
              }
            }
            if (allActive) {
              shouldActivate = true;
              break;
            }
          }
        }
      } else if (cardNum === 25) {
        // XXV. Judgment: "Activate three or fewer cards."
        const activeNormalCount = currentActive.filter(n => !ZERO_COST_CARDS.includes(n)).length;
        shouldActivate = activeNormalCount > 0 && activeNormalCount <= 3;
      }

      if (shouldActivate) {
        activeSet.add(cardNum);
        changed = true;
      }
    }
    iterations++;
  }

  return Array.from(activeSet).sort((a, b) => a - b);
}

export default function App() {
  // Check if URL has build parameters
  const hasUrlParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('c') || params.has('a') || params.has('n') || params.has('p') || params.has('ar');
  }, []);

  // Try to load state from localStorage if no URL params
  const savedState = useMemo(() => {
    if (hasUrlParams) return null;
    try {
      const data = localStorage.getItem('hades_build_planner_state');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse saved state from localStorage:', e);
    }
    return null;
  }, [hasUrlParams]);

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
      return initialCore;
    } else if (savedState && savedState.coreBuildIds) {
      const core: Record<string, Boon | null> = { ...initialCore };
      Object.entries(savedState.coreBuildIds).forEach(([slot, id]) => {
        if (id) {
          const boon = BOONS.find(b => b.id === id);
          if (boon) core[slot] = boon;
        }
      });
      return core;
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
    } else if (savedState && savedState.additionalBoonIds) {
      return savedState.additionalBoonIds
        .map((id: string) => BOONS.find(b => b.id === id))
        .filter((b: Boon | undefined): b is Boon => !!b);
    }
    return [];
  });

  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const [buildName, setBuildName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('n');
    if (nameParam) return nameParam;
    if (savedState && typeof savedState.buildName === 'string') return savedState.buildName;
    return 'Untitled Build';
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const [isArcanaCollapsed, setIsArcanaCollapsed] = useState(false);
  const [isArcanaButtonHovered, setIsArcanaButtonHovered] = useState(false);
  const [graspLimitError, setGraspLimitError] = useState(0);

  const [maxGrasp, setMaxGrasp] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const graspParam = params.get('mg');
    if (graspParam) {
      const parsed = parseInt(graspParam, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 30) {
        return parsed;
      }
    } else if (savedState && typeof savedState.maxGrasp === 'number') {
      const saved = savedState.maxGrasp;
      if (saved >= 1 && saved <= 30) {
        return saved;
      }
    }
    return 30; // default 30
  });

  const [activeArcana, setActiveArcana] = useState<number[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const arParam = params.get('ar');
    let loaded: number[] = [];
    if (arParam) {
      loaded = arParam.split(',')
        .map(Number)
        .filter(n => !isNaN(n) && n >= 1 && n <= 25);
    } else if (savedState && Array.isArray(savedState.activeArcana)) {
      loaded = savedState.activeArcana;
    }
    return resolveAllActiveArcana(loaded);
  });

  const toggleArcana = (cardNumber: number) => {
    if (ZERO_COST_CARDS.includes(cardNumber)) return;

    setActiveArcana(prev => {
      const manualOnly = prev.filter(num => !ZERO_COST_CARDS.includes(num));
      const nextManual = manualOnly.includes(cardNumber)
        ? manualOnly.filter(n => n !== cardNumber)
        : [...manualOnly, cardNumber];
      
      const resolved = resolveAllActiveArcana(nextManual);
      const totalCost = resolved.reduce((sum, num) => sum + (ARCANA_COSTS[num] || 0), 0);
      
      if (totalCost > maxGrasp && !manualOnly.includes(cardNumber)) {
        // Exceeds max grasp limit, do not toggle it on
        setGraspLimitError(e => e + 1);
        return prev;
      }
      return resolved;
    });
  };

  const selectAllArcana = () => {
    setActiveArcana(Array.from({ length: 25 }, (_, i) => i + 1));
  };

  const clearAllArcana = () => {
    setActiveArcana([]);
  };

  const [hideAssigned, setHideAssigned] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('ha')) {
      return params.get('ha') !== '0';
    }
    if (savedState && typeof savedState.hideAssigned === 'boolean') {
      return savedState.hideAssigned;
    }
    return true;
  });

  const [limitToGodPool, setLimitToGodPool] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('lp')) {
      return params.get('lp') !== '0';
    }
    if (savedState && typeof savedState.limitToGodPool === 'boolean') {
      return savedState.limitToGodPool;
    }
    return true;
  });

  const [pinnedBoonIds, setPinnedBoonIds] = useState<string[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const pinParam = params.get('p');
    if (pinParam) {
      return pinParam.split(',')
        .map(code => {
          if (code.length > 20) { // UUID
            return BOONS.find(b => b.id === code)?.id;
          } else { // Base36 Index
            const index = parseInt(code, 36);
            return BOONS[index]?.id;
          }
        })
        .filter((id): id is string => !!id);
    } else if (hasUrlParams) {
      return [];
    }
    try {
      const data = localStorage.getItem('hades_build_planner_pinned_boons');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse pinned boons:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_pinned_boons', JSON.stringify(pinnedBoonIds));
    } catch (e) {
      console.error('Failed to save pinned boons:', e);
    }
  }, [pinnedBoonIds]);

  const togglePin = (boonId: string) => {
    setPinnedBoonIds(prev => 
      prev.includes(boonId) ? prev.filter(id => id !== boonId) : [...prev, boonId]
    );
  };

  const reorderPinnedBoons = (newOrder: string[]) => {
    setPinnedBoonIds(newOrder);
  };

  const clearAllPins = () => {
    setPinnedBoonIds([]);
  };

  // Sync state to URL and localStorage (debounced to avoid blocking I/O/history updates on every keypress)
  useEffect(() => {
    const handler = setTimeout(() => {
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

      // Pinned
      if (pinnedBoonIds.length > 0) {
        const pinParts = pinnedBoonIds.map(id => {
          const index = BOONS.findIndex(b => b.id === id);
          return index !== -1 ? index.toString(36) : '';
        }).filter(Boolean);
        
        if (pinParts.length > 0) {
          params.set('p', pinParts.join(','));
        }
      }

      // Arcana Cards
      if (activeArcana.length > 0) {
        params.set('ar', activeArcana.join(','));
      }

      // Max Grasp
      if (maxGrasp !== 30) {
        params.set('mg', maxGrasp.toString());
      }

      const newUrl = params.toString() 
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      
      window.history.replaceState({}, '', newUrl);

      // Save to localStorage
      try {
        const coreBuildIds: Record<string, string | null> = {};
        Object.entries(coreBuild).forEach(([slot, boonObj]) => {
          const boon = boonObj as Boon | null;
          coreBuildIds[slot] = boon ? boon.id : null;
        });

        const additionalBoonIds = additionalBoons.map(b => b.id);

        const stateToSave = {
          coreBuildIds,
          additionalBoonIds,
          buildName,
          hideAssigned,
          limitToGodPool,
          activeArcana,
          maxGrasp
        };

        localStorage.setItem('hades_build_planner_state', JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Failed to save build state to localStorage:', e);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [coreBuild, additionalBoons, buildName, searchTerm, hideAssigned, limitToGodPool, pinnedBoonIds, activeArcana, maxGrasp]);
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
          if (isPanelCollapsed) {
            setIsPanelCollapsed(false);
          }
          // Request animation frame or setTimeout to ensure transition finishes or elements are made visible before focusing
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 50);
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
  }, [isPanelCollapsed]);

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

  const elementCounts = useMemo(() => {
    const summary = { Air: 0, Fire: 0, Water: 0, Earth: 0, Aether: 0 } as Record<ElementType, number>;
    Object.values(coreBuild).forEach(b => {
      const boon = b as Boon | null;
      if (boon?.element && boon.type !== 'Infusion') summary[boon.element]++;
    });
    additionalBoons.forEach(b => {
      if (b?.element && b.type !== 'Infusion') summary[b.element]++;
    });
    return summary;
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
    // Compute normalized terms once up front!
    const searchTerms = searchTerm
      .toLowerCase()
      .replace(/Ω/g, 'omega')
      .replace(/ω/g, 'omega')
      .split(/\s+/)
      .filter(t => t.length > 0);

    return BOONS.filter(boon => {
      // Don't show pinned boons in the main list since they are pinned to the top
      if (pinnedBoonIds.includes(boon.id)) {
        return false;
      }

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
  }, [searchTerm, activeSlot, hideAssigned, selectedBoonIds, limitToGodPool, activeStandardOlympians, pinnedBoonIds]);

  const selectBoon = (boon: Boon, slotId: string) => {
    if (slotId === 'NonCore') {
      setAdditionalBoons(prev => [...prev, boon]);
    } else {
      setCoreBuild(prev => ({ ...prev, [slotId]: boon }));
    }
    // Automatically remove from pinned boons when assigned
    setPinnedBoonIds(prev => prev.filter(id => id !== boon.id));
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
    setActiveArcana([]);
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

    // Handle sorting pinned boons
    if (active.data.current?.type === 'sortable-pinned' && over.data.current?.type === 'sortable-pinned') {
      if (active.id !== over.id) {
        setPinnedBoonIds((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
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
    const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
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
            selectedBoonIds={selectedBoonIds}
            elementCounts={elementCounts}
            pinnedBoonIds={pinnedBoonIds}
            togglePin={togglePin}
            reorderPinnedBoons={reorderPinnedBoons}
            clearAllPins={clearAllPins}
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
              <div className="mb-8 flex flex-wrap items-start gap-5 w-full">
                <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                <GodSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                <StatusCurseSummary coreBuild={coreBuild} additionalBoons={additionalBoons} activeArcana={activeArcana} />
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

          <ArcanaSidebar
            activeArcana={activeArcana}
            toggleArcana={toggleArcana}
            clearAllArcana={clearAllArcana}
            isArcanaCollapsed={isArcanaCollapsed}
            setIsArcanaCollapsed={setIsArcanaCollapsed}
            isButtonHovered={isArcanaButtonHovered}
            setIsButtonHovered={setIsArcanaButtonHovered}
            maxGrasp={maxGrasp}
            setMaxGrasp={setMaxGrasp}
            graspLimitError={graspLimitError}
          />
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


