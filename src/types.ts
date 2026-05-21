/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BoonPrerequisite {
  boonIds: string[]; // Boon IDs of which at least one/all must be assigned
  any?: boolean;     // If true, any of the boonIds is sufficient. If false (default), all are required.
  description: string; // User-facing description of the prerequisite
}

export interface Boon {
  id: string;
  name: string;
  type: BoonType;
  gods: string[];
  element: ElementType | null;
  effect: string;
  icon?: string;
  prerequisites?: BoonPrerequisite[];
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

export interface StatusCurse {
  id: string;
  name: string;
  description: string;
  duration: string;
  gods: string[];
}

export interface ArcanaCard {
  id: string;
  number: string; // Roman numeral e.g. "XVIII"
  name: string;
  effect: string;
  cost: number;
  icon?: string;
}

export const ALL_ELEMENTS: ElementType[] = ['Earth', 'Water', 'Air', 'Fire', 'Aether'];

export const GOD_COLORS: Record<string, string> = {
  Zeus: 'text-yellow-400',
  Poseidon: 'text-blue-400',
  Demeter: 'text-cyan-300',
  Apollo: 'text-orange-300',
  Hestia: 'text-orange-600',
  Aphrodite: 'text-pink-300',
  Hera: 'text-purple-400',
  Hephaestus: 'text-amber-700',
  Ares: 'text-red-600',
  Artemis: 'text-emerald-400',
  Dionysus: 'text-purple-600',
  Hades: 'text-red-900',
  Raki: 'text-emerald-200',
  'Twilight Curse': 'text-indigo-600'
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
  Ares: '/assets/gods/Ares_symbol.webp',
  Artemis: '/assets/gods/Artemis_symbol.webp',
  Dionysus: '/assets/gods/Dionysus_symbol.webp',
  Hades: '/assets/gods/Hades_symbol.webp',
  Raki: '/assets/gods/Artemis_symbol.webp', // Reuse Artemis for Raki for now
  'Twilight Curse': '/assets/gods/Hera_symbol.webp' // Reuse Hera for Twilight Curse for now
};

export const ELEMENT_COLORS: Record<ElementType, string> = {
  Air: 'text-blue-200',
  Fire: 'text-red-400',
  Water: 'text-blue-400',
  Earth: 'text-emerald-400',
  Aether: 'text-indigo-400'
};
