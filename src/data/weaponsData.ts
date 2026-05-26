import { WeaponAspect, WeaponHammer } from '../types';

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

export const STAFF_HAMMERS: WeaponHammer[] = [
  {
    id: "wicked_thrasher",
    weapon: "Witch's Staff",
    name: "Wicked Thrasher",
    description: "Your *Attacks* have *+30* *Power*.",
    icon: "/assets/weapons/hammers/staff/Wicked_Thrasher.webp",
    incompatibleAspects: ["witchs_staff_anubis"]
  },
  {
    id: "extending_wallop",
    weapon: "Witch's Staff",
    name: "Extending Wallop",
    description: "Your *Attack* has more range and deals *+100%* damage to distant foes.",
    icon: "/assets/weapons/hammers/staff/Extending_Wallop.webp",
    incompatibleAspects: ["witchs_staff_anubis"]
  },
  {
    id: "melting_swipe",
    weapon: "Witch's Staff",
    name: "Melting Swipe",
    description: "Your *Dash-Strike* hits a larger area and destroys *+900* damage to *Armor*.",
    icon: "/assets/weapons/hammers/staff/Melting_Swipe.webp",
    incompatibleAspects: ["witchs_staff_anubis"]
  },
  {
    id: "dual_moonshot",
    weapon: "Witch's Staff",
    name: "Dual Moonshot",
    description: "Your *Specials* fire *2* projectiles, but have *-40%* range.",
    icon: "/assets/weapons/hammers/staff/Dual_Moonshot.webp"
  },
  {
    id: "shimmering_moonshot",
    weapon: "Witch's Staff",
    name: "Shimmering Moonshot",
    description: "Your *Specials* bounces toward up to *+2* foes, dealing *+10%* damage for each hit.",
    icon: "/assets/weapons/hammers/staff/Shimmering_Moonshot.webp"
  },
  {
    id: "cross_cataclysm",
    weapon: "Witch's Staff",
    name: "Cross Cataclysm",
    description: "Your *Ω Attack* deals *+50%* damage and also strikes sideways.",
    icon: "/assets/weapons/hammers/staff/Cross_Cataclysm.webp",
    incompatibleAspects: ["witchs_staff_anubis"],
    incompatibleHammers: ["rapid_thrasher"]
  },
  {
    id: "rapid_thrasher",
    weapon: "Witch's Staff",
    name: "Rapid Thrasher",
    description: "Your *Attacks* are *50%* faster.",
    icon: "/assets/weapons/hammers/staff/Rapid_Thrasher.webp",
    incompatibleHammers: ["mirrored_thrasher", "cross_cataclysm", "vampiric_cataclysm"]
  },
  {
    id: "rapid_moonshot",
    weapon: "Witch's Staff",
    name: "Rapid Moonshot",
    description: "Your *Specials* are *25%* faster.",
    icon: "/assets/weapons/hammers/staff/Rapid_Moonshot.webp"
  },
  {
    id: "vampiric_cataclysm",
    weapon: "Witch's Staff",
    name: "Vampiric Cataclysm",
    description: "Whenever you slay a foe with your *Ω Attack*, restore *5 Health*.",
    icon: "/assets/weapons/hammers/staff/Vampiric_Cataclysm.webp",
    incompatibleHammers: ["rapid_thrasher"]
  },
  {
    id: "giga_moonburst",
    weapon: "Witch's Staff",
    name: "Giga Moonburst",
    description: "You can *Channel* *+30 Magick* in your *Special* to deal *+300%* damage in a larger area.",
    icon: "/assets/weapons/hammers/staff/Giga_Moonburst.webp"
  },
  {
    id: "aetheric_moonburst",
    weapon: "Witch's Staff",
    name: "Aetheric Moonburst",
    description: "Your *Ω Special* gains a *Power Shot* that deals *+50%* damage and restores *20 Magick*.",
    icon: "/assets/weapons/hammers/staff/Aetheric_Moonburst.webp"
  },
  {
    id: "mirrored_thrasher",
    weapon: "Witch's Staff",
    name: "Mirrored Thrasher",
    description: "Your *Attacks* hit *2* times, but use *5 Magick*.",
    icon: "/assets/weapons/hammers/staff/Mirrored_Thrasher.webp",
    incompatibleAspects: ["witchs_staff_anubis"],
    incompatibleHammers: ["rapid_thrasher"]
  },
  {
    id: "soulfilled_ankh",
    weapon: "Witch's Staff",
    name: "Soulfilled Ankh",
    description: "Your *Attacks* have *+5* *Power* and hit a larger area.",
    icon: "/assets/weapons/hammers/staff/Soulfilled_Ankh.webp",
    onlyForAspect: "witchs_staff_anubis"
  },
  {
    id: "mirrored_ankh",
    weapon: "Witch's Staff",
    name: "Mirrored Ankh",
    description: "Your *Ω Attack* creates *+1* damage field ahead of the first.",
    icon: "/assets/weapons/hammers/staff/Mirrored_Ankh.webp",
    onlyForAspect: "witchs_staff_anubis"
  },
  {
    id: "scarab_etchings",
    weapon: "Witch's Staff",
    name: "Scarab Etchings",
    description: "*Lone Shades* deal *+50* damage and have *75%* chance to reappear after striking a foe.",
    icon: "/assets/weapons/hammers/staff/Scarab_Etchings.webp",
    onlyForAspect: "witchs_staff_anubis"
  },
  {
    id: "pharaoh_etchings",
    weapon: "Witch's Staff",
    name: "Pharaoh Etchings",
    description: "*Lone Shades* deal *+50%*  damage and launch at foes struck by *Ω Special*.",
    icon: "/assets/weapons/hammers/staff/Pharaoh_Etchings.webp",
    onlyForAspect: "witchs_staff_anubis"
  }
];

