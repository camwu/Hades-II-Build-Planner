import { StatusCurse } from '../types';

export const STATUS_CURSES: StatusCurse[] = [
  {
    id: 'weak',
    name: 'Weak',
    description: 'Afflicted foes deal at least *30%* less damage.',
    duration: '1 Sec.',
    gods: ['Aphrodite']
  },
  {
    id: 'daze',
    name: 'Daze',
    description: 'Afflicted foes have *20%* chance to deal no damage.',
    duration: '9 Sec.',
    gods: ['Apollo']
  },
  {
    id: 'wounds',
    name: 'Wounds',
    description: 'Your strike has *+50 Power* when inflicting this. Can be re-applied after *3 Sec.*',
    duration: 'Instant',
    gods: ['Ares']
  },
  {
    id: 'marked',
    name: 'Marked',
    description: 'Afflicted foes have *+30%* chance to take *Critical* damage.',
    duration: '6 Sec.',
    gods: ['Artemis', 'Raki']
  },
  {
    id: 'freeze',
    name: 'Freeze',
    description: 'Afflicted foes are stopped for *2 Sec.* Can be reapplied after *10 Sec.*',
    duration: '2 Sec.',
    gods: ['Demeter']
  },
  {
    id: 'gust',
    name: 'Gust',
    description: 'Afflicted foes are *20%* slower and their ranged shots *60%* slower.',
    duration: '3 Sec.',
    gods: ['Demeter']
  },
  {
    id: 'hangover',
    name: 'Hangover',
    description: 'Afflicted foes take damage continuously.',
    duration: '4 Sec.',
    gods: ['Dionysus']
  },
  {
    id: 'glow',
    name: 'Glow',
    description: 'Afflicted foes take *+15%* damage for *5 Sec.*',
    duration: '5 Sec.',
    gods: ['Hephaestus']
  },
  {
    id: 'hitch',
    name: 'Hitch',
    description: 'Afflicted foes take *30%* of damage dealt to other afflicted foes.',
    duration: '8 Sec.',
    gods: ['Hera']
  },
  {
    id: 'scorch',
    name: 'Scorch',
    description: 'Afflicted foes take *100* damage accrued from this every *1 Sec.*',
    duration: '1 Sec./100 Scorch',
    gods: ['Hestia']
  },
  {
    id: 'froth',
    name: 'Froth',
    description: 'When hit, afflicted foes have a *25%* chance to take *50* damage.',
    duration: '3 Sec.',
    gods: ['Poseidon']
  },
  {
    id: 'morph',
    name: 'Morph',
    description: 'Afflicted foes turn into harmless critters.',
    duration: '4 Sec.',
    gods: ['Twilight Curse']
  },
  {
    id: 'blitz',
    name: 'Blitz',
    description: 'After taking *120* damage, afflicted foes get struck by lightning.',
    duration: '4 Sec.',
    gods: ['Zeus']
  },
  {
    id: 'scorn',
    name: 'Scorn',
    description: 'Afflicted foes take *+30%**Attack* and *Special* damage.',
    duration: '10 Sec.',
    gods: ['Hades']
  }
];
