import { BoonType } from './types';

export const SLOT_PRIORITY: Record<string, number> = {
  'Attack': 1,
  'Special': 2,
  'Cast': 3,
  'Sprint': 4,
  'Magick': 5,
  'Non-Core': 6,
  'Infusion': 7,
  'Legendary': 8,
  'Duo': 9,
};

export const CORE_SLOTS: { type: BoonType; name: string; icon: string }[] = [
  { type: 'Attack', name: 'Attack', icon: '/assets/slots/SlotIcon_Attack.webp' },
  { type: 'Special', name: 'Special', icon: '/assets/slots/SlotIcon_Special.webp' },
  { type: 'Cast', name: 'Cast', icon: '/assets/slots/SlotIcon_Cast.webp' },
  { type: 'Sprint', name: 'Sprint', icon: '/assets/slots/SlotIcon_Dash.webp' },
  { type: 'Magick', name: 'Magick', icon: '/assets/slots/SlotIcon_Magick.webp' },
];
