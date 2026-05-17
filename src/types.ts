/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Boon {
  id: string;
  name: string;
  type: BoonType;
  gods: string[];
  element: ElementType | null;
  effect: string;
}

export type BoonType = 
  | 'Attack' 
  | 'Special' 
  | 'Cast' 
  | 'Sprint' 
  | 'Magick' 
  | 'Non-Core' 
  | 'Duo' 
  | 'Legendary' 
  | 'Infusion';

export type ElementType = 'Air' | 'Fire' | 'Water' | 'Earth' | 'Aether';

export const ALL_ELEMENTS: ElementType[] = ['Air', 'Water', 'Earth', 'Fire', 'Aether'];

export const GOD_COLORS: Record<string, string> = {
  Zeus: 'text-yellow-400',
  Poseidon: 'text-blue-400',
  Demeter: 'text-cyan-300',
  Apollo: 'text-orange-300',
  Hestia: 'text-orange-600',
  Aphrodite: 'text-pink-300',
  Hera: 'text-purple-400',
  Hephaestus: 'text-amber-700',
  Ares: 'text-red-600'
};

export const GOD_SYMBOLS: Record<string, string> = {
  Zeus: '/assets/gods/Zeus_symbol.webp',
  Poseidon: '/assets/gods/Poseidon_symbol.webp',
  Demeter: '/assets/gods/Demeter_symbol.webp',
  Apollo: '/assets/gods/Apollo_symbol.webp',
  Hestia: '/assets/gods/Hestia_symbol.webp',
  Aphrodite: '/assets/gods/Aphrodite_symbol.webp',
  Hera: '/assets/gods/Hera_symbol.webp',
  Hephaestus: '/assets/gods/Hephaestus_symbol.webp',
  Ares: '/assets/gods/Ares_symbol.webp'
};

export const ELEMENT_COLORS: Record<ElementType, string> = {
  Air: 'text-blue-200',
  Fire: 'text-red-400',
  Water: 'text-blue-400',
  Earth: 'text-emerald-400',
  Aether: 'text-indigo-400'
};
