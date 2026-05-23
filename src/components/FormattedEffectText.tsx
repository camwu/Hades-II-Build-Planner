import React from 'react';
import { BOON_KEYWORDS } from '../constants';

interface FormattedEffectTextProps {
  text: string;
  className?: string;
}

export function FormattedEffectText({ text, className }: FormattedEffectTextProps) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {lines.map((line, lineIndex) => {
        // Check if the current line has the bullet character '▸'
        const skipIcons = line.includes('▸');

        // Highlight number or percentage before "Health" (e.g., 80% Health -> *80%* Health)
        let preprocessedLine = line;
        if (!skipIcons) {
          preprocessedLine = preprocessedLine.replace(
            /(^|[\s(])([+-]?\d+(?:\.\d+)?%?)\s+(Max\s+)?Health\b/gi,
            (match, prefix, p1, p2) => `${prefix}*${p1}* ${p2 || ''}Health`
          );

          // Highlight number or percentage before "Magick" (e.g., 40 Magick -> *40* Magick)
          preprocessedLine = preprocessedLine.replace(
            /(^|[\s(])([+-]?\d+(?:\.\d+)?%?)\s+(Max\s+)?Magick\b/gi,
            (match, prefix, p1, p2) => `${prefix}*${p1}* ${p2 || ''}Magick`
          );
        }

        // Pattern to replace Magick, Max Health, and Health with their icons + text
        const renderTextWithIcons = (inputText: string, isKeywordStyle: boolean = false, optionalKey?: string | number) => {
          if (!inputText) return null;

          if (skipIcons) {
            return (
              <span key={optionalKey} className={isKeywordStyle ? 'text-hades-text font-bold' : ''}>
                {inputText}
              </span>
            );
          }
          
          // Ordered to match "Max Health" and "Max Magick" before "Health" and "Magick", and element boons before elements or plasma
          const regex = /(\bMax\s+Healths?\b|\bHealths?\b|\bMax\s+Magicks?\b|\bmagicks?\b|\bplasmas?\b|\bmystery\s+seeds?\b|\bDaedalus\s+Hammers?\b|\bGold\s+Crowns?\b|\bGold\b|\bHealing\b|\bBones\b|\barmors?\b|\brarity?\b|\bDeath\s+Defiances?\b|\bChange\s+of\s+Fates?\b|\bGrasps?\b|\bairs?\s+(?:boons?|essences?|elements?)\b|\bearths?\s+(?:boons?|essences?|elements?)\b|\bfires?\s+(?:boons?|essences?|elements?)\b|\bwaters?\s+(?:boons?|essences?|elements?)\b|\baethers?\s+(?:boons?|essences?|elements?)\b|\bairs?\b|\bearths?\b|\bfires?\b|\bwaters?\b|\baethers?\b(?!\s+Fonts?\b)|\blv\.(?!\w))/gi;
          const parts = inputText.split(regex);
          
          return (
            <React.Fragment key={optionalKey}>
              {parts.map((p, index) => {
                const lower = p.toLowerCase();
                if (lower === 'max health' || lower === 'max healths') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/LifeUp.webp" 
                        alt="Max Health" 
                        className="inline-block h-[20px] w-auto object-contain align-middle relative -top-[2px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'max magick' || lower === 'max magicks') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/ManaUp.webp" 
                        alt="Max Magick" 
                        className="inline-block h-[20px] w-auto object-contain align-middle relative -top-[2px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'health' || lower === 'healths') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Life.webp" 
                        alt="Health" 
                        className="inline-block h-[20px] w-auto object-contain align-middle relative -top-[2px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'magick' || lower === 'magicks') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Magick.webp" 
                        alt="Magick" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'plasma' || lower === 'plasmas') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/BloodDrop.webp" 
                        alt="Plasma" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'mystery seed' || lower === 'mystery seeds') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Mystery_Seeds.webp" 
                        alt="Mystery Seed" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'daedalus hammer' || lower === 'daedalus hammers') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Daedalus_Hammer.webp" 
                        alt="Daedalus Hammer" 
                        className="inline-block h-[15px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'gold crown' || lower === 'gold crowns') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/MoneyDrop_Text.webp" 
                        alt="Gold Crown" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'gold') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Coins_II.webp" 
                        alt="Gold" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'healing') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/LifeRestore.webp" 
                        alt="Healing" 
                        className="inline-block h-[18px] w-auto object-contain align-middle relative -top-[2px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'bones') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Bones.webp" 
                        alt="Bones" 
                        className="inline-block h-[15px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'armor' || lower === 'armors') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Armor.webp" 
                        alt="Armor" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'death defiance' || lower === 'death defiances') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/DeathDefiance.webp" 
                        alt="Death Defiance" 
                        className="inline-block h-[14px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'change of fate' || lower === 'change of fates') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Dice.webp" 
                        alt="Change of Fate" 
                        className="inline-block h-[14px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'grasp' || lower === 'grasps') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/Grasp.webp" 
                        alt="Grasp" 
                        className="inline-block h-[14px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower === 'lv.') {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/ui/UpArrow.webp" 
                        alt="Lv." 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower.startsWith('air')) {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/elements/Element_Air.webp" 
                        alt="Air" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower.startsWith('earth')) {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/elements/Element_Earth.webp" 
                        alt="Earth" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower.startsWith('fire')) {
                  // We require any Fire-related keyword/element to start with capital 'F' to represent the element
                  if (!p.startsWith('F')) {
                    return p;
                  }
                  // If it's used as a verb (e.g., "fire 2 times", "fires 2 times", "fire twice", "fire gales")
                  const isVerb = (lower === 'fire' || lower === 'fires') && parts[index + 1] && (
                    /^\s+(2\s+times|twice|gales)\b/i.test(parts[index + 1])
                  );
                  if (isVerb) {
                    return p;
                  }
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/elements/Element_Fire.webp" 
                        alt="Fire" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower.startsWith('water')) {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/elements/Element_Water.webp" 
                        alt="Water" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                } else if (lower.startsWith('aether') && !lower.includes('font')) {
                  return (
                    <span key={index} className={`inline whitespace-nowrap ${isKeywordStyle ? 'text-hades-text font-bold' : ''}`}>
                      <img 
                        src="/assets/elements/Element_Aether.webp" 
                        alt="Aether" 
                        className="inline-block h-[13px] w-auto object-contain align-middle relative -top-[1.5px] mr-1" 
                        referrerPolicy="no-referrer"
                      />
                      {p}
                    </span>
                  );
                }
                return p;
              })}
            </React.Fragment>
          );
        };

        // Patterns for text highlighting
        const timePattern = `\\(\\s*(?:every|over|after|Every|Over|After)\\s+[^)]+\\)`;
        const rangePattern = `[+-]?[\\d.%]+(?:\\s*[A-Za-z.]+)?(?:\\s*/\\s*[+-]?[\\d.%]+(?:\\s*[A-Za-z.]+)?)+`;
        const sortedKeywords = [...BOON_KEYWORDS].sort((a, b) => b.length - a.length);
        const omegaKeywords = sortedKeywords.filter(k => k.includes('Ω'));
        const standardKeywords = sortedKeywords.filter(k => !k.includes('Ω'));
        const standardKeywordPatterns = standardKeywords.map(k => {
          const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const startBoundary = /^\w/.test(k) ? '\\b' : '';
          const endBoundary = /\w$/.test(k) ? '\\b' : '';
          const pluralSuffix = /[A-Za-z]$/.test(k) ? '(?:s|es|\\(s\\))?' : '';
          return `${startBoundary}${escaped}${pluralSuffix}${endBoundary}`;
        });
        const keywordPattern = `(?:${standardKeywordPatterns.join('|')})|Ω\\s*Moves?|Ω\\s*Move|Ω`;
        const boldPattern = `\\*[^*]+\\*`;
        const italicPattern = `_[^_]+_`;
        
        // Combine patterns into a single capturing group for split
        const regex = new RegExp(`(${timePattern}|${rangePattern}|${keywordPattern}|${boldPattern}|${italicPattern})`, 'g');
        
        const parts = preprocessedLine.split(regex);
        
        const rarityColors = [
          '#d1d1e0', // Common
          '#008aff', // Rare
          '#9d12ff', // Epic
          '#f86059', // Heroic
        ];

        const getRarityColor = (p: string): string | undefined => {
          const trimmed = p.trim().toLowerCase();
          if (trimmed === 'common' || trimmed === 'commons') return rarityColors[0];
          if (trimmed === 'rare' || trimmed === 'rares') return rarityColors[1];
          if (trimmed === 'epic' || trimmed === 'epics') return rarityColors[2];
          if (trimmed === 'heroic' || trimmed === 'heroics') return rarityColors[3];
          if (trimmed === 'infusion' || trimmed === 'infusions') return '#ED4AF1';
          if (trimmed === 'duo' || trimmed === 'duos') return '#C5F24D';
          if (trimmed === 'legendary' || trimmed === 'legendaries') return '#FD8D00';
          return undefined;
        };
       
        const renderRange = (part: string, key: string | number) => {
          const rangeParts = part.split(/(\/)/);
          const kwRegex = new RegExp(`(${keywordPattern})`, 'gi');
          return (
            <strong key={key} className="font-bold">
              {rangeParts.map((subPart, j) => {
                if (subPart === '/') return <span key={j}>{subPart}</span>;
                
                const rarityIndex = Math.floor(j / 2);
                const color = rarityColors[rarityIndex];
                
                const subParts = subPart.split(kwRegex);
                
                return (
                  <React.Fragment key={j}>
                    {subParts.map((sp, k) => {
                      if (!sp) return null;
                      const isKw = !skipIcons && (
                        sp === 'Ω' || 
                        /^[Ωω]\s*Moves?$/i.test(sp) ||
                        BOON_KEYWORDS.some(kw => {
                          const sTrimmed = sp.trim();
                          if (kw === 'Rare' && sTrimmed === 'rare') {
                            return false;
                          }
                          if (kw === 'Fire' && !/^[F]/.test(sTrimmed)) {
                            return false;
                          }
                          const sLower = sp.toLowerCase().trim();
                          const kLower = kw.toLowerCase().trim();
                          return sLower === kLower || 
                            sLower === (kLower + 's') || 
                            sLower === (kLower + 'es') ||
                            sLower === (kLower + '(s)') ||
                            sLower.replace(/\s+/g, '') === kLower.replace(/\s+/g, '');
                        })
                      );
                      if (isKw) {
                        const rarityColor = getRarityColor(sp);
                        if (rarityColor) {
                          return (
                            <span key={k} className="font-bold" style={{ color: rarityColor }}>
                              {renderTextWithIcons(sp, true, `kw-${k}`)}
                            </span>
                          );
                        }
                        return (
                          <span key={k} className="text-hades-text font-bold">
                            {renderTextWithIcons(sp, true, `kw-${k}`)}
                          </span>
                        );
                      }
                      
                      return (
                        <span key={k} style={color ? { color } : undefined}>
                          {renderTextWithIcons(sp, false, `nkw-${k}`)}
                        </span>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </strong>
          );
        };

        const formattedLineElements = parts.map((part, i) => {
          if (!part) return null;

          const isTime = part.startsWith('(') && (
            part.toLowerCase().includes('every') ||
            part.toLowerCase().includes('over') ||
            part.toLowerCase().includes('after')
          );
          const isFireVerb = !skipIcons && (part.toLowerCase() === 'fire' || part.toLowerCase() === 'fires') && parts[i + 1] && (
            /^\s+(2\s+times|twice|gales)\b/i.test(parts[i + 1])
          );
          const isKeyword = !skipIcons && !isFireVerb && (
            part === 'Ω' || 
            /^[Ωω]\s*Moves?$/i.test(part) ||
            BOON_KEYWORDS.some(k => {
              const pTrimmed = part.trim();
              if (k === 'Rare' && pTrimmed === 'rare') {
                return false;
              }
              if (k === 'Fire' && !/^[F]/.test(pTrimmed)) {
                return false;
              }
              const pLower = part.toLowerCase().trim();
              const kLower = k.toLowerCase().trim();
              return pLower === kLower || 
                pLower === (kLower + 's') || 
                pLower === (kLower + 'es') ||
                pLower === (kLower + '(s)') ||
                pLower.replace(/\s+/g, '') === kLower.replace(/\s+/g, '');
            })
          );
          const isRange = part.includes('/') && /\d/.test(part);
          const isBold = part.startsWith('*') && part.endsWith('*');
          const isItalic = part.startsWith('_') && part.endsWith('_');
          
          if (isBold) {
            const innerText = part.slice(1, -1);
            const isInnerRange = innerText.includes('/') && /\d/.test(innerText);
            if (isInnerRange) {
              return renderRange(innerText, i);
            }
            const rarityColor = getRarityColor(innerText);
            if (rarityColor) {
              return (
                <strong key={i} className="font-bold" style={{ color: rarityColor }}>
                  {renderTextWithIcons(innerText, true, `bold-${i}`)}
                </strong>
              );
            }
            return (
              <strong key={i} className="font-bold text-hades-text">
                {renderTextWithIcons(innerText, true, `bold-${i}`)}
              </strong>
            );
          }

          if (isItalic) {
            const innerText = part.slice(1, -1);
            const isInnerRange = innerText.includes('/') && /\d/.test(innerText);
            if (isInnerRange) {
              return renderRange(innerText, i);
            }
            const rarityColor = getRarityColor(innerText);
            if (rarityColor) {
              return (
                <em key={i} className="italic font-bold" style={{ color: rarityColor }}>
                  {renderTextWithIcons(innerText, true, `italic-${i}`)}
                </em>
              );
            }
            return (
              <em key={i} className="italic text-gray-300">
                {renderTextWithIcons(innerText, false, `italic-${i}`)}
              </em>
            );
          }

          if (isKeyword) {
            const rarityColor = getRarityColor(part);
            if (rarityColor) {
              return (
                <strong key={i} className="font-bold" style={{ color: rarityColor }}>
                  {renderTextWithIcons(part, true, `key-${i}`)}
                </strong>
              );
            }
            return (
              <strong key={i} className="font-bold text-hades-text">
                {renderTextWithIcons(part, true, `key-${i}`)}
              </strong>
            );
          }

          if (isTime) {
            // Italicize the whole thing, but check for ranges inside
            const rangeRegex = new RegExp(rangePattern, 'g');
            const innerParts = part.split(rangeRegex);
            const innerMatches = part.match(rangeRegex);

            return (
              <i key={i} className="italic text-gray-400/80">
                {innerParts.map((sub, idx) => (
                  <React.Fragment key={idx}>
                    {renderTextWithIcons(sub, false, `time-${idx}`)}
                    {innerMatches && innerMatches[idx] && renderRange(innerMatches[idx], `inner-range-${idx}`)}
                  </React.Fragment>
                ))}
              </i>
            );
          }

          if (isRange) {
            return renderRange(part, i);
          }
          
          return renderTextWithIcons(part, false, i);
        });

        return (
          <React.Fragment key={lineIndex}>
            {lineIndex > 0 && '\n'}
            {formattedLineElements}
          </React.Fragment>
        );
      })}
    </span>
  );
}
