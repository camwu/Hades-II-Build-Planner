import { ArcanaCard } from '../types';

export const ARCANA_CARDS: ArcanaCard[] = [
  {
    id: 'sorceress',
    number: 'I',
    name: 'The Sorceress',
    effect: 'Your *Ω Moves* are *20/25/30/35%* faster.',
    cost: 1,
    icon: '/assets/arcana/card01.png'
  },
  {
    id: 'wayward_son',
    number: 'II',
    name: 'The Wayward Son',
    effect: 'After you exit a *Location*, restore *3/4/5/6* Health.',
    cost: 1,
    icon: '/assets/arcana/card02.png'
  },
  {
    id: 'huntress',
    number: 'III',
    name: 'The Huntress',
    effect: 'While you have less than *100%* Magick, your *Attack* and *Special* deal *+30%/+40%/+50%/+60%* damage.',
    cost: 2,
    icon: '/assets/arcana/card03.png'
  },
  {
    id: 'eternity',
    number: 'IV',
    name: 'Eternity',
    effect: 'While you *Channel* your *Ω Moves*, everything moves slower for *0.8/1.0/1.2/1.5* *Sec.*',
    cost: 3,
    icon: '/assets/arcana/card04.png'
  },
  {
    id: 'moon',
    number: 'V',
    name: 'The Moon',
    effect: 'Your *Hex* also charges up automatically as though you used *1/2/3/4* Magick every *1 Sec.*',
    cost: 0,
    icon: '/assets/arcana/card05.png',
    awakening: 'Activate *any* surrounding card.'
  },
  {
    id: 'furies',
    number: 'VI',
    name: 'The Furies',
    effect: 'You deal *+20%/+25%/+30%/+35%* damage to foes in your *Casts*.',
    cost: 2,
    icon: '/assets/arcana/card06.png'
  },
  {
    id: 'persistence',
    number: 'VII',
    name: 'Persistence',
    effect: 'You have *+20/+30/+40/+50* Max Health and *+20/+30/+40/+50* Max Magick.',
    cost: 2,
    icon: '/assets/arcana/card07.png'
  },
  {
    id: 'messenger',
    number: 'VIII',
    name: 'The Messenger',
    effect: 'Your Casts momentarily make you *Impervious* and move *50%/60%/70%/80%* faster.',
    cost: 1,
    icon: '/assets/arcana/card08.png'
  },
  {
    id: 'unseen',
    number: 'IX',
    name: 'The Unseen',
    effect: 'You restore *6/8/10/12* Magick every *1 Sec.*',
    cost: 5,
    icon: '/assets/arcana/card09.png'
  },
  {
    id: 'night',
    number: 'X',
    name: 'Night',
    effect: 'You have *+9%/+12%/+15%/+18%* chance to deal *Critical* damage with each move in an *Ω Combo*.',
    cost: 2,
    icon: '/assets/arcana/card10.png'
  },
  {
    id: 'swift_runner',
    number: 'XI',
    name: 'The Swift Runner',
    effect: 'Your *Sprint* is *5%/7%/10%/13%* faster and lets you pass right through most dangers in your way.',
    cost: 1,
    icon: '/assets/arcana/card11.png'
  },
  {
    id: 'death',
    number: 'XII',
    name: 'Death',
    effect: 'You have *+1/+2/+3/+4* *Death Defiance*.',
    cost: 4,
    icon: '/assets/arcana/card12.png'
  },
  {
    id: 'centaur',
    number: 'XIII',
    name: 'The Centaur',
    effect: 'You gain *+3/+4/+5/+6* Max Health and *+3/+4/+5/+6* Max Magick whenever you pass through 5 *Locations*.',
    cost: 0,
    icon: '/assets/arcana/card13.png',
    awakening: 'Activate Cards that use *1* through *5* *Grasp*.'
  },
  {
    id: 'origination',
    number: 'XIV',
    name: 'Origination',
    effect: 'You deal *+25%/+38%/+50%/+63%* damage to foes afflicted with at least *2 Curses* from different Olympians.',
    cost: 5,
    icon: '/assets/arcana/card14.png'
  },
  {
    id: 'lovers',
    number: 'XV',
    name: 'The Lovers',
    effect: 'You take *0* damage the first *1/2/3/4* time(s) you are hit in *Guardian Encounter*.',
    cost: 3,
    icon: '/assets/arcana/card15.png'
  },
  {
    id: 'enchantress',
    number: 'XVI',
    name: 'The Enchantress',
    effect: 'You have *+1/+2/+3/+4* Change of Fate, and can alter *Location Rewards*.',
    cost: 3,
    icon: '/assets/arcana/card16.png'
  },
  {
    id: 'boatman',
    number: 'XVII',
    name: 'The Boatman',
    effect: 'You have *+200/+250/+300/+350* Gold.',
    cost: 5,
    icon: '/assets/arcana/card17.png'
  },
  {
    id: 'artificer',
    number: 'XVIII',
    name: 'The Artificer',
    effect: 'You have *1/2/3/4* chance(s) this night to turn any *Minor Find* into a random *Major Find*.',
    cost: 3,
    icon: '/assets/arcana/card18.png'
  },
  {
    id: 'excellence',
    number: 'XIX',
    name: 'Excellence',
    effect: 'Any *Boons* you find have *+30%/+40%/+50%/+60%* chance to include *Legendary* or at least *Rare* blessings.',
    cost: 5,
    icon: '/assets/arcana/card19.png'
  },
  {
    id: 'queen',
    number: 'XX',
    name: 'The Queen',
    effect: 'Any *Boons* you find have *+6%/+8%/+10%/+12%* chance to include *Duo* blessings.',
    cost: 0,
    icon: '/assets/arcana/card20.png',
    awakening: 'Activate no more than *2* Cards that use the same amount of *Grasp*.'
  },
  {
    id: 'fates',
    number: 'XXI',
    name: 'The Fates',
    effect: 'You have *+2/+3/+4/+5* Change of Fate.',
    cost: 0,
    icon: '/assets/arcana/card21.png',
    awakening: 'Activate *all* surrounding Cards.'
  },
  {
    id: 'champions',
    number: 'XXII',
    name: 'The Champions',
    effect: 'You have *+1/+2/+3/+4* Change of Fate, and can alter *Boons* and certain other choices.',
    cost: 4,
    icon: '/assets/arcana/card22.png'
  },
  {
    id: 'strength',
    number: 'XXIII',
    name: 'Strength',
    effect: 'While you have no *Death Defiance*, you take *-30%/-35%/-40%/-45%* damage and deal *+20%*.',
    cost: 4,
    icon: '/assets/arcana/card23.png'
  },
  {
    id: 'divinity',
    number: 'XXIV',
    name: 'Divinity',
    effect: 'Any *Boons* you find have *+10%/+15%/+20%/+25%* chance to include *Epic* blessings.',
    cost: 0,
    icon: '/assets/arcana/card24.png',
    awakening: 'Activate all *5* Cards in any other row or column.'
  },
  {
    id: 'judgment',
    number: 'XXV',
    name: 'Judgement',
    effect: 'You activate *3/4/5/6* random inactive *Arcana Cards* whenever you vanquish a *Guardian*.',
    cost: 0,
    icon: '/assets/arcana/card25.png',
    awakening: 'Activate no more than *3* cards total.'
  }
];
