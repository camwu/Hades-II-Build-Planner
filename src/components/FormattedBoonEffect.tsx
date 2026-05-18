import React from 'react';

const KEYWORDS = [
  // Slots
  'Attack', 'Special', 'Cast', 'Sprint', 'Magick', 'Dash',
  // Gods
  'Zeus', 'Poseidon', 'Demeter', 'Apollo', 'Hestia', 'Aphrodite', 'Hera', 'Hephaestus', 'Ares', 'Selene', 'Chaos', 'Hermes', 'Hades',
  // Status Curses
  'Weak', 'Daze', 'Wounds', 'Marked', 'Freeze', 'Gust', 'Hangover', 'Glow', 'Hitch', 'Scorch', 'Froth', 'Morph', 'Blitz', 'Scorn'
];

interface FormattedBoonEffectProps {
  text: string;
  className?: string;
}

export function FormattedBoonEffect({ text, className }: FormattedBoonEffectProps) {
  if (!text) return null;

  // Simplified regex: one capturing group for the keyword. 
  // Non-capturing inner group (?:) prevents duplication in split result.
  const regex = new RegExp(`(\\b(?:${KEYWORDS.join('|')})\\b)`, 'g');
  
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Only treat as keyword if it exactly matches one in our list
        const isKeyword = KEYWORDS.includes(part);
        
        if (isKeyword) {
          return (
            <strong key={i} className="font-bold text-hades-text">
              {part}
            </strong>
          );
        }
        
        return part;
      })}
    </span>
  );
}
