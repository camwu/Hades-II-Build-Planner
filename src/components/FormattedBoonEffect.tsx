import React from 'react';
import { BOON_KEYWORDS } from '../constants';

interface FormattedBoonEffectProps {
  text: string;
  className?: string;
}

export function FormattedBoonEffect({ text, className }: FormattedBoonEffectProps) {
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
          const regex = /\b(Max\s+Healths?|Healths?|Max\s+Magicks?|magicks?|plasmas?|airs?\s+boons?|earths?\s+boons?|fires?\s+boons?|waters?\s+boons?|aethers?\s+boons?|airs?|earths?|fires?|waters?|aethers?)\b/gi;
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
                } else if (lower.startsWith('aether')) {
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
        const keywordPattern = `(?:\\b(?:${standardKeywords.join('|')})(?:s|es|\\(s\\))?\\b)|Ω\\s*Moves?|Ω\\s*Move|Ω`;
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
            return (
              <strong key={i} className="font-bold text-hades-text">
                {renderTextWithIcons(part.slice(1, -1), true, `bold-${i}`)}
              </strong>
            );
          }

          if (isItalic) {
            return (
              <em key={i} className="italic text-gray-300">
                {renderTextWithIcons(part.slice(1, -1), false, `italic-${i}`)}
              </em>
            );
          }

          if (isKeyword) {
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
