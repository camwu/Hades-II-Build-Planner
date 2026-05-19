import { Boon, BoonType } from '../types';

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
    default: return 'border-[#26262f]';
  }
};
