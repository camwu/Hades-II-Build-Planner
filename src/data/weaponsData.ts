import { WeaponAspect } from '../types';

export const WEAPON_ASPECTS: WeaponAspect[] = [
  {
    id: "witchs_staff_melinoe",
    weapon: "Witch's Staff",
    name: "Aspect of Melinoë",
    description: "Gain Max Magick and greater Power for your Specials.\n▸ Max Magick & Special Power: +0/+10/+20/+30/+40/+50",
    icon: "/assets/weapons/aspects/staff/Staff_Melinoe.webp"
  },
  {
    id: "witchs_staff_circe",
    weapon: "Witch's Staff",
    name: "Aspect of Circe",
    description: "Whenever you use Casts, so does your Animal Familiar, forming a Psychic Leash.\n▸ Psychic Leash Damage (every 0.2 Sec.): 10/15/20/25/30/45",
    mechanics: "Psychic Leash: A strong connection with your Animal Familiar, harmful to foes. Lasts 5 Sec.",
    icon: "/assets/weapons/aspects/staff/Staff_Circe.webp"
  },
  {
    id: "witchs_staff_momus",
    weapon: "Witch's Staff",
    name: "Aspect of Momus",
    description: "Whenever you use Ω Moves, each fires in place up to *3* times until you use it again.\n▸ Delay Between Omega Bursts: 4 Sec./3.5 Sec./3 Sec./2.5 Sec./2 Sec./1 Sec.",
    icon: "/assets/weapons/aspects/staff/Staff_Momus.webp"
  },
  {
    id: "witchs_staff_anubis",
    weapon: "Witch's Staff",
    name: "Aspect of Anubis",
    description: "You have the *Ankh Scepter*, which raises *Lone Shades* wherever you slay foes.\n▸ Omega Move Speed & Damage: +10%/+15%/+20%/+25%/+30%/+45%",
    mechanics: "Ankh Scepter (Alternate Moveset): Attacks create damaging fields, Specials draws foes in.\n\nLone Shades: Spirits lingering in some Encounters. Rally them against your foe using Sprint.",
    icon: "/assets/weapons/aspects/staff/Staff_Anubis.webp"
  },
  {
    id: "sister_blades_melinoe",
    weapon: "Sister Blades",
    name: "Aspect of Melinoë",
    description: "Your Attacks and Specials deal more damage by striking foes from behind.\n▸ Backstab Damage: +0%/+40%/+60%/+80%/+100%/+200%",
    icon: "/assets/weapons/aspects/dagger/Dagger_Melinoe.webp"
  },
  {
    id: "sister_blades_artemis",
    weapon: "Sister Blades",
    name: "Aspect of Artemis",
    description: "While you Channel your Ω Attack, you occasionally Parry, then Riposte right after.\n▸ Omega Attack Speed: +20%/+30%/+40%/+50%/+60%/+90%",
    mechanics: "Parry: Prevent damage from most types of direct attacks. Can be repeated after 10 Sec.\n\nRiposte: You are Impervious for 1 Sec. Your next 9 strikes have +50% Critical chance.",
    icon: "/assets/weapons/aspects/dagger/Dagger_Artemis.webp"
  },
  {
    id: "sister_blades_pan",
    weapon: "Sister Blades",
    name: "Aspect of Pan",
    description: "Your Specials seek foes in your Casts, and fire more shots if you Channel longer.\n▸ Omega Special Max Shots: +1/+2/+3/+4/+5/+8",
    icon: "/assets/weapons/aspects/dagger/Dagger_Pan.webp"
  },
  {
    id: "sister_blades_the_morrigan",
    weapon: "Sister Blades",
    name: "Aspect of the Morrigan",
    description: "You have the *Crow Cutters*, which can perform the ritual of *Blood Triad*.\n▸ Blood Triad Damage: 333/444/555/666/777/999",
    mechanics: "Crow Cutters (Alternate Moveset): Attacks hit 3 times, heavy Specials hit repeatedly in flight.\n\nBlood Triad: Land an Attack, Special, and Omega Move against a foe to inflict heavy damage.",
    icon: "/assets/weapons/aspects/dagger/Dagger_Morrigan.webp"
  },
  {
    id: "umbral_flames_melinoe",
    weapon: "Umbral Flames",
    name: "Aspect of Melinoë",
    description: "Your Attacks and Specials may deal Critical damage.\n▸ Critical Chance: +1%/+2%/+3%/+4%/+5%/+8%",
    icon: "/assets/weapons/aspects/torch/Torch_Melinoe.webp"
  },
  {
    id: "umbral_flames_moros",
    weapon: "Umbral Flames",
    name: "Aspect of Moros",
    description: "Your Attacks linger for *6 Sec.*, and explode in a blast if struck by your Specials.\n▸ Blast Damage: +0%/+15%/+30%/+45%/+60%/+105%",
    icon: "/assets/weapons/aspects/torch/Torch_Moros.webp"
  },
  {
    id: "umbral_flames_eos",
    weapon: "Umbral Flames",
    name: "Aspect of Eos",
    description: "Your Ω Attack fires a *Daybreaker* that deals damage in an area around it every *2 Sec.*\n▸ Daybreaker Blast Damage: 100/113/125/138/150/175",
    mechanics: "Daybreaker: A slow seeking shot that blasts nearby foes and copies your Specials. Limit 1 at a time.",
    icon: "/assets/weapons/aspects/torch/Torch_Eos.webp"
  },
  {
    id: "umbral_flames_supay",
    weapon: "Umbral Flames",
    name: "Aspect of Supay",
    description: "You have the *Devil Sparks*, which also enhance your *Rush Boon*.\n▸ Rush Boon Damage: +10%/+15%/+20%/+25%/+30%/+45%",
    mechanics: "Devil Sparks (Alternate Moveset): Fires automatically; Ω Attack and Ω Special rain hell for 4 Sec.",
    icon: "/assets/weapons/aspects/torch/Torch_Supay.webp"
  },
  {
    id: "moonstone_axe_melinoe",
    weapon: "Moonstone Axe",
    name: "Aspect of Melinoë",
    description: "Gain bonus Attack Power and Max Health.\n▸ Attack Power & Max Life: +0/+30/+35/+40/+50/+60",
    icon: "/assets/weapons/aspects/axe/Axe_Melinoe.webp"
  },
  {
    id: "moonstone_axe_charon",
    weapon: "Moonstone Axe",
    name: "Aspect of Charon",
    description: "Your Cast erupts like your Ω Cast if struck by your Ω Special.\n▸ Cleave-Cast Size & Damage: +10%/+15%/+20%/+25%/+30%/+45%",
    icon: "/assets/weapons/aspects/axe/Axe_Charon.webp"
  },
  {
    id: "moonstone_axe_thanatos",
    weapon: "Moonstone Axe",
    name: "Aspect of Thanatos",
    description: "Your Attack is faster, and each strike grants *Mortality* until you take damage.\n▸ Attack Speed: +20%/+25%/+30%/+35%/+40%/+55%",
    mechanics: "Mortality: A fleeting bonus of *+2% Critical* chance for your Ω Moves, up to a max of *+20%*.",
    icon: "/assets/weapons/aspects/axe/Axe_Thanatos.webp"
  },
  {
    id: "moonstone_axe_nergal",
    weapon: "Moonstone Axe",
    name: "Aspect of Nergal",
    description: "You have the *Rock Lion Mace*, and become *Berserk* after you strike enough foes.\n▸ Berserk After: 21 Strikes/18 Strikes/15 Strikes/12 Strikes/9 Strikes/4 Strikes",
    mechanics: "Rock Lion Mace (Alternate Moveset): Heavy Attacks and Omega Special deal damage in a wide area.\n\nBerserk: Your Attacks and Specials are *65%* faster and restore 1 Health per foe hit. Lasts *8 Sec.*",
    icon: "/assets/weapons/aspects/axe/Axe_Nergal.webp"
  },
  {
    id: "argent_skull_melinoe",
    weapon: "Argent Skull",
    name: "Aspect of Melinoë",
    description: "Your Attacks have more Power for each Shell fired and not yet retrieved.\n▸ Power per Spent Shell: +0/+3/+6/+9/+12/+21",
    mechanics: "Shell: Ammunition for your Attacks. Retrieve from the field to re-use.",
    icon: "/assets/weapons/aspects/skull/Skull_Melinoe.webp"
  },
  {
    id: "argent_skull_medea",
    weapon: "Argent Skull",
    name: "Aspect of Medea",
    description: "Your Attack stays within reach, and explodes after landing your Specials or *3 Sec.*\n▸ Attack & Special Damage: +30%/+45%/+60%/+75%/+90%/+135%",
    icon: "/assets/weapons/aspects/skull/Skull_Medea.webp"
  },
  {
    id: "argent_skull_persephone",
    weapon: "Argent Skull",
    name: "Aspect of Persephone",
    description: "Your Ω Special is *Sprouted*, and lets you change direction; Boons start with Lv.\n▸ Max Random Bonus Lv. for Boons: +2/+3/+4/+5/+6/+9",
    mechanics: "Sprouted: Damaging effects from Olympians make this last up to *+2 Sec.* when next you use it.",
    icon: "/assets/weapons/aspects/skull/Skull_Persephone.webp"
  },
  {
    id: "argent_skull_hel",
    weapon: "Argent Skull",
    name: "Aspect of Hel",
    description: "You have *Frost Mane*, which grants the way of the *Valkyrie* after your Ω Special.\n▸ Valkyrie Attack Speed: +5%/+10%/+15%/+20%/+25%/+35%",
    mechanics: "Frost Mane (Alternate Moveset): Attacks burst-fire without using Shells, Specials seek foes.\n\nValkyrie: Your Attack fires continuously, but you cannot use Ω Moves. Lasts *3 Sec.*",
    icon: "/assets/weapons/aspects/skull/Skull_Hel.webp"
  },
  {
    id: "black_coat_melinoe",
    weapon: "Black Coat",
    name: "Aspect of Melinoë",
    description: "Your Attacks, Sprint, and move speed are faster.\n▸ Bonus Speed: +0%/+5%/+10%/+15%/+20%/+35%",
    icon: "/assets/weapons/aspects/coat/Coat_Melinoe.webp"
  },
  {
    id: "black_coat_selene",
    weapon: "Black Coat",
    name: "Aspect of Selene",
    description: "You start with *Sky Fall*, a hidden Hex that strikes multiple foes and applies *Shine*.\n▸ Hex Ready After: 100 Magick/90 Magick/80 Magick/70 Magick/60 Magick/40 Magick",
    mechanics: "Shine (Curse): Afflicted foes take +50% damage from Ω Moves. Lasts *8 Sec.*",
    icon: "/assets/weapons/aspects/coat/Coat_Selene.webp"
  },
  {
    id: "black_coat_nyx",
    weapon: "Black Coat",
    name: "Aspect of Nyx",
    description: "You have Ω Boost, which lets you produce *Nightspawn* after you activate it.\n▸ Nightspawn Damage: 15%/30%/45%/60%/75%/100%",
    mechanics: "Nightspawn: Your Attack and Special also split in *2* that deal reduced damage. Lasts for *5 Sec.*",
    icon: "/assets/weapons/aspects/coat/Coat_Nyx.webp"
  },
  {
    id: "black_coat_shiva",
    weapon: "Black Coat",
    name: "Aspect of Shiva",
    description: "You have *Purifying Grace*, which absorbs Ω Special blasts to grow *Destructive*.\n▸ Max Destructive Ranks: 2/3/4/5/6/8",
    mechanics: "Purifying Grace (Alternate Moveset): Ω Attack hurtles foward, Specials fire fewer stronger shots.\n\nDestructive: Your Ω Attack deals *+75%* damage per Rank, then resets this effect.",
    icon: "/assets/weapons/aspects/coat/Coat_Shiva.webp"
  }
];

export const WEAPON_NAMES = [
  "Witch's Staff",
  "Sister Blades",
  "Umbral Flames",
  "Moonstone Axe",
  "Argent Skull",
  "Black Coat"
];

export const WEAPON_ICONS: Record<string, string> = {
  "Witch's Staff": "/assets/weapons/Staff.png",
  "Sister Blades": "/assets/weapons/Dagger.png",
  "Umbral Flames": "/assets/weapons/Torch.png",
  "Moonstone Axe": "/assets/weapons/Axe.png",
  "Argent Skull": "/assets/weapons/Skull.png",
  "Black Coat": "/assets/weapons/Coat.png"
};

