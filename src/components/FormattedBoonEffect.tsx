import React from 'react';
import { BOON_KEYWORDS } from '../constants';

interface FormattedBoonEffectProps {
  text: string;
  className?: string;
}

export function FormattedBoonEffect({ text, className }: FormattedBoonEffectProps) {
  if (!text) return null;

  // Patterns for text highlighting
  const timePattern = `\\(\\s*every\\s+[^)]+\\)`;
  const rangePattern = `[+-]?[\\d.%]+(?:\\s*[A-Za-z.]+)?(?:\\s*/\\s*[+-]?[\\d.%]+(?:\\s*[A-Za-z.]+)?)+`;
  const keywordPattern = `\\b(?:${BOON_KEYWORDS.join('|')})(?:s|es|\\(s\\))?\\b|Ω`;
  const boldPattern = `\\*[^*]+\\*`;
  
  // Combine patterns into a single capturing group for split
  const regex = new RegExp(`(${timePattern}|${rangePattern}|${keywordPattern}|${boldPattern})`, 'g');
  
  const parts = text.split(regex);
  
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
                const isKw = sp === 'Ω' || BOON_KEYWORDS.some(kw => 
                  sp.toLowerCase() === kw.toLowerCase() || 
                  sp.toLowerCase() === (kw + 's').toLowerCase() || 
                  sp.toLowerCase() === (kw + 'es').toLowerCase() ||
                  sp.toLowerCase() === (kw + '(s)').toLowerCase()
                );
                
                if (isKw) {
                  return (
                    <span key={k} className="text-hades-text font-bold">
                      {sp}
                    </span>
                  );
                }
                
                return (
                  <span key={k} style={color ? { color } : undefined}>
                    {sp}
                  </span>
                );
              })}
            </React.Fragment>
          );
        })}
      </strong>
    );
  };
  
  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {parts.map((part, i) => {
        if (!part) return null;

        const isTime = part.startsWith('(') && part.toLowerCase().includes('every');
        const isKeyword = part === 'Ω' || BOON_KEYWORDS.some(k => 
          part.toLowerCase() === k.toLowerCase() || 
          part.toLowerCase() === (k + 's').toLowerCase() || 
          part.toLowerCase() === (k + 'es').toLowerCase() ||
          part.toLowerCase() === (k + '(s)').toLowerCase()
        );
        const isRange = part.includes('/') && /\d/.test(part);
        const isBold = part.startsWith('*') && part.endsWith('*');
        
        if (isBold) {
          return (
            <strong key={i} className="font-bold text-hades-text">
              {part.slice(1, -1)}
            </strong>
          );
        }

        if (isKeyword) {
          return (
            <strong key={i} className="font-bold text-hades-text">
              {part}
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
                  {sub}
                  {innerMatches && innerMatches[idx] && renderRange(innerMatches[idx], `inner-${idx}`)}
                </React.Fragment>
              ))}
            </i>
          );
        }

        if (isRange) {
          return renderRange(part, i);
        }
        
        return part;
      })}
    </span>
  );
}