export const DAGGER_HAMMERS: WeaponHammer[] = [
  {
    id: "sweeping_ambush",
    weapon: "Sister Blades",
    name: "Sweeping Ambush",
    description: "Your *Ω Attack* deals *+400%* damage in a wider area, but uses *+20 Magick*.",
    icon: "/assets/weapons/hammers/dagger/Sweeping_Ambush.webp",
    incompatibleHammers: ["rapid_onslaught"]
  },
  {
    id: "dancing_knives",
    weapon: "Sister Blades",
    name: "Dancing Knives",
    description: "Your *Specials* deal *+15%* damage and each hit bounces toward up to *2* more foes.",
    icon: "/assets/weapons/hammers/dagger/Dancing_Knives.webp"
  },
  {
    id: "sureshot_flurry",
    weapon: "Sister Blades",
    name: "Sureshot Flurry",
    description: "Your *Ω Special* fires each shot straight ahead and your *Specials* have *+30%* range.",
    icon: "/assets/weapons/hammers/dagger/Sureshot_Flurry.webp"
  },
  {
    id: "rapid_onslaught",
    weapon: "Sister Blades",
    name: "Rapid Onslaught",
    description: "Your *Attacks* are *35%* faster.",
    icon: "/assets/weapons/hammers/dagger/Rapid_Onslaught.webp",
    incompatibleHammers: ["sweeping_ambush", "final_slice"]
  },
  {
    id: "melting_sickle",
    weapon: "Sister Blades",
    name: "Melting Sickle",
    description: "Each hit from your *Special* deals *+500* damage to *Armor*.",
    icon: "/assets/weapons/hammers/dagger/Melting_Sickle.webp"
  },
  {
    id: "skulking_onslaught",
    weapon: "Sister Blades",
    name: "Skulking Onslaught",
    description: "Your *Attacks* deal *+150%* damage striking foes from behind.",
    icon: "/assets/weapons/hammers/dagger/Skulking_Onslaught.webp"
  },
  {
    id: "reaper_knives",
    weapon: "Sister Blades",
    name: "Reaper Knives",
    description: "Your *Specials* have *+15* *Power* and deal damage in a wider area.",
    icon: "/assets/weapons/hammers/dagger/Reaper_Knives.webp"
  },
  {
    id: "hidden_knives",
    weapon: "Sister Blades",
    name: "Hidden Knives",
    description: "Your *Specials* deal *+20%* damage and your *Ω Special* fires *+3* shots.",
    icon: "/assets/weapons/hammers/dagger/Hidden_Knives.webp"
  },
  {
    id: "final_slice",
    weapon: "Sister Blades",
    name: "Final Slice",
    description: "The last strike in your *Attack* sequence deals *+300%* damage in a larger area.",
    icon: "/assets/weapons/hammers/dagger/Final_Slice.webp",
    incompatibleHammers: ["rapid_onslaught"]
  },
  {
    id: "wicked_onslaught",
    weapon: "Sister Blades",
    name: "Wicked Onslaught",
    description: "Your *Attacks* have *+20* *Power*.",
    icon: "/assets/weapons/hammers/dagger/Wicked_Onslaught.webp"
  },
  {
    id: "sudden_flurry",
    weapon: "Sister Blades",
    name: "Sudden Flurry",
    description: "You *Channel* your *Ω Special* *40%* faster.",
    icon: "/assets/weapons/hammers/dagger/Sudden_Flurry.webp"
  },
  {
    id: "trick_knives",
    weapon: "Sister Blades",
    name: "Trick Knives",
    description: "Your *Dash-Strike* also fires your *Special* *3* times at once in a fan pattern.",
    icon: "/assets/weapons/hammers/dagger/Trick_Knives.webp",
    incompatibleAspects: ["sister_blades_the_morrigan"]
  },
  {
    id: "phantom_etchings",
    weapon: "Sister Blades",
    name: "Phantom Etchings",
    description: "Your *Blood Triad* deals *+222* damage.",
    icon: "/assets/weapons/hammers/dagger/Phantom_Etchings.webp",
    onlyForAspect: "sister_blades_the_morrigan"
  },
  {
    id: "banshee_brand",
    weapon: "Sister Blades",
    name: "Banshee Brand",
    description: "Your *Blood Triad* has *33%* chance to strike once more.",
    icon: "/assets/weapons/hammers/dagger/Banshee_Brand.webp",
    onlyForAspect: "sister_blades_the_morrigan"
  },
  {
    id: "sinister_pinion",
    weapon: "Sister Blades",
    name: "Sinister Pinion",
    description: "Your *Specials* repeatedly deal damage *100%* faster.",
    icon: "/assets/weapons/hammers/dagger/Sinister_Pinion.webp",
    onlyForAspect: "sister_blades_the_morrigan"
  }
];

