import React from 'react';
import { ElementType, GOD_SYMBOLS } from '../types';

export function ElementIcon({ element, className }: { element: ElementType; className?: string }) {
  return (
    <img 
      src={`/assets/elements/Element_${element}.webp`}
      alt={element}
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

export function GodIcon({ god, className }: { god: string; className?: string }) {
  const symbol = GOD_SYMBOLS[god];
  if (!symbol) return null;
  return (
    <img 
      src={symbol}
      alt={god}
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}
