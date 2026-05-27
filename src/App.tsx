/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Skull } from 'lucide-react';
import { 
  DndContext, 
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
  pointerWithin,
  MeasuringStrategy,
  useDroppable
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
  SLOT_EXPANDED_WIDTH,
  EXCLUDED_GODS,
  STORAGE_KEYS,
  SLOT_MAP,
  SLOT_ABBR
} from './constants';
import { isValidForSlot, getIncompatibleBoonInSelection, parseSearchQuery, boonMatchesQuery, getBoonColor } from './utils/boonUtils';
import { PoolOfPurgingBackdrop, PoolOfPurgingMessage } from './components/PoolOfPurging';
import { StaticBoonListItem } from './components/BoonListItem';
import { CoreSlotRow } from './components/CoreSlotRow';
import { SortableBoonDisplayCard } from './components/BoonDisplayCard';
import { DroppableSlotCard } from './components/DroppableSlotCard';
import { ElementSummary } from './components/ElementSummary';
import { GodSummary } from './components/GodSummary';
import { MainHeader } from './components/MainHeader';
import { MainFooter } from './components/MainFooter';
import { BoonLibrary } from './components/BoonLibrary';
import { ArcanaSidebar } from './components/ArcanaSidebar';
import { ZERO_COST_CARDS, ARCANA_COSTS, resolveAllActiveArcana } from './utils/arcanaUtils';