export const TORCH_HAMMERS: WeaponHammer[] = [
  {
    id: "hidden_helix",
    weapon: "Umbral Flames",
    name: "Hidden Helix",
    description: "Your *Specials* create *+1* projectile.",
    icon: "/assets/weapons/hammers/torch/Hidden_Helix.webp",
    incompatibleAspects: ["umbral_flames_eos"]
  },
  {
    id: "clean_coil",
    weapon: "Umbral Flames",
    name: "Clean Coil",
    description: "You *Channel* your *Ω Special* *20%* faster, and it uses *-10 Magick*.",
    icon: "/assets/weapons/hammers/torch/Clean_Coil.webp"
  },
  {
    id: "furious_blaze",
    weapon: "Umbral Flames",
    name: "Furious Blaze",
    description: "While you *Channel* your *Attacks*, you move and fire *20%* faster.",
    icon: "/assets/weapons/hammers/torch/Furious_Blaze.webp"
  },
  {
    id: "melting_helix",
    weapon: "Umbral Flames",
    name: "Melting Helix",
    description: "Your *Specials* deal *+100* damage to *Armor*.",
    icon: "/assets/weapons/hammers/torch/Melting_Helix.webp"
  },
  {
    id: "enduring_coil",
    weapon: "Umbral Flames",
    name: "Enduring Coil",
    description: "Your *Ω Special* lasts *+2 Sec.*",
    icon: "/assets/weapons/hammers/torch/Enduring_Coil.webp"
  },
  {
    id: "mega_blaze",
    weapon: "Umbral Flames",
    name: "Mega Blaze",
    description: "Your *Attacks* fire *20%* farther and deal *+30%* damage.",
    icon: "/assets/weapons/hammers/torch/Mega_Blaze.webp"
  },
  {
    id: "dividing_blaze",
    weapon: "Umbral Flames",
    name: "Dividing Blaze",
    description: "Your *Attacks* split in *2* the first time they strike foes.",
    icon: "/assets/weapons/hammers/torch/Dividing_Blaze.webp",
    incompatibleAspects: ["umbral_flames_moros", "umbral_flames_eos"]
  },
  {
    id: "inverted_blaze",
    weapon: "Umbral Flames",
    name: "Inverted Blaze",
    description: "Your *Attacks* linger for *+2 Sec.* and launch back towards you after you *Dash*.",
    icon: "/assets/weapons/hammers/torch/Inverted_Blaze.webp"
  },
  {
    id: "sudden_burst",
    weapon: "Umbral Flames",
    name: "Sudden Burst",
    description: "You *Channel* your *Ω Attack* *50%* faster, and it uses *-1 Magick*.",
    icon: "/assets/weapons/hammers/torch/Sudden_Burst.webp",
    incompatibleAspects: ["umbral_flames_supay"]
  },
  {
    id: "rising_helix",
    weapon: "Umbral Flames",
    name: "Rising Helix",
    description: "Your *Specials* grow in size and deal up to *+25%* damage the longer they are active.",
    icon: "/assets/weapons/hammers/torch/Rising_Helix.webp",
    incompatibleAspects: ["umbral_flames_supay"]
  },
  {
    id: "whirling_helix",
    weapon: "Umbral Flames",
    name: "Whirling Helix",
    description: "Projectiles from your *Specials* orbit *20%* faster.",
    icon: "/assets/weapons/hammers/torch/Whirling_Helix.webp"
  },
  {
    id: "leaden_blaze",
    weapon: "Umbral Flames",
    name: "Leaden Blaze",
    description: "Your *Attacks* knock foes away and have *+10* *Power*.",
    icon: "/assets/weapons/hammers/torch/Leaden_Blaze.webp"
  },
  {
    id: "demonic_cell",
    weapon: "Umbral Flames",
    name: "Demonic Cell",
    description: "As long as you *Sprint*, your *Attacks* and *Specials* have *+5 Power*.",
    icon: "/assets/weapons/hammers/torch/Demonic_Cell.webp",
    onlyForAspect: "umbral_flames_supay"
  }
];

