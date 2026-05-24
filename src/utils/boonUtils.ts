import { Boon, BoonType } from '../types';
import { BOONS } from '../data/boonsData';

export const INCOMPATIBLE_BOON_IDS = [
  "e022fec1-5de0-5dba-b7f9-d89f502ef7bd", // Glowing Coal
  "2bd56797-3ab2-5ed8-95d5-6cdd5a3a4f28", // Lightning Lance
  "d332032a-0b34-55c5-bc7b-cf2b98d03614"  // Hostile Environment
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
  if (slot === 'NonCore') {
    return ['Non-Core', 'Legendary', 'Duo', 'Infusion'].includes(boon.type);
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
