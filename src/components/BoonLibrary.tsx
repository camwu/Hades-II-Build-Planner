import React from 'react';
import { motion } from 'motion/react';
import { Search, X, Info, ChevronLeft, ChevronRight, Pin, ChevronDown, Filter, Lock } from 'lucide-react';
import { Boon, BoonPrerequisite, ElementType } from '../types';
import { SIDEBAR_WIDTH, BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { DraggableBoonListItem } from './BoonListItem';
import { GodIcon, ElementIcon } from './Icons';
import { BOONS } from '../data/boonsData';
import { FormattedEffectText } from './FormattedEffectText';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { isValidForSlot, getIncompatibleBoonInSelection } from '../utils/boonUtils';

interface BoonLibraryProps {
  isPanelCollapsed: boolean;
  setIsPanelCollapsed: (val: boolean) => void;
  isButtonHovered: boolean;
  setIsButtonHovered: (val: boolean) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  hideAssigned: boolean;
  setHideAssigned: (val: boolean) => void;
  hideAssignedSlots: boolean;
  setHideAssignedSlots: (val: boolean) => void;
  limitToGodPool: boolean;
  setLimitToGodPool: (val: boolean) => void;
  enforceSupportBoonLimit: boolean;
  setEnforceSupportBoonLimit: (val: boolean) => void;
  activeStandardOlympians: string[];
  filteredBoons: Boon[];
  activeSlot: string | null;
  selectBoon: (boon: Boon, slotId: string) => void;
  isScrolled: boolean;
  handleSidebarScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  selectedBoonIds: Set<string>;
  elementCounts: Record<ElementType, number>;
  pinnedBoonIds: string[];
  togglePin: (boonId: string) => void;
  reorderPinnedBoons: (newOrder: string[]) => void;
  clearAllPins: () => void;
  activeArcana?: number[];
  activeKeepsake?: string;
  activeFamiliar?: string;
  isHeartBondActive?: boolean;
  toggleArcana?: (cardNumber: number) => void;
  setActiveKeepsake?: (ks: string) => void;
  setActiveFamiliar?: (fa: string) => void;
  setIsHeartBondActive?: (active: boolean) => void;
  additionalBoons?: Boon[];
  removeAdditionalBoon?: (boon: Boon, index: number) => void;
}

interface SortablePinnedBoonItemProps {
  boon: Boon;
  isLocked: boolean;
  prerequisitesStatus: { prereq: BoonPrerequisite; met: boolean }[];
  activeSlot: string | null;
  selectBoon: (boon: Boon, slotId: string) => void;
  togglePin: (id: string) => void;
  elementCounts?: Record<string, number>;
  selectedBoonIds?: Set<string>;
  key?: string | number;
  activeArcana?: number[];
  toggleArcana?: (cardNumber: number) => void;
  activeKeepsake?: string;
  setActiveKeepsake?: (ks: string) => void;
  activeFamiliar?: string;
  setActiveFamiliar?: (fa: string) => void;
  isHeartBondActive?: boolean;
  setIsHeartBondActive?: (active: boolean) => void;
  additionalBoons?: Boon[];
  removeAdditionalBoon?: (boon: Boon, index: number) => void;
}

function SortablePinnedBoonItem({
  boon,
  isLocked,
  prerequisitesStatus,
  activeSlot,
  selectBoon,
  togglePin,
  elementCounts,
  selectedBoonIds,
  activeArcana,
  toggleArcana,
  activeKeepsake,
  setActiveKeepsake,
  activeFamiliar,
  setActiveFamiliar,
  isHeartBondActive,
  setIsHeartBondActive,
  additionalBoons,
  removeAdditionalBoon,
}: SortablePinnedBoonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: boon.id,
    disabled: isLocked,
    data: {
      type: 'sortable-pinned',
      boon,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="transform-gpu transition-[shadow,transform] duration-200"
    >
      <DraggableBoonListItem
        boon={boon}
        onClick={() => activeSlot && isValidForSlot(boon, activeSlot) && selectBoon(boon, activeSlot)}
        isSelectable={!!activeSlot && isValidForSlot(boon, activeSlot)}
        isLocked={isLocked}
        prerequisitesStatus={prerequisitesStatus}
        isPinned={true}
        onPinToggle={() => togglePin(boon.id)}
        elementCounts={elementCounts}
        selectedBoonIds={selectedBoonIds}
        activeArcana={activeArcana}
        toggleArcana={toggleArcana}
        activeKeepsake={activeKeepsake}
        setActiveKeepsake={setActiveKeepsake}
        activeFamiliar={activeFamiliar}
        setActiveFamiliar={setActiveFamiliar}
        isHeartBondActive={isHeartBondActive}
        setIsHeartBondActive={setIsHeartBondActive}
        additionalBoons={additionalBoons}
        removeAdditionalBoon={removeAdditionalBoon}
        selectBoon={selectBoon}
      />
    </div>
  );
}

export function BoonLibrary({
  isPanelCollapsed,
  setIsPanelCollapsed,
  isButtonHovered,
  setIsButtonHovered,
  searchTerm,
  setSearchTerm,
  hideAssigned,
  setHideAssigned,
  hideAssignedSlots,
  setHideAssignedSlots,
  limitToGodPool,
  setLimitToGodPool,
  enforceSupportBoonLimit,
  setEnforceSupportBoonLimit,
  activeStandardOlympians,
  filteredBoons,
  activeSlot,
  selectBoon,
  isScrolled,
  handleSidebarScroll,
  searchInputRef,
  selectedBoonIds,
  elementCounts,
  pinnedBoonIds,
  togglePin,
  reorderPinnedBoons,
  clearAllPins,
  activeArcana = [],
  activeKeepsake = 'none',
  activeFamiliar = 'none',
  isHeartBondActive = false,
  toggleArcana,
  setActiveKeepsake,
  setActiveFamiliar,
  setIsHeartBondActive,
  additionalBoons = [],
  removeAdditionalBoon,
}: BoonLibraryProps) {

  const isDeathArcanaActive = activeArcana.includes(12);
  const isLuckierToothActive = activeKeepsake === 'luckier_tooth';
  const isEngravedPinActive = activeKeepsake === 'engraved_pin';
  const isToulaHeartBondActive = activeFamiliar === 'toula' && isHeartBondActive;
  const isStalwartStandActive = selectedBoonIds.has('stalwart_stand');

  const totalDeathDefiance = (isDeathArcanaActive ? 1 : 0) +
                             (isLuckierToothActive ? 1 : 0) +
                             (isEngravedPinActive ? 1 : 0) +
                             (isToulaHeartBondActive ? 1 : 0) +
                             (isStalwartStandActive ? 1 : 0);
  const pinnedBoons = React.useMemo(() => {
    return pinnedBoonIds
      .map(id => BOONS.find(b => b.id === id))
      .filter((b): b is Boon => !!b);
  }, [pinnedBoonIds]);

  const [isPinnedExpanded, setIsPinnedExpanded] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('hades_build_planner_pinned_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [pinnedMaxHeight, setPinnedMaxHeight] = React.useState<number>(() => {
    try {
      const stored = localStorage.getItem('hades_build_planner_pinned_max_height');
      return stored ? Math.max(140, parseInt(stored, 10)) : 196;
    } catch {
      return 196;
    }
  });

  const [isResizing, setIsResizing] = React.useState<boolean>(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('hades_build_planner_filters_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_filters_expanded', JSON.stringify(isFiltersExpanded));
    } catch {}
  }, [isFiltersExpanded]);

  const [isLibraryExpanded, setIsLibraryExpanded] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('hades_build_planner_library_expanded');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_library_expanded', JSON.stringify(isLibraryExpanded));
    } catch {}
  }, [isLibraryExpanded]);

  const [isSearchTooltipActive, setIsSearchTooltipActive] = React.useState<boolean>(false);

  // States for expandable armaments, hammers, and familiars sections
  const [aspectsExpanded, setAspectsExpanded] = React.useState<boolean>(true);
  const [hammersExpanded, setHammersExpanded] = React.useState<boolean>(true);
  const [familiarsExpanded, setFamiliarsExpanded] = React.useState<boolean>(true);

  const activeFiltersCount = (hideAssigned ? 1 : 0) +
                             (hideAssignedSlots ? 1 : 0) +
                             (limitToGodPool ? 1 : 0) +
                             (enforceSupportBoonLimit ? 1 : 0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragStartRef = React.useRef<{ y: number; height: number }>({ y: 0, height: 196 });
  const currentHeightRef = React.useRef<number>(196);

  const [visibleCount, setVisibleCount] = React.useState<number>(30);

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const filterHeaderRef = React.useRef<HTMLDivElement>(null);
  const libraryHeaderRef = React.useRef<HTMLDivElement>(null);
  const libraryListContainerRef = React.useRef<HTMLDivElement>(null);

  const [sidebarHeight, setSidebarHeight] = React.useState<number>(800);
  const [libraryHeight, setLibraryHeight] = React.useState<number>(400);

  React.useEffect(() => {
    if (isPanelCollapsed) return;
    const handleResize = () => {
      if (sidebarRef.current) {
        setSidebarHeight(sidebarRef.current.offsetHeight);
      }
      if (libraryListContainerRef.current) {
        setLibraryHeight(libraryListContainerRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setInterval(handleResize, 200);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, [isPanelCollapsed, pinnedBoonIds, isPinnedExpanded]);

  React.useEffect(() => {
    setVisibleCount(30);
  }, [searchTerm, hideAssigned, limitToGodPool, activeSlot]);

  const displayedBoons = React.useMemo(() => {
    return filteredBoons.slice(0, visibleCount);
  }, [filteredBoons, visibleCount]);

  const startResize = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const initialHeight = containerRef.current ? containerRef.current.offsetHeight : pinnedMaxHeight;
    dragStartRef.current = { y: clientY, height: initialHeight };
    currentHeightRef.current = initialHeight;
    setIsResizing(true);
  }, [pinnedMaxHeight]);

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartRef.current.y;
      const newHeight = dragStartRef.current.height + deltaY;
      
      const totalH = sidebarRef.current ? sidebarRef.current.offsetHeight : window.innerHeight - 64;
      const filterHeaderH = filterHeaderRef.current ? filterHeaderRef.current.offsetHeight : 180;
      const libraryHeaderH = libraryHeaderRef.current ? libraryHeaderRef.current.offsetHeight : 44;
      const maxAllowed = totalH - filterHeaderH - libraryHeaderH - 70 - 80;
      const finalMaxHeight = Math.max(140, maxAllowed);
      
      const clampedHeight = Math.max(140, Math.min(newHeight, finalMaxHeight));
      
      currentHeightRef.current = clampedHeight;
      if (containerRef.current) {
        containerRef.current.style.maxHeight = `${clampedHeight}px`;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const deltaY = e.touches[0].clientY - dragStartRef.current.y;
      const newHeight = dragStartRef.current.height + deltaY;
      
      const totalH = sidebarRef.current ? sidebarRef.current.offsetHeight : window.innerHeight - 64;
      const filterHeaderH = filterHeaderRef.current ? filterHeaderRef.current.offsetHeight : 180;
      const libraryHeaderH = libraryHeaderRef.current ? libraryHeaderRef.current.offsetHeight : 44;
      const maxAllowed = totalH - filterHeaderH - libraryHeaderH - 70 - 80;
      const finalMaxHeight = Math.max(140, maxAllowed);
      
      const clampedHeight = Math.max(140, Math.min(newHeight, finalMaxHeight));
      
      currentHeightRef.current = clampedHeight;
      if (containerRef.current) {
        containerRef.current.style.maxHeight = `${clampedHeight}px`;
      }
    };

    const stopResize = () => {
      setIsResizing(false);
      setPinnedMaxHeight(currentHeightRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopResize);
    };
  }, [isResizing]);

  React.useEffect(() => {
    if (isResizing) return;
    try {
      localStorage.setItem('hades_build_planner_pinned_max_height', pinnedMaxHeight.toString());
    } catch (e) {
      console.error(e);
    }
  }, [pinnedMaxHeight, isResizing]);

  React.useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  React.useEffect(() => {
    try {
      localStorage.setItem('hades_build_planner_pinned_expanded', JSON.stringify(isPinnedExpanded));
    } catch (e) {
      console.error(e);
    }
  }, [isPinnedExpanded]);

  const [filterHeaderHeight, setFilterHeaderHeight] = React.useState<number>(124);

  React.useEffect(() => {
    if (!filterHeaderRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFilterHeaderHeight(entry.target.getBoundingClientRect().height);
      }
    });
    observer.observe(filterHeaderRef.current);
    setFilterHeaderHeight(filterHeaderRef.current.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, [isFiltersExpanded]);

  const libraryHeaderHeight = libraryHeaderRef.current ? libraryHeaderRef.current.offsetHeight : 44;
  const pinnedHeaderAndHandleHeight = 70;
  const minLibraryListHeight = 80;
  const maxAllowedHeight = sidebarHeight - filterHeaderHeight - libraryHeaderHeight - pinnedHeaderAndHandleHeight - minLibraryListHeight;
  const activePinnedMaxHeight = Math.min(pinnedMaxHeight, Math.max(140, maxAllowedHeight));

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isPanelCollapsed 
          ? (isButtonHovered ? 24 : 0) 
          : SIDEBAR_WIDTH,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      className="border-r border-hades-border bg-hades-panel flex flex-col z-40 relative flex-shrink-0"
    >
      {/* Toggle Button - High contrast background and accent border */}
      <button 
        onClick={() => {
          setIsPanelCollapsed(!isPanelCollapsed);
          setIsButtonHovered(false);
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`absolute top-[40px] ${isSearchTooltipActive ? 'z-10' : 'z-50'} w-6 h-10 flex items-center justify-center transition-all duration-200 group border shadow-2xl ${
          isPanelCollapsed 
            ? 'left-4 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]' 
            : '-right-3 rounded bg-hades-bg-dark border-hades-accent/30 hover:border-hades-accent hover:bg-hades-bg-light translate-y-[-50%]'
        }`}
        title={isPanelCollapsed ? "Expand Library" : "Collapse Library"}
      >
        {isPanelCollapsed ? (
          <ChevronRight className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        ) : (
          <ChevronLeft className={`w-4 h-4 text-hades-accent ${isButtonHovered ? 'animate-pulse' : ''}`} />
        )}
      </button>

      <div 
        ref={sidebarRef}
        style={{ width: SIDEBAR_WIDTH }}
        className={`h-full flex flex-col overflow-visible will-change-transform ${isPanelCollapsed ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
      >
        <div 
          ref={filterHeaderRef}
          className={`flex flex-col bg-hades-panel z-20 relative transition-[shadow,background-color] duration-200 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : ''}`}
        >
          {/* Search Input Bar */}
          <div className="pt-5 px-5 pb-5 border-b border-hades-border-light flex flex-col relative bg-hades-panel">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hades-accent/50" />
              <input 
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
                type="text" 
                placeholder="Press / to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-hades-bg-main/50 border border-hades-border-light rounded-lg py-2.5 pl-10 pr-16 text-sm text-hades-text placeholder:text-hades-text/30 focus:outline-none focus:border-hades-accent/50 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-hades-text/30 hover:text-hades-red transition-colors p-0.5 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div 
                  className="relative group/tooltip inline-flex items-center"
                  onMouseEnter={() => setIsSearchTooltipActive(true)}
                  onMouseLeave={() => setIsSearchTooltipActive(false)}
                >
                  <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                  {/* Tooltip */}
                  <div className="absolute left-[-10px] top-full mt-3.5 w-80 bg-hades-bg-dark border border-hades-border-light rounded-lg p-3.5 shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                    {/* Connector bridge to make hovering steady */}
                    <div className="absolute left-0 right-0 bottom-full h-3.5" />
                    {/* Triangular pointer pointing up */}
                    <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                    <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                      Search parameters
                    </p>
                    <p className="text-[11px] font-sans text-hades-text/85 mb-2.5 leading-snug">
                      Filter boons dynamically by name, description, god, slot (Attack, Special, etc.), or elemental essence.
                    </p>
                    
                    <div className="pt-2 border-t border-hades-border-light/25">
                      <p className="text-[10px] font-semibold text-hades-accent mb-2 uppercase tracking-wider font-display">
                        Search Operators
                      </p>
                      
                      <table className="w-full text-left border-collapse text-[10px] text-hades-text/85">
                        <thead>
                          <tr className="border-b border-hades-border-light/15 text-[8.5px] uppercase font-display text-hades-text/50 tracking-wider">
                            <th className="py-1 pb-1.5 font-semibold w-[65px]">Operator</th>
                            <th className="py-1 pb-1.5 font-semibold pl-2">Description & Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hades-border-light/10">
                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">" "</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Exact phrase match</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80"><span className="text-hades-accent font-semibold">"</span>boons of hera<span className="text-hades-accent font-semibold">"</span></span>
                              </p>
                            </td>
                          </tr>

                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">AND</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Matches both terms (capitalized)</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80">zeus <span className="text-hades-accent font-semibold">AND</span> cast</span>
                              </p>
                            </td>
                          </tr>

                           <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">OR / |</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Matches either term (capitalized)</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80">hera <span className="text-hades-accent font-semibold">OR</span> demeter</span>
                              </p>
                            </td>
                          </tr>

                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">( )</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Group terms for custom precedence</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80"><span className="text-hades-accent font-semibold">(</span>poseidon <span className="text-hades-accent font-semibold">OR</span> hestia<span className="text-hades-accent font-semibold">) AND</span> duo</span>
                              </p>
                            </td>
                          </tr>

                          <tr className="align-top">
                            <td className="py-1.5 pr-1 text-left">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-hades-bg-dark border border-hades-border-light/25 text-hades-text/90 font-mono font-bold text-[9px] whitespace-nowrap">NOT / -</span>
                            </td>
                            <td className="py-1.5 pl-2 leading-normal">
                              <p className="text-hades-text/90 font-medium">Exclude term or phrase</p>
                              <p className="text-[9.5px] text-hades-text/50 font-mono mt-0.5">
                                <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80">zeus <span className="text-hades-accent font-semibold">NOT</span> strike</span> <span className="text-hades-text/40">or</span> <span className="bg-white/[0.03] px-1 py-0.5 rounded text-hades-text/80"><span className="text-hades-accent font-semibold">-</span>aphrodite</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standalone Filters Collapsible Section (Visual consistency with Pinned Boons & Boon Library) */}
          <div className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative">
            <div className="flex items-center justify-between pl-5 pr-5 select-none">
              <button
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center cursor-pointer hover:text-hades-accent/80 transition-colors select-none text-left w-full justify-between"
                id="boon-filters-toggle-btn"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-hades-accent shrink-0" />
                  <span>FILTERS ({activeFiltersCount})</span>
                </div>
                {isFiltersExpanded ? (
                  <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
                )}
              </button>
            </div>

            <div
              style={{ 
                gridTemplateRows: isFiltersExpanded ? '1fr' : '0fr',
                display: 'grid'
              }}
              className="transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto"
              data-expanded={isFiltersExpanded}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-2.5 px-5 pt-3 pb-3">
                  
                  {/* Hide Assigned Boons */}
                  <div className="flex items-center gap-2 w-fit">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={hideAssigned} 
                        onChange={(e) => setHideAssigned(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                        hideAssigned 
                          ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                          : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                      }`}>
                        {hideAssigned && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] font-display uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors select-none">
                        Hide Assigned Boons
                      </span>
                    </label>

                    <div className="flex items-center gap-1.5 ml-0.5">
                      <div className="relative group/tooltip inline-flex items-center">
                        <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                        <div className="absolute left-[-10px] top-full mt-2 w-64 p-3.5 bg-hades-bg-dark border border-hades-border-light rounded-lg shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                          <div className="absolute left-0 right-0 bottom-full h-2" />
                          <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                            Assigned Boons Filter
                          </p>
                          <p className="font-sans text-[11px] text-hades-text/85 leading-relaxed">
                            If checked, boons that have already been assigned in your active build will be hidden.
                          </p>
                          <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hide Replacement Boons */}
                  <div className="flex items-center gap-2 w-fit">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={hideAssignedSlots} 
                        onChange={(e) => setHideAssignedSlots(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                        hideAssignedSlots 
                          ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                          : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                      }`}>
                        {hideAssignedSlots && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] font-display uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors select-none">
                        Hide Replacement Boons for Assigned Core Slots
                      </span>
                    </label>

                    <div className="flex items-center gap-1.5 ml-0.5">
                      <div className="relative group/tooltip inline-flex items-center">
                        <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                        <div className="absolute left-[-10px] top-full mt-2 w-64 p-3.5 bg-hades-bg-dark border border-hades-border-light rounded-lg shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                          <div className="absolute left-0 right-0 bottom-full h-2" />
                          <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                            Assigned Slots Filter
                          </p>
                          <p className="font-sans text-[11px] text-hades-text/85 leading-relaxed">
                            If checked, boons that would replace a currently assigned core slot will be hidden.
                            <span className="block mt-1.5 text-hades-text/60 italic">
                              Example: if Flame Strike has already been assigned and this option is checked, Attack boons will no longer show up.
                            </span>
                          </p>
                          <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Limit Boons to God Pool */}
                  <div className="flex items-center gap-2 w-fit">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={limitToGodPool} 
                        onChange={(e) => setLimitToGodPool(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                        limitToGodPool 
                          ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                          : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                      }`}>
                        {limitToGodPool && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] font-display uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors">
                        Limit Boons To God Pool
                      </span>
                    </label>
                    
                    <div className="flex items-center gap-1.5 ml-0.5">
                      <span className={`text-[9px] font-semibold px-1 py-[0.5px] rounded-sm transition-colors ${activeStandardOlympians.length >= 4 ? 'bg-amber-400/15 text-amber-400 border border-amber-400/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                        {activeStandardOlympians.length}/4
                      </span>

                      <div className="relative group/tooltip inline-flex items-center">
                        <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                        <div className="absolute left-[-10px] top-full mt-2 w-64 p-3.5 bg-hades-bg-dark border border-hades-border-light rounded-lg shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                          <div className="absolute left-0 right-0 bottom-full h-2" />
                          <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                            God Pool Filter
                          </p>
                          <p className="font-sans text-[11px] text-hades-text/85 leading-relaxed">
                            Typically, only <span className="font-bold text-gray-200">four</span> Olympian gods (excluding Artemis, Athena, Dionysus, Hermes, and Hades) are included in the god pool each night.
                            <br /><br />
                            If checked, once you have allocated boons from four Olympian gods, all other standard Olympians' boons are filtered out.
                          </p>
                          <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enforce support limit */}
                  <div className="flex items-center gap-2 w-fit">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                      <input 
                        type="checkbox" 
                        checked={enforceSupportBoonLimit} 
                        onChange={(e) => setEnforceSupportBoonLimit(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                        enforceSupportBoonLimit 
                          ? 'bg-hades-accent/20 border-hades-accent text-hades-accent' 
                          : 'border-white/20 group-hover:border-white/45 bg-white/[0.02]'
                      }`}>
                        {enforceSupportBoonLimit && (
                          <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] font-display uppercase tracking-wider text-hades-text/50 group-hover:text-hades-text/80 transition-colors">
                        Enforce boon limit for support gods
                      </span>
                    </label>
                    
                    <div className="flex items-center gap-1.5 ml-0.5">
                      <div className="relative group/tooltip inline-flex items-center">
                        <Info className="w-3.5 h-3.5 text-hades-text/40 hover:text-hades-accent cursor-help transition-colors" />
                        <div className="absolute left-[-10px] top-full mt-2 w-64 p-3.5 bg-hades-bg-dark border border-hades-border-light rounded-lg shadow-2xl opacity-0 scale-95 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none group-hover/tooltip:pointer-events-auto z-[100] origin-top-left">
                          <div className="absolute left-0 right-0 bottom-full h-2" />
                          <p className="text-[10px] font-semibold text-hades-accent mb-1.5 uppercase tracking-wider font-display">
                            Support God Limits
                          </p>
                          <div className="font-sans text-[11px] text-hades-text/85 leading-relaxed flex flex-col gap-1.5">
                            <p>
                              Under normal circumstances, only one boon can be obtained from each of the following gods per night:
                            </p>
                            <ul className="list-disc pl-4 space-y-0.5 text-hades-text/90 font-medium">
                              <li><span className="font-bold text-gray-200">Artemis</span></li>
                              <li><span className="font-bold text-gray-200">Athena</span></li>
                              <li><span className="font-bold text-gray-200">Dionysus</span></li>
                              <li><span className="font-bold text-gray-200">Hades</span></li>
                            </ul>
                            <p>
                              Additionally, only two to three <span className="font-bold text-gray-200">Hermes</span> boons are naturally attainable each night.
                              <br /><br />
                              If checked, once this limit is reached for any of the above gods, the remaining boons from that respective god will be hidden.
                            </p>
                          </div>
                          <div className="absolute bottom-[calc(100%-4px)] left-[12px] w-2 h-2 bg-hades-bg-dark border-l border-t border-hades-border-light rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Boons Section (Frozen context when scrolling) */}
        {pinnedBoons.length > 0 && (
          <div className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative">
            <div 
              onClick={() => setIsPinnedExpanded(!isPinnedExpanded)}
              className="flex items-center justify-between pl-5 pr-5 select-none relative cursor-pointer group"
            >
              <div className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center select-none text-left w-full justify-between">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-hades-accent fill-current rotate-45 shrink-0" />
                  <span>Pinned Boons ({pinnedBoons.length})</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAllPins();
                    }}
                    className="text-[10px] font-display uppercase tracking-wider text-hades-text/45 hover:text-hades-red transition-colors cursor-pointer whitespace-nowrap shrink-0 z-30"
                  >
                    Clear All
                  </button>
                  {isPinnedExpanded ? (
                    <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
                  )}
                </div>
              </div>
            </div>
            
            <div
              style={{ 
                gridTemplateRows: isPinnedExpanded ? '1fr' : '0fr',
                display: 'grid'
              }}
              className="transition-[grid-template-rows,margin-top,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] mt-0 opacity-0 pointer-events-none data-[expanded=true]:mt-2 data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto"
              data-expanded={isPinnedExpanded}
            >
              <div className="overflow-hidden">
                <div 
                  ref={containerRef}
                  style={{ maxHeight: `${activePinnedMaxHeight}px` }}
                  className={`space-y-3 overflow-y-auto custom-scrollbar px-5 pt-2 pb-1.5 ${isResizing ? 'select-none pointer-events-none' : 'transition-[max-height] duration-300'}`}
                >
                <SortableContext items={pinnedBoonIds} strategy={verticalListSortingStrategy}>
                  {pinnedBoons.map((boon) => {
                    let isLocked = false;
                    const prerequisitesStatus: { prereq: BoonPrerequisite; met: boolean }[] = [];
                    if (boon.prerequisites && boon.prerequisites.length > 0) {
                      const isTallOrder = boon.id === 'tall_order';
                      if (isTallOrder) {
                        const metAny = boon.prerequisites.some(prereq => {
                          if (prereq.element && prereq.elementCount) {
                            const currentCount = elementCounts[prereq.element] || 0;
                            return currentCount >= prereq.elementCount;
                          }
                          return false;
                        });
                        if (!metAny) {
                          isLocked = true;
                        }
                        boon.prerequisites.forEach(prereq => {
                          if (prereq.element && prereq.elementCount) {
                            const currentCount = elementCounts[prereq.element] || 0;
                            const met = currentCount >= prereq.elementCount;
                            prerequisitesStatus.push({ prereq, met });
                          }
                        });
                      } else {
                        boon.prerequisites.forEach(prereq => {
                          let met = false;
                          if (prereq.type === 'death_defiance_min') {
                            const minVal = prereq.value ?? 1;
                            met = totalDeathDefiance >= minVal;
                          } else if (prereq.description === "At least one Death Defiance") {
                            met = totalDeathDefiance >= 1;
                          } else if (prereq.element && prereq.elementCount) {
                            const currentCount = elementCounts[prereq.element] || 0;
                            met = currentCount >= prereq.elementCount;
                          } else {
                            met = prereq.any
                              ? prereq.boonIds.some(id => selectedBoonIds.has(id))
                              : prereq.boonIds.every(id => selectedBoonIds.has(id));
                          }
                          if (!met) {
                            isLocked = true;
                          }
                          prerequisitesStatus.push({ prereq, met });
                        });
                      }
                    }

                    const incompatibleBoon = getIncompatibleBoonInSelection(boon.id, selectedBoonIds);
                    if (incompatibleBoon) {
                      isLocked = true;
                      prerequisitesStatus.push({
                        prereq: {
                          boonIds: [],
                          description: `Requires removing incompatible ${incompatibleBoon.name}`
                        },
                        met: false
                      });
                    }

                    return (
                      <SortablePinnedBoonItem
                        key={boon.id}
                        boon={boon}
                        isLocked={isLocked}
                        prerequisitesStatus={prerequisitesStatus}
                        activeSlot={activeSlot}
                        selectBoon={selectBoon}
                        togglePin={togglePin}
                        elementCounts={elementCounts}
                        selectedBoonIds={selectedBoonIds}
                        activeArcana={activeArcana}
                        toggleArcana={toggleArcana}
                        activeKeepsake={activeKeepsake}
                        setActiveKeepsake={setActiveKeepsake}
                        activeFamiliar={activeFamiliar}
                        setActiveFamiliar={setActiveFamiliar}
                        isHeartBondActive={isHeartBondActive}
                        setIsHeartBondActive={setIsHeartBondActive}
                        additionalBoons={additionalBoons}
                        removeAdditionalBoon={removeAdditionalBoon}
                      />
                    );
                  })}
                </SortableContext>
              </div>
            </div>
          </div>

            {/* Draggable Divider Handle */}
            {isPinnedExpanded && (
              <div 
                onMouseDown={startResize}
                onTouchStart={startResize}
                onDoubleClick={() => setPinnedMaxHeight(196)}
                className="h-3 cursor-row-resize flex items-center justify-center relative z-30 select-none group/resize mt-2"
                title="Drag to resize, double-click to reset"
                id="pinned-boons-resize-handle"
              >
                {/* Full-width modern thin track line */}
                <div className={`absolute left-4 right-4 h-[1px] transition-colors duration-200 ${
                  isResizing ? 'bg-zinc-600/40' : 'bg-zinc-800/60 group-hover/resize:bg-zinc-700/50'
                }`} />
                {/* Streamlined central control pill */}
                <div className={`w-10 h-[3px] rounded-full transition-all duration-200 z-10 ${
                  isResizing ? 'bg-zinc-400 scale-x-110' : 'bg-zinc-700 group-hover/resize:bg-zinc-500 group-hover/resize:w-16'
                }`} />
              </div>
            )}
          </div>
        )}

        {/* Boon Library Section Header (Frozen) */}
        <div 
          ref={libraryHeaderRef}
          className="flex-shrink-0 border-b border-hades-border-light py-3 bg-hades-panel flex flex-col relative"
        >
          <div className="flex items-center justify-between pl-5 pr-5 select-none">
            <button
              onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
              className="text-xs font-display uppercase tracking-widest text-hades-accent font-bold flex items-center cursor-pointer hover:text-hades-accent/80 transition-colors select-none text-left w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/ui/BoonII.webp" 
                  alt="Boon Library Icon" 
                  className="w-4 h-4 object-contain shrink-0" 
                  referrerPolicy="no-referrer"
                />
                BOON LIBRARY ({filteredBoons.length})
              </div>
              {isLibraryExpanded ? (
                <ChevronDown className="w-4 h-4 text-hades-accent shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-hades-accent shrink-0" />
              )}
            </button>
          </div>
        </div>

        <div 
          style={{ 
            gridTemplateRows: isLibraryExpanded ? '1fr' : '0fr',
            display: 'grid'
          }}
          className="transition-[grid-template-rows,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 pointer-events-none data-[expanded=true]:opacity-100 data-[expanded=true]:pointer-events-auto data-[expanded=true]:flex-1 data-[expanded=false]:flex-none min-h-0"
          data-expanded={isLibraryExpanded}
        >
          <div className="overflow-hidden flex flex-col h-full min-h-0">
            <div 
              ref={libraryListContainerRef}
              onScroll={handleSidebarScroll}
              className={`flex-1 overflow-y-auto custom-scrollbar px-5 transform-gpu pt-3 pb-8`}
            >
              <div className="space-y-3 transform-gpu">
                {displayedBoons.map(boon => {
                  let isLocked = false;
                  const prerequisitesStatus: { prereq: BoonPrerequisite; met: boolean }[] = [];
                  if (boon.prerequisites && boon.prerequisites.length > 0) {
                    const isTallOrder = boon.id === 'tall_order';
                    if (isTallOrder) {
                      const metAny = boon.prerequisites.some(prereq => {
                        if (prereq.element && prereq.elementCount) {
                          const currentCount = elementCounts[prereq.element] || 0;
                          return currentCount >= prereq.elementCount;
                        }
                        return false;
                      });
                      if (!metAny) {
                        isLocked = true;
                      }
                      boon.prerequisites.forEach(prereq => {
                        if (prereq.element && prereq.elementCount) {
                          const currentCount = elementCounts[prereq.element] || 0;
                          const met = currentCount >= prereq.elementCount;
                          prerequisitesStatus.push({ prereq, met });
                        }
                      });
                    } else {
                      boon.prerequisites.forEach(prereq => {
                        let met = false;
                        if (prereq.type === 'death_defiance_min') {
                          const minVal = prereq.value ?? 1;
                          met = totalDeathDefiance >= minVal;
                        } else if (prereq.description === "At least one Death Defiance") {
                          met = totalDeathDefiance >= 1;
                        } else if (prereq.element && prereq.elementCount) {
                          const currentCount = elementCounts[prereq.element] || 0;
                          met = currentCount >= prereq.elementCount;
                        } else {
                          met = prereq.any
                            ? prereq.boonIds.some(id => selectedBoonIds.has(id))
                            : prereq.boonIds.every(id => selectedBoonIds.has(id));
                        }
                        if (!met) {
                          isLocked = true;
                        }
                        prerequisitesStatus.push({ prereq, met });
                      });
                    }
                  }

                  const incompatibleBoon = getIncompatibleBoonInSelection(boon.id, selectedBoonIds);
                  if (incompatibleBoon) {
                    isLocked = true;
                    prerequisitesStatus.push({
                      prereq: {
                        boonIds: [],
                        description: `Requires removing incompatible ${incompatibleBoon.name}`
                      },
                      met: false
                    });
                  }

                  return (
                    <DraggableBoonListItem 
                      key={boon.id} 
                      boon={boon} 
                      onClick={() => activeSlot && selectBoon(boon, activeSlot)}
                      isSelectable={!!activeSlot}
                      isLocked={isLocked}
                      prerequisitesStatus={prerequisitesStatus}
                      isPinned={false}
                      onPinToggle={() => togglePin(boon.id)}
                      elementCounts={elementCounts}
                      selectedBoonIds={selectedBoonIds}
                      activeArcana={activeArcana}
                      toggleArcana={toggleArcana}
                      activeKeepsake={activeKeepsake}
                      setActiveKeepsake={setActiveKeepsake}
                      activeFamiliar={activeFamiliar}
                      setActiveFamiliar={setActiveFamiliar}
                      isHeartBondActive={isHeartBondActive}
                      setIsHeartBondActive={setIsHeartBondActive}
                      additionalBoons={additionalBoons}
                      removeAdditionalBoon={removeAdditionalBoon}
                      selectBoon={selectBoon}
                    />
                  );
                })}

                {filteredBoons.length > visibleCount && (
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 30)}
                      className="w-full py-2.5 px-4 bg-hades-accent/5 hover:bg-hades-accent/10 border border-hades-accent/20 hover:border-hades-accent/50 rounded-lg text-xs font-display uppercase tracking-wider text-hades-accent/70 hover:text-hades-accent transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    >
                      Load More (+{filteredBoons.length - visibleCount} remaining)
                    </button>
                  </div>
                )}

                {filteredBoons.length === 0 && (
                  <div className={`text-center text-gray-400 font-display text-xs uppercase tracking-tight py-12`}>
                    No matches found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