export const AXE_HAMMERS: WeaponHammer[] = [
  {
    id: "furious_whirlwind",
    weapon: "Moonstone Axe",
    name: "Furious Whirlwind",
    description: "You *Channel* your *Ω Attack* faster, and move *50%* faster while it is active.",
    icon: "/assets/weapons/hammers/axe/Furious_Whirlwind.webp"
  },
  {
    id: "sudden_cleaver",
    weapon: "Moonstone Axe",
    name: "Sudden Cleaver",
    description: "You *Channel* your *Ω Special* *25%* faster.",
    icon: "/assets/weapons/hammers/axe/Sudden_Cleaver.webp"
  },
  {
    id: "rapid_slash",
    weapon: "Moonstone Axe",
    name: "Rapid Slash",
    description: "Your *Attack* is *30%* faster.",
    icon: "/assets/weapons/hammers/axe/Rapid_Slash.webp"
  },
  {
    id: "executioners_chop",
    weapon: "Moonstone Axe",
    name: "Executioner's Chop",
    description: "The final move in your *Attack* sequence hits *2* times, but uses *20 Magick*.",
    icon: "/assets/weapons/hammers/axe/Executioner's_Chop.webp",
    incompatibleAspects: ["moonstone_axe_nergal"]
  },
  {
    id: "hell_splitter",
    weapon: "Moonstone Axe",
    name: "Hell Splitter",
    description: "Your *Attack* has *+300* *Power*, but the *3*-strike sequence becomes only the final chop.",
    icon: "/assets/weapons/hammers/axe/Hell_Splitter.webp",
    incompatibleAspects: ["moonstone_axe_nergal"]
  },
  {
    id: "seething_marauder",
    weapon: "Moonstone Axe",
    name: "Seething Marauder",
    description: "Your *Attacks* also deals *60* damage to surrounding foes, for each and every strike.",
    icon: "/assets/weapons/hammers/axe/Seething_Marauder.webp"
  },
  {
    id: "psychic_whirlwind",
    weapon: "Moonstone Axe",
    name: "Psychic Whirlwind",
    description: "During your *Ω Attack*, you are free to use your *Attacks* and *Specials*.",
    icon: "/assets/weapons/hammers/axe/Psychic_Whirlwind.webp"
  },
  {
    id: "melting_shredder",
    weapon: "Moonstone Axe",
    name: "Melting Shredder",
    description: "Each hit from your *Special* deals *+300* damage to *Armor*.",
    icon: "/assets/weapons/hammers/axe/Melting_Shredder.webp"
  },
  {
    id: "siege_shredder",
    weapon: "Moonstone Axe",
    name: "Siege Shredder",
    description: "Your *Special* strikes farther ahead and deals *+150%* damage.",
    icon: "/assets/weapons/hammers/axe/Siege_Shredder.webp"
  },
  {
    id: "giga_cleaver",
    weapon: "Moonstone Axe",
    name: "Giga Cleaver",
    description: "Your *Ω Special* fires *2* times in succession, but costs *+15 Magick*.",
    icon: "/assets/weapons/hammers/axe/Giga_Cleaver.webp"
  },
  {
    id: "dashing_heave",
    weapon: "Moonstone Axe",
    name: "Dashing Heave",
    description: "Your *Dash-Strike* hits *2* times in an area around you.",
    icon: "/assets/weapons/hammers/axe/Dashing_Heave.webp"
  },
  {
    id: "colossus_slash",
    weapon: "Moonstone Axe",
    name: "Colossus Slash",
    description: "Your *Attacks* have *+10* *Power* and you take *-20%* damage while using them.",
    icon: "/assets/weapons/hammers/axe/Colossus_Slash.webp"
  },
  {
    id: "iron_core",
    weapon: "Moonstone Axe",
    name: "Iron Core",
    description: "Your *Berserk* lasts *+2 Sec.* and restores *+1 Health* per foe struck.",
    icon: "/assets/weapons/hammers/axe/Iron_Core.webp",
    onlyForAspect: "moonstone_axe_nergal"
  },
  {
    id: "heaven_splitter",
    weapon: "Moonstone Axe",
    name: "Heaven Splitter",
    description: "Your *Attacks* hits *2* times, but the *5*-strike sequence becomes only the first slam.",
    icon: "/assets/weapons/hammers/axe/Heaven_Splitter.webp",
    onlyForAspect: "moonstone_axe_nergal"
  }
];

