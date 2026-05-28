/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimalFamiliar } from '../types';

export const ANIMAL_FAMILIARS: AnimalFamiliar[] = [
  {
    id: 'frinos',
    name: 'Frinos',
    type: 'toad',
    icon: '/assets/familiars/Frinos_Bond.webp',
    skills: [
      {
        id: 'frinos_life',
        name: 'Life Bond',
        type: 'buff',
        icon: '/assets/familiars/Frinos_Life_Bond.webp',
        description: 'While together, gain +20/+30/40/+80 Max Health.'
      },
      {
        id: 'frinos_soul',
        name: 'Soul Bond',
        type: 'resource',
        icon: '/assets/familiars/Frinos_Soul_Bond.webp',
        description: 'While together, you are +30%/+40%/+50% more likely to find Lost Shades.'
      },
      {
        id: 'frinos_drive',
        name: 'Drive Bond',
        type: 'attack',
        icon: '/assets/familiars/Frinos_Drive_Bond.webp',
        description: 'Frinos deals 10/20/30 damage when leaping onto foes.'
      }
    ]
  },
  {
    id: 'toula',
    name: 'Toula',
    type: 'cat',
    icon: '/assets/familiars/Toula_Bond.webp',
    skills: [
      {
        id: 'toula_heart',
        name: 'Heart Bond',
        type: 'buff',
        icon: '/assets/familiars/Toula_Heart_Bond.webp',
        description: 'Gain 1/2 Death Defiance effects from Toula, they restore +40/+60/+80 Health.'
      },
      {
        id: 'toula_sense',
        name: 'Sense Bond',
        type: 'resource',
        icon: '/assets/familiars/Toula_Sense_Bond.webp',
        description: 'While together, you are +30%/+40%/50% more likely to find Fishing Points.'
      },
      {
        id: 'toula_claw',
        name: 'Claw Bond',
        type: 'attack',
        icon: '/assets/familiars/Toula_Claw_Bond.webp',
        description: 'Toula claws at surrounding foes 6/8/10 time(s) prior to losing interest.'
      }
    ]
  },
  {
    id: 'raki',
    name: 'Raki',
    type: 'raven',
    icon: '/assets/familiars/Raki_Bond.webp',
    skills: [
      {
        id: 'raki_vision',
        name: 'Vision Bond',
        type: 'buff',
        icon: '/assets/familiars/Raki_Vision_Bond.webp',
        description: 'While together, gain an additional +2%/+3%/+4%/+8% chance for any damage you deal to be Critical.'
      },
      {
        id: 'raki_stone',
        name: 'Stone Bond',
        type: 'resource',
        icon: '/assets/familiars/Raki_Stone_Bond.webp',
        description: 'While together, you are +30%/+40%/+50% more likely to find Outcroppings.'
      },
      {
        id: 'raki_wing',
        name: 'Wing Bond',
        type: 'attack',
        icon: '/assets/familiars/Raki_Wing_Bond.webp',
        description: 'Raki swoops down to peck at foes every 7-8 Sec./5-6 Sec./3-4 Sec.'
      }
    ]
  },
  {
    id: 'hecuba',
    name: 'Hecuba',
    type: 'hound',
    icon: '/assets/familiars/Hecuba_Bond.webp',
    skills: [
      {
        id: 'hecuba_spirit',
        name: 'Spirit Bond',
        type: 'buff',
        icon: '/assets/familiars/Hecuba_Spirit_Bond.webp',
        description: 'While together, you have +30/+45/+60/+120 Max Magick.'
      },
      {
        id: 'hecuba_earth',
        name: 'Earth Bond',
        type: 'resource',
        icon: '/assets/familiars/Hecuba_Earth_Bond.webp',
        description: 'While together, you are +30%/+40%/+50% more likely to find Digging Spots.'
      },
      {
        id: 'hecuba_guard',
        name: 'Guard Bond',
        type: 'attack',
        icon: '/assets/familiars/Hecuba_Guard_Bond.webp',
        description: 'Hecuba stuns surrounding foes every 7-8 Sec./6-7 Sec./5-6 Sec.'
      }
    ]
  },
  {
    id: 'gale',
    name: 'Gale',
    type: 'polecat',
    icon: '/assets/familiars/Gale_Bond.webp',
    skills: [
      {
        id: 'gale_veil',
        name: 'Veil Bond',
        type: 'buff',
        icon: '/assets/familiars/Gale_Veil_Bond.webp',
        description: 'While together, you have +4%/+5%/+6%/+12% Dodge chance and move speed.'
      },
      {
        id: 'gale_nature',
        name: 'Nature Bond',
        type: 'resource',
        icon: '/assets/familiars/Gale_Nature_Bond.webp',
        description: 'While together, you are +30%/+40%/+50% more likely to find Flora.'
      },
      {
        id: 'gale_wild',
        name: 'Wild Bond',
        type: 'attack',
        icon: '/assets/familiars/Gale_Wild_Bond.webp',
        description: 'Gale deals 300/350/400 damage when scratching foes in retaliation.'
      }
    ]
  }
];
