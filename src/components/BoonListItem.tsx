import React from 'react';
import { motion } from 'motion/react';
import { useDraggable } from '@dnd-kit/core';
import { Lock, Check, X, Pin } from 'lucide-react';
import { Boon, BoonPrerequisite, ELEMENT_COLORS, GOD_SYMBOLS } from '../types';
import { GodIcon, ElementIcon } from './Icons';
import { getBoonColor, getBoonBorderColor } from '../utils/boonUtils';
import { FormattedEffectText } from './FormattedEffectText';
import { BOON_ICON_ROUNDING, BOON_BORDER_WIDTH } from '../constants';
import { BOONS } from '../data/boonsData';

export function HighlightedText({ text }: { text: string }) {
  if (!text) return null;

  const GOD_NAMES = Object.keys(GOD_SYMBOLS);
  const BOON_NAMES = BOONS.map(b => b.name);
  const SLOT_KEYWORDS = ['Attack', 'Special', 'Cast', 'Sprint', 'Dash', 'Gain', 'Dodge', 'Magick', 'Mana'];
  const SPECIAL_WORDS = ['Duo Boon', 'Duo', 'Boon', 'Boons', 'Requirement', 'Requirements', 'Locked', 'Infusion', 'Essences', 'Essence'];

  const ALL_HIGHLIGHT_KEYWORDS = Array.from(new Set([
    ...SPECIAL_WORDS,
    ...SLOT_KEYWORDS,
    ...GOD_NAMES,
    ...BOON_NAMES
  ])).sort((a, b) => b.length - a.length);

  const pattern = new RegExp(`(${ALL_HIGHLIGHT_KEYWORDS.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        if (GOD_NAMES.includes(part)) {
          return (
            <span key={index} className="text-zinc-100 font-bold">
              {part}
            </span>
          );
        }
        if (BOON_NAMES.includes(part)) {
          return (
            <span key={index} className="text-zinc-100 font-bold font-sans">
              {part}
            </span>
          );
        }
        if (SLOT_KEYWORDS.includes(part)) {
          return (
            <span key={index} className="text-zinc-100 font-bold">
              {part}
            </span>
          );
        }
        if (part === 'Duo' || part === 'Duo Boon') {
          return (
            <span key={index} className="text-zinc-100 font-bold">
              {part}
            </span>
          );
        }
        if (SPECIAL_WORDS.includes(part)) {
          return (
            <span key={index} className="text-zinc-200 font-semibold">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function formatPrerequisiteDescription(prereq: BoonPrerequisite, isDuo = false, removeRequires = false) {
  let description = prereq.description;
  if (removeRequires) {
    if (description.startsWith('Requires ')) {
      description = description.slice(9);
    } else if (description.startsWith('requires ')) {
      description = description.slice(9);
    }
  }

  // Capitalize first letter of description
  if (description.length > 0) {
    description = description.charAt(0).toUpperCase() + description.slice(1);
  }

  const requiredBoons = prereq.boonIds
    .map(id => BOONS.find(b => b.id === id))
    .filter((b): b is Boon => !!b);

  const requiredBoonNames = requiredBoons.map(b => b.name);
  const uniqueGods = isDuo ? Array.from(new Set(requiredBoons.flatMap(b => b.gods))) : [];

  const slotKeywords = ['Attack', 'Special', 'Cast', 'Sprint', 'Dash', 'Gain', 'Dodge', 'Magick', 'Mana'];
  const allBoonNames = BOONS.map(b => b.name);

  // Combine custom required boon names, all boon names, and slot names
  const keywordsToHighlight = Array.from(new Set([
    ...requiredBoonNames,
    ...allBoonNames,
    ...slotKeywords
  ])).sort((a, b) => b.length - a.length);

  // Parse pattern for highlighting
  const pattern = keywordsToHighlight.length > 0 
    ? new RegExp(`(${keywordsToHighlight.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    : null;
  const parts = pattern ? description.split(pattern) : [description];

  // Pre-process parts so trailing commas are enclosed with the preceding keyword
  interface ProcessedPart {
    text: string;
    isKeyword: boolean;
    isRequiredBoon: boolean;
    extraSuffix?: string;
  }
  const processedParts: ProcessedPart[] = [];
  const mutableParts = [...parts];

  for (let i = 0; i < mutableParts.length; i++) {
    const text = mutableParts[i];
    if (text === undefined) continue;
    
    const isKeyword = keywordsToHighlight.includes(text);
    if (isKeyword) {
      const isRequiredBoon = requiredBoonNames.includes(text);
      let extraSuffix = "";
      if (i + 1 < mutableParts.length && mutableParts[i + 1].startsWith(",")) {
        extraSuffix = ",";
        mutableParts[i + 1] = mutableParts[i + 1].slice(1);
      }
      processedParts.push({ text, isKeyword, isRequiredBoon, extraSuffix });
    } else {
      if (text !== "") {
        processedParts.push({ text, isKeyword: false, isRequiredBoon: false });
      }
    }
  }

  if (isDuo && uniqueGods.length > 0) {
    if (prereq.any && uniqueGods.length > 1) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <div className="text-xs text-gray-400 font-normal normal-case select-none leading-tight">
            One of the following:
          </div>
          <div className="text-xs text-gray-300 leading-normal font-medium flex items-start gap-1.5">
            <span className="text-gray-500 select-none">▸</span>
            <span className="flex-1 leading-normal">
              {processedParts.map((part, index) => {
                if (part.isKeyword) {
                  const partBoon = part.isRequiredBoon 
                    ? requiredBoons.find(b => b.name === part.text)
                    : null;
                  return (
                    <span key={index} className="inline whitespace-nowrap mx-0.5 align-middle">
                      {partBoon && partBoon.gods.map(god => (
                        <span key={god} className="inline-block align-middle mr-0.5">
                          <GodIcon god={god} className="w-3.5 h-3.5 object-contain inline" />
                        </span>
                      ))}
                      <strong className="font-bold text-hades-text align-middle">
                        {part.text}
                      </strong>
                      {part.extraSuffix}
                    </span>
                  );
                }
                return <span key={index} className="align-middle">{part.text}</span>;
              })}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-wrap items-center gap-1.5 mt-[2px]">
          {uniqueGods.map((god, gIdx) => (
            <React.Fragment key={gIdx}>
              {gIdx > 0 && (
                <span className="text-gray-500 select-none text-[10px] font-display font-semibold leading-none mx-0.5">
                  /
                </span>
              )}
              <span className="inline-flex items-center select-none gap-1">
                <GodIcon god={god} className="w-3.5 h-3.5 object-contain" />
                <strong className="text-[10px] font-display font-medium text-gray-200 uppercase tracking-wider leading-none">
                  {god}
                </strong>
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs text-gray-300 leading-normal font-medium flex items-start gap-1.5">
          <span className="text-gray-500 select-none">▸</span>
          <span className="flex-1">
            {processedParts.map((part, index) => {
              if (part.isKeyword) {
                return (
                  <span key={index} className="inline whitespace-nowrap align-middle">
                    <strong className="font-bold text-hades-text">
                      {part.text}
                    </strong>
                    {part.extraSuffix}
                  </span>
                );
              }
              return <span key={index} className="align-middle">{part.text}</span>;
            })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {uniqueGods.map((god, gIdx) => {
        const isLast = gIdx === uniqueGods.length - 1;
        return (
          <span key={gIdx} className={`inline select-none${isLast ? '' : ' mr-1.5'}`}>
            {gIdx > 0 && <span className="text-gray-500 mr-1">/</span>}
            <GodIcon god={god} className="w-3.5 h-3.5 object-contain inline-block align-middle mr-1 -mt-0.5" />
            <strong className="text-[10px] font-display font-medium text-gray-200 uppercase tracking-wider inline-block align-middle leading-none">
              {god}
            </strong>
          </span>
        );
      })}{uniqueGods.length > 0 && (
        <span className="text-gray-400 font-normal select-none">:</span>
      )}{' '}
      <span className="text-gray-300">
        {processedParts.map((part, index) => {
          if (part.isKeyword) {
            return (
              <span key={index} className="inline whitespace-nowrap align-middle">
                <strong className="font-bold text-hades-text">
                  {part.text}
                </strong>
                {part.extraSuffix}
              </span>
            );
          }
          return <span key={index} className="align-middle">{part.text}</span>;
        })}
      </span>
    </>
  );
}

export const SUCCESS_RATE_GROUPS = [
  {
    gods: ['Poseidon'],
    boonIds: ['sea_star'],
    label: 'Poseidon: Sea Star'
  },
  {
    gods: ['Zeus'],
    boonIds: ['divine_vengeance', 'double_strike'],
    label: 'Zeus: Divine Vengeance, or Double Strike'
  },
  {
    gods: ['Apollo'],
    boonIds: ['dazzling_display', 'extra_dose'],
    label: 'Apollo: Dazzling Display, or Extra Dose'
  },
  {
    gods: ['Artemis'],
    boonIds: ['pressure_points', 'vital_sign', 'lethal_snare', 'death_warrant', 'killing_stroke'],
    label: 'Artemis: Pressure Points, Vital Sign, Lethal Snare, Death Warrant, or Killing Stroke'
  },
  {
    gods: ['Ares'],
    boonIds: ['grisly_gain', 'visceral_impact', 'mutual_destruction', 'grievous_blow', 'profuse_bleeding'],
    label: 'Ares: Grisly Gain, Visceral Impact, Mutual Destruction, Grievous Blow, or Profuse Bleeding'
  },
  {
    gods: ['Poseidon', 'Ares'],
    boonIds: ['arterial_spray'],
    label: 'Duo Boon: Arterial Spray'
  }
];

export function StaticBoonListItem({ 
  boon, 
  isOverlay = false, 
  isLocked = false, 
  prerequisitesStatus = [],
  elementCounts,
  selectedBoonIds
}: { 
  boon: Boon; 
  isOverlay?: boolean; 
  isLocked?: boolean; 
  prerequisitesStatus?: { prereq: BoonPrerequisite; met: boolean }[]; 
  elementCounts?: Record<string, number>;
  selectedBoonIds?: Set<string>;
}) {
  const borderColor = getBoonBorderColor(boon.type);
  
  return (
    <div className={`p-3 rounded-xl transition-all duration-150 ${
      isOverlay 
        ? 'bg-hades-bg-light shadow-2xl z-50' 
        : isLocked
          ? 'bg-hades-bg-dark/60 border border-red-950/45'
          : 'bg-hades-bg-dark/80 border border-white/10 hover:border-white/20 group-hover:border-white/20'
    }`}>
      <div className="flex items-start gap-4 transition-opacity duration-150">
        <div className={`relative w-14 h-14 flex-shrink-0 transition-all duration-100 bg-hades-bg-dark ${BOON_ICON_ROUNDING} ${isLocked ? 'opacity-50' : ''}`}>
          {boon.icon ? (
            <div className={`w-full h-full relative ${BOON_ICON_ROUNDING}`}>
              <img 
                src={boon.icon} 
                alt={boon.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  const target = e.currentTarget;
                  const primaryGod = boon.gods[0];
                  const fallback = GOD_SYMBOLS[primaryGod] || '/assets/ui/Icon-Olympian.webp';
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
              <div className={`absolute inset-0 ${BOON_BORDER_WIDTH} ${borderColor} ${BOON_ICON_ROUNDING} pointer-events-none z-10`} />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center p-1 ${BOON_BORDER_WIDTH} border-white/5 ${BOON_ICON_ROUNDING} opacity-40`}>
              <GodIcon god={boon.gods[0]} className="w-10 h-10" />
            </div>
          )}
        </div>
        
        <div className={`flex-1 min-w-0 h-14 flex flex-col justify-between py-0.5 ${isLocked ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-base font-bold normal-case tracking-wide truncate font-sc leading-tight ${getBoonColor(boon.type)}`}>
              {boon.name}
            </h4>
            <span className={`text-[9px] font-display uppercase leading-none font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${
              isLocked 
                ? 'bg-red-950/25 border-red-900/20 text-red-100/50' 
                : 'bg-hades-accent/10 border-hades-accent/20 text-hades-accent/80'
            }`}>
              {boon.type}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-2.5">
            {boon.gods.map((god, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <GodIcon god={god} className="w-3 h-3" />
                <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                  {god}
                </span>
              </div>
            ))}
          </div>

          {boon.element ? (
            <div className="flex items-center gap-1.5">
              <ElementIcon element={boon.element} className={`w-3 h-3 ${ELEMENT_COLORS[boon.element]}`} />
              <span className="text-[10px] font-display text-hades-text/70 uppercase tracking-wider leading-none">
                {boon.element}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 opacity-40">
              <span className="text-[10px] font-display text-gray-500 uppercase tracking-wider leading-none">
                No Element
              </span>
            </div>
          )}
        </div>
      </div>
      <p className={`text-[12px] text-gray-400 leading-normal font-medium mt-2 transition-opacity duration-150 ${isLocked ? 'opacity-50' : ''}`}>
        <FormattedEffectText text={boon.effect} />
      </p>

      {isLocked && prerequisitesStatus.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-red-950/45 text-xs font-sans text-gray-400">
          {boon.id === 'tall_order' ? (
            <div className="flex flex-col gap-1.5 p-1">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Infusion:</span>
              </div>
              <div className="text-gray-400 text-xs mb-1 font-medium leading-relaxed normal-case">
                Requires at least <span className="text-gray-200 font-bold">{boon.prerequisites?.[0]?.elementCount || 8} Essences</span> of any one of these elements:
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 select-none">
                {boon.prerequisites?.map((prereq) => {
                  const element = prereq.element;
                  if (!element) return null;
                  const count = elementCounts?.[element] || 0;
                  const totalRequired = prereq.elementCount || 8;
                  const met = count >= totalRequired;
                  return (
                    <div 
                      key={element} 
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all duration-150 ${
                        met 
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 shadow-sm' 
                          : 'bg-zinc-950/40 border-zinc-900/60 text-gray-500/90'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <ElementIcon element={element} className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className={`font-semibold tracking-wide text-[11px] truncate ${met ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {element}
                        </span>
                      </div>
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        met 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-zinc-900 text-gray-500'
                      }`}>
                        {count}/{totalRequired}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : boon.id === 'proper_upbringing' ? (
            <div className="flex flex-col gap-1.5 p-1">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Infusion:</span>
              </div>
              <div className="text-gray-400 text-xs mb-1 font-medium leading-relaxed normal-case">
                Requires at least <span className="text-gray-200 font-bold">{boon.prerequisites?.[0]?.elementCount || 2} Essences</span> of all of these elements:
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 select-none">
                {boon.prerequisites?.map((prereq) => {
                  const element = prereq.element;
                  if (!element) return null;
                  const count = elementCounts?.[element] || 0;
                  const totalRequired = prereq.elementCount || 2;
                  const met = count >= totalRequired;
                  return (
                    <div 
                      key={element} 
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all duration-150 ${
                        met 
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 shadow-sm' 
                          : 'bg-zinc-950/40 border-zinc-900/60 text-gray-500/90'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <ElementIcon element={element} className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className={`font-semibold tracking-wide text-[11px] truncate ${met ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {element}
                        </span>
                      </div>
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        met 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-zinc-900 text-gray-500'
                      }`}>
                        {count}/{totalRequired}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : boon.id === 'success_rate' ? (
            <div className="flex flex-col gap-2 p-1">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Requirements:</span>
              </div>
              <div className="text-gray-400 text-xs mb-1 font-medium leading-relaxed normal-case">
                Requires at least <span className="text-gray-200 font-bold">one</span> of the following boons:
              </div>
              <div className="flex flex-col gap-1.5 select-none">
                {SUCCESS_RATE_GROUPS.map((group, index) => {
                  const met = group.boonIds.some(id => selectedBoonIds?.has(id));
                  return (
                    <div 
                      key={index} 
                      className={`flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg border transition-all duration-150 ${
                        met 
                          ? 'bg-emerald-950/25 border-emerald-800/40 text-gray-300 shadow-sm' 
                          : 'bg-zinc-950/45 border-zinc-900/60 text-gray-500/95'
                      }`}
                    >
                      {met ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-[2px]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-red-500/50 flex-shrink-0 mt-[2px]" />
                      )}
                      
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        <div className="flex items-center gap-0.5 shrink-0 mt-[1px]">
                          {group.gods.map((god) => (
                            <span key={god} className="inline-block shrink-0">
                              <GodIcon god={god} className="w-4 h-4 object-contain" />
                            </span>
                          ))}
                        </div>
                        <span className={`text-[11px] font-semibold leading-[18px] ${met ? 'text-gray-300' : 'text-gray-400'}`}>
                          <HighlightedText text={group.label} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-1">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-red-500/60 flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-red-400/80 flex-shrink-0 mt-[1px]">Locked Requirements:</span>
              </div>
              <div className="text-gray-400 text-xs mb-1 font-medium leading-relaxed normal-case pl-5 -mt-1">
                {prerequisitesStatus.length > 1 ? (
                  <>Requires <span className="text-gray-200 font-bold">all</span> of the following condition groups:</>
                ) : (
                  <>Requires the following condition:</>
                )}
              </div>
              <div className="flex flex-col gap-1.5 select-none pl-5">
                {prerequisitesStatus.map((status, index) => {
                  const met = status.met;
                  const prereq = status.prereq;
                  const requiredBoons = prereq.boonIds
                    .map(id => BOONS.find(b => b.id === id))
                    .filter((b): b is Boon => !!b);
                  const gods = Array.from(new Set(requiredBoons.flatMap(b => b.gods)));

                  let cleanDesc = prereq.description;
                  if (cleanDesc.startsWith('Requires ')) {
                    cleanDesc = cleanDesc.slice(9);
                  } else if (cleanDesc.startsWith('requires ')) {
                    cleanDesc = cleanDesc.slice(9);
                  }
                  if (cleanDesc.length > 0) {
                    cleanDesc = cleanDesc.charAt(0).toUpperCase() + cleanDesc.slice(1);
                  }

                  const isGenericSlotBoon = /any (attack|special|cast|sprint|dash|gain)\b/i.test(cleanDesc);
                  const godPrefix = (gods.length > 0 && !isGenericSlotBoon) ? `${gods.join(' or ')}: ` : '';
                  const fullDesc = `${godPrefix}${cleanDesc}`;

                  return (
                    <div 
                      key={index} 
                      className={`flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg border transition-all duration-150 ${
                        met 
                          ? 'bg-emerald-950/25 border-emerald-800/40 text-gray-300 shadow-sm' 
                          : 'bg-zinc-950/45 border-zinc-900/60 text-gray-500/95'
                      }`}
                    >
                      {met ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-[2px]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-red-500/50 flex-shrink-0 mt-[2px]" />
                      )}
                      
                      <div className="flex items-start gap-2 min-w-0 flex-1">
                        {!isGenericSlotBoon && gods.length > 0 && (
                          <div className="flex items-center gap-0.5 shrink-0 mt-[1px]">
                            {gods.map((god) => (
                              <span key={god} className="inline-block shrink-0">
                                <GodIcon god={god} className="w-4 h-4 object-contain" />
                              </span>
                            ))}
                          </div>
                        )}
                        <span className={`text-[11px] font-semibold leading-[18px] ${met ? 'text-gray-300' : 'text-gray-400'}`}>
                          <HighlightedText text={fullDesc} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DraggableBoonListItem({ 
  boon, 
  onClick, 
  isSelectable,
  isLocked = false,
  prerequisitesStatus = [],
  isPinned = false,
  onPinToggle,
  elementCounts,
  selectedBoonIds
}: { 
  boon: Boon; 
  onClick?: () => void; 
  isSelectable?: boolean; 
  isLocked?: boolean;
  prerequisitesStatus?: { prereq: BoonPrerequisite; met: boolean }[];
  isPinned?: boolean;
  onPinToggle?: () => void;
  elementCounts?: Record<string, number>;
  selectedBoonIds?: Set<string>;
  key?: any 
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boon.id,
    disabled: isLocked,
  });
  
  return (
    <motion.div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={isLocked ? undefined : onClick}
      whileHover={isLocked ? { x: [0, -3, 3, -3, 3, 0], transition: { duration: 0.3, ease: 'easeInOut' } } : { x: 6 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      transition={{ 
         type: 'spring', 
         stiffness: 500,
         damping: 30
      }}
      className={`relative group transition-opacity duration-150 ${
        isDragging 
          ? 'opacity-20 pointer-events-none' 
          : isLocked
            ? 'cursor-not-allowed select-none'
            : isSelectable
              ? 'cursor-pointer'
              : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <StaticBoonListItem 
        boon={boon} 
        isLocked={isLocked} 
        prerequisitesStatus={prerequisitesStatus} 
        elementCounts={elementCounts}
        selectedBoonIds={selectedBoonIds}
      />
      
      {/* Pin button on top left (hover/pinned active) */}
      {onPinToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          className={`absolute -top-1 -left-1 z-40 w-5 h-5 flex items-center justify-center p-0 rounded-full border transition-all duration-150 shadow-md ${
            isPinned 
              ? 'opacity-100 text-hades-accent border-hades-accent/80 bg-hades-bg-light' 
              : 'opacity-0 md:group-hover:opacity-100 text-hades-text/40 border-white/10 bg-hades-bg-dark hover:text-hades-accent hover:border-hades-accent/40'
          }`}
          title={isPinned ? "Unpin Boon" : "Pin Boon to top"}
        >
          <Pin className={`w-3 h-3 rotate-45 scale-[0.8] ${isPinned ? 'fill-current' : ''}`} />
        </button>
      )}

      {/* Selection indicator only for selectable, unlocked items */}
      {isSelectable && !isLocked && (
        <div className="absolute inset-0 rounded-xl border-2 border-hades-accent/30 group-hover:border-hades-accent pointer-events-none transition-colors duration-75" />
      )}
    </motion.div>
  );
}