export const SKULL_HAMMERS: WeaponHammer[] = [
  {
    id: "bolstered_array",
    weapon: "Argent Skull",
    name: "Bolstered Array",
    description: "Gain *+2* *Shells*.",
    icon: "/assets/weapons/hammers/skull/Bolstered_Array.webp",
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "fetching_array",
    weapon: "Argent Skull",
    name: "Fetching Array",
    description: "Your *Shells* fly back to you automatically and *100%* faster.",
    icon: "/assets/weapons/hammers/skull/Fetching_Array.webp",
    incompatibleHammers: ["volatile_array"],
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "melting_tackle",
    weapon: "Argent Skull",
    name: "Melting Tackle",
    description: "Your *Special* deals *+600* damage to *Armor*.",
    icon: "/assets/weapons/hammers/skull/Melting_Tackle.webp"
  },
  {
    id: "wide_grin",
    weapon: "Argent Skull",
    name: "Wide Grin",
    description: "Your *Attacks* fire your *Shells* all at once in a spread pattern.",
    icon: "/assets/weapons/hammers/skull/Wide_Grin.webp",
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "rapid_driver",
    weapon: "Argent Skull",
    name: "Rapid Driver",
    description: "Your *Specials* are *35%* faster.",
    icon: "/assets/weapons/hammers/skull/Rapid_Driver.webp"
  },
  {
    id: "colossus_driver",
    weapon: "Argent Skull",
    name: "Colossus Driver",
    description: "Your *Specials* have *+30* *Power* and you take *-30%* damage while using them.",
    icon: "/assets/weapons/hammers/skull/Colossus_Driver.webp"
  },
  {
    id: "mega_driver",
    weapon: "Argent Skull",
    name: "Mega Driver",
    description: "Your *Specials* launch you ahead faster and deal *+50%* damage.",
    icon: "/assets/weapons/hammers/skull/Mega_Driver.webp"
  },
  {
    id: "twisting_crash",
    weapon: "Argent Skull",
    name: "Twisting Crash",
    description: "After your *Ω Special* projectiles fire outward, they fire inward.",
    icon: "/assets/weapons/hammers/skull/Twisting_Crash.webp"
  },
  {
    id: "boosted_ignition",
    weapon: "Argent Skull",
    name: "Boosted Ignition",
    description: "After your *Dash* or *Specials*, your *Attacks* are faster and have *+15* *Power*.",
    icon: "/assets/weapons/hammers/skull/Boosted_Ignition.webp",
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "volatile_array",
    weapon: "Argent Skull",
    name: "Volatile Array",
    description: "Whenever your *Shells* land, they deal *50%* of your *Attack* damage around them.",
    icon: "/assets/weapons/hammers/skull/Volatile_Array.webp",
    incompatibleHammers: ["fetching_array"],
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "possessed_array",
    weapon: "Argent Skull",
    name: "Possessed Array",
    description: "Your *Shells* fire your *Ω Attack* whenever retrieved, but make you lose *25 Magick*.",
    icon: "/assets/weapons/hammers/skull/Possessed_Array.webp",
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "looming_ignition",
    weapon: "Argent Skull",
    name: "Looming Ignition",
    description: "Your *Attacks* gain *+50%* damage and blast size over *0.7 Sec.* before they explode.",
    icon: "/assets/weapons/hammers/skull/Looming_Ignition.webp",
    incompatibleAspects: ["argent_skull_hel"]
  },
  {
    id: "venerated_relic",
    weapon: "Argent Skull",
    name: "Venerated Relic",
    description: "Your *Valkyrie* form lasts *+3 Sec.*",
    icon: "/assets/weapons/hammers/skull/Venerated_Relic.webp",
    onlyForAspect: "argent_skull_hel"
  },
  {
    id: "leering_glance",
    weapon: "Argent Skull",
    name: "Leering Glance",
    description: "Your *Attack* shots bounce toward *+1* and deal *+15%* damage on the successive hit.",
    icon: "/assets/weapons/hammers/skull/Leering_Glance.webp",
    onlyForAspect: "argent_skull_hel"
  },
  {
    id: "runic_driver",
    weapon: "Argent Skull",
    name: "Runic Driver",
    description: "Your *Specials* fly faster and deal *+15%* damage for each foe struck.",
    icon: "/assets/weapons/hammers/skull/Runic_Driver.webp",
    onlyForAspect: "argent_skull_hel"
  },
  {
    id: "garmr_gaze",
    weapon: "Argent Skull",
    name: "Garmr Gaze",
    description: "Your *Attacks* shoot *+25%* farther and deal *+25%* damage.",
    icon: "/assets/weapons/hammers/skull/Garmr_Gaze.webp",
    onlyForAspect: "argent_skull_hel"
  },
  {
    id: "helheim_charge",
    weapon: "Argent Skull",
    name: "Helheim Charge",
    description: "Your *Ω Attack* fires *+2* times in succession.",
    icon: "/assets/weapons/hammers/skull/Helheim_Charge.webp",
    onlyForAspect: "argent_skull_hel"
  }
];

