import { Boon } from '../types';

export const BOONS: Boon[] = [
  {
    id: "air_quality",
    name: "Air Quality",
    type: "Infusion",
    gods: ["Zeus"],
    element: null,
    effect: "While you have at least *5* Air Essences, you can never deal less damage than the limit. \n ▸ Min Damage per Hit: 50",
    icon: "/assets/boons/zeus/Air_Quality.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 5 Air Essences",
        element: "Air",
        elementCount: 5
      }
    ]
  },
  {
    id: "all_together",
    name: "All Together",
    type: "Legendary",
    gods: ["Hera"],
    element: "Aether",
    effect: "Gain Earth, Water, Air, and Fire Essence, and *1* Infusion Boon for each. \n ▸ Essences Gained per Element: +1",
    icon: "/assets/boons/hera/All_Together.webp",
    prerequisites: [
      {
        boonIds: [
          "sworn_strike",
          "sworn_flourish",
          "engagement_ring",
          "nexus_rush"
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Nexus Rush"
      },
      {
        boonIds: [
          "bridal_glow",
          "uncommon_grace",
          "fine_line"
        ],
        any: true,
        description: "Requires Bridal Glow, Uncommon Grace, or Fine Line"
      },
      {
        boonIds: [
          "hereditary_bane",
          "rousing_reception"
        ],
        any: true,
        description: "Requires Hereditary Bane or Rousing Reception"
      }
    ]
  },
  {
    id: "anvil_ring",
    name: "Anvil Ring",
    type: "Cast",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Casts deal damage *3* times in succession to foes in the binding circle. \n ▸ Cast Damage (every 1 Sec.): 60/70/80/90",
    icon: "/assets/boons/hephaestus/Anvil_Ring.webp"
  },
  {
    id: "arc_flash",
    name: "Arc Flash",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Damage from Ω Moves immediately activates Blitz effects and makes them stronger. \n ▸ Omega-Blitz Bonus Damage: +30%/+40%/+50%/+60%",
    icon: "/assets/boons/zeus/Arc_Flash.webp",
    prerequisites: [
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish"  // Heaven Flourish
        ],
        any: true,
        description: "Requires Heaven Strike or Heaven Flourish"
      }
    ]
  },
  {
    id: "arctic_gale",
    name: "Arctic Gale",
    type: "Passive",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Casts also create a Gust at the binding circle. \n ▸ Gust Area Damage (every 0.25 Sec.): 4/8/12/16",
    icon: "/assets/boons/demeter/Arctic_Gale.webp",
    inflictsCurse: "gust"
  },
  {
    id: "arctic_ring",
    name: "Arctic Ring",
    type: "Cast",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Casts inflict Freeze and repeatedly deal damage to foes in the binding circle. \n ▸ Cast Damage (every 0.5 Sec.): 10/15/20/25",
    icon: "/assets/boons/demeter/Arctic_Ring.webp",
    inflictsCurse: "freeze"
  },
  {
    id: "arterial_spray",
    name: "Arterial Spray",
    type: "Duo",
    gods: ["Poseidon", "Ares"],
    element: "Aether",
    effect: "Your splash effects from Poseidon may hit *2* times _(and take the color of the River Styx)_. \n ▸ Double Splash Chance: 25%",
    icon: "/assets/boons/duo/Arterial_Spray.webp",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish", // Vicious Flourish
          "sword_ring", // Sword Ring
          "stabbing_rush", // Stabbing Rush
          "grisly_gain"  // Grisly Gain
        ],
        any: true,
        description: "Requires Vicious Strike, Vicious Flourish, Sword Ring, Stabbing Rush, or Grisly Gain"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish"  // Wave Flourish
        ],
        any: true,
        description: "Requires Wave Strike or Wave Flourish"
      }
    ]
  },
  {
    id: "back_burner",
    name: "Back Burner",
    type: "Passive",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Foes with Daze take more damage if struck from behind. \n ▸ Backstab Damage: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/apollo/Back_Burner.webp",
    prerequisites: [
      {
        boonIds: [
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "dazzling_display", // Dazzling Display
          "light_smite"  // Light Smite
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Dazzling Display, or Light Smite"
      }
    ]
  },
  {
    id: "beach_ball",
    name: "Beach Ball",
    type: "Duo",
    gods: ["Poseidon", "Apollo"],
    element: "Aether",
    effect: "Your Sprint creates a watery globe behind you, which surges ahead once you stop. \n ▸ Max Blast Damage (after 2 Sec.): 300",
    icon: "/assets/boons/duo/Beach_Ball.webp",
    prerequisites: [
      {
        boonIds: [
          "nova_strike", // Nova Strike
          "nova_flourish", // Nova Flourish
          "solar_ring", // Solar Ring
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, or Lucid Gain"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish", // Wave Flourish
          "tidal_ring", // Tidal Ring
          "flood_gain"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, or Flood Gain"
      },
      {
        boonIds: [
          "blinding_rush", // Blinding Rush
          "breaker_rush"  // Breaker Rush
        ],
        any: true,
        description: "Requires Blinding Rush or Breaker Rush"
      }
    ]
  },
  {
    id: "blinding_rush",
    name: "Blinding Rush",
    type: "Sprint",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your Sprint is faster and inflicts Daze on surrounding foes. \n ▸ Sprint Speed: +15%/+20%/+25%/+30%",
    icon: "/assets/boons/apollo/Blinding_Rush.webp",
    inflictsCurse: "daze"
  },
  {
    id: "blood_spree",
    name: "Blood Spree",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "While you have less than 40 Health, your Attacks and Specials restore Health. \n ▸ Life Restored per Hit: 1/2/3/4",
    icon: "/assets/boons/ares/Blood_Spree.webp"
  },
  {
    id: "born_gain",
    name: "Born Gain",
    type: "Magick",
    gods: ["Hera"],
    element: "Water",
    effect: "Whenever you run out of Magick, Prime until the next Location to restore _all_ Magick. \n ▸ Magick Primed: 20/18/16/14",
    icon: "/assets/boons/hera/Born_Gain.webp"
  },
  {
    id: "brave_face",
    name: "Brave Face",
    type: "Duo",
    gods: ["Hera", "Hephaestus"],
    element: "Aether",
    effect: "Automatically use Magick to resist up to *30%* of any damage. \n ▸ Magic Cost per Damage Point: 10 Magick",
    icon: "/assets/boons/duo/Brave_Face.webp",
    prerequisites: [
      {
        boonIds: [
          "grand_caldera", // Grand Caldera
          "molten_touch", // Molten Touch
          "heavy_metal", // Heavy Metal
          "trusty_shield", // Trusty Shield
          "uncanny_fortitude", // Uncanny Fortitude
          "furnace_blast"  // Furnace Blast
        ],
        any: true,
        description: "Requires Grand Caldera, Molten Touch, Heavy Metal, Trusty Shield, Uncanny Fortitude, or Furnace Blast"
      },
      {
        boonIds: [
          "extended_family", // Extended Family
          "dying_wish", // Dying Wish
          "hereditary_bane", // Hereditary Bane
          "rousing_reception", // Rousing Reception
          "fine_line"  // Fine Line
        ],
        any: true,
        description: "Requires Extended Family, Dying Wish, Hereditary Bane, Rousing Reception, or Fine Line"
      }
    ]
  },
  {
    id: "breaker_rush",
    name: "Breaker Rush",
    type: "Sprint",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Whenever you Sprint, hit the first foe you run into with a blast that knocks foes away. \n ▸ Impact Blast Damage: 80/100/120/140",
    icon: "/assets/boons/poseidon/Breaker_Rush.webp"
  },
  {
    id: "bridal_glow",
    name: "Bridal Glow",
    type: "Passive",
    gods: ["Hera"],
    element: "Water",
    effect: "Make *1* random Boon become Heroic and give it Lv. \n ▸ Bonus Lv.:+1/+2/+3/+4",
    icon: "/assets/boons/hera/Bridal_Glow.webp"
  },
  {
    id: "broken_resolve",
    name: "Broken Resolve",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Weak effects are more potent. \n ▸ Weak Damage Reduction: +10%/+12%/+14%/+16%",
    icon: "/assets/boons/aphrodite/Broken_Resolve.webp",
    prerequisites: [
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      }
    ]
  },
  {
    id: "buried_treasure",
    name: "Buried Treasure",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Any Minor Finds and Gold Crowns are worth more, and you receive Gold, Healing, and Bones now. \n ▸ Reward Value: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/poseidon/Buried_Treasure.webp"
  },
  {
    id: "burning_desire",
    name: "Burning Desire",
    type: "Duo",
    gods: ["Aphrodite", "Hestia"],
    element: "Aether",
    effect: "While foes are Weak, any Scorch they have does not diminish as it deals damage. \n ▸ Scorch Duration on Weak Foes: \u221E",
    icon: "/assets/boons/duo/Burning_Desire.webp",
    prerequisites: [
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "cardio_gain",
    name: "Cardio Gain",
    type: "Magick",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Whenever your Attack or Special deal damage, restore Magick. \n ▸ Magick Restored per Strike: 4/6/8/10 Magick",
    icon: "/assets/boons/hestia/Cardio_Gain.webp"
  },
  {
    id: "carnal_pleasure",
    name: "Carnal Pleasure",
    type: "Duo",
    gods: ["Aphrodite", "Ares"],
    element: "Aether",
    effect: "Whenever you collect Plasma, create a Heartthrob. \n ▸ Chance of Heartthrob: 35%",
    icon: "/assets/boons/duo/Carnal_Pleasure.webp",
    prerequisites: [
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish", // Flutter Flourish
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "grisly_gain", // Grisly Gain
          "visceral_impact", // Visceral Impact
          "profuse_bleeding"  // Profuse Bleeding
        ],
        any: true,
        description: "Requires Grisly Gain, Visceral Impact, or Profuse Bleeding"
      }
    ]
  },
  {
    id: "chain_reaction",
    name: "Chain Reaction",
    type: "Duo",
    gods: ["Hephaestus", "Hestia"],
    element: "Aether",
    effect: "If you use your blast effects from Hephaestus just after they recharge, they fire *2* times. \n ▸ Double Blast Timing: 2 Sec.",
    icon: "/assets/boons/duo/Chain_Reaction.webp",
    prerequisites: [
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish"  // Volcanic Flourish
        ],
        any: true,
        description: "Requires Volcanic Strike or Volcanic Flourish"
      },
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring", // Smolder Ring
          "heat_rush", // Heat Rush
          "cardio_gain"  // Cardio Gain
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, Smolder Ring, Heat Rush, or Cardio Gain"
      }
    ]
  },
  {
    id: "cherished_heirloom",
    name: "Cherished Heirloom",
    type: "Duo",
    gods: ["Hera", "Demeter"],
    element: "Aether",
    effect: "Your Keepsakes are stronger this night _(if possible)_. \n ▸ Bonus Keepsake Ranks: +1",
    icon: "/assets/boons/duo/Cherished_Heirloom.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring", // Arctic Ring
          "tranquil_gain", // Tranquil Gain
          "frigid_rush"  // Frigid Rush
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, Arctic Ring, Tranquil Gain, or Frigid Rush"
      },
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush", // Nexus Rush
          "born_gain"  // Born Gain
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, Nexus Rush, or Born Gain"
      }
    ]
  },
  {
    id: "coffin_nail",
    name: "Coffin Nail",
    type: "Duo",
    gods: ["Hephaestus", "Ares"],
    element: "Aether",
    effect: "Your falling blades from Ares fall immediately and deal more damage. \n ▸ Blade Bonus Damage: +25",
    icon: "/assets/boons/duo/Coffin_Nail.webp",
    prerequisites: [
      {
        boonIds: [
          "sword_ring", // Sword Ring
          "stabbing_rush", // Stabbing Rush
          "cut_above"  // Cut Above
        ],
        any: true,
        description: "Requires Sword Ring, Stabbing Rush, or Cut Above"
      },
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "anvil_ring", // Anvil Ring
          "smithy_rush", // Smithy Rush
          "tough_gain"  // Tough Gain
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, Anvil Ring, Smithy Rush, or Tough Gain"
      }
    ]
  },
  {
    id: "cold_storage",
    name: "Cold Storage",
    type: "Passive",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Freeze effects last longer. \n ▸ Freeze Duration: +2 Sec./+3 Sec./+4 Sec./+5 Sec.",
    icon: "/assets/boons/demeter/Cold_Storage.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring"  // Arctic Ring
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, or Arctic Ring"
      }
    ]
  },
  {
    id: "controlled_burn",
    name: "Controlled Burn",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your \u03a9 Special also launches a fireball, but uses +10 Magick. \n ▸ Fireball Blast Damage: 100/150/200/250",
    icon: "/assets/boons/hestia/Controlled_Burn.webp"
  },
  {
    id: "cryo_pounder",
    name: "Cryo Pounder",
    type: "Duo",
    gods: ["Demeter", "Hephaestus"],
    element: "Aether",
    effect: "Your blasts from Hephaestus deal more damage to Freeze-afflicted foes. \n ▸ Bonus Blast Damage: +50%",
    icon: "/assets/boons/duo/Cryo_Pounder.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring"  // Arctic Ring
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, or Arctic Ring"
      },
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "cut_above",
    name: "Cut Above",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your \u03a9 Moves also cause a falling blade to appear over each foe stroke, but use +5 Magick. \n ▸ Blade Damage: 90/120/150/180",
    icon: "/assets/boons/ares/Cut_Above.webp"
  },
  {
    id: "cutting_edge",
    name: "Cutting Edge",
    type: "Duo",
    gods: ["Apollo", "Ares"],
    element: "Aether",
    effect: "Your falling blades from Ares drop *+1* time in succession and deal damage in a larger area. \n ▸ Blade Area of Effect: +50%",
    icon: "/assets/boons/duo/Cutting_Edge.webp",
    prerequisites: [
      {
        boonIds: [
          "nova_strike", // Nova Strike
          "nova_flourish", // Nova Flourish
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "sword_ring", // Sword Ring
          "stabbing_rush", // Stabbing Rush
          "cut_above"  // Cut Above
        ],
        any: true,
        description: "Requires Sword Ring, Stabbing Rush, or Cut Above"
      }
    ]
  },
  {
    id: "dazzling_display",
    name: "Dazzling Display",
    type: "Passive",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your attacks may inflict Daze. \n ▸ Daze Chance: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/apollo/Dazzling_Display.webp",
    inflictsCurse: "daze",
    prerequisites: [
      {
        boonIds: ["nova_strike"], // Nova Strike
        description: "Requires Nova Strike"
      }
    ]
  },
  {
    id: "death_warrant",
    name: "Death Warrant",
    type: "Passive",
    gods: ["Artemis"],
    element: "Earth",
    effect: "A random foe occasionally becomes *Marked*. If it takes *Critical* damage, this repeats. \n ▸ Time Between Marks: *20 Sec./18 Sec./16 Sec./14 Sec.*",
    icon: "/assets/boons/artemis/Death_Warrant.webp"
  },
  {
    id: "divine_vengeance",
    name: "Divine Vengeance",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "After you take damage, your foe is struck by lightning, and again *50%* of the time. \n ▸ Bolt Damage: 100 (up to: 2/3/4/5 times)",
    icon: "/assets/boons/zeus/Divine_Vengeance.webp"
  },
  {
    id: "double_strike",
    name: "Double Strike",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your lightning bolt effects may strike *2* times. \n ▸ Bonus Bolt Chance: +10%/15%/20%/25%",
    icon: "/assets/boons/zeus/Double_Strike.webp",
    prerequisites: [
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "thunder_rush", // Thunder Rush
          "power_surge", // Power Surge
          "divine_vengeance", // Divine Vengeance
          "lightning_lance"  // Lightning Lance
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Thunder Rush, Power Surge, Divine Vengeance, or Lightning Lance"
      }
    ]
  },
  {
    id: "dying_wish",
    name: "Dying Wish",
    type: "Passive",
    gods: ["Hera"],
    element: "Air",
    effect: "Whenever Hitch-afflicted foes are slain, damage all other Hitch-afflicted foes. \n ▸ Hitch Death Damage: 40/60/80/100",
    icon: "/assets/boons/hera/Dying_Wish.webp",
    prerequisites: [
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush"  // Nexus Rush
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Nexus Rush"
      }
    ]
  },
  {
    id: "easy_shot",
    name: "Easy Shot",
    type: "Passive",
    gods: ["Artemis"],
    element: "Air",
    effect: "A piercing arrow fires towards any foe damaged by your *Ω Cast*. \n ▸ Arrow Damage: *50/62/75/87*",
    icon: "/assets/boons/artemis/Easy_Shot.webp"
  },
  {
    id: "ecstatic_obsession",
    name: "Ecstatic Obsession",
    type: "Duo",
    gods: ["Hera", "Aphrodite"],
    element: "Aether",
    effect: "As long as multiple foes are in an Encounter, automatically inflict Charm on *1* of them. \n ▸ Min Foes for Auto-Charm: 2",
    icon: "/assets/boons/duo/Ecstatic_Obsession.webp",
    prerequisites: [
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush"  // Nexus Rush
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Nexus Rush"
      }
    ]
  },
  {
    id: "electric_overload",
    name: "Electric Overload",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your chain-lightning deals more damage and bounces up to *+3* times. \n ▸ Chain-Lightning Damage: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/zeus/Electric_Overload.webp",
    prerequisites: [
      {
        boonIds: [
          "static_shock"  // Static Shock
        ],
        any: true,
        description: "Requires Static Shock"
      }
    ]
  },
  {
    id: "engagement_ring",
    name: "Engagement Ring",
    type: "Cast",
    gods: ["Hera"],
    element: "Air",
    effect: "Your Casts inflict Hitch and immediately deal damage based on foes in the binding circle. \n ▸ Damage per Foe: 20/30/40/50",
    icon: "/assets/boons/hera/Engagement_Ring.webp",
    inflictsCurse: "hitch"
  },
  {
    id: "exceptional_talent",
    name: "Exceptional Talent",
    type: "Legendary",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your \u03a9 Attack and \u03a9 Special fire *2* times, but use more Magick. \n ▸ Omega Move Cost: +30 Magick",
    icon: "/assets/boons/apollo/Exceptional_Talent.webp",
    prerequisites: [
      {
        boonIds: [
          "nova_strike", // Nova Strike
          "nova_flourish"  // Nova Flourish
        ],
        any: true,
        description: "Requires Nova Strike or Nova Flourish"
      },
      {
        boonIds: [
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "extra_dose", // Extra Dose
          "super_nova", // Super Nova
          "back_burner", // Back Burner
          "prominence_flare"  // Prominence Flare
        ],
        any: true,
        description: "Requires Extra Dose, Super Nova, Back Burner, or Prominence Flare"
      }
    ]
  },
  {
    id: "extended_family",
    name: "Extended Family",
    type: "Passive",
    gods: ["Hera"],
    element: "Fire",
    effect: "Your damaging effects from Olympians are stronger for each Boon-giver you have. \n ▸ Bonus Effect Damage per God(dess): +3%/+4%/+5%/+6%",
    icon: "/assets/boons/hera/Extended_Family.webp"
  },
  {
    id: "extra_dose",
    name: "Extra Dose",
    type: "Passive",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Attack has a chance to hit *2* times. \n ▸ Double Strike Chance: +5%/+8%/+10%/+13%",
    icon: "/assets/boons/apollo/Extra_Dose.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flutter_strike", // Flutter Strike
          "heaven_strike", // Heaven Strike
          "ice_strike", // Ice Strike
          "nova_strike", // Nova Strike
          "sworn_strike", // Sworn Strike
          "vicious_strike", // Vicious Strike
          "volcanic_strike", // Volcanic Strike
          "wave_strike"  // Wave Strike
        ],
        any: true,
        description: "Requires any Attack Boon"
      }
    ]
  },
  {
    id: "fine_line",
    name: "Fine Line",
    type: "Passive",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Ω Moves create a fissure that deals damage in a long line, but use +15 Magick. \n ▸ Rift Damage: 120/150/180/210",
    icon: "/assets/boons/hera/Fine_Line.webp"
  },
  {
    id: "fire_away",
    name: "Fire Away",
    type: "Legendary",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Casts destroy many foes' ranged shots, and inflict Scorch on the attacking foes. \n ▸ Scorch Damage (every 3 Sec.): 400",
    icon: "/assets/boons/hestia/Fire_Away.webp",
    inflictsCurse: "scorch",
    prerequisites: [
      {
        boonIds: ["smolder_ring"],
        any: true,
        description: "Requires Smolder Ring"
      },
      {
        boonIds: ["flash_fry", "hot_pot", "pyro_technique", "highly_flammable"],
        any: true,
        description: "Requires Flash Fry, Hot Pot, Pyro Technique, or Highly Flammable"
      },
      {
        boonIds: ["glowing_coal", "controlled_burn"],
        any: true,
        description: "Requires Glowing Coal or Controlled Burn"
      }
    ]
  },
  {
    id: "flame_flourish",
    name: "Flame Flourish",
    type: "Special",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Specials inflict Scorch. \n ▸ Scorch Damage: 35/53/70/88",
    icon: "/assets/boons/hestia/Flame_Flourish.webp",
    inflictsCurse: "scorch"
  },
  {
    id: "flame_strike",
    name: "Flame Strike",
    type: "Attack",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Attacks inflict Scorch. \n ▸ Scorch Damage: 30/45/60/75",
    icon: "/assets/boons/hestia/Flame_Strike.webp",
    inflictsCurse: "scorch"
  },
  {
    id: "flash_fry",
    name: "Flash Fry",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your foes perish in a blast that damages any surrounding foes. \n ▸ Blast Damage When Slain: 60/90/120/150",
    icon: "/assets/boons/hestia/Flash_Fry.webp"
  },
  {
    id: "flood_gain",
    name: "Flood Gain",
    type: "Magick",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Moves make you briefly restore any Magick you use, repeatable after *8 Sec.* \n ▸ Magick Flood Duration: 4 Sec./5 Sec./6 Sec./7 Sec.",
    icon: "/assets/boons/poseidon/Flood_Gain.webp"
  },
  {
    id: "flutter_flourish",
    name: "Flutter Flourish",
    type: "Special",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Specials deal more damage to nearby foes. \n ▸ Close-Up Damage: +100%/+150%/+200%/+250%",
    icon: "/assets/boons/aphrodite/Flutter_Flourish.webp"
  },
  {
    id: "flutter_strike",
    name: "Flutter Strike",
    type: "Attack",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Attacks deal more damage to nearby foes. \n ▸ Close-Up Damage: +80%/+100%/+120%/+140%",
    icon: "/assets/boons/aphrodite/Flutter_Strike.webp"
  },
  {
    id: "fourth_degree",
    name: "Fourth Degree",
    type: "Duo",
    gods: ["Hestia", "Ares"],
    element: "Aether",
    effect: "Your fireball effects from Hestia inflict Wounds with even greater Power. \n ▸ Fireball Wounds Bonus Power: +250",
    icon: "/assets/boons/duo/Fourth_Degree.webp",
    inflictsCurse: "wounds",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish", // Vicious Flourish
          "sword_ring", // Sword Ring
          "stabbing_rush", // Stabbing Rush
          "grisly_gain"  // Grisly Gain
        ],
        any: true,
        description: "Requires Vicious Strike, Vicious Flourish, Sword Ring, Stabbing Rush, or Grisly Gain"
      },
      {
        boonIds: [
          "controlled_burn", // Controlled Burn
          "glowing_coal"  // Glowing Coal
        ],
        any: true,
        description: "Requires Controlled Burn or Glowing Coal"
      }
    ]
  },
  {
    id: "freezer_burn",
    name: "Freezer Burn",
    type: "Duo",
    gods: ["Demeter", "Hestia"],
    element: "Aether",
    effect: "Whenever you inflict Freeze, on a foe with Scorch, deal damage and remove Scorch. \n ▸ Damage from Scorch: 200%",
    icon: "/assets/boons/duo/Freezer_Burn.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring"  // Arctic Ring
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, or Arctic Ring"
      },
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "frigid_rush",
    name: "Frigid Rush",
    type: "Sprint",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Sprint forms a Gust around you that lingers after you stop. \n ▸ Gust Area Damage (every 0.25 Sec.): 4/6/8/10",
    icon: "/assets/boons/demeter/Frigid_Rush.webp",
    inflictsCurse: "gust"
  },
  {
    id: "frosty_veneer",
    name: "Frosty Veneer",
    type: "Infusion",
    gods: ["Demeter"],
    element: null,
    effect: "While you have at least 6 Water Essences, whenever you would take at least *20* damage, take less. \n ▸ Heavy Damage Reduction: -10",
    icon: "/assets/boons/demeter/Frosty_Veneer.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 6 Water Essences",
        element: "Water",
        elementCount: 6
      }
    ]
  },
  {
    id: "furnace_blast",
    name: "Furnace Blast",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your blast effects from Hephaestus also inflict Glow on foes. \n ▸ Glow Bonus Damage: +15%/+19%/+25%/+26%",
    icon: "/assets/boons/hephaestus/Furnace_Blast.webp",
    inflictsCurse: "glow",
    prerequisites: [
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "geyser_spout",
    name: "Geyser Spout",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Cast gains Power and knocks foes away. \n ▸ Omega Cast Power: +150/+200/+250/+300",
    icon: "/assets/boons/poseidon/Geyser_Spout.webp",
    prerequisites: [
      {
        boonIds: [
          "anvil_ring", // Anvil Ring
          "arctic_ring", // Arctic Ring
          "engagement_ring", // Engagement Ring
          "rapture_ring", // Rapture Ring
          "smolder_ring", // Smolder Ring
          "solar_ring", // Solar Ring
          "storm_ring", // Storm Ring
          "sword_ring", // Sword Ring
          "tidal_ring"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "glamour_gain",
    name: "Glamour Gain",
    type: "Magick",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "You automatically inflict Weak on nearby foes and gradually restore Magick near them. \n ▸ Magick Restoration (every 1 Sec.): 6/8/10/12",
    icon: "/assets/boons/aphrodite/Glamour_Gain.webp",
    inflictsCurse: "weak"
  },
  {
    id: "glorious_disaster",
    name: "Glorious Disaster",
    type: "Duo",
    gods: ["Zeus", "Apollo"],
    element: "Aether",
    effect: "You can Channel +30 Magick into your Ω Cast to repeatedly strike foes with lightning bolts. \n ▸ Bolt Damage (every 0.13 Sec.): 20",
    icon: "/assets/boons/duo/Glorious_Disaster.webp",
    prerequisites: [
      {
        boonIds: ["prominence_flare"], // Prominence Flare
        description: "Requires Prominence Flare"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "thunder_rush"  // Thunder Rush
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, or Thunder Rush"
      }
    ]
  },
  {
    id: "glowing_coal",
    name: "Glowing Coal",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Hold Cast to aim a fireball that explodes on impact. The binding circle forms there. \n ▸ Fireball Blast Damage: 60/90/120/150",
    icon: "/assets/boons/hestia/Glowing_Coal.webp"
  },
  {
    id: "grand_caldera",
    name: "Grand Caldera",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your blast effects from Hephaestus deal more damage and are *50%* larger. \n ▸ Bonus Blast Damage: +75/+100/+125/+150",
    icon: "/assets/boons/hephaestus/Grand_Caldera.webp",
    prerequisites: [
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "grievous_blow",
    name: "Grievous Blow",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "Foes with Wounds may suffer *200%* damage when struck. \n ▸ Double Damage Chance: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/ares/Grievous_Blow.webp",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish"  // Vicious Flourish
        ],
        any: true,
        description: "Requires Vicious Strike or Vicious Flourish"
      }
    ]
  },
  {
    id: "grisly_gain",
    name: "Grisly Gain",
    type: "Magick",
    gods: ["Ares"],
    element: "Earth",
    effect: "Striking foes with your Weapon has *20%* chance to spill Plasma, which also restores Magick. \n ▸ Magick Restored per Plasma: 15/20/25/30",
    icon: "/assets/boons/ares/Grisly_Gain.webp"
  },
  {
    id: "hail_storm",
    name: "Hail Storm",
    type: "Duo",
    gods: ["Zeus", "Demeter"],
    element: "Aether",
    effect: "Your Freeze effects also cause lightning bolts to repeatedly strike afflicted foes. \n ▸ Lightning Damage (every 0.5 Sec.): 30",
    icon: "/assets/boons/duo/Hail_Storm.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring"  // Arctic Ring
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, or Arctic Ring"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "ionic_gain", // Ionic Gain
          "thunder_rush"  // Thunder Rush
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Ionic Gain, or Thunder Rush"
      }
    ]
  },
  {
    id: "healthy_rebound",
    name: "Healthy Rebound",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Whenever you exit a Location, restore 100% Health if you have not lost too much. \n ▸ Min Life for Full Recovery: 80%/70%/60%/50%",
    icon: "/assets/boons/aphrodite/Healthy_Rebound.webp",
    prerequisites: [
      {
        boonIds: ["shameless_attitude"],
        description: "Requires Shameless Attitude"
      }
    ]
  },
  {
    id: "heart_breaker",
    name: "Heart Breaker",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Whenever you use 40 Magick, create a Heartthrob. \n ▸ Heartthrob Blast Damage: 80/100/120/140",
    icon: "/assets/boons/aphrodite/Heart_Breaker.webp"
  },
  {
    id: "hearty_appetite",
    name: "Hearty Appetite",
    type: "Duo",
    gods: ["Demeter", "Aphrodite"],
    element: "Aether",
    effect: "You deal more damage with your Weapon the more Max Health you have. \n ▸ Bonus Damage per 100 Life: +10%",
    icon: "/assets/boons/duo/Hearty_Appetite.webp",
    prerequisites: [
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish", // Flutter Flourish
          "glamour_gain", // Glamour Gain
          "passion_rush", // Passion Rush
          "healthy_rebound"  // Healthy Rebound
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Glamour Gain, Passion Rush, or Healthy Rebound"
      },
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "tranquil_gain", // Tranquil Gain
          "frigid_rush", // Frigid Rush
          "plentiful_forage"  // Plentiful Forage
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, Tranquil Gain, Frigid Rush, or Plentiful Forage"
      }
    ]
  },
  {
    id: "heat_rush",
    name: "Heat Rush",
    type: "Sprint",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Sprint leaves a cinder trail, and any damage you take from burning is reduced to *1*. \n ▸ Trail Damage (every 0.25 Sec.): 10/15/20/25",
    icon: "/assets/boons/hestia/Heat_Rush.webp"
  },
  {
    id: "heaven_flourish",
    name: "Heaven Flourish",
    type: "Special",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Specials inflict Blitz. \n ▸ Blitz Damage: 100/130/160/190",
    icon: "/assets/boons/zeus/Heaven_Flourish.webp",
    inflictsCurse: "blitz"
  },
  {
    id: "heaven_strike",
    name: "Heaven Strike",
    type: "Attack",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Attacks inflict Blitz. \n ▸ Blitz Damage: 80/120/160/200",
    icon: "/assets/boons/zeus/Heaven_Strike.webp",
    inflictsCurse: "blitz"
  },
  {
    id: "heavy_metal",
    name: "Heavy Metal",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Weapon deals more damage based on *20%* of your Armor, and you gain some now. \n ▸ Armor Gained: +50/+75/+100/+125",
    icon: "/assets/boons/hephaestus/Heavy_Metal.webp"
  },
  {
    id: "heinous_affront",
    name: "Heinous Affront",
    type: "Duo",
    gods: ["Zeus", "Ares"],
    element: "Aether",
    effect: "Inflicting Wounds also can inflict all your _'after you take damage'_ effects. \n ▸ Recharge Time per Foe: 6 Sec.",
    icon: "/assets/boons/duo/Heinous_Affront.webp",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish"  // Vicious Flourish
        ],
        any: true,
        description: "Requires Vicious Strike or Vicious Flourish"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "thunder_rush", // Thunder Rush
          "ionic_gain"  // Ionic Gain
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Thunder Rush, or Ionic Gain"
      },
      {
        boonIds: [
          "visceral_impact", // Visceral Impact
          "light_smite", // Light Smite
          "divine_vengeance"  // Divine Vengeance
        ],
        any: true,
        description: "Requires Visceral Impact, Light Smite, or Divine Vengeance"
      }
    ]
  },
  {
    id: "hereditary_bane",
    name: "Hereditary Bane",
    type: "Passive",
    gods: ["Hera"],
    element: "Water",
    effect: "Your Hitch effects deal more damage and last *+5 Sec.* \n ▸ Hitch Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/hera/Hereditary_Bane.webp",
    prerequisites: [
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush"  // Nexus Rush
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Nexus Rush"
      }
    ]
  },
  {
    id: "high_surf",
    name: "High Surf",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Hit surrounding foes with a powerful splash as they start to strike, but you Prime 30 Magick. \n ▸ Splash Damage: 40/60/80/100",
    icon: "/assets/boons/poseidon/High_Surf.webp"
  },
  {
    id: "highly_flammable",
    name: "Highly Flammable",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Whenever you inflict Scorch on a foe for the first time, inflict more. \n ▸ First-Time Scorch Damage: +80/+120/+160/+200",
    icon: "/assets/boons/hestia/Highly_Flammable.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "hostile_environment",
    name: "Hostile Environment",
    type: "Duo",
    gods: ["Demeter", "Ares"],
    element: "Aether",
    effect: "Your \u03a9 Cast is stronger and follows you, even as you start to Channel it. \n ▸ Omega Cast Damage: +100%",
    icon: "/assets/boons/duo/Hostile_Environment.webp",
    prerequisites: [
      {
        boonIds: [
          "sword_ring", // Sword Ring
          "meat_grinder"  // Meat Grinder
        ],
        any: true,
        description: "Requires Sword Ring or Meat Grinder"
      },
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring", // Arctic Ring
          "frigid_rush", // Frigid Rush
          "tranquil_gain"  // Tranquil Gain
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, Arctic Ring, Frigid Rush, or Tranquil Gain"
      }
    ]
  },
  {
    id: "hot_pot",
    name: "Hot Pot",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Gain a chance to Dodge, which is doubled against Scorch-afflicted foes. \n ▸ Bonus Dodge Chance: +4%/+5%/+6%/+7%",
    icon: "/assets/boons/hestia/Hot_Pot.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "hydraulic_might",
    name: "Hydraulic Might",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "At the start of each Encounter, your Attacks and Specials are stronger for *10 Sec.* \n ▸ Initial Damage Bonus: +100%/+133%/+166%/+200%",
    icon: "/assets/boons/poseidon/Hydraulic_Might.webp"
  },
  {
    id: "ice_flourish",
    name: "Ice Flourish",
    type: "Special",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Specials deal more damage and inflict Freeze. \n ▸ Special Damage: +40%/+60%/+80%/+100%",
    icon: "/assets/boons/demeter/Ice_Flourish.webp",
    inflictsCurse: "freeze"
  },
  {
    id: "ice_strike",
    name: "Ice Strike",
    type: "Attack",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Attacks deal more damage and inflict Freeze. \n ▸ Attack Damage: +30%/+45%/+60%/+75%",
    icon: "/assets/boons/demeter/Ice_Strike.webp",
    inflictsCurse: "freeze"
  },
  {
    id: "incandescent_aura",
    name: "Incandescent Aura",
    type: "Duo",
    gods: ["Hera", "Hestia"],
    element: "Aether",
    effect: "Whenever you restore Magick during Encounters, damage _all_ Hitch-afflicted foes. \n ▸ Damage from Magick Restored: 500% (every 0.2 Sec.)",
    icon: "/assets/boons/duo/Incandescent_Aura.webp"
  },
  {
    id: "ionic_gain",
    name: "Ionic Gain",
    type: "Magick",
    gods: ["Zeus"],
    element: "Air",
    effect: "In each Encounter, an Aether Font appears in the area and restores _all_ Magick when used. \n ▸ Reappearance Time: 10/9/8/7 Sec.",
    icon: "/assets/boons/zeus/Ionic_Gain.webp"
  },
  {
    id: "island_getaway",
    name: "Island Getaway",
    type: "Duo",
    gods: ["Poseidon", "Aphrodite"],
    element: "Aether",
    effect: "You take less damage from nearby foes. Boons of Aphrodite treat all foes as nearby. \n ▸ Damage Resistance: +15%",
    icon: "/assets/boons/duo/Island_Getaway.webp",
    prerequisites: [
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish"  // Flutter Flourish
        ],
        any: true,
        description: "Requires Flutter Strike or Flutter Flourish"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish", // Wave Flourish
          "tidal_ring", // Tidal Ring
          "breaker_rush", // Breaker Rush
          "flood_gain"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, Breaker Rush, or Flood Gain"
      }
    ]
  },
  {
    id: "killer_current",
    name: "Killer Current",
    type: "Duo",
    gods: ["Zeus", "Poseidon"],
    element: "Aether",
    effect: "Your lightning deals more damage to Froth-afflicted foes. \n ▸ Bonus Lightning Damage: +30%",
    icon: "/assets/boons/duo/Killer_Current.webp",
    prerequisites: [
      {
        boonIds: [
          "tidal_ring", // Tidal Ring
          "slippery_slope"  // Slippery Slope
        ],
        any: true,
        description: "Requires Tidal Ring or Slippery Slope"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "thunder_rush", // Thunder Rush
          "divine_vengeance", // Divine Vengeance
          "lightning_lance"  // Lightning Lance
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Thunder Rush, Divine Vengeance, or Lightning Lance"
      }
    ]
  },
  {
    id: "killing_stroke",
    name: "Killing Stroke",
    type: "Passive",
    gods: ["Artemis"],
    element: "Air",
    effect: "Your *Specials* may deal *Critical* damage, but you *Prime* *40 Magick*. \n ▸ Critical Specials Chance: *+10%/+12%/+14%/+16%*",
    icon: "/assets/boons/artemis/Killing_Stroke.webp"
  },
  {
    id: "king_tide",
    name: "King Tide",
    type: "Legendary",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your splash effects from Poseidon are larger, and deal more damage to Guardians. \n ▸ Splash Damage vs. Guardians: +200%",
    icon: "/assets/boons/poseidon/King_Tide.webp",
    prerequisites: [
      {
        boonIds: ["wave_strike", "wave_flourish"],
        any: true,
        description: "Requires Wave Strike or Wave Flourish"
      },
      {
        boonIds: ["breaker_rush", "flood_gain", "geyser_spout"],
        any: true,
        description: "Requires Breaker Rush, Flood Gain, or Geyser Spout"
      },
      {
        boonIds: ["hydraulic_might", "ocean_swell", "slippery_slope", "high_surf"],
        any: true,
        description: "Requires Hydraulic Might, Ocean Swell, Slippery Slope, or High Surf"
      }
    ]
  },
  {
    id: "king_s_ransom",
    name: "King's Ransom",
    type: "Duo",
    gods: ["Zeus", "Hera"],
    element: "Aether",
    effect: "Give up _all_ your Boons of Hera. For each, raise Lv. for _all_ your Boons of Zeus. \n ▸ Bonus Lv. per Hera Boon: +4",
    icon: "/assets/boons/duo/King's_Ransom.webp",
    prerequisites: [
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish", // Heaven Flourish
          "storm_ring", // Storm Ring
          "thunder_rush", // Thunder Rush
          "ionic_gain"  // Ionic Gain
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Thunder Rush, or Ionic Gain"
      },
      {
        boonIds: [
          "engagement_ring", // Engagement Ring
          "born_gain", // Born Gain
          "nexus_rush"  // Nexus Rush
        ],
        any: true,
        description: "Requires Engagement Ring, Born Gain, or Nexus Rush"
      }
    ]
  },
  {
    id: "lethal_snare",
    name: "Lethal Snare",
    type: "Passive",
    gods: ["Artemis"],
    element: "Earth",
    effect: "Foes in your *Casts* may take *Critical* damage from your *Attacks*. \n ▸ Critical Chance: *+10%/+13%/+16%/+19%*",
    icon: "/assets/boons/artemis/Lethal_Snare.webp"
  },
  {
    id: "light_smite",
    name: "Light Smite",
    type: "Passive",
    gods: ["Apollo"],
    element: "Fire",
    effect: "After you take damage, automatically damage and Daze _all_ foes in the vicinity. \n ▸ Revenge Damage: 50/75/100/125",
    icon: "/assets/boons/apollo/Light_Smite.webp",
    inflictsCurse: "daze"
  },
  {
    id: "lightning_lance",
    name: "Lightning Lance",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Hold Cast to aim where the binding circle appears. Foes within are struck by lightning. \n ▸ Bolt Damage: 50/70/90/110",
    icon: "/assets/boons/zeus/Lightning_Lance.webp",
    prerequisites: [
      {
        boonIds: [
          "anvil_ring", // Anvil Ring
          "arctic_ring", // Arctic Ring
          "engagement_ring", // Engagement Ring
          "rapture_ring", // Rapture Ring
          "smolder_ring", // Smolder Ring
          "solar_ring", // Solar Ring
          "storm_ring", // Storm Ring
          "sword_ring", // Sword Ring
          "tidal_ring"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "local_climate",
    name: "Local Climate",
    type: "Passive",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Your \u03a9 Cast deals more damage. If you are in the binding circle, the bonus is doubled. \n ▸ Omega Cast Bonus Damage: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/demeter/Local_Climate.webp",
    prerequisites: [
      {
        boonIds: [
          "anvil_ring", // Anvil Ring
          "arctic_ring", // Arctic Ring
          "engagement_ring", // Engagement Ring
          "rapture_ring", // Rapture Ring
          "smolder_ring", // Smolder Ring
          "solar_ring", // Solar Ring
          "storm_ring", // Storm Ring
          "sword_ring", // Sword Ring
          "tidal_ring"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "love_handles",
    name: "Love Handles",
    type: "Duo",
    gods: ["Aphrodite", "Hephaestus"],
    element: "Aether",
    effect: "Your blast effects from Hephaestus also create a Heartthrob. \n ▸ Heartthrob Blast Damage: 160.",
    icon: "/assets/boons/duo/Love_Handles.webp",
    prerequisites: [
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish", // Flutter Flourish
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "lucid_gain",
    name: "Lucid Gain",
    type: "Magick",
    gods: ["Apollo"],
    element: "Air",
    effect: "Whenever your Casts expire, restore Magick. \n ▸ Magick Restored: 40/60/80/100",
    icon: "/assets/boons/apollo/Lucid_Gain.webp"
  },
  {
    id: "martial_art",
    name: "Martial Art",
    type: "Infusion",
    gods: ["Hephaestus"],
    element: null,
    effect: "Your Attack and Special deal more damage for each Earth Essence you have. \n ▸ Damage per Earth Essence: +5%",
    icon: "/assets/boons/hephaestus/Martial_Art.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 2 Earth Essence",
        element: "Earth",
        elementCount: 2
      }
    ]
  },
  {
    id: "master_conductor",
    name: "Master Conductor",
    type: "Duo",
    gods: ["Zeus", "Hephaestus"],
    element: "Aether",
    effect: "Your chain-lightning can bounce off of you and deals increasing damage to foes. \n ▸ Damage per Bounce: +15%",
    icon: "/assets/boons/duo/Master_Conductor.webp",
    prerequisites: [
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "anvil_ring", // Anvil Ring
          "smithy_rush", // Smithy Rush
          "tough_gain"  // Tough Gain
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, Anvil Ring, Smithy Rush, or Tough Gain"
      },
      {
        boonIds: [
          "static_shock"  // Static Shock
        ],
        any: true,
        description: "Requires Static Shock"
      }
    ]
  },
  {
    id: "meat_grinder",
    name: "Meat Grinder",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your \u03a9 Cast also creates a Blade Rift in the binding circle. \n ▸ Rift Damage (every 1 Sec.): 30/40/50/60",
    icon: "/assets/boons/ares/Meat_Grinder.webp",
    prerequisites: [
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "solar_ring", // Solar Ring
          "arctic_ring", // Arctic Ring
          "anvil_ring", // Anvil Ring
          "engagement_ring", // Engagement Ring
          "smolder_ring", // Smolder Ring
          "tidal_ring", // Tidal Ring
          "storm_ring", // Storm Ring
          "sword_ring"  // Sword Ring
        ],
        any: true,
        description: "Requires Rapture Ring, Solar Ring, Arctic Ring, Anvil Ring, Engagement Ring, Smolder Ring, Tidal Ring, Storm Ring, or Sword Ring"
      }
    ]
  },
  {
    id: "molten_touch",
    name: "Molten Touch",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Attacks and Specials deal bonus damage to Armor. \n ▸ Damage vs. Armor: +40%/+60%/+80%/+100%",
    icon: "/assets/boons/hephaestus/Molten_Touch.webp"
  },
  {
    id: "mutual_destruction",
    name: "Mutual Destruction",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "Gain a chance to deal *200%* damage that increases the less Health you have remaining. \n ▸ Chance per Missing Life Point: 0.1%/0.12%/0.14%/0.16%",
    icon: "/assets/boons/ares/Mutual_Destruction.webp"
  },
  {
    id: "natural_selection",
    name: "Natural Selection",
    type: "Duo",
    gods: ["Poseidon", "Demeter"],
    element: "Aether",
    effect: "Your *Boon(s)* in the leftmost column gain increased *Lv.* spread across however many you have. \n ▸ Total Bonus Lv. for Main Boon(s): +8",
    icon: "/assets/boons/duo/Natural_Selection.webp",
    prerequisites: [
      {
        boonIds: [
          "ice_strike", // Ice Strike
          "ice_flourish", // Ice Flourish
          "arctic_ring", // Arctic Ring
          "frigid_rush", // Frigid Rush
          "tranquil_gain"  // Tranquil Gain
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, Arctic Ring, Frigid Rush, or Tranquil Gain"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish", // Wave Flourish
          "tidal_ring", // Tidal Ring
          "breaker_rush", // Breaker Rush
          "flood_gain"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, Breaker Rush, or Flood Gain"
      },
      {
        boonIds: [
          "buried_treasure", // Buried Treasure
          "sea_star", // Sea Star
          "steady_growth", // Steady Growth
          "plentiful_forage"  // Plentiful Forage
        ],
        any: true,
        description: "Requires Buried Treasure, Sea Star, Steady Growth, or Plentiful Forage"
      }
    ]
  },
  {
    id: "nervous_wreck",
    name: "Nervous Wreck",
    type: "Legendary",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Whenever you inflict Weak, also randomly inflict Curses from other Olympians. \n ▸ Bonus Random Curses: 3.",
    icon: "/assets/boons/aphrodite/Nervous_Wreck.webp",
    prerequisites: [
      {
        boonIds: [
          "broken_resolve", // Broken Resolve
          "sweet_surrender", // Sweet Surrender
          "shameless_attitude", // Shameless Attitude
          "secret_crush"  // Secret Crush
        ],
        any: true,
        description: "Requires Broken Resolve, Sweet Surrender, Shameless Attitude, or Secret Crush"
      },
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish"  // Flutter Flourish
        ],
        any: true,
        description: "Requires Flutter Strike or Flutter Flourish"
      }
    ]
  },
  {
    id: "nexus_rush",
    name: "Nexus Rush",
    type: "Sprint",
    gods: ["Hera"],
    element: "Fire",
    effect: "Your Sprint inflicts Hitch on surrounding foes, and deals damage when it does. \n ▸ Damage with Hitch: 60/90/120/150",
    icon: "/assets/boons/hera/Nexus_Rush.webp",
    inflictsCurse: "hitch"
  },
  {
    id: "nova_flourish",
    name: "Nova Flourish",
    type: "Special",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Specials deal more damage in a larger area. \n ▸ Special Damage: +60%/+80%/+100%/+120%",
    icon: "/assets/boons/apollo/Nova_Flourish.webp"
  },
  {
    id: "nova_strike",
    name: "Nova Strike",
    type: "Attack",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Attacks deal more damage in a larger area. \n ▸ Attack Damage: +40%/+50%/+60%/+70%",
    icon: "/assets/boons/apollo/Nova_Strike.webp"
  },
  {
    id: "ocean_swell",
    name: "Ocean Swell",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Moves also launch a wide wave ahead that knocks foes away, but use +5 Magick. \n ▸ Wave Damage: 40/60/80/100",
    icon: "/assets/boons/poseidon/Ocean_Swell.webp"
  },
  {
    id: "passion_rush",
    name: "Passion Rush",
    type: "Sprint",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Rushing damages surrounding foes and inflicts Weak, and again once you stop. \n ▸ Blast Damage: 20/30/40/50",
    icon: "/assets/boons/aphrodite/Passion_Rush.webp",
    inflictsCurse: "weak"
  },
  {
    id: "perfect_image",
    name: "Perfect Image",
    type: "Passive",
    gods: ["Apollo"],
    element: "Air",
    effect: "You deal more damage until you take damage. If you take no more for *15 Sec.*, regain this. \n ▸ No-Hit Bonus Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/apollo/Perfect_Image.webp"
  },
  {
    id: "plentiful_forage",
    name: "Plentiful Forage",
    type: "Passive",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Whenever you gather resources from a Location, restore some Health. Gain *+1 Mystery Seed* now. \n ▸ Life Restored from Gathering: 10%/12%/14%/16%",
    icon: "/assets/boons/demeter/Plentiful_Forage.webp"
  },
  {
    id: "power_surge",
    name: "Power Surge",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Whenever you use Magick, a random surrounding foe is struck by lightning. \n ▸ Bolt Damage: 30/40/50/60",
    icon: "/assets/boons/zeus/Power_Surge.webp"
  },
  {
    id: "premium_service",
    name: "Premium Service",
    type: "Legendary",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Aspect of the Nocturnal Arms is even stronger. \n ▸ Aspect Bonus Ranks: +1",
    icon: "/assets/boons/hephaestus/Premium_Service.webp",
    prerequisites: [
      {
        boonIds: ["volcanic_strike", "volcanic_flourish", "smithy_rush"],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      },
      {
        boonIds: ["heavy_metal", "trusty_shield"],
        any: true,
        description: "Requires Heavy Metal or Trusty Shield"
      },
      {
        boonIds: ["grand_caldera", "molten_touch", "furnace_blast"],
        any: true,
        description: "Requires Grand Caldera, Molten Touch, or Furnace Blast"
      }
    ]
  },
  {
    id: "pressure_points",
    name: "Pressure Points",
    type: "Passive",
    gods: ["Artemis"],
    element: "Earth",
    effect: "Any damage you deal may be *Critical*. \n ▸ Critical Chance: *+3%/+4%/+5%/+6%*",
    icon: "/assets/boons/artemis/Pressure_Points.webp"
  },
  {
    id: "profuse_bleeding",
    name: "Profuse Bleeding",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "Whenever you inflict Wounds or collect Plasma, create a falling blade over a surrounding foe. \n ▸ Blade Damage: 30/50/70/90",
    icon: "/assets/boons/ares/Profuse_Bleeding.webp",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish", // Vicious Flourish
          "grisly_gain", // Grisly Gain
          "visceral_impact"  // Visceral Impact
        ],
        any: true,
        description: "Requires Vicious Strike, Vicious Flourish, Grisly Gain, or Visceral Impact"
      }
    ]
  },
  {
    id: "prominence_flare",
    name: "Prominence Flare",
    type: "Passive",
    gods: ["Apollo"],
    element: "Fire",
    effect: "After your \u03a9 Cast expires, rapidly deal damage in the area for *2 Sec.* \n ▸ Omega Cast Damage (every 0.13 Sec.): 10/12/14/16",
    icon: "/assets/boons/apollo/Prominence_Flare.webp",
    prerequisites: [
      {
        boonIds: [
          "anvil_ring", // Anvil Ring
          "arctic_ring", // Arctic Ring
          "engagement_ring", // Engagement Ring
          "rapture_ring", // Rapture Ring
          "smolder_ring", // Smolder Ring
          "solar_ring", // Solar Ring
          "storm_ring", // Storm Ring
          "sword_ring", // Sword Ring
          "tidal_ring"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "proper_upbringing",
    name: "Proper Upbringing",
    type: "Infusion",
    gods: ["Hera"],
    element: null,
    effect: "While you have at least *2* Earth, Water, Air, and Fire Essences, _all_ your Common Boons gain Rarity. \n ▸ Rarity Gained: Rare",
    icon: "/assets/boons/hera/Proper_Upbringing.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 2 Earth Essences",
        element: "Earth",
        elementCount: 2
      },
      {
        boonIds: [],
        description: "Requires 2 Water Essences",
        element: "Water",
        elementCount: 2
      },
      {
        boonIds: [],
        description: "Requires 2 Air Essences",
        element: "Air",
        elementCount: 2
      },
      {
        boonIds: [],
        description: "Requires 2 Fire Essences",
        element: "Fire",
        elementCount: 2
      }
    ]
  },
  {
    id: "pyro_technique",
    name: "Pyro Technique",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Scorch effects deal damage faster. \n ▸ Scorch Damage Rate: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/hestia/Pyro_Technique.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "queen_s_ransom",
    name: "Queen's Ransom",
    type: "Duo",
    gods: ["Hera", "Zeus"],
    element: "Aether",
    effect: "Give up _all_ your Boons of Zeus. For each, raise Lv. for _all_ your Boons of Hera. \n ▸ Bonus Lv. per Zeus Boon: +4",
    icon: "/assets/boons/duo/Queen's_Ransom.webp",
    prerequisites: [
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush", // Nexus Rush
          "born_gain"  // Born Gain
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, Nexus Rush, or Born Gain"
      },
      {
        boonIds: [
          "storm_ring", // Storm Ring
          "ionic_gain", // Ionic Gain
          "thunder_rush"  // Thunder Rush
        ],
        any: true,
        description: "Requires Storm Ring, Ionic Gain, or Thunder Rush"
      }
    ]
  },
  {
    id: "rallying_cry",
    name: "Rallying Cry",
    type: "Infusion",
    gods: ["Ares"],
    element: null,
    effect: "While you have at least *8* Earth Essences, any of your damaging effects from Olympians are stronger. \n ▸ Olympian Bonus Damage: +50%.",
    icon: "/assets/boons/ares/Rallying_Cry.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 8 Earth Essences",
        element: "Earth",
        elementCount: 8
      }
    ]
  },
  {
    id: "rapture_ring",
    name: "Rapture Ring",
    type: "Cast",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Your Casts inflict Weak, and damage foes while dragging them toward the center. \n ▸ Cast Damage (every 0.85 Sec.): 10/15/20/25",
    icon: "/assets/boons/aphrodite/Rapture_Ring.webp",
    inflictsCurse: "weak"
  },
  {
    id: "ripple_effect",
    name: "Ripple Effect",
    type: "Duo",
    gods: ["Hera", "Poseidon"],
    element: "Aether",
    effect: "Your effects from Fine Line and Ocean Swell have a chance to fire *2* times. \n ▸ Bonus Fire Chance: +30%",
    icon: "/assets/boons/duo/Ripple_Effect.webp",
    prerequisites: [
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "fine_line"  // Fine Line
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Fine Line"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish", // Wave Flourish
          "tidal_ring", // Tidal Ring
          "ocean_swell"  // Ocean Swell
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, or Ocean Swell"
      },
      {
        boonIds: [
          "fine_line", // Fine Line
          "ocean_swell"  // Ocean Swell
        ],
        any: true,
        description: "Requires Fine Line or Ocean Swell"
      }
    ]
  },
  {
    id: "romantic_spark",
    name: "Romantic Spark",
    type: "Duo",
    gods: ["Zeus", "Aphrodite"],
    element: "Aether",
    effect: "Rushing into foes with Blitz immediately activates the effect and makes it stronger. \n ▸ Bonus Blitz Damage: +80%",
    icon: "/assets/boons/duo/Romantic_Spark.webp",
    prerequisites: [
      {
        boonIds: [
          "flutter_strike", // Flutter Strike
          "flutter_flourish", // Flutter Flourish
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish"  // Heaven Flourish
        ],
        any: true,
        description: "Requires Heaven Strike or Heaven Flourish"
      }
    ]
  },
  {
    id: "rousing_reception",
    name: "Rousing Reception",
    type: "Passive",
    gods: ["Hera"],
    element: "Air",
    effect: "Your Casts damage any foes as they join the Encounter, wherever they appear. \n ▸ On-Spawn Damage: 60/80/100/120",
    icon: "/assets/boons/hera/Rousing_Reception.webp",
    prerequisites: [
      {
        boonIds: [
          "anvil_ring", // Anvil Ring
          "arctic_ring", // Arctic Ring
          "engagement_ring", // Engagement Ring
          "rapture_ring", // Rapture Ring
          "smolder_ring", // Smolder Ring
          "solar_ring", // Solar Ring
          "storm_ring", // Storm Ring
          "sword_ring", // Sword Ring
          "tidal_ring"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "rude_awakening",
    name: "Rude Awakening",
    type: "Duo",
    gods: ["Apollo", "Hephaestus"],
    element: "Aether",
    effect: "Your blast effects from Hephaestus clear Daze and deal more damage if they do. \n ▸ Bonus Blast Damage: 300",
    icon: "/assets/boons/duo/Rude_Awakening.webp",
    prerequisites: [
      {
        boonIds: [
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "light_smite", // Light Smite
          "dazzling_display"  // Dazzling Display
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Light Smite, or Dazzling Display"
      },
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "sanguinary_savor",
    name: "Sanguinary Savor",
    type: "Legendary",
    gods: ["Ares"],
    element: "Earth",
    effect: "You inflict Wounds with greater Power, and spilled BloodDrop is drawn to you automatically. \n ▸ Wounds Bonus Power: +100",
    icon: "/assets/boons/ares/Sanguinary_Savor.webp",
    prerequisites: [
      {
        boonIds: [
          "vicious_strike", // Vicious Strike
          "vicious_flourish", // Vicious Flourish
          "sword_ring", // Sword Ring
          "stabbing_rush"  // Stabbing Rush
        ],
        any: true,
        description: "Requires Vicious Strike, Vicious Flourish, Sword Ring, or Stabbing Rush"
      },
      {
        boonIds: [
          "grisly_gain", // Grisly Gain
          "visceral_impact", // Visceral Impact
          "profuse_bleeding"  // Profuse Bleeding
        ],
        any: true,
        description: "Requires Grisly Gain, Visceral Impact, or Profuse Bleeding"
      },
      {
        boonIds: [
          "meat_grinder", // Meat Grinder
          "grievous_blow", // Grievous Blow
          "mutual_destruction", // Mutual Destruction
          "blood_spree", // Blood Spree
          "cut_above"  // Cut Above
        ],
        any: true,
        description: "Requires Meat Grinder, Grievous Blow, Mutual Destruction, Blood Spree, or Cut Above"
      }
    ]
  },
  {
    id: "scalding_vapor",
    name: "Scalding Vapor",
    type: "Duo",
    gods: ["Poseidon", "Hestia"],
    element: "Aether",
    effect: "If foes with Froth are struck by your fire effects from Hestia, they are engulfed in Steam. \n ▸ Steam Damage (every 0.2 Sec.): 20",
    icon: "/assets/boons/duo/Scalding_Vapor.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring", // Smolder Ring
          "highly_flammable", // Highly Flammable
          "controlled_burn", // Controlled Burn
          "glowing_coal"  // Glowing Coal
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, Smolder Ring, Highly Flammable, Controlled Burn, or Glowing Coal"
      },
      {
        boonIds: [
          "slippery_slope"  // Slippery Slope
        ],
        any: true,
        description: "Requires Slippery Slope"
      }
    ]
  },
  {
    id: "sea_star",
    name: "Sea Star",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Whenever you claim rewards other than Boons, Daedalus Hammers, or rare resources, a copy may appear. \n ▸ Double Reward Chance: 25%/30%/35%/40%",
    icon: "/assets/boons/poseidon/Sea_Star.webp"
  },
  {
    id: "secret_crush",
    name: "Secret Crush",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Your Attacks gain Power, but you Prime 20 Magick. \n ▸ Bonus Power: +5/+7/+9/+11",
    icon: "/assets/boons/aphrodite/Secret_Crush.webp"
  },
  {
    id: "security_system",
    name: "Security System",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "At the start of each Encounter, you gain Armor that lasts for *7 Sec.* \n ▸ Temporary Starting Armor: 75/100/125/150",
    icon: "/assets/boons/hephaestus/Security_System.webp"
  },
  {
    id: "seismic_servo",
    name: "Seismic Servo",
    type: "Duo",
    gods: ["Poseidon", "Hephaestus"],
    element: "Aether",
    effect: "Any Boon effects that recharge over time now recharge faster. \n ▸ Recharge Speed: +35%",
    icon: "/assets/boons/duo/Seismic_Servo.webp",
    prerequisites: [
      {
        boonIds: [
          "volcanic_strike", // Volcanic Strike
          "volcanic_flourish", // Volcanic Flourish
          "smithy_rush"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      },
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish", // Wave Flourish
          "tidal_ring", // Tidal Ring
          "breaker_rush", // Breaker Rush
          "flood_gain"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, Breaker Rush, or Flood Gain"
      }
    ]
  },
  {
    id: "self_healing",
    name: "Self Healing",
    type: "Infusion",
    gods: ["Apollo"],
    element: null,
    effect: "While you have at least *3* Fire Essences, whenever you take damage, restore some Health. \n ▸ Damage Recovered (over 5 Sec.): 30%",
    icon: "/assets/boons/apollo/Self_Healing.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 3 Fire Essences",
        element: "Fire",
        elementCount: 3
      }
    ]
  },
  {
    id: "shadow_pounce",
    name: "Shadow Pounce",
    type: "Passive",
    gods: ["Artemis"],
    element: "Air",
    effect: "After you *Dash*, your *Ω Moves* may deal *Critical* damage for *2 Sec.* \n ▸ Omega Critical Chance: *+10%/+12%/+14%/+16%*",
    icon: "/assets/boons/artemis/Shadow_Pounce.webp"
  },
  {
    id: "shameless_attitude",
    name: "Shameless Attitude",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "You deal more damage. While you have at least 80% Health, the bonus is doubled. \n ▸ Bonus Damage: +5%/+7%/+9%/+11%",
    icon: "/assets/boons/aphrodite/Shameless_Attitude.webp"
  },
  {
    id: "shocking_loss",
    name: "Shocking Loss",
    type: "Legendary",
    gods: ["Zeus"],
    element: "Air",
    effect: "Whenever you first deal damage to susceptible foes, you may destroy them outright. \n ▸ Instant Destruction Chance: 25%",
    icon: "/assets/boons/zeus/Shocking_Loss.webp",
    prerequisites: [
      {
        boonIds: [
          "heaven_strike",
          "heaven_flourish",
          "storm_ring",
          "thunder_rush",
          "ionic_gain"
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, Thunder Rush, or Ionic Gain"
      },
      {
        boonIds: [
          "static_shock",
          "power_surge",
          "lightning_lance",
          "divine_vengeance"
        ],
        any: true,
        description: "Requires Static Shock, Power Surge, Lightning Lance, or Divine Vengeance"
      },
      {
        boonIds: [
          "arc_flash",
          "double_strike",
          "electric_overload"
        ],
        any: true,
        description: "Requires Arc Flash, Double Strike, or Electric Overload"
      }
    ]
  },
  {
    id: "slippery_slope",
    name: "Slippery Slope",
    type: "Passive",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your splash effects from Poseidon also inflict Froth, and Froth deals more damage. \n ▸ Froth Damage: +20%/+50%/+80%/+110%",
    icon: "/assets/boons/poseidon/Slippery_Slope.webp",
    inflictsCurse: "froth",
    prerequisites: [
      {
        boonIds: [
          "wave_strike", // Wave Strike
          "wave_flourish"  // Wave Flourish
        ],
        any: true,
        description: "Requires Wave Strike or Wave Flourish"
      }
    ]
  },
  {
    id: "slow_cooker",
    name: "Slow Cooker",
    type: "Infusion",
    gods: ["Hestia"],
    element: null,
    effect: "Your Attacks and Specials gain Power the more Fire Essences you have. \n ▸ Power per Fire Essence: +2",
    icon: "/assets/boons/hestia/Slow_Cooker.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 2 Fire Essences",
        element: "Fire",
        elementCount: 2
      }
    ]
  },
  {
    id: "smithy_rush",
    name: "Smithy Rush",
    type: "Sprint",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "If a foe is near after you Dash, you can cause a blast that deals *200* damage in the area. \n ▸ Blast Recharge Time: 10 Sec./9 Sec./8 Sec./7 Sec.",
    icon: "/assets/boons/hephaestus/Smithy_Rush.webp"
  },
  {
    id: "smolder_ring",
    name: "Smolder Ring",
    type: "Cast",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Casts repeatedly inflict Scorch on foes in the binding circle. \n ▸ Scorch Damage (every 1 Sec.): 40/60/80/100",
    icon: "/assets/boons/hestia/Smolder_Ring.webp",
    inflictsCurse: "scorch"
  },
  {
    id: "snow_queen",
    name: "Snow Queen",
    type: "Passive",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Gain a barrier that stops *1* instance of damage in each Location, but you Prime Magick. \n ▸ Magick Primed: 25/20/15/10",
    icon: "/assets/boons/demeter/Snow_Queen.webp"
  },
  {
    id: "snuffed_candle",
    name: "Snuffed Candle",
    type: "Passive",
    gods: ["Hestia"],
    element: "Fire",
    effect: "You deal more damage to foes that are nowhere near other foes. \n ▸ Damage to Isolated Foes: +15%/+18%/+21%/+24%",
    icon: "/assets/boons/hestia/Snuffed_Candle.webp"
  },
  {
    id: "solar_ring",
    name: "Solar Ring",
    type: "Cast",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your Casts inflict Daze, and deal a burst of damage before they expire. \n ▸ Cast Damage: 80/120/160/200",
    icon: "/assets/boons/apollo/Solar_Ring.webp",
    inflictsCurse: "daze"
  },
  {
    id: "spiritual_affirmation",
    name: "Spiritual Affirmation",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Gain Max Health and Max Magick now and for the rest of this night. \n ▸ Bonus Life & Magick Gain: +15%/+20%/+25%/+30%",
    icon: "/assets/boons/aphrodite/Spiritual_Affirmation.webp"
  },
  {
    id: "stabbing_rush",
    name: "Stabbing Rush",
    type: "Sprint",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Dash creates a row of falling blades along your path. \n ▸ Blades Damage: 30/45/60/75",
    icon: "/assets/boons/ares/Stabbing_Rush.webp"
  },
  {
    id: "static_shock",
    name: "Static Shock",
    type: "Passive",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your strikes emit chain-lightning that bounces up to *4* times, but you Prime 50 Magick. \n ▸ Chain-Lightning Damage: 10/15/20/25",
    icon: "/assets/boons/zeus/Static_Shock.webp"
  },
  {
    id: "steady_growth",
    name: "Steady Growth",
    type: "Passive",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Whenever you clear enough Encounters, a random Boon you have gains Rarity. \n ▸ Encounters per Rarity Upgrade: 6/5/4/3",
    icon: "/assets/boons/demeter/Steady_Growth.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires at least one Boon that is not Heroic rarity"
      }
    ]
  },
  {
    id: "storm_ring",
    name: "Storm Ring",
    type: "Cast",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Casts cause lightning bolts to repeatedly strike *1* foe at a time in the binding circle. \n ▸ Bolt Damage (every 0.35 Sec.): 25/30/35/40",
    icon: "/assets/boons/zeus/Storm_Ring.webp"
  },
  {
    id: "sun_worshiper",
    name: "Sun Worshiper",
    type: "Duo",
    gods: ["Hera", "Apollo"],
    element: "Aether",
    effect: "In each Encounter, the first foe you slay returns to fight for you. \n ▸ Servant Damage: +200%",
    icon: "/assets/boons/duo/Sun_Worshiper.webp",
    prerequisites: [
      {
        boonIds: [
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "engagement_ring", // Engagement Ring
          "nexus_rush", // Nexus Rush
          "born_gain"  // Born Gain
        ],
        any: true,
        description: "Requires Engagement Ring, Nexus Rush, or Born Gain"
      }
    ]
  },
  {
    id: "sunny_disposition",
    name: "Sunny Disposition",
    type: "Duo",
    gods: ["Apollo", "Aphrodite"],
    element: "Aether",
    effect: "Whenever you create Heartthrobs, create more. \n ▸ Bonus Heartthrobs: +2.",
    icon: "/assets/boons/duo/Sunny_Disposition.webp",
    prerequisites: [
      {
        boonIds: [
          "heart_breaker"  // Heart Breaker
        ],
        any: true,
        description: "Requires Heart Breaker"
      },
      {
        boonIds: [
          "nova_strike", // Nova Strike
          "nova_flourish", // Nova Flourish
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      }
    ]
  },
  {
    id: "support_fire",
    name: "Support Fire",
    type: "Passive",
    gods: ["Artemis"],
    element: "Air",
    effect: "After you hit with your *Attacks* or *Specials*, fire a seeking arrow. \n ▸ Arrow Damage: *10/15/20/25*",
    icon: "/assets/boons/artemis/Support_Fire.webp"
  },
  {
    id: "super_nova",
    name: "Super Nova",
    type: "Passive",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Casts expand in size until they expire. \n ▸ Max Cast Size: 40%/50%/60%/70%",
    icon: "/assets/boons/apollo/Super_Nova.webp"
  },
  {
    id: "sweet_surrender",
    name: "Sweet Surrender",
    type: "Passive",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Weak-afflicted foes take more damage. \n ▸ Damage vs. Weak: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/aphrodite/Sweet_Surrender.webp",
    prerequisites: [
      {
        boonIds: [
          "rapture_ring", // Rapture Ring
          "passion_rush", // Passion Rush
          "glamour_gain"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      }
    ]
  },
  {
    id: "sword_ring",
    name: "Sword Ring",
    type: "Cast",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Casts create a falling blade over each foe in the binding circle. \n ▸ Blade Damage: 120/160/200/240",
    icon: "/assets/boons/ares/Sword_Ring.webp"
  },
  {
    id: "sworn_flourish",
    name: "Sworn Flourish",
    type: "Special",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Specials deal more damage and inflict Hitch. \n ▸ Special Damage: +60%/+70%/+80%/+90%",
    icon: "/assets/boons/hera/Sworn_Flourish.webp",
    inflictsCurse: "hitch"
  },
  {
    id: "sworn_strike",
    name: "Sworn Strike",
    type: "Attack",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Attacks deal more damage and inflict Hitch. \n ▸ Attack Damage: +50%/+60%/+70%/+80%",
    icon: "/assets/boons/hera/Sworn_Strike.webp",
    inflictsCurse: "hitch"
  },
  {
    id: "thermal_dynamics",
    name: "Thermal Dynamics",
    type: "Duo",
    gods: ["Zeus", "Hestia"],
    element: "Aether",
    effect: "Your Blitz effects also inflict Scorch whenever they deal damage. \n ▸ Scorch Damage: 160",
    icon: "/assets/boons/duo/Thermal_Dynamics.webp",
    inflictsCurse: "scorch",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      },
      {
        boonIds: [
          "heaven_strike", // Heaven Strike
          "heaven_flourish"  // Heaven Flourish
        ],
        any: true,
        description: "Requires Heaven Strike or Heaven Flourish"
      }
    ]
  },
  {
    id: "thunder_rush",
    name: "Thunder Rush",
    type: "Sprint",
    gods: ["Zeus"],
    element: "Air",
    effect: "Rushing causes surrounding foes to be struck by lightning bolts. \n ▸ Bolt Damage (every 0.35 Sec.): 20/25/30/35",
    icon: "/assets/boons/zeus/Thunder_Rush.webp"
  },
  {
    id: "tidal_ring",
    name: "Tidal Ring",
    type: "Cast",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Casts also immediately hit foes with a powerful splash that inflicts Froth. \n ▸ Splash Damage: 60/90/120/150",
    icon: "/assets/boons/poseidon/Tidal_Ring.webp",
    inflictsCurse: "froth"
  },
  {
    id: "tough_gain",
    name: "Tough Gain",
    type: "Magick",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Whenever you take damage, shrug some of it off and restore 150 Magick. \n ▸ Damage per Hit: -1/-2/-3/-4",
    icon: "/assets/boons/hephaestus/Tough_Gain.webp"
  },
  {
    id: "tranquil_gain",
    name: "Tranquil Gain",
    type: "Magick",
    gods: ["Demeter"],
    element: "Earth",
    effect: "After remaining inactive for *0.5 Sec.*, rapidly restores Magick until you act. \n ▸ Magick Restoration (every 1 Sec.): 50%/75%/100%/125%",
    icon: "/assets/boons/demeter/Tranquil_Gain.webp"
  },
  {
    id: "tropical_cyclone",
    name: "Tropical Cyclone",
    type: "Duo",
    gods: ["Demeter", "Apollo"],
    element: "Aether",
    effect: "While standing in a Gust, you randomly fire gales every *0.3 Sec.* \n ▸ Gale Damage (every 0.5 Sec.): 70.",
    icon: "/assets/boons/duo/Tropical_Cyclone.webp",
    prerequisites: [
      {
        boonIds: [
          "nova_strike", // Nova Strike
          "nova_flourish", // Nova Flourish
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "lucid_gain"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "frigid_rush", // Frigid Rush
          "arctic_gale"  // Arctic Gale
        ],
        any: true,
        description: "Requires Frigid Rush or Arctic Gale"
      }
    ]
  },
  {
    id: "trusty_shield",
    name: "Trusty Shield",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Whenever you enter a Location, gain Armor for that Location, but you Prime 30 Magick. \n ▸ Starting Armor: +10/+15/+20/+25",
    icon: "/assets/boons/hephaestus/Trusty_Shield.webp"
  },
  {
    id: "uncanny_fortitude",
    name: "Uncanny Fortitude",
    type: "Passive",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Gain bonus Max Health based on your Magick limit. \n ▸ Max Life from Magick: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/hephaestus/Uncanny_Fortitude.webp"
  },
  {
    id: "uncommon_grace",
    name: "Uncommon Grace",
    type: "Passive",
    gods: ["Hera"],
    element: "Fire",
    effect: "While none of your other Boons are Common, deal more damage. \n ▸ Common-Less Bonus Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/hera/Uncommon_Grace.webp"
  },
  {
    id: "universal_donor",
    name: "Universal Donor",
    type: "Duo",
    gods: ["Hera", "Ares"],
    element: "Aether",
    effect: "Whenever you exit a Location, keep some of your Plasma bonuses. \n ▸ Max Plasma Bonus Retained: 20%",
    icon: "/assets/boons/duo/Universal_Donor.webp",
    prerequisites: [
      {
        boonIds: [
          "grisly_gain", // Grisly Gain
          "visceral_impact", // Visceral Impact
          "profuse_bleeding"  // Profuse Bleeding
        ],
        any: true,
        description: "Requires Grisly Gain, Visceral Impact, or Profuse Bleeding"
      },
      {
        boonIds: [
          "sworn_strike", // Sworn Strike
          "sworn_flourish", // Sworn Flourish
          "engagement_ring", // Engagement Ring
          "nexus_rush", // Nexus Rush
          "born_gain"  // Born Gain
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, Nexus Rush, or Born Gain"
      }
    ]
  },
  {
    id: "vicious_flourish",
    name: "Vicious Flourish",
    type: "Special",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Specials deal more damage and inflict Wounds. \n ▸ Special Damage: +30%/+40%/+50%/+60%.",
    icon: "/assets/boons/ares/Vicious_Flourish.webp",
    inflictsCurse: "wounds"
  },
  {
    id: "vicious_strike",
    name: "Vicious Strike",
    type: "Attack",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Attacks deal more damage and inflict Wounds. \n ▸ Attack Damage: +20%/+30%/+40%/+50%.",
    icon: "/assets/boons/ares/Vicious_Strike.webp",
    inflictsCurse: "wounds"
  },
  {
    id: "visceral_impact",
    name: "Visceral Impact",
    type: "Passive",
    gods: ["Ares"],
    element: "Earth",
    effect: "After you take damage or a foe is slain, spill Plasma, sometimes twice. \n ▸ Bonus Plasma Chance: 25%/35%/45%/55%",
    icon: "/assets/boons/ares/Visceral_Impact.webp"
  },
  {
    id: "vital_sign",
    name: "Vital Sign",
    type: "Passive",
    gods: ["Artemis"],
    element: "Earth",
    effect: "Foes with at least *80% Health* or *80% Armor* may take *Critical* damage. \n ▸ Critical Chance: *+15%/+22%/+30%/+38%*",
    icon: "/assets/boons/artemis/Vital_Sign.webp"
  },
  {
    id: "volcanic_flourish",
    name: "Volcanic Flourish",
    type: "Special",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Specials can cause a blast that deals *500* damage in the area. \n ▸ Blast Recharge Time: 15 Sec./13 Sec./11 Sec./9 Sec.",
    icon: "/assets/boons/hephaestus/Volcanic_Flourish.webp"
  },
  {
    id: "volcanic_strike",
    name: "Volcanic Strike",
    type: "Attack",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Attacks can cause a blast that deals *400* damage in the area. \n ▸ Blast Recharge Time: 12 Sec./10 Sec./8 Sec./6 Sec.",
    icon: "/assets/boons/hephaestus/Volcanic_Strike.webp"
  },
  {
    id: "warm_breeze",
    name: "Warm Breeze",
    type: "Duo",
    gods: ["Apollo", "Hestia"],
    element: "Aether",
    effect: "Whenever you Dodge or Daze causes a foe to miss, restore some Health. \n ▸ Life Restored per Evasion: 10",
    icon: "/assets/boons/duo/Warm_Breeze.webp",
    prerequisites: [
      {
        boonIds: [
          "solar_ring", // Solar Ring
          "blinding_rush", // Blinding Rush
          "light_smite", // Light Smite
          "dazzling_display"  // Dazzling Display
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Light Smite, or Dazzling Display"
      },
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flame_flourish", // Flame Flourish
          "smolder_ring", // Smolder Ring
          "heat_rush", // Heat Rush
          "cardio_gain"  // Cardio Gain
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, Smolder Ring, Heat Rush, or Cardio Gain"
      }
    ]
  },
  {
    id: "water_fitness",
    name: "Water Fitness",
    type: "Infusion",
    gods: ["Poseidon"],
    element: null,
    effect: "Gain Max Health for each Water Essence you have. \n ▸ Max Life per Water Essence: +15",
    icon: "/assets/boons/poseidon/Water_Fitness.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 2 Water Essences",
        element: "Water",
        elementCount: 2
      }
    ]
  },
  {
    id: "wave_flourish",
    name: "Wave Flourish",
    type: "Special",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Specials hit foes with a splash that knocks other foes away. \n ▸ Splash Damage: 25/35/45/55",
    icon: "/assets/boons/poseidon/Wave_Flourish.webp"
  },
  {
    id: "wave_strike",
    name: "Wave Strike",
    type: "Attack",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Attacks hit foes with a splash that knocks other foes away. \n ▸ Splash Damage: 20/25/30/35",
    icon: "/assets/boons/poseidon/Wave_Strike.webp"
  },
  {
    id: "weed_killer",
    name: "Weed Killer",
    type: "Passive",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Your \u03a9 Attack deals more damage, but uses +10 Magick. \n ▸ Omega Attack Damage: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/demeter/Weed_Killer.webp",
    prerequisites: [
      {
        boonIds: [
          "flame_strike", // Flame Strike
          "flutter_strike", // Flutter Strike
          "heaven_strike", // Heaven Strike
          "ice_strike", // Ice Strike
          "nova_strike", // Nova Strike
          "sworn_strike", // Sworn Strike
          "vicious_strike", // Vicious Strike
          "volcanic_strike", // Volcanic Strike
          "wave_strike"  // Wave Strike
        ],
        any: true,
        description: "Requires any Attack Boon"
      }
    ]
  },
  {
    id: "winter_harvest",
    name: "Winter Harvest",
    type: "Legendary",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Freeze-afflicted foes shatter at 10% Health, dealing damage in the area. \n ▸ Shatter Area Damage: 100",
    icon: "/assets/boons/demeter/Winter_Harvest.webp",
    prerequisites: [
      {
        boonIds: ["ice_strike", "ice_flourish", "arctic_ring"],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, or Arctic Ring"
      },
      {
        boonIds: ["plentiful_forage", "snow_queen", "steady_growth"],
        any: true,
        description: "Requires Plentiful Forage, Snow Queen, or Steady Growth"
      },
      {
        boonIds: ["weed_killer", "cold_storage", "local_climate"],
        any: true,
        description: "Requires Weed Killer, Cold Storage, or Local Climate"
      }
    ]
  },
  {
    id: "whispered_prayer",
    name: "Whispered Prayer",
    type: "Passive",
    gods: ["Artemis"],
    element: "Air",
    effect: "Your *Hex* may deal *Critical* damage. \n ▸ Hex Critical Chance: *+30%/+35%/+40%/+45%*",
    icon: "/assets/boons/artemis/Whispered_Prayer.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires an offensive Hex (Selene): Twilight Curse, Lunar Ray, Wolf Howl, Total Eclipse, Dark Side, or Sky Fall"
      }
    ]
  },
  {
    id: "wispy_wiles",
    name: "Wispy Wiles",
    type: "Infusion",
    gods: ["Aphrodite"],
    element: null,
    effect: "Gain a chance to Dodge for each Air Essence you have. \n ▸ Dodge Chance per Air Essence: +2%",
    icon: "/assets/boons/aphrodite/Wispy_Wiles.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 2 Air Essences",
        element: "Air",
        elementCount: 2
      }
    ]
  },
  {
    id: "nimble_limbs",
    name: "Nimble Limbs",
    type: "Passive",
    gods: ["Hermes"],
    element: "Earth",
    effect: "Your *Attack, Special,* and *Cast* are faster. \n ▸ Strike Speed: *+10%/+15%/+20%/+25%*",
    icon: "/assets/boons/hermes/Nimble_Limbs.webp"
  },
  {
    id: "racing_thoughts",
    name: "Racing Thoughts",
    type: "Passive",
    gods: ["Hermes"],
    element: "Earth",
    effect: "Your *Ω Moves* are faster. \n ▸ Omega Move Speed: *+15%/+20%/+25%/+30%*",
    icon: "/assets/boons/hermes/Racing_Thoughts.webp"
  },
  {
    id: "winners_circle",
    name: "Winners Circle",
    type: "Passive",
    gods: ["Hermes"],
    element: "Earth",
    effect: "You *Channel* your *Ω Cast* faster and your *Casts* deal damage and expire faster \n ▸ Cast Speed: *+40%/+50%/+60%/+70%*",
    icon: "/assets/boons/hermes/Winner's_Circle.webp"
  },
  {
    id: "nitro_boost",
    name: "Nitro Boost",
    type: "Passive",
    gods: ["Hermes"],
    element: "Fire",
    effect: "Your *Sprint* is *15%* faster and gives you a barrier that ignores instances of damage. \n ▸ Hits Blocked per Encounter: *1/2/3/4*",
    icon: "/assets/boons/hermes/Nitro_Boost.webp"
  },
  {
    id: "stutter_step",
    name: "Stutter Step",
    type: "Passive",
    gods: ["Hermes"],
    element: "Earth",
    effect: "You can *Dash* more frequently. \n ▸ Dash Recovery Speed: *+25%/+30%/+35%/+40%*",
    icon: "/assets/boons/hermes/Stutter_Step.webp"
  },
  {
    id: "hasty_retreat",
    name: "Hasty Retreat",
    type: "Passive",
    gods: ["Hermes"],
    element: "Air",
    effect: "Gain *Dodge* chance and move speed that increase the more *Boons* you have. \n ▸ Bonus per Boon: *+0.5%/+0.75%/+1%/+1.25%*",
    icon: "/assets/boons/hermes/Hasty_Retreat.webp"
  },
  {
    id: "hard_target",
    name: "Hard Target",
    type: "Passive",
    gods: ["Hermes"],
    element: "Air",
    effect: "Most foes' ranged shots are slower. \n ▸ Foe Projectile Speed: *-30%/-40%/-50%/-60%*",
    icon: "/assets/boons/hermes/Hard_Target.webp"
  },
  {
    id: "quick_buck",
    name: "Quick Buck",
    type: "Passive",
    gods: ["Hermes"],
    element: "Air",
    effect: "Any Gold you gain is worth more. Receive *+100 Gold* now, plus the bonus! \n ▸ Bonus Gold: *+20%/+30%/+40%/+50%*",
    icon: "/assets/boons/hermes/Quick_Buck.webp"
  },
  {
    id: "mean_streak",
    name: "Mean Streak",
    type: "Passive",
    gods: ["Hermes"],
    element: "Air",
    effect: "Whenever you slay a foe, deal more damage with your *Weapon* for the next *45 Sec.* \n ▸ Bonus Damage per Slain Foe: *+1%/+1.5%/+2%/+2.5%*",
    icon: "/assets/boons/hermes/Mean_Streak.webp"
  },
  {
    id: "travel_deal",
    name: "Travel Deal",
    type: "Passive",
    gods: ["Hermes"],
    element: "Fire",
    effect: "Your first purchase in each *Location* costs less *Gold*, and another item appears afterwards. \n ▸ First-Purchase Discount: *-5%/-10%/-15%/-20%*",
    icon: "/assets/boons/hermes/Travel_Deal.webp"
  },
  {
    id: "success_rate",
    name: "Success Rate",
    type: "Passive",
    gods: ["Hermes"],
    element: "Water",
    effect: "Your chance-based effects are most likely to occur, except for *Dodge* or *Daze*. \n ▸ Greater Chances: *30%/40%/50%/60%*",
    icon: "/assets/boons/hermes/Success_Rate.webp",
    prerequisites: [
      {
        boonIds: [
          "sea_star",
          "divine_vengeance",
          "double_strike",
          "dazzling_display",
          "extra_dose",
          "pressure_points",
          "vital_sign",
          "lethal_snare",
          "death_warrant",
          "killing_stroke",
          "grisly_gain",
          "visceral_impact",
          "mutual_destruction",
          "grievous_blow",
          "profuse_bleeding",
          "arterial_spray"
        ],
        any: true,
        description: "One of the following:\n- Poseidon: Sea Star\n- Zeus: Divine Vengeance, or Double Strike\n- Apollo: Dazzling Display, or Extra Dose\n- Artemis: Pressure Points, Vital Sign, Lethal Snare, Death Warrant, or Killing Stroke\n- Ares: Grisly Gain, Visceral Impact, Mutual Destruction, Grievous Blow, or Profuse Bleeding\n- Duo Boon (their duo): Arterial Spray"
      }
    ]
  },
  {
    id: "tall_order",
    name: "Tall Order",
    type: "Infusion",
    gods: ["Hermes"],
    element: null,
    effect: "While you have at least *8 Earth Essences*, *8 Water Essences*, *8 Air Essences*, *or *8 Fire Essences*, you deal more damage. \n ▸ Infused Damage: *+25%*",
    icon: "/assets/boons/hermes/Tall_Order.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "Requires 8 Earth Essences",
        element: "Earth",
        elementCount: 8
      },
      {
        boonIds: [],
        description: "Requires 8 Water Essences",
        element: "Water",
        elementCount: 8
      },
      {
        boonIds: [],
        description: "Requires 8 Air Essences",
        element: "Air",
        elementCount: 8
      },
      {
        boonIds: [],
        description: "Requires 8 Fire Essences",
        element: "Fire",
        elementCount: 8
      }
    ]
  },
  {
    id: "paid_dues",
    name: "Paid Dues",
    type: "Legendary",
    gods: ["Hermes"],
    element: "Air",
    effect: "Whenever you take damage, you lose *Gold* before you lose *Health*. \n ▸ Cost per Damage Point: *-3*",
    icon: "/assets/boons/hermes/Paid_Dues.webp",
    prerequisites: [
      {
        boonIds: [
          "nimble_limbs",
          "racing_thoughts",
          "hard_target",
          "winners_circle",
          "stutter_step",
          "hasty_retreat",
          "mean_streak",
          "nitro_boost"
        ],
        any: true,
        description: "One of the following: Nimble Limbs, Racing Thoughts, Hard Target, Winners Circle, Stutter Step, Hasty Retreat, Mean Streak, or Nitro Boost"
      }
    ]
  },
  {
    id: "life_tax",
    name: "Life Tax",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "Restore Health for *1%* of damage you deal, until you reach the limit. \n ▸ Max Total Life Restored: *150*",
    icon: "/assets/boons/hades/Life_Tax.webp"
  },
  {
    id: "howling_soul",
    name: "Howling Soul",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "Your *Casts* launch a projectile that seeks foes. The binding circle forms where it hits. \n ▸ Direct-Hit Damage: *200*",
    icon: "/assets/boons/hades/Howling_Soul.webp"
  },
  {
    id: "old_grudge",
    name: "Old Grudge",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "In your confrontation, *Chronos*/*Typhon* takes a burst of damage after the first *3 Sec.* \n ▸ Chronos/Typhon Life Reduced: *-20% Health*",
    icon: "/assets/boons/hades/Old_Grudge.webp"
  },
  {
    id: "deep_dissent",
    name: "Deep Dissent",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "In your confrontation, *Chronos*/*Typhon* summons fewer reinforcements. \n ▸ Chronos/Typhon Foes Summoned: *-50%*",
    icon: "/assets/boons/hades/Deep_Dissent.webp"
  },
  {
    id: "gigaros_dash",
    name: "Gigaros Dash",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "Your *Dash* strikes surrounding foes with a punishing sweep that inflicts *Scorn*. \n ▸ Sweep Damage: *50*",
    icon: "/assets/boons/hades/Gigaros_Dash.webp",
    inflictsCurse: "scorn"
  },
  {
    id: "last_gasp",
    name: "Last Gasp",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "Deal more damage based on how many times you used *Death Defiance* this night. \n ▸ Damage per Death Defiance used: *+10%*",
    icon: "/assets/boons/hades/Last_Gasp.webp",
    prerequisites: [
      {
        boonIds: [],
        description: "At least one Death Defiance",
        type: "death_defiance_min",
        value: 1
      }
    ]
  },
  {
    id: "cinerary_circle",
    name: "Cinerary Circle",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "Whenever you use *60 Magick*, summon *3 Soul Urns* around you. \n ▸ Soul Urn Damage: *200*",
    icon: "/assets/boons/hades/Cinerary_Circle.webp"
  },
  {
    id: "unseen_ire",
    name: "Unseen Ire",
    type: "Passive",
    gods: ["Hades"],
    element: null,
    effect: "After you take damage, go *Dark* and deal more damage for the duration. \n ▸ Damage While Dark: *+70%*",
    icon: "/assets/boons/hades/Unseen_Ire.webp"
  }
];