export default function App() {
  // Check if URL has build parameters
  const hasUrlParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('c') || params.has('a') || params.has('n') || params.has('p') || params.has('ar') || params.has('ks') || params.has('fa') || params.has('hb');
  }, []);

  // Try to load state from localStorage if no URL params
  const savedState = useMemo(() => {
    if (hasUrlParams) return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUILD_STATE);
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
      coreParam.split(',').forEach(pair => {
        const [slotKey, code] = pair.split(':');
        if (slotKey && code) {
          const slotName = SLOT_MAP[slotKey] || slotKey;
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

  const [activeKeepsake, setActiveKeepsake] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const ksParam = params.get('ks');
    if (ksParam) return ksParam;
    if (savedState && typeof savedState.activeKeepsake === 'string') return savedState.activeKeepsake;
    return 'none';
  });

  const [activeFamiliar, setActiveFamiliar] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const faParam = params.get('fa');
    if (faParam) return faParam;
    if (savedState && typeof savedState.activeFamiliar === 'string') return savedState.activeFamiliar;
    return 'none';
  });

  const [isHeartBondActive, setIsHeartBondActive] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    const hbParam = params.get('hb');
    if (hbParam) return hbParam === 'true';
    if (savedState && typeof savedState.isHeartBondActive === 'boolean') return savedState.isHeartBondActive;
    return false;
  });

  const [activeTab, setActiveTab] = useState<'boons' | 'loadout' | 'arcana'>('boons');

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

  const [hideAssignedSlots, setHideAssignedSlots] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('has')) {
      return params.get('has') !== '0';
    }
    if (savedState && typeof savedState.hideAssignedSlots === 'boolean') {
      return savedState.hideAssignedSlots;
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

  const [enforceSupportBoonLimit, setEnforceSupportBoonLimit] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('esb')) {
      return params.get('esb') !== '0';
    }
    if (savedState && typeof savedState.enforceSupportBoonLimit === 'boolean') {
      return savedState.enforceSupportBoonLimit;
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
      const data = localStorage.getItem(STORAGE_KEYS.PINNED_BOONS);
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
      localStorage.setItem(STORAGE_KEYS.PINNED_BOONS, JSON.stringify(pinnedBoonIds));
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
      
      Object.entries(coreBuild).forEach(([slot, boon]) => {
        if (boon) {
          const index = BOONS.findIndex(b => b.id === (boon as Boon).id);
          if (index !== -1) {
            coreParts.push(`${SLOT_ABBR[slot] || slot}:${index.toString(36)}`);
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
      if (!hideAssignedSlots) {
        params.set('has', '0');
      }
      if (!limitToGodPool) {
        params.set('lp', '0');
      }
      if (!enforceSupportBoonLimit) {
        params.set('esb', '0');
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

      // Keepsake
      if (activeKeepsake && activeKeepsake !== 'none') {
        params.set('ks', activeKeepsake);
      }

      // Familiar
      if (activeFamiliar && activeFamiliar !== 'none') {
        params.set('fa', activeFamiliar);
      }

      // Heart Bond
      if (isHeartBondActive) {
        params.set('hb', 'true');
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
          hideAssignedSlots,
          limitToGodPool,
          enforceSupportBoonLimit,
          activeArcana,
          maxGrasp,
          activeKeepsake,
          activeFamiliar,
          isHeartBondActive
        };

        localStorage.setItem(STORAGE_KEYS.BUILD_STATE, JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Failed to save build state to localStorage:', e);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [coreBuild, additionalBoons, buildName, searchTerm, hideAssigned, hideAssignedSlots, limitToGodPool, enforceSupportBoonLimit, pinnedBoonIds, activeArcana, maxGrasp, activeKeepsake, activeFamiliar, isHeartBondActive]);
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);
  const [draggedBoon, setDraggedBoon] = useState<Boon | null>(null);
  const [draggedBoonType, setDraggedBoonType] = useState<string | null>(null);
  const draggedBoonRef = useRef<Boon | null>(null);
  const [dndContextKey, setDndContextKey] = useState(0);

  const folderRef = useRef<HTMLDivElement>(null);
  const pointerPosRef = useRef({ x: 0, y: 0 });

  const { setNodeRef: setFolderRef } = useDroppable({
    id: 'FolderCard',
  });

  const setFolderRefMerged = (node: HTMLDivElement | null) => {
    folderRef.current = node;
    setFolderRef(node);
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        pointerPosRef.current = { x: e.clientX, y: e.clientY };
      } else if (e.touches && e.touches[0]) {
        pointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

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

  const searchQuery = useMemo(() => {
    return parseSearchQuery(searchTerm);
  }, [searchTerm]);

  const isSearchActive = searchTerm.trim().length > 0;

  const filteredBoons = useMemo(() => {
    // Calculate counts for support gods
    const supportGodCounts: Record<string, number> = {
      Artemis: 0,
      Athena: 0,
      Dionysus: 0,
      Hades: 0,
      Hermes: 0,
    };

    Object.values(coreBuild).forEach(b => {
      const boon = b as Boon | null;
      if (boon) {
        boon.gods.forEach(god => {
          if (god in supportGodCounts) {
            supportGodCounts[god]++;
          }
        });
      }
    });

    additionalBoons.forEach(boon => {
      boon.gods.forEach(god => {
        if (god in supportGodCounts) {
          supportGodCounts[god]++;
        }
      });
    });

    return BOONS.filter(boon => {
      // Don't show pinned boons in the main list since they are pinned to the top
      if (pinnedBoonIds.includes(boon.id)) {
        return false;
      }

      // Don't show already selected boons in the library if hideAssigned is toggled
      if (hideAssigned && selectedBoonIds.has(boon.id)) {
        return false;
      }

      // Don't show slots that are already assigned if hideAssignedSlots is toggled
      // Allow if activeSlot is currently focused on the same slot, so users can choose replacements
      if (hideAssignedSlots && coreBuild[boon.type] && activeSlot !== boon.type) {
        return false;
      }

      // Limit to God Pool filter
      if (limitToGodPool && activeStandardOlympians.length >= 4) {
        const hasLockedOlympian = boon.gods.some(god => 
          !EXCLUDED_GODS.includes(god) && !activeStandardOlympians.includes(god)
        );
        if (hasLockedOlympian) {
          return false;
        }
      }

      // Enforce Boon Limit for Support Gods Filter
      if (enforceSupportBoonLimit) {
        // Only hide if the boon is NOT currently selected in the active build, allowing swaps/views
        if (!selectedBoonIds.has(boon.id)) {
          const isLimitExceeded = boon.gods.some(god => {
            if (god === 'Hermes') {
              return (supportGodCounts[god] || 0) >= 3;
            } else if (['Artemis', 'Athena', 'Dionysus', 'Hades'].includes(god)) {
              return (supportGodCounts[god] || 0) >= 1;
            }
            return false;
          });
          if (isLimitExceeded) {
            return false;
          }
        }
      }

      const matchesSearch = boonMatchesQuery(boon, searchQuery);
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
  }, [searchQuery, activeSlot, hideAssigned, hideAssignedSlots, coreBuild, selectedBoonIds, limitToGodPool, activeStandardOlympians, pinnedBoonIds, enforceSupportBoonLimit, additionalBoons]);

  const selectBoon = (boon: Boon, slotId: string) => {
    if (!isValidForSlot(boon, slotId)) return;

    // Safety check for incompatible boons (Glowing Coal, Lightning Lance, Hostile Environment, and Howling Soul)
    if (getIncompatibleBoonInSelection(boon.id, selectedBoonIds)) return;

    if (slotId === 'Passive') {
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
    if (slotId === 'Passive' && index !== undefined) {
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
    setActiveKeepsake('none');
    setActiveFamiliar('none');
    setIsHeartBondActive(false);
    setBuildName('Untitled Build');
    setSearchTerm('');
    setActiveSlot(null);
    setHideAssigned(true);
    setLimitToGodPool(true);
    setShowPurgeConfirm(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const boon = BOONS.find(b => b.id === event.active.id);
    if (boon) {
      setDraggedBoon(boon);
      setDraggedBoonType(event.active.data.current?.type || null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setDraggedBoon(null);
    setDraggedBoonType(null);

    const folderRect = folderRef.current?.getBoundingClientRect();
    const { x: px, y: py } = pointerPosRef.current;
    
    const isInsideFolder = folderRect 
      ? (px >= folderRect.left && px <= folderRect.right && py >= folderRect.top && py <= folderRect.bottom)
      : false;

    const isFolderCard = over?.id === 'FolderCard';

    // If dropped outside of the folder / over nothing, purge it
    if ((!over && !isInsideFolder) || (isFolderCard && !isInsideFolder)) {
      const activeBoon = active.data.current?.boon || BOONS.find(b => b.id === active.id);
      if (activeBoon) {
        const dragType = active.data.current?.type;
        // Only purge if it was an already assigned boon (core or passive)
        if (dragType === 'sortable' || dragType === 'core') {
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

    // Stop if released over the folder background directly, or if inside the folder but not hovering any specific droppable target
    if (isFolderCard || (isInsideFolder && (!over || over.id === 'FolderCard'))) {
      return;
    }

    if (!over) return;

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

      // If we're hovering over an existing sortable item, we treat it as being over the 'Passive' slot
      if (over.data.current?.type === 'sortable') {
        targetSlotId = 'Passive';
      } else if (over.data.current?.type === 'core') {
        targetSlotId = over.data.current.slot;
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
        <MainHeader 
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

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden relative">
          <BoonLibrary
            isPanelCollapsed={isPanelCollapsed}
            setIsPanelCollapsed={setIsPanelCollapsed}
            isButtonHovered={isButtonHovered}
            setIsButtonHovered={setIsButtonHovered}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hideAssigned={hideAssigned}
            setHideAssigned={setHideAssigned}
            hideAssignedSlots={hideAssignedSlots}
            setHideAssignedSlots={setHideAssignedSlots}
            limitToGodPool={limitToGodPool}
            setLimitToGodPool={setLimitToGodPool}
            enforceSupportBoonLimit={enforceSupportBoonLimit}
            setEnforceSupportBoonLimit={setEnforceSupportBoonLimit}
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
            activeArcana={activeArcana}
            activeKeepsake={activeKeepsake}
            activeFamiliar={activeFamiliar}
            isHeartBondActive={isHeartBondActive}
            toggleArcana={toggleArcana}
            setActiveKeepsake={setActiveKeepsake}
            setActiveFamiliar={setActiveFamiliar}
            setIsHeartBondActive={setIsHeartBondActive}
            additionalBoons={additionalBoons}
            removeAdditionalBoon={removeAdditionalBoon}
          />

          {/* Right: Build View */}
          <section className="flex-1 overflow-auto p-6 md:px-8 py-6 custom-scrollbar relative">
            <PoolOfPurgingBackdrop draggedBoon={draggedBoon} draggedBoonType={draggedBoonType} />

            <div className="max-w-7xl mx-auto relative z-10">

              {/* Folder Navigation Tabs */}
              <div className="flex items-end gap-1.5 select-none relative z-10 pl-4 -mb-[1px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('boons')}
                  className={`px-6 py-2 rounded-t-xl text-xs font-display uppercase tracking-widest font-bold border transition-all duration-200 cursor-pointer ${
                    activeTab === 'boons'
                      ? 'bg-hades-panel border-hades-border border-b-transparent text-hades-accent z-20 relative'
                      : 'bg-hades-panel/60 hover:bg-hades-panel/80 border-hades-border-light/40 border-b-hades-border text-hades-text/60 hover:text-hades-text/95 z-10'
                  }`}
                >
                  Boons
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('loadout')}
                  className={`px-6 py-2 rounded-t-xl text-xs font-display uppercase tracking-widest font-bold border transition-all duration-200 cursor-pointer ${
                    activeTab === 'loadout'
                      ? 'bg-hades-panel border-hades-border border-b-transparent text-hades-accent z-20 relative'
                      : 'bg-hades-panel/60 hover:bg-hades-panel/80 border-hades-border-light/40 border-b-hades-border text-hades-text/60 hover:text-hades-text/95 z-10'
                  }`}
                >
                  Loadout
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('arcana')}
                  className={`px-6 py-2 rounded-t-xl text-xs font-display uppercase tracking-widest font-bold border transition-all duration-200 cursor-pointer ${
                    activeTab === 'arcana'
                      ? 'bg-hades-panel border-hades-border border-b-transparent text-hades-accent z-20 relative'
                      : 'bg-hades-panel/60 hover:bg-hades-panel/80 border-hades-border-light/40 border-b-hades-border text-hades-text/60 hover:text-hades-text/95 z-10'
                  }`}
                >
                  Arcana
                </button>
              </div>

              {/* Folder Contents */}
              {activeTab === 'boons' ? (
                <div ref={setFolderRefMerged} className="border border-hades-border rounded-xl p-5 md:p-6 bg-hades-panel shadow-2xl relative min-h-[400px]">
                  {/* Elemental, God & Status Tracker */}
                  <div className="mb-5 flex flex-wrap items-start gap-4 w-full border-b border-hades-border-light pb-5">
                    <ElementSummary coreBuild={coreBuild} additionalBoons={additionalBoons} />
                    <GodSummary coreBuild={coreBuild} additionalBoons={additionalBoons} activeArcana={activeArcana} />
                  </div>

                  {/* Consolidated Build View */}
                  <div className="grid grid-cols-1 lg:grid-cols-[84px_1fr] gap-x-6 gap-y-8 items-start relative">
                    
                    {/* Left Side: Core Boon Slots (Narrow Column) */}
                    <aside className="lg:sticky lg:top-6 flex-shrink-0 z-30 flex flex-col items-start">
                      <div className="flex flex-col gap-4 w-full items-start">
                        {CORE_SLOTS.map((slot) => {
                          const slotBoon = coreBuild[slot.type];
                          const isGlowingWhite = slotBoon ? (isSearchActive && hideAssigned && boonMatchesQuery(slotBoon, searchQuery)) : false;
                          return (
                            <CoreSlotRow 
                              key={slot.type}
                              slot={slot}
                              boon={slotBoon}
                              isActive={activeSlot === slot.type}
                              onClick={() => toggleActiveSlot(slot.type)}
                              onRemove={() => removeBoon(slot.type)}
                              draggedBoon={draggedBoon}
                              isValid={draggedBoon ? isValidForSlot(draggedBoon, slot.type) && !selectedBoonIds.has(draggedBoon.id) : true}
                              shouldGlowWhite={isGlowingWhite}
                            />
                          );
                        })}
                      </div>
                    </aside>

                    {/* Right Side: Reorganized Sections */}
                    <div className="flex-1 w-full lg:pl-6 lg:border-l lg:border-hades-border-light">
                      <div className="w-full">
                        <div className="flex flex-col gap-6">
                          {/* Unified Boons Grid Area with Purge Pool and Passive Slot */}
                          <div className="flex items-start gap-8">
                            <div className="grid grid-flow-col grid-rows-5 gap-x-4 gap-y-4 auto-cols-max items-start">
                              {/* Selected Boons */}
                              <SortableContext 
                                items={additionalBoons.map(b => b.id)} 
                                strategy={rectSortingStrategy}
                              >
                                {additionalBoons.map((boon, idx) => {
                                  const isGlowingWhite = isSearchActive && hideAssigned && boonMatchesQuery(boon, searchQuery);
                                  return (
                                    <SortableBoonDisplayCard 
                                      key={boon.id}
                                      boon={boon} 
                                      onRemove={() => removeAdditionalBoon(boon, idx)}
                                      shouldGlowWhite={isGlowingWhite}
                                    />
                                  );
                                })}
                              </SortableContext>
                              
                              {/* Unified Passive Slot */}
                              <div>
                                <DroppableSlotCard 
                                  id="Passive"
                                  slot="Passive"
                                  name="Passive Slot"
                                  icon={Plus}
                                  isActive={activeSlot === 'Passive'}
                                  onClick={() => toggleActiveSlot('Passive')}
                                  draggedBoon={draggedBoon}
                                  isValid={draggedBoon ? isValidForSlot(draggedBoon, 'Passive') && !selectedBoonIds.has(draggedBoon.id) : true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ) : activeTab === 'loadout' ? (
                <div className="border border-hades-border rounded-xl p-6 md:p-8 bg-hades-panel shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-hades-bg-main/30 border border-hades-border flex items-center justify-center mb-4 text-hades-accent/40 shadow-inner">
                    <span className="text-2xl">⚔️</span>
                  </div>
                  <h3 className="text-base font-light text-hades-accent uppercase tracking-widest font-display">Weapon & Loadout</h3>
                  <p className="text-xs text-hades-text/50 max-w-sm mt-2 leading-relaxed">
                    The armory and gear selection compartments will detail your weapon aspects, keepsakes, and familiar companions in a future update.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-hades-accent/5 border border-hades-accent/20 text-[9px] text-hades-accent font-display uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-hades-accent animate-ping" />
                    Development Preparation
                  </div>
                </div>
              ) : (
                <div className="border border-hades-border rounded-xl p-6 md:p-8 bg-hades-panel shadow-2xl relative min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-hades-bg-main/30 border border-hades-border flex items-center justify-center mb-4 text-hades-accent/40 shadow-inner">
                    <span className="text-2xl">🃏</span>
                  </div>
                  <h3 className="text-base font-light text-hades-accent uppercase tracking-widest font-display">Altar of Arcana</h3>
                  <p className="text-xs text-hades-text/50 max-w-sm mt-2 leading-relaxed">
                    Your active Arcana card layouts and cumulative grasp costs from the Altar of Ashes will be displayed here in a future update.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-hades-accent/5 border border-hades-accent/20 text-[9px] text-hades-accent font-display uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-hades-accent animate-ping" />
                    Development Preparation
                  </div>
                </div>
              )}

              <PoolOfPurgingMessage draggedBoon={draggedBoon} draggedBoonType={draggedBoonType} />
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
              <StaticBoonListItem boon={draggedBoon} isOverlay elementCounts={elementCounts} />
            </div>
          ) : null}
        </DragOverlay>

        <MainFooter />
      </div>
    </DndContext>
  );
}