export const COAT_HAMMERS: WeaponHammer[] = [
  {
    id: "melting_cross",
    weapon: "Black Coat",
    name: "Melting Cross",
    description: "Your *Attack* deals *+250* damage to *Armor*.",
    icon: "/assets/weapons/hammers/coat/Melting_Cross.webp"
  },
  {
    id: "rapid_frame",
    weapon: "Black Coat",
    name: "Rapid Frame",
    description: "Your *Attacks* are *35%* faster.",
    icon: "/assets/weapons/hammers/coat/Rapid_Frame.webp"
  },
  {
    id: "reaper_frame",
    weapon: "Black Coat",
    name: "Reaper Frame",
    description: "Your *Attacks* have *+10* *Power* and deal damage in a larger area.",
    icon: "/assets/weapons/hammers/coat/Reaper_Frame.webp"
  },
  {
    id: "siege_frame",
    weapon: "Black Coat",
    name: "Siege Frame",
    description: "Your *Attacks* deal *+30%* damage and reach farther ahead.",
    icon: "/assets/weapons/hammers/coat/Siege_Frame.webp"
  },
  {
    id: "world_collider",
    weapon: "Black Coat",
    name: "World Collider",
    description: "Your fully-charged *Ω Attack* has *+100* *Power*.",
    icon: "/assets/weapons/hammers/coat/World_Collider.webp"
  },
  {
    id: "exhaust_riser",
    weapon: "Black Coat",
    name: "Exhaust Riser",
    description: "Your *Dash-Strike* hits *+3* times.",
    icon: "/assets/weapons/hammers/coat/Exhaust_Riser.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "shimmering_rockets",
    weapon: "Black Coat",
    name: "Shimmering Rockets",
    description: "Your *Specials* bounce toward up to *2* more foes.",
    icon: "/assets/weapons/hammers/coat/Shimmering_Rockets.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "furious_rockets",
    weapon: "Black Coat",
    name: "Furious Rockets",
    description: "Your *Specials* launch and fly *80%* faster.",
    icon: "/assets/weapons/hammers/coat/Furious_Rockets.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "launcher_frame",
    weapon: "Black Coat",
    name: "Launcher Frame",
    description: "Whenever your *Attacks* strike foes, your *Special* has *25%* chance to fire automatically.",
    icon: "/assets/weapons/hammers/coat/Launcher_Frame.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "counter_barrage",
    weapon: "Black Coat",
    name: "Counter Barrage",
    description: "After blocking with your *Ω Attack*, your *Special* auto-fires *5* shots, reloading in *3 Sec.*",
    icon: "/assets/weapons/hammers/coat/Counter_Barrage.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "sudden_salvo",
    weapon: "Black Coat",
    name: "Sudden Salvo",
    description: "Your *Ω Special* locks on faster and uses *-20% Magick*.",
    icon: "/assets/weapons/hammers/coat/Sudden_Salvo.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "ripper_rockets",
    weapon: "Black Coat",
    name: "Ripper Rockets",
    description: "Your *Specials* briefly gain *+5* *Power* for up to *5* consecutive hits to the same foe.",
    icon: "/assets/weapons/hammers/coat/Ripper_Rockets.webp",
    incompatibleAspects: ["black_coat_shiva"]
  },
  {
    id: "elephant_rockets",
    weapon: "Black Coat",
    name: "Elephant Rockets",
    description: "Your *Specials* have *+30* *Power* and fly dead ahead.",
    icon: "/assets/weapons/hammers/coat/Elephant_Rockets.webp",
    onlyForAspect: "black_coat_shiva"
  },
  {
    id: "counter_supreme",
    weapon: "Black Coat",
    name: "Counter Supreme",
    description: "After blocking with your *Ω Attack*, become *Destructive* by up to *+3* ranks.",
    icon: "/assets/weapons/hammers/coat/Counter_Supreme.webp",
    onlyForAspect: "black_coat_shiva"
  },
  {
    id: "awakened_rockets",
    weapon: "Black Coat",
    name: "Awakened Rockets",
    description: "Absorbing *Special* blasts also creates blasts from your *Special*, but you lose *5 Magick*.",
    icon: "/assets/weapons/hammers/coat/Awakened_Rockets.webp",
    onlyForAspect: "black_coat_shiva"
  },
  {
    id: "mooncrest_riser",
    weapon: "Black Coat",
    name: "Mooncrest Riser",
    description: "Your *Dash-Strike* hits a larger area and deals *+40%* damage.",
    icon: "/assets/weapons/hammers/coat/Mooncrest_Riser.webp",
    onlyForAspect: "black_coat_shiva"
  },
  {
    id: "chakra_collider",
    weapon: "Black Coat",
    name: "Chakra Collider",
    description: "Your *Ω Attack* gains a *Power Shot* that deals *+150%* damage.",
    icon: "/assets/weapons/hammers/coat/Chakra_Collider.webp",
    onlyForAspect: "black_coat_shiva"
  }
];

export const WEAPON_HAMMERS: Record<string, WeaponHammer[]> = {
  "Witch's Staff": STAFF_HAMMERS,
  "Sister Blades": DAGGER_HAMMERS,
  "Umbral Flames": TORCH_HAMMERS,
  "Moonstone Axe": AXE_HAMMERS,
  "Argent Skull": SKULL_HAMMERS,
  "Black Coat": COAT_HAMMERS
};


