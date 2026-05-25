import { Boon, BoonType } from '../types';
import { BOONS } from '../data/boonsData';

export const INCOMPATIBLE_BOON_IDS = [
  "glowing_coal", // Glowing Coal
  "lightning_lance", // Lightning Lance
  "hostile_environment"  // Hostile Environment
];

export const getIncompatibleBoonInSelection = (
  boonId: string,
  selectedBoonIds: Set<string> | string[]
): Boon | null => {
  if (!INCOMPATIBLE_BOON_IDS.includes(boonId)) return null;
  const idsSet = selectedBoonIds instanceof Set ? selectedBoonIds : new Set(selectedBoonIds);
  const activeIncompatibleId = INCOMPATIBLE_BOON_IDS.find(id => id !== boonId && idsSet.has(id));
  if (!activeIncompatibleId) return null;
  return BOONS.find(b => b.id === activeIncompatibleId) || null;
};

export const isValidForSlot = (boon: Boon, slot: string) => {
  if (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(slot)) {
    return boon.type === slot;
  }
  if (slot === 'Passive') {
    return ['Passive', 'Legendary', 'Duo', 'Infusion'].includes(boon.type);
  }
  return false;
};

export const getBoonColor = (type: BoonType | string) => {
  switch (type) {
    case 'Infusion': return 'text-hades-infusion';
    case 'Duo': return 'text-hades-duo';
    case 'Legendary': return 'text-hades-legendary';
    default: return 'text-gray-200';
  }
};

export const getBoonBorderColor = (type: BoonType | string) => {
  switch (type) {
    case 'Infusion': return 'border-hades-infusion/70';
    case 'Duo': return 'border-hades-duo/70';
    case 'Legendary': return 'border-hades-legendary/70';
    default: return 'border-white/20';
  }
};
