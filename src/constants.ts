import { BoonType } from './types';

export const SLOT_PRIORITY: Record<string, number> = {
  'Attack': 1,
  'Special': 2,
  'Cast': 3,
  'Sprint': 4,
  'Magick': 5,
  'Passive': 6,
  'Infusion': 7,
  'Legendary': 8,
  'Duo': 9,
};

export const BOON_ICON_ROUNDING = 'rounded-[28%]';
export const BOON_BORDER_WIDTH = 'border-[3px]';

export const SIDEBAR_WIDTH = 400;
export const SLOT_COLLAPSED_WIDTH = '84px';
export const SLOT_EXPANDED_WIDTH = '440px';

export const EXCLUDED_GODS = ['Artemis', 'Athena', 'Dionysus', 'Hermes', 'Hades'];

export const OLYMPIAN_GODS = [
  'Zeus', 'Poseidon', 'Demeter', 'Apollo', 'Hestia', 
  'Aphrodite', 'Hera', 'Hephaestus', 'Ares', 'Hermes', 
  'Artemis', 'Athena', 'Dionysus'
];

export const STORAGE_KEYS = {
  BUILD_STATE: 'hades_build_planner_state',
  PINNED_BOONS: 'hades_build_planner_pinned_boons',
};

export const SLOT_ABBR: Record<string, string> = {
  Attack: 'at',
  Special: 'sp',
  Cast: 'ca',
  Sprint: 'sr',
  Magick: 'ma',
};

export const SLOT_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(SLOT_ABBR).map(([key, val]) => [val, key])
);

export const BOON_KEYWORDS = [
  // Slots
  'Attack', 'Special', 'Cast', 'Sprint', 'Magick', 'Dash', 'Dash-Strike', 
  'Hex', 'Keepsake', 'Weapon', 'Aspect', 'Nocturnal Arms', 'Animal Familiar',
  // Gods
  'Zeus', 'Poseidon', 'Demeter', 'Apollo', 'Hestia', 'Aphrodite', 'Hera', 'Hephaestus', 'Ares', 'Selene', 'Chaos', 'Hermes', 'Hades',
  // God keywords
  'Plasma', 'Heartthrob', 'Blade Rift', 'Charm', 'Fine Line', 'Ocean Swell', 'Steam', 'Aether Font',
  // Status Curses
  'Weak', 'Daze', 'Wounds', 'Marked', 'Freeze', 'Gust', 'Hangover', 'Glow', 'Hitch', 'Scorch', 'Froth', 'Morph', 'Blitz', 'Scorn',
  // Mechanics
  'Boon', 'Lv.', 'Rarity', 'Common', 'Rare', 'Epic', 'Heroic', 'Infusion', 'Legendary', 'Duo',
  'Prime', 'Power', 'Dodge', 'Rush', 'Rushing', 'Curse', 'Channel', 'Critical', 'Impervious', 
  'Health', 'Max Health', 'Healing', 'Max Magick', 'Armor',
  'Minor Find', 'Minor Finds', 'Major Find', 'Major Finds', 'Gold Crown', 'Gold Crowns', 'Gold', 'Bones', 'Mystery Seed', 'Daedalus Hammer', 'Daedalus Hammers',
  'Omega Moves', 'Ω Moves', 'Omega Move', 'Ω Move', 'Omega',
  'Location', 'Encounter', 'Guardians', 'Guardian', 'Guardian Encounter', 'Guardian Encounters', 'Location Reward', 'Location Rewards',
  'Grasp', 'Death Defiance', 'Change of Fate', 'Arcana Card', 'Arcana Cards',
  'Psychic Leash', 'Lone Shades', 'Parry', 'Riposte', 'Blood Triad', 'Daybreaker ', 'Mortality', 'Berserk', 'Shell', 'Shells', 'Valkyrie', 'Sky Fall', 'Shine', 'Nightspawn', 'Destructive', 
  // Elements
  'Element', 'Elements', 'Essence', 'Essences',
  'Air', 'Earth', 'Fire', 'Water', 'Aether',
  'Air Boon', 'Earth Boon', 'Fire Boon', 'Water Boon', 'Aether Boon', 
  'Air Essence', 'Earth Essence', 'Fire Essence', 'Water Essence', 'Aether Essence'
];

export const CORE_SLOTS: { type: BoonType; name: string; icon: string }[] = [
  { type: 'Attack', name: 'Attack', icon: '/assets/slots/SlotIcon_Attack.webp' },
  { type: 'Special', name: 'Special', icon: '/assets/slots/SlotIcon_Special.webp' },
  { type: 'Cast', name: 'Cast', icon: '/assets/slots/SlotIcon_Cast.webp' },
  { type: 'Sprint', name: 'Sprint', icon: '/assets/slots/SlotIcon_Dash.webp' },
  { type: 'Magick', name: 'Magick', icon: '/assets/slots/SlotIcon_Magick.webp' },
];
