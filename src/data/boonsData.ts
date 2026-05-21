import { Boon } from '../types';

export const BOONS: Boon[] = [
  {
    id: "0ff1be85-e334-5742-a00a-226facaa13f1",
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
    id: "8a7e45a9-f976-59f5-aed9-a45bec173935",
    name: "All Together",
    type: "Legendary",
    gods: ["Hera"],
    element: "Aether",
    effect: "Gain Earth, Water, Air, and Fire Essence, and *1* Infusion Boon for each. \n ▸ Essences Gained per Element: +1",
    icon: "/assets/boons/hera/All_Together.webp"
  },
  {
    id: "9341e2b7-38a7-5684-8bbd-a9978b055726",
    name: "Anvil Ring",
    type: "Cast",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Casts deal damage *3* times in succession to foes in the binding circle. \n ▸ Cast Damage (every 1 Sec.): 60/70/80/90",
    icon: "/assets/boons/hephaestus/Anvil_Ring.webp"
  },
  {
    id: "e70d8b09-a94a-5b8d-90f1-874b355051b4",
    name: "Arc Flash",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Damage from Ω Moves immediately activates Blitz effects and makes them stronger. \n ▸ Omega-Blitz Bonus Damage: +30%/+40%/+50%/+60%",
    icon: "/assets/boons/zeus/Arc_Flash.webp"
  },
  {
    id: "0760776f-5eaa-534a-833c-8d8dd3ded47c",
    name: "Arctic Gale",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Casts also create a Gust at the binding circle. \n ▸ Gust Area Damage (every 0.25 Sec.): 4/8/12/16",
    icon: "/assets/boons/demeter/Arctic_Gale.webp"
  },
  {
    id: "e8e876fb-519e-5b75-bfe6-5f05079f62c1",
    name: "Arctic Ring",
    type: "Cast",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Casts inflict Freeze and repeatedly deal damage to foes in the binding circle. \n ▸ Cast Damage (every 0.5 Sec.): 10/15/20/25",
    icon: "/assets/boons/demeter/Arctic_Ring.webp"
  },
  {
    id: "3cc47d40-d0d9-5d2a-8e40-e8f9f3b7c44e",
    name: "Arterial Spray",
    type: "Duo",
    gods: ["Poseidon", "Ares"],
    element: "Aether",
    effect: "Your splash effects from Poseidon may hit *2* times _(and take the color of the River Styx)_. \n ▸ Double Splash Chance: 25%",
    icon: "/assets/boons/duo/Arterial_Spray.webp"
  },
  {
    id: "fbe7a0b7-94e3-5c60-a593-06210f26053d",
    name: "Back Burner",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Foes with Daze take more damage if struck from behind. \n ▸ Backstab Damage: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/apollo/Back_Burner.webp",
    prerequisites: [
      {
        boonIds: [
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "b16d3778-57f6-5f4c-b33b-25364fc0238c", // Dazzling Display
          "abde81b0-8578-5373-b6c8-f49ab73f6a98"  // Light Smite
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Dazzling Display, or Light Smite"
      }
    ]
  },
  {
    id: "a530eb3d-8188-5895-8f3a-fb5e28933c2b",
    name: "Beach Ball",
    type: "Duo",
    gods: ["Poseidon", "Apollo"],
    element: "Aether",
    effect: "Your Sprint creates a watery globe behind you, which surges ahead once you stop. \n ▸ Max Blast Damage (after 2 Sec.): 300",
    icon: "/assets/boons/duo/Beach_Ball.webp",
    prerequisites: [
      {
        boonIds: [
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "677ad451-8bea-54fc-94c9-82953d9044e8", // Nova Flourish
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, or Lucid Gain"
      },
      {
        boonIds: [
          "f43cb7a0-733f-5797-87f2-e1dcfea27273", // Wave Strike
          "33734633-ed5b-526f-acb1-4662f97893e2", // Wave Flourish
          "5ce45cef-32e6-5a80-9d69-f48ef53f07de", // Tidal Ring
          "e47cd742-6e4c-53cc-9da5-f08e381d7eb3"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, or Flood Gain"
      },
      {
        boonIds: [
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "3d9b7234-b439-502a-8dae-581fc3ad6359"  // Breaker Rush
        ],
        any: true,
        description: "Requires Blinding Rush or Breaker Rush"
      }
    ]
  },
  {
    id: "9f297b05-6e18-537a-8845-79c082317b9d",
    name: "Blinding Rush",
    type: "Sprint",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your Sprint is faster and inflicts Daze on surrounding foes. \n ▸ Sprint Speed: +15%/+20%/+25%/+30%",
    icon: "/assets/boons/apollo/Blinding_Rush.webp"
  },
  {
    id: "e625b64a-23d8-5b20-bbef-e9e3056331a2",
    name: "Blood Spree",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "While you have less than 40 Health, your Attacks and Specials restore Health. \n ▸ Life Restored per Hit: 1/2/3/4",
    icon: "/assets/boons/ares/Blood_Spree.webp"
  },
  {
    id: "da411c4d-69ec-5427-8d4e-a7101c649833",
    name: "Born Gain",
    type: "Magick",
    gods: ["Hera"],
    element: "Water",
    effect: "Whenever you run out of Magick, Prime until the next Location to restore _all_ Magick. \n ▸ Magick Primed: 20/18/16/14",
    icon: "/assets/boons/hera/Born_Gain.webp"
  },
  {
    id: "600d8550-c4f7-5863-9bdf-62a1c4799f6f",
    name: "Brave Face",
    type: "Duo",
    gods: ["Hera", "Hephaestus"],
    element: "Aether",
    effect: "Automatically use Magick to resist up to *30%* of any damage. \n ▸ Magic Cost per Damage Point: 10 Magick",
    icon: "/assets/boons/duo/Brave_Face.webp"
  },
  {
    id: "3d9b7234-b439-502a-8dae-581fc3ad6359",
    name: "Breaker Rush",
    type: "Sprint",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Whenever you Sprint, hit the first foe you run into with a blast that knocks foes away. \n ▸ Impact Blast Damage: 80/100/120/140",
    icon: "/assets/boons/poseidon/Breaker_Rush.webp"
  },
  {
    id: "4df66a2a-6baa-5935-97a8-0dee45b63c36",
    name: "Bridal Glow",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Water",
    effect: "Make *1* random Boon become Heroic and give it Lv. \n ▸ Bonus Lv.:+1/+2/+3/+4",
    icon: "/assets/boons/hera/Bridal_Glow.webp"
  },
  {
    id: "b9e84fce-bfbb-5ee7-a821-f55fa8b6b984",
    name: "Broken Resolve",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Weak effects are more potent. \n ▸ Weak Damage Reduction: +10%/+12%/+14%/+16%",
    icon: "/assets/boons/aphrodite/Broken_Resolve.webp",
    prerequisites: [
      {
        boonIds: [
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      }
    ]
  },
  {
    id: "be5d5870-6628-523b-b174-1166d7ae9ab1",
    name: "Buried Treasure",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Any Minor Finds and Gold Crowns are worth more, and you receive Gold, Healing, and Bones now. \n ▸ Reward Value: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/poseidon/Buried_Treasure.webp"
  },
  {
    id: "0bdd993c-bb6f-5f9c-a103-9699cec5a0c8",
    name: "Burning Desire",
    type: "Duo",
    gods: ["Aphrodite", "Hestia"],
    element: "Aether",
    effect: "While foes are Weak, any Scorch they have does not diminish as it deals damage. \n ▸ Scorch Duration on Weak Foes: \u221E",
    icon: "/assets/boons/duo/Burning_Desire.webp",
    prerequisites: [
      {
        boonIds: [
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "ed24b45a-d7bc-57d9-817d-989521fc5bf3", // Flame Strike
          "f67e501c-5277-588f-a274-d0216437c764", // Flame Flourish
          "785016d2-a36a-5b74-a067-0aa4a1d3d116"  // Smolder Ring
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, or Smolder Ring"
      }
    ]
  },
  {
    id: "cb343fe8-09fb-5cda-9361-9fb6cd40085d",
    name: "Cardio Gain",
    type: "Magick",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Whenever your Attack or Special deal damage, restore Magick. \n ▸ Magick Restored per Strike: 4/6/8/10 Magick",
    icon: "/assets/boons/hestia/Cardio_Gain.webp"
  },
  {
    id: "539357ea-08b6-5a0a-a77c-0514e035d04b",
    name: "Carnal Pleasure",
    type: "Duo",
    gods: ["Aphrodite", "Ares"],
    element: "Aether",
    effect: "Whenever you collect Plasma, create a Heartthrob. \n ▸ Chance of Heartthrob: 35%",
    icon: "/assets/boons/duo/Carnal_Pleasure.webp",
    prerequisites: [
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72", // Flutter Flourish
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "e48529f3-4dfc-5349-92e0-e5c717ce684f", // Grisly Gain
          "05ff4a99-ecf6-5ce8-80e8-742ab1d4def4", // Visceral Impact
          "c6036ec2-ad36-5f5c-8ac4-225dc0e7d919"  // Profuse Bleeding
        ],
        any: true,
        description: "Requires Grisly Gain, Visceral Impact, or Profuse Bleeding"
      }
    ]
  },
  {
    id: "c25813a6-179c-5dc7-b672-739644a10ee5",
    name: "Chain Reaction",
    type: "Duo",
    gods: ["Hephaestus", "Hestia"],
    element: "Aether",
    effect: "If you use your blast effects from Hephaestus just after they recharge, they fire *2* times. \n ▸ Double Blast Timing: 2 Sec.",
    icon: "/assets/boons/duo/Chain_Reaction.webp"
  },
  {
    id: "84858a87-0956-510a-98f6-4225cb5da59b",
    name: "Cherished Heirloom",
    type: "Duo",
    gods: ["Hera", "Demeter"],
    element: "Aether",
    effect: "Your Keepsakes are stronger this night _(if possible)_. \n ▸ Bonus Keepsake Ranks: +1",
    icon: "/assets/boons/duo/Cherished_Heirloom.webp"
  },
  {
    id: "70b1e974-f320-591f-88bc-e130786f070d",
    name: "Coffin Nail",
    type: "Duo",
    gods: ["Hephaestus", "Ares"],
    element: "Aether",
    effect: "Your falling blades from Ares fall immediately and deal more damage. \n ▸ Blade Bonus Damage: +25",
    icon: "/assets/boons/duo/Coffin_Nail.webp"
  },
  {
    id: "d0893ae2-19ec-5134-b642-0173cb99988b",
    name: "Cold Storage",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Freeze effects last longer. \n ▸ Freeze Duration: +2 Sec./+3 Sec./+4 Sec./+5 Sec.",
    icon: "/assets/boons/demeter/Cold_Storage.webp"
  },
  {
    id: "7d37d809-d43f-5660-ae21-25b7aba0378d",
    name: "Controlled Burn",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your \u03a9 Special also launches a fireball, but uses +10 Magick. \n ▸ Fireball Blast Damage: 100/150/200/250",
    icon: "/assets/boons/hestia/Controlled_Burn.webp"
  },
  {
    id: "0f89a67a-e5f5-514b-86bd-1b006fd775ad",
    name: "Cryo Pounder",
    type: "Duo",
    gods: ["Demeter", "Hephaestus"],
    element: "Aether",
    effect: "Your blasts from Hephaestus deal more damage to Freeze-afflicted foes. \n ▸ Bonus Blast Damage: +50%",
    icon: "/assets/boons/duo/Cryo_Pounder.webp"
  },
  {
    id: "b430f1b7-3cca-5861-8357-5a3bdc7b7399",
    name: "Cut Above",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your \u03a9 Moves also cause a falling blade to appear over each foe stroke, but use +5 Magick. \n ▸ Blade Damage: 90/120/150/180",
    icon: "/assets/boons/ares/Cut_Above.webp"
  },
  {
    id: "2f9a6474-c322-501e-912d-7d55f97108e4",
    name: "Cutting Edge",
    type: "Duo",
    gods: ["Apollo", "Ares"],
    element: "Aether",
    effect: "Your falling blades from Ares drop *+1* time in succession and deal damage in a larger area. \n ▸ Blade Area of Effect: +50%",
    icon: "/assets/boons/duo/Cutting_Edge.webp",
    prerequisites: [
      {
        boonIds: [
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "677ad451-8bea-54fc-94c9-82953d9044e8", // Nova Flourish
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "4b08ee45-008d-5f11-a89a-8a2dc68ff363", // Sword Ring
          "d477b146-1783-5971-bf9f-16a9e50b4ff4", // Stabbing Rush
          "b430f1b7-3cca-5861-8357-5a3bdc7b7399"  // Cut Above
        ],
        any: true,
        description: "Requires Sword Ring, Stabbing Rush, or Cut Above"
      }
    ]
  },
  {
    id: "b16d3778-57f6-5f4c-b33b-25364fc0238c",
    name: "Dazzling Display",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your attacks may inflict Daze. \n ▸ Daze Chance: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/apollo/Dazzling_Display.webp",
    prerequisites: [
      {
        boonIds: ["bc4205cb-d68d-50c7-9cfc-47f75316dd7c"], // Nova Strike
        description: "Requires Nova Strike"
      }
    ]
  },
  {
    id: "4ef5f5ac-c6b7-5668-a2b6-63be6f3198a5",
    name: "Divine Vengeance",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "After you take damage, your foe is struck by lightning, and again *50%* of the time. \n ▸ Bolt Damage: 100 (up to: 2/3/4/5 times)",
    icon: "/assets/boons/zeus/Divine_Vengeance.webp"
  },
  {
    id: "f2522999-ebeb-5b4d-83a8-748cb58d90d7",
    name: "Double Strike",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your lightning bolt effects may strike *2* times. \n ▸ Bonus Bolt Chance: +10%/15%/20%/25%",
    icon: "/assets/boons/zeus/Double_Strike.webp"
  },
  {
    id: "47ac15fa-ca9c-50b1-9199-9f7feffb96d8",
    name: "Dying Wish",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Air",
    effect: "Whenever Hitch-afflicted foes are slain, damage all other Hitch-afflicted foes. \n ▸ Hitch Death Damage: 40/60/80/100",
    icon: "/assets/boons/hera/Dying_Wish.webp"
  },
  {
    id: "bb8bc27f-2498-52f1-9c6f-ae7e8034703f",
    name: "Ecstatic Obsession",
    type: "Duo",
    gods: ["Hera", "Aphrodite"],
    element: "Aether",
    effect: "As long as multiple foes are in an Encounter, automatically inflict Charm on *1* of them. \n ▸ Min Foes for Auto-Charm: 2",
    icon: "/assets/boons/duo/Ecstatic_Obsession.webp",
    prerequisites: [
      {
        boonIds: [
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "b13b119a-0570-534b-8a30-abf4c38b0da5", // Sworn Strike
          "6b5ce82f-7776-54f3-afd1-1625119b2020", // Sworn Flourish
          "b9a505d1-2f12-57f1-9d18-b40f98a70a71", // Engagement Ring
          "25a736fc-b220-55cd-a713-e05a01b4dbfa"  // Nexus Rush
        ],
        any: true,
        description: "Requires Sworn Strike, Sworn Flourish, Engagement Ring, or Nexus Rush"
      }
    ]
  },
  {
    id: "e8201d88-05cf-5aae-ad8a-392a6128b01b",
    name: "Electric Overload",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your chain-lightning deals more damage and bounces up to *+3* times. \n ▸ Chain-Lightning Damage: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/zeus/Electric_Overload.webp"
  },
  {
    id: "b9a505d1-2f12-57f1-9d18-b40f98a70a71",
    name: "Engagement Ring",
    type: "Cast",
    gods: ["Hera"],
    element: "Air",
    effect: "Your Casts inflict Hitch and immediately deal damage based on foes in the binding circle. \n ▸ Damage per Foe: 20/30/40/50",
    icon: "/assets/boons/hera/Engagement_Ring.webp"
  },
  {
    id: "28daab2f-4165-57b0-981f-abb6478d61c0",
    name: "Exceptional Talent",
    type: "Legendary",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your \u03a9 Attack and \u03a9 Special fire *2* times, but use more Magick. \n ▸ Omega Move Cost: +30 Magick",
    icon: "/assets/boons/apollo/Exceptional_Talent.webp",
    prerequisites: [
      {
        boonIds: [
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "677ad451-8bea-54fc-94c9-82953d9044e8"  // Nova Flourish
        ],
        any: true,
        description: "Requires Nova Strike or Nova Flourish"
      },
      {
        boonIds: [
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "70eb8b0d-cb4e-536e-a306-cc32b6e055e8", // Extra Dose
          "09fcd20a-2b99-5492-841d-db0f338e1ae1", // Super Nova
          "fbe7a0b7-94e3-5c60-a593-06210f26053d", // Back Burner
          "8355f4f2-d521-5794-8e4b-6ca89243bb52"  // Prominence Flare
        ],
        any: true,
        description: "Requires Extra Dose, Super Nova, Back Burner, or Prominence Flare"
      }
    ]
  },
  {
    id: "7785b010-246d-55b5-88db-633ad19320a2",
    name: "Extended Family",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Fire",
    effect: "Your damaging effects from Olympians are stronger for each Boon-giver you have. \n ▸ Bonus Effect Damage per God(dess): +3%/+4%/+5%/+6%",
    icon: "/assets/boons/hera/Extended_Family.webp"
  },
  {
    id: "70eb8b0d-cb4e-536e-a306-cc32b6e055e8",
    name: "Extra Dose",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Attack has a chance to hit *2* times. \n ▸ Double Strike Chance: +5%/+8%/+10%/+13%",
    icon: "/assets/boons/apollo/Extra_Dose.webp",
    prerequisites: [
      {
        boonIds: [
          "ed24b45a-d7bc-57d9-817d-989521fc5bf3", // Flame Strike
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "d830b8f9-7744-5114-a60e-a0f738d3e4b0", // Heaven Strike
          "0ec0f7c7-6ada-5db2-b76f-5fc97bbd71f6", // Ice Strike
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "b13b119a-0570-534b-8a30-abf4c38b0da5", // Sworn Strike
          "5eb0886b-24f5-5bb1-b2ba-9208e0212339", // Vicious Strike
          "798575af-a5a4-5b8f-bb3d-a29714214e98", // Volcanic Strike
          "f43cb7a0-733f-5797-87f2-e1dcfea27273"  // Wave Strike
        ],
        any: true,
        description: "Requires any Attack Boon"
      }
    ]
  },
  {
    id: "89c8b9d6-24c4-56d1-bc0c-58c2fbe1799d",
    name: "Fine Line",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Ω Moves create a fissure that deals damage in a long line, but use +15 Magick. \n ▸ Rift Damage: 120/150/180/210",
    icon: "/assets/boons/hera/Fine_Line.webp"
  },
  {
    id: "06705458-7d89-583c-b64f-fcad79dd9646",
    name: "Fire Away",
    type: "Legendary",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Casts destroy many foes' ranged shots, and inflict Scorch on the attacking foes. \n ▸ Scorch Damage (every 3 Sec.): 400",
    icon: "/assets/boons/hestia/Fire_Away.webp"
  },
  {
    id: "f67e501c-5277-588f-a274-d0216437c764",
    name: "Flame Flourish",
    type: "Special",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Specials inflict Scorch. \n ▸ Scorch Damage: 35/53/70/88",
    icon: "/assets/boons/hestia/Flame_Flourish.webp"
  },
  {
    id: "ed24b45a-d7bc-57d9-817d-989521fc5bf3",
    name: "Flame Strike",
    type: "Attack",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Attacks inflict Scorch. \n ▸ Scorch Damage: 30/45/60/75",
    icon: "/assets/boons/hestia/Flame_Strike.webp"
  },
  {
    id: "7854f04e-79bd-5de0-8f93-9bf87c4e31f3",
    name: "Flash Fry",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your foes perish in a blast that damages any surrounding foes. \n ▸ Blast Damage When Slain: 60/90/120/150",
    icon: "/assets/boons/hestia/Flash_Fry.webp"
  },
  {
    id: "e47cd742-6e4c-53cc-9da5-f08e381d7eb3",
    name: "Flood Gain",
    type: "Magick",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Moves make you briefly restore any Magick you use, repeatable after *8 Sec.* \n ▸ Magick Flood Duration: 4 Sec./5 Sec./6 Sec./7 Sec.",
    icon: "/assets/boons/poseidon/Flood_Gain.webp"
  },
  {
    id: "5d4dcdca-fb70-5019-84f9-78964ad23d72",
    name: "Flutter Flourish",
    type: "Special",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Specials deal more damage to nearby foes. \n ▸ Close-Up Damage: +100%/+150%/+200%/+250%",
    icon: "/assets/boons/aphrodite/Flutter_Flourish.webp"
  },
  {
    id: "8f7c231f-6687-525c-bc01-033c5fd4ae5d",
    name: "Flutter Strike",
    type: "Attack",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Your Attacks deal more damage to nearby foes. \n ▸ Close-Up Damage: +80%/+100%/+120%/+140%",
    icon: "/assets/boons/aphrodite/Flutter_Strike.webp"
  },
  {
    id: "dedb7d2d-ba78-5acb-b591-5d410d5f8793",
    name: "Fourth Degree",
    type: "Duo",
    gods: ["Hestia", "Ares"],
    element: "Aether",
    effect: "Your fireball effects from Hestia inflict Wounds with even greater Power. \n ▸ Fireball Wounds Bonus Power: +250",
    icon: "/assets/boons/duo/Fourth_Degree.webp"
  },
  {
    id: "495481f4-c2de-5bc7-a420-fd6e5c43880c",
    name: "Freezer Burn",
    type: "Duo",
    gods: ["Demeter", "Hestia"],
    element: "Aether",
    effect: "Whenever you inflict Freeze, on a foe with Scorch, deal damage and remove Scorch. \n ▸ Damage from Scorch: 200%",
    icon: "/assets/boons/duo/Freezer_Burn.webp"
  },
  {
    id: "f4b3601e-b839-5f04-a1ae-675a1431b640",
    name: "Frigid Rush",
    type: "Sprint",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Sprint forms a Gust around you that lingers after you stop. \n ▸ Gust Area Damage (every 0.25 Sec.): 4/6/8/10",
    icon: "/assets/boons/demeter/Frigid_Rush.webp"
  },
  {
    id: "915939ec-15c7-5be6-96a5-22949b009bb8",
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
    id: "0ace7aad-68c9-5b65-9a31-899364d9d6c1",
    name: "Furnace Blast",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your blast effects from Hephaestus also inflict Glow on foes. \n ▸ Glow Bonus Damage: +15%/+19%/+25%/+26%",
    icon: "/assets/boons/hephaestus/Furnace_Blast.webp"
  },
  {
    id: "6e1d031a-7fda-55bb-86f5-06e4322d11c5",
    name: "Geyser Spout",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Cast gains Power and knocks foes away. \n ▸ Omega Cast Power: +150/+200/+250/+300",
    icon: "/assets/boons/poseidon/Geyser_Spout.webp"
  },
  {
    id: "936e899f-cc41-5003-bdb9-66a6ebae52a1",
    name: "Glamour Gain",
    type: "Magick",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "You automatically inflict Weak on nearby foes and gradually restore Magick near them. \n ▸ Magick Restoration (every 1 Sec.): 6/8/10/12",
    icon: "/assets/boons/aphrodite/Glamour_Gain.webp"
  },
  {
    id: "b0fb61c9-819d-5be4-8be4-5612ce6209af",
    name: "Glorious Disaster",
    type: "Duo",
    gods: ["Zeus", "Apollo"],
    element: "Aether",
    effect: "You can Channel +30 Magick into your Ω Cast to repeatedly strike foes with lightning bolts. \n ▸ Bolt Damage (every 0.13 Sec.): 20",
    icon: "/assets/boons/duo/Glorious_Disaster.webp",
    prerequisites: [
      {
        boonIds: ["8355f4f2-d521-5794-8e4b-6ca89243bb52"], // Prominence Flare
        description: "Requires Prominence Flare"
      },
      {
        boonIds: [
          "d830b8f9-7744-5114-a60e-a0f738d3e4b0", // Heaven Strike
          "0bbfcd7a-d21e-5efe-8ad9-367e57f17a1e", // Heaven Flourish
          "befdf2bb-8636-53b8-9032-61dea93f92cb", // Storm Ring
          "13f515f5-6415-51e1-a45f-6fb7f2eb2b63"  // Thunder Rush
        ],
        any: true,
        description: "Requires Heaven Strike, Heaven Flourish, Storm Ring, or Thunder Rush"
      }
    ]
  },
  {
    id: "e022fec1-5de0-5dba-b7f9-d89f502ef7bd",
    name: "Glowing Coal",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Hold Cast to aim a fireball that explodes on impact. The binding circle forms there. \n ▸ Fireball Blast Damage: 60/90/120/150",
    icon: "/assets/boons/hestia/Glowing_Coal.webp"
  },
  {
    id: "b31bb575-4b1f-5d32-8df7-c94c003ca593",
    name: "Grand Caldera",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your blast effects from Hephaestus deal more damage and are *50%* larger. \n ▸ Bonus Blast Damage: +75/+100/+125/+150",
    icon: "/assets/boons/hephaestus/Grand_Caldera.webp"
  },
  {
    id: "35f07f53-05cd-5013-9f26-4a92a50c68b3",
    name: "Grievous Blow",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "Foes with Wounds may suffer *200%* damage when struck. \n ▸ Double Damage Chance: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/ares/Grievous_Blow.webp"
  },
  {
    id: "e48529f3-4dfc-5349-92e0-e5c717ce684f",
    name: "Grisly Gain",
    type: "Magick",
    gods: ["Ares"],
    element: "Earth",
    effect: "Striking foes with your Weapon has *20%* chance to spill Plasma, which also restores Magick. \n ▸ Magick Restored per Plasma: 15/20/25/30",
    icon: "/assets/boons/ares/Grisly_Gain.webp"
  },
  {
    id: "f2578c62-a331-5087-a700-805a456651ad",
    name: "Hail Storm",
    type: "Duo",
    gods: ["Zeus", "Demeter"],
    element: "Aether",
    effect: "Your Freeze effects also cause lightning bolts to repeatedly strike afflicted foes. \n ▸ Lightning Damage (every 0.5 Sec.): 30",
    icon: "/assets/boons/duo/Hail_Storm.webp"
  },
  {
    id: "8c1e6524-c456-57be-96a6-01b398e0e76d",
    name: "Healthy Rebound",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Whenever you exit a Location, restore 100% Health if you have not lost too much. \n ▸ Min Life for Full Recovery: 80%/70%/60%/50%",
    icon: "/assets/boons/aphrodite/Healthy_Rebound.webp",
    prerequisites: [
      {
        boonIds: ["8a0ecab3-8591-587d-9aac-bf3ebefb1867"],
        description: "Requires Shameless Attitude"
      }
    ]
  },
  {
    id: "0a10c1fd-89af-5dec-8dd5-d20ba7f1aaf6",
    name: "Heart Breaker",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Whenever you use 40 Magick, create a Heartthrob. \n ▸ Heartthrob Blast Damage: 80/100/120/140",
    icon: "/assets/boons/aphrodite/Heart_Breaker.webp"
  },
  {
    id: "8823c145-2f1d-5ce7-9d29-98aa3d348f6d",
    name: "Hearty Appetite",
    type: "Duo",
    gods: ["Demeter", "Aphrodite"],
    element: "Aether",
    effect: "You deal more damage with your Weapon the more Max Health you have. \n ▸ Bonus Damage per 100 Life: +10%",
    icon: "/assets/boons/duo/Hearty_Appetite.webp",
    prerequisites: [
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72", // Flutter Flourish
          "936e899f-cc41-5003-bdb9-66a6ebae52a1", // Glamour Gain
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "8c1e6524-c456-57be-96a6-01b398e0e76d"  // Healthy Rebound
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Glamour Gain, Passion Rush, or Healthy Rebound"
      },
      {
        boonIds: [
          "0ec0f7c7-6ada-5db2-b76f-5fc97bbd71f6", // Ice Strike
          "4d1aeefa-5aac-5a9a-9b25-18d6695550e7", // Ice Flourish
          "16265777-2471-507d-9457-ef385a9a5a47", // Tranquil Gain
          "f4b3601e-b839-5f04-a1ae-675a1431b640", // Frigid Rush
          "a947883b-7f61-5123-9eb8-4ade0773ab2b"  // Plentiful Forage
        ],
        any: true,
        description: "Requires Ice Strike, Ice Flourish, Tranquil Gain, Frigid Rush, or Plentiful Forage"
      }
    ]
  },
  {
    id: "ed08770d-871a-5322-a96b-25c501a4992f",
    name: "Heat Rush",
    type: "Sprint",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Sprint leaves a cinder trail, and any damage you take from burning is reduced to *1*. \n ▸ Trail Damage (every 0.25 Sec.): 10/15/20/25",
    icon: "/assets/boons/hestia/Heat_Rush.webp"
  },
  {
    id: "0bbfcd7a-d21e-5efe-8ad9-367e57f17a1e",
    name: "Heaven Flourish",
    type: "Special",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Specials inflict Blitz. \n ▸ Blitz Damage: 100/130/160/190",
    icon: "/assets/boons/zeus/Heaven_Flourish.webp"
  },
  {
    id: "d830b8f9-7744-5114-a60e-a0f738d3e4b0",
    name: "Heaven Strike",
    type: "Attack",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Attacks inflict Blitz. \n ▸ Blitz Damage: 80/120/160/200",
    icon: "/assets/boons/zeus/Heaven_Strike.webp"
  },
  {
    id: "c71088b5-8a65-589d-aeea-80912b32c25b",
    name: "Heavy Metal",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Weapon deals more damage based on *20%* of your Armor, and you gain some now. \n ▸ Armor Gained: +50/+75/+100/+125",
    icon: "/assets/boons/hephaestus/Heavy_Metal.webp"
  },
  {
    id: "dc39ccef-c983-5d4a-b162-02230f19d7ef",
    name: "Heinous Affront",
    type: "Duo",
    gods: ["Zeus", "Ares"],
    element: "Aether",
    effect: "Inflicting Wounds also can inflict all your _'after you take damage'_ effects. \n ▸ Recharge Time per Foe: 6 Sec.",
    icon: "/assets/boons/duo/Heinous_Affront.webp"
  },
  {
    id: "8ebe032e-3ef0-5208-9ba2-91b2c875c9c8",
    name: "Hereditary Bane",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Water",
    effect: "Your Hitch effects deal more damage and last *+5 Sec.* \n ▸ Hitch Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/hera/Hereditary_Bane.webp"
  },
  {
    id: "87bb8bea-c036-5da7-93f0-f5ba17f9f7ac",
    name: "High Surf",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Hit surrounding foes with a powerful splash as they start to strike, but you Prime 30 Magick. \n ▸ Splash Damage: 40/60/80/100",
    icon: "/assets/boons/poseidon/High_Surf.webp"
  },
  {
    id: "935fc01c-9916-5ff9-aeff-efa3dcc2266e",
    name: "Highly Flammable",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Whenever you inflict Scorch on a foe for the first time, inflict more. \n ▸ First-Time Scorch Damage: +80/+120/+160/+200",
    icon: "/assets/boons/hestia/Highly_Flammable.webp"
  },
  {
    id: "d332032a-0b34-55c5-bc7b-cf2b98d03614",
    name: "Hostile Environment",
    type: "Duo",
    gods: ["Demeter", "Ares"],
    element: "Aether",
    effect: "Your \u03a9 Cast is stronger and follows you, even as you start to Channel it. \n ▸ Omega Cast Damage: +100%",
    icon: "/assets/boons/duo/Hostile_Environment.webp"
  },
  {
    id: "88e98262-78db-54df-a6dc-b1896a133415",
    name: "Hot Pot",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Gain a chance to Dodge, which is doubled against Scorch-afflicted foes. \n ▸ Bonus Dodge Chance: +4%/+5%/+6%/+7%",
    icon: "/assets/boons/hestia/Hot_Pot.webp"
  },
  {
    id: "ecba3103-31ac-5524-84aa-20b32cece0b8",
    name: "Hydraulic Might",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "At the start of each Encounter, your Attacks and Specials are stronger for *10 Sec.* \n ▸ Initial Damage Bonus: +100%/+133%/+166%/+200%",
    icon: "/assets/boons/poseidon/Hydraulic_Might.webp"
  },
  {
    id: "4d1aeefa-5aac-5a9a-9b25-18d6695550e7",
    name: "Ice Flourish",
    type: "Special",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Specials deal more damage and inflict Freeze. \n ▸ Special Damage: +40%/+60%/+80%/+100%",
    icon: "/assets/boons/demeter/Ice_Flourish.webp"
  },
  {
    id: "0ec0f7c7-6ada-5db2-b76f-5fc97bbd71f6",
    name: "Ice Strike",
    type: "Attack",
    gods: ["Demeter"],
    element: "Water",
    effect: "Your Attacks deal more damage and inflict Freeze. \n ▸ Attack Damage: +30%/+45%/+60%/+75%",
    icon: "/assets/boons/demeter/Ice_Strike.webp"
  },
  {
    id: "c574f032-ec8d-5490-b2cd-5cf374236df8",
    name: "Incandescent Aura",
    type: "Duo",
    gods: ["Hera", "Hestia"],
    element: "Aether",
    effect: "Whenever you restore Magick during Encounters, damage _all_ Hitch-afflicted foes. \n ▸ Damage from Magick Restored: 500% (every 0.2 Sec.)",
    icon: "/assets/boons/duo/Incandescent_Aura.webp"
  },
  {
    id: "11076cc9-5d5b-530c-be32-749753510ced",
    name: "Ionic Gain",
    type: "Magick",
    gods: ["Zeus"],
    element: "Air",
    effect: "In each Encounter, an Aether Font appears in the area and restores _all_ Magick when used. \n ▸ Reappearance Time: 10/9/8/7 Sec.",
    icon: "/assets/boons/zeus/Ionic_Gain.webp"
  },
  {
    id: "000580d0-519e-50b5-bc62-48bd67557667",
    name: "Island Getaway",
    type: "Duo",
    gods: ["Poseidon", "Aphrodite"],
    element: "Aether",
    effect: "You take less damage from nearby foes. Boons of Aphrodite treat all foes as nearby. \n ▸ Damage Resistance: +15%",
    icon: "/assets/boons/duo/Island_Getaway.webp",
    prerequisites: [
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72"  // Flutter Flourish
        ],
        any: true,
        description: "Requires Flutter Strike or Flutter Flourish"
      },
      {
        boonIds: [
          "f43cb7a0-733f-5797-87f2-e1dcfea27273", // Wave Strike
          "33734633-ed5b-526f-acb1-4662f97893e2", // Wave Flourish
          "5ce45cef-32e6-5a80-9d69-f48ef53f07de", // Tidal Ring
          "3d9b7234-b439-502a-8dae-581fc3ad6359", // Breaker Rush
          "e47cd742-6e4c-53cc-9da5-f08e381d7eb3"  // Flood Gain
        ],
        any: true,
        description: "Requires Wave Strike, Wave Flourish, Tidal Ring, Breaker Rush, or Flood Gain"
      }
    ]
  },
  {
    id: "c6a28c11-b12a-5e08-ab4f-f3bbb301ccb0",
    name: "Killer Current",
    type: "Duo",
    gods: ["Zeus", "Poseidon"],
    element: "Aether",
    effect: "Your lightning deals more damage to Froth-afflicted foes. \n ▸ Bonus Lightning Damage: +30%",
    icon: "/assets/boons/duo/Killer_Current.webp"
  },
  {
    id: "8a3c3979-faa3-5b2c-9453-534aa7b6b0f2",
    name: "King Tide",
    type: "Legendary",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your splash effects from Poseidon are larger, and deal more damage to Guardians. \n ▸ Splash Damage vs. Guardians: +200%",
    icon: "/assets/boons/poseidon/King_Tide.webp"
  },
  {
    id: "52793db5-16ff-5038-ae93-b3b4986c0ca0",
    name: "King's Ransom",
    type: "Duo",
    gods: ["Zeus", "Hera"],
    element: "Aether",
    effect: "Give up _all_ your Boons of Hera. For each, raise Lv. for _all_ your Boons of Zeus. \n ▸ Bonus Lv. per Hera Boon: +4",
    icon: "/assets/boons/duo/King's_Ransom.webp"
  },
  {
    id: "abde81b0-8578-5373-b6c8-f49ab73f6a98",
    name: "Light Smite",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Fire",
    effect: "After you take damage, automatically damage and Daze _all_ foes in the vicinity. \n ▸ Revenge Damage: 50/75/100/125",
    icon: "/assets/boons/apollo/Light_Smite.webp"
  },
  {
    id: "2bd56797-3ab2-5ed8-95d5-6cdd5a3a4f28",
    name: "Lightning Lance",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Hold Cast to aim where the binding circle appears. Foes within are struck by lightning. \n ▸ Bolt Damage: 50/70/90/110",
    icon: "/assets/boons/zeus/Lightning_Lance.webp"
  },
  {
    id: "eb911316-de2f-5477-9971-4de3fc976558",
    name: "Local Climate",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Your \u03a9 Cast deals more damage. If you are in the binding circle, the bonus is doubled. \n ▸ Omega Cast Bonus Damage: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/demeter/Local_Climate.webp"
  },
  {
    id: "109c9744-e80a-586d-81b9-f59544c48942",
    name: "Love Handles",
    type: "Duo",
    gods: ["Aphrodite", "Hephaestus"],
    element: "Aether",
    effect: "Your blast effects from Hephaestus also create a Heartthrob. \n ▸ Heartthrob Blast Damage: 160.",
    icon: "/assets/boons/duo/Love_Handles.webp",
    prerequisites: [
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72", // Flutter Flourish
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "798575af-a5a4-5b8f-bb3d-a29714214e98", // Volcanic Strike
          "936cb120-f32e-532f-ab9b-61777652f883", // Volcanic Flourish
          "018617cf-bd49-59ed-8d7b-42bfc1e0a651"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "ac3b5773-96b3-5e4d-bbda-4fff994aed86",
    name: "Lucid Gain",
    type: "Magick",
    gods: ["Apollo"],
    element: "Air",
    effect: "Whenever your Casts expire, restore Magick. \n ▸ Magick Restored: 40/60/80/100",
    icon: "/assets/boons/apollo/Lucid_Gain.webp"
  },
  {
    id: "524bf92f-83c5-5030-8d22-b1ed12cfd831",
    name: "Martial Art",
    type: "Infusion",
    gods: ["Hephaestus"],
    element: null,
    effect: "Your Attack and Special deal more damage for each Earth Essence you have. \n ▸ Damage per Earth Essence: +5%",
    icon: "/assets/boons/hephaestus/Martial_Art.webp"
  },
  {
    id: "71b37756-29a9-57bc-80f9-333886131be8",
    name: "Master Conductor",
    type: "Duo",
    gods: ["Zeus", "Hephaestus"],
    element: "Aether",
    effect: "Your chain-lightning can bounce off of you and deals increasing damage to foes. \n ▸ Damage per Bounce: +15%",
    icon: "/assets/boons/duo/Master_Conductor.webp"
  },
  {
    id: "c59cf862-1162-598d-b2a1-4b8fc24fb04f",
    name: "Meat Grinder",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your \u03a9 Cast also creates a Blade Rift in the binding circle. \n ▸ Rift Damage (every 1 Sec.): 30/40/50/60",
    icon: "/assets/boons/ares/Meat_Grinder.webp"
  },
  {
    id: "8a425f0d-0b7f-5876-816f-214497762e3b",
    name: "Molten Touch",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Attacks and Specials deal bonus damage to Armor. \n ▸ Damage vs. Armor: +40%/+60%/+80%/+100%",
    icon: "/assets/boons/hephaestus/Molten_Touch.webp"
  },
  {
    id: "acb822d6-5987-5567-bb7a-683b77ff3ef4",
    name: "Mutual Destruction",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "Gain a chance to deal *200%* damage that increases the less Health you have remaining. \n ▸ Chance per Missing Life Point: 0.1%/0.12%/0.14%/0.16%",
    icon: "/assets/boons/ares/Mutual_Destruction.webp"
  },
  {
    id: "019f3771-b618-5038-8696-b2dc3d0b57e4",
    name: "Natural Selection",
    type: "Duo",
    gods: ["Poseidon", "Demeter"],
    element: "Aether",
    effect: "Your *Boon(s)* in the leftmost column gain increased *Lv.* spread across however many you have. \n ▸ Total Bonus Lv. for Main Boon(s): +8",
    icon: "/assets/boons/duo/Natural_Selection.webp"
  },
  {
    id: "7da44f9e-9d03-576e-9a2f-0d3773af3518",
    name: "Nervous Wreck",
    type: "Legendary",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Whenever you inflict Weak, also randomly inflict Curses from other Olympians. \n ▸ Bonus Random Curses: 3.",
    icon: "/assets/boons/aphrodite/Nervous_Wreck.webp",
    prerequisites: [
      {
        boonIds: [
          "b9e84fce-bfbb-5ee7-a821-f55fa8b6b984", // Broken Resolve
          "39706212-eaea-552d-800f-d1671ddfc8cc", // Sweet Surrender
          "8a0ecab3-8591-587d-9aac-bf3ebefb1867", // Shameless Attitude
          "db1be79a-686e-5905-b3f5-0f9bb748e8ea"  // Secret Crush
        ],
        any: true,
        description: "Requires Broken Resolve, Sweet Surrender, Shameless Attitude, or Secret Crush"
      },
      {
        boonIds: [
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72"  // Flutter Flourish
        ],
        any: true,
        description: "Requires Flutter Strike or Flutter Flourish"
      }
    ]
  },
  {
    id: "25a736fc-b220-55cd-a713-e05a01b4dbfa",
    name: "Nexus Rush",
    type: "Sprint",
    gods: ["Hera"],
    element: "Fire",
    effect: "Your Sprint inflicts Hitch on surrounding foes, and deals damage when it does. \n ▸ Damage with Hitch: 60/90/120/150",
    icon: "/assets/boons/hera/Nexus_Rush.webp"
  },
  {
    id: "677ad451-8bea-54fc-94c9-82953d9044e8",
    name: "Nova Flourish",
    type: "Special",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Specials deal more damage in a larger area. \n ▸ Special Damage: +60%/+80%/+100%/+120%",
    icon: "/assets/boons/apollo/Nova_Flourish.webp"
  },
  {
    id: "bc4205cb-d68d-50c7-9cfc-47f75316dd7c",
    name: "Nova Strike",
    type: "Attack",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Attacks deal more damage in a larger area. \n ▸ Attack Damage: +40%/+50%/+60%/+70%",
    icon: "/assets/boons/apollo/Nova_Strike.webp"
  },
  {
    id: "8d78a6cd-cb71-51cc-bdfd-73a3cf1c76de",
    name: "Ocean Swell",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your \u03a9 Moves also launch a wide wave ahead that knocks foes away, but use +5 Magick. \n ▸ Wave Damage: 40/60/80/100",
    icon: "/assets/boons/poseidon/Ocean_Swell.webp"
  },
  {
    id: "5ff82219-40a3-5149-818a-bb093674c43b",
    name: "Passion Rush",
    type: "Sprint",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Rushing damages surrounding foes and inflicts Weak, and again once you stop. \n ▸ Blast Damage: 20/30/40/50",
    icon: "/assets/boons/aphrodite/Passion_Rush.webp"
  },
  {
    id: "96e5a954-5856-5fd4-9ecb-228df17f2385",
    name: "Perfect Image",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Air",
    effect: "You deal more damage until you take damage. If you take no more for *15 Sec.*, regain this. \n ▸ No-Hit Bonus Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/apollo/Perfect_Image.webp"
  },
  {
    id: "a947883b-7f61-5123-9eb8-4ade0773ab2b",
    name: "Plentiful Forage",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Whenever you gather resources from a Location, restore some Health. Gain *+1 Mystery Seed* now. \n ▸ Life Restored from Gathering: 10%/12%/14%/16%",
    icon: "/assets/boons/demeter/Plentiful_Forage.webp"
  },
  {
    id: "732a8b3d-4cfa-5e61-b67d-2bec0982dc57",
    name: "Power Surge",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Whenever you use Magick, a random surrounding foe is struck by lightning. \n ▸ Bolt Damage: 30/40/50/60",
    icon: "/assets/boons/zeus/Power_Surge.webp"
  },
  {
    id: "e99f34c3-bd0d-58da-9bed-dc3655da0d30",
    name: "Premium Service",
    type: "Legendary",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Your Aspect of the Nocturnal Arms is even stronger. \n ▸ Aspect Bonus Ranks: +1",
    icon: "/assets/boons/hephaestus/Premium_Service.webp"
  },
  {
    id: "c6036ec2-ad36-5f5c-8ac4-225dc0e7d919",
    name: "Profuse Bleeding",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "Whenever you inflict Wounds or collect Plasma, create a falling blade over a surrounding foe. \n ▸ Blade Damage: 30/50/70/90",
    icon: "/assets/boons/ares/Profuse_Bleeding.webp"
  },
  {
    id: "8355f4f2-d521-5794-8e4b-6ca89243bb52",
    name: "Prominence Flare",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Fire",
    effect: "After your \u03a9 Cast expires, rapidly deal damage in the area for *2 Sec.* \n ▸ Omega Cast Damage (every 0.13 Sec.): 10/12/14/16",
    icon: "/assets/boons/apollo/Prominence_Flare.webp",
    prerequisites: [
      {
        boonIds: [
          "9341e2b7-38a7-5684-8bbd-a9978b055726", // Anvil Ring
          "e8e876fb-519e-5b75-bfe6-5f05079f62c1", // Arctic Ring
          "b9a505d1-2f12-57f1-9d18-b40f98a70a71", // Engagement Ring
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "785016d2-a36a-5b74-a067-0aa4a1d3d116", // Smolder Ring
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "befdf2bb-8636-53b8-9032-61dea93f92cb", // Storm Ring
          "4b08ee45-008d-5f11-a89a-8a2dc68ff363", // Sword Ring
          "5ce45cef-32e6-5a80-9d69-f48ef53f07de"  // Tidal Ring
        ],
        any: true,
        description: "Requires any Cast Boon"
      }
    ]
  },
  {
    id: "d860babc-cd19-5e8d-af1f-4f4c8d037eb8",
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
    id: "5d0b83d6-ae4a-5a02-a8ab-1d7ac5237f8a",
    name: "Pyro Technique",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Scorch effects deal damage faster. \n ▸ Scorch Damage Rate: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/hestia/Pyro_Technique.webp"
  },
  {
    id: "02e3602a-1e89-5b47-be38-b1f263d28ca0",
    name: "Queen's Ransom",
    type: "Duo",
    gods: ["Hera", "Zeus"],
    element: "Aether",
    effect: "Give up _all_ your Boons of Zeus. For each, raise Lv. for _all_ your Boons of Hera. \n ▸ Bonus Lv. per Zeus Boon: +4",
    icon: "/assets/boons/duo/Queen's_Ransom.webp"
  },
  {
    id: "82604a41-1de6-51fd-92ff-63112e33f5a0",
    name: "Rallying Cry",
    type: "Infusion",
    gods: ["Ares"],
    element: null,
    effect: "While you have at least 8 Earth Essences, any of your damaging effects from Olympians are stronger. \n ▸ Olympian Bonus Damage: +50%.",
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
    id: "f879486a-3356-5538-b340-3140a893bdba",
    name: "Rapture Ring",
    type: "Cast",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Your Casts inflict Weak, and damage foes while dragging them toward the center. \n ▸ Cast Damage (every 0.85 Sec.): 10/15/20/25",
    icon: "/assets/boons/aphrodite/Rapture_Ring.webp"
  },
  {
    id: "4da2a419-4972-5b2e-93f9-3d3b4cd876e5",
    name: "Ripple Effect",
    type: "Duo",
    gods: ["Hera", "Poseidon"],
    element: "Aether",
    effect: "Your effects from Fine Line and Ocean Swell have a chance to fire *2* times. \n ▸ Bonus Fire Chance: +30%",
    icon: "/assets/boons/duo/Ripple_Effect.webp"
  },
  {
    id: "18437a44-8ee7-5fab-ae04-ec20d55a23fb",
    name: "Romantic Spark",
    type: "Duo",
    gods: ["Zeus", "Aphrodite"],
    element: "Aether",
    effect: "Rushing into foes with Blitz immediately activates the effect and makes it stronger. \n ▸ Bonus Blitz Damage: +80%",
    icon: "/assets/boons/duo/Romantic_Spark.webp",
    prerequisites: [
      {
        boonIds: [
          "8f7c231f-6687-525c-bc01-033c5fd4ae5d", // Flutter Strike
          "5d4dcdca-fb70-5019-84f9-78964ad23d72", // Flutter Flourish
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Flutter Strike, Flutter Flourish, Rapture Ring, Passion Rush, or Glamour Gain"
      },
      {
        boonIds: [
          "d830b8f9-7744-5114-a60e-a0f738d3e4b0", // Heaven Strike
          "0bbfcd7a-d21e-5efe-8ad9-367e57f17a1e"  // Heaven Flourish
        ],
        any: true,
        description: "Requires Heaven Strike or Heaven Flourish"
      }
    ]
  },
  {
    id: "c771858f-175d-5a0c-924e-4e5f1fc6a1e1",
    name: "Rousing Reception",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Air",
    effect: "Your Casts damage any foes as they join the Encounter, wherever they appear. \n ▸ On-Spawn Damage: 60/80/100/120",
    icon: "/assets/boons/hera/Rousing_Reception.webp"
  },
  {
    id: "6b6584b4-83c7-53fb-bb1d-f95fa21c370b",
    name: "Rude Awakening",
    type: "Duo",
    gods: ["Apollo", "Hephaestus"],
    element: "Aether",
    effect: "Your blast effects from Hephaestus clear Daze and deal more damage if they do. \n ▸ Bonus Blast Damage: 300",
    icon: "/assets/boons/duo/Rude_Awakening.webp",
    prerequisites: [
      {
        boonIds: [
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "abde81b0-8578-5373-b6c8-f49ab73f6a98", // Light Smite
          "b16d3778-57f6-5f4c-b33b-25364fc0238c"  // Dazzling Display
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Light Smite, or Dazzling Display"
      },
      {
        boonIds: [
          "798575af-a5a4-5b8f-bb3d-a29714214e98", // Volcanic Strike
          "936cb120-f32e-532f-ab9b-61777652f883", // Volcanic Flourish
          "018617cf-bd49-59ed-8d7b-42bfc1e0a651"  // Smithy Rush
        ],
        any: true,
        description: "Requires Volcanic Strike, Volcanic Flourish, or Smithy Rush"
      }
    ]
  },
  {
    id: "176c7b4e-e3e0-5430-a378-5974e62311fa",
    name: "Sanguinary Savor",
    type: "Legendary",
    gods: ["Ares"],
    element: "Earth",
    effect: "You inflict Wounds with greater Power, and spilled BloodDrop is drawn to you automatically. \n ▸ Wounds Bonus Power: +100",
    icon: "/assets/boons/ares/Sanguinary_Savor.webp"
  },
  {
    id: "2d50a954-6f32-5d44-9fec-360ba95c169b",
    name: "Scalding Vapor",
    type: "Duo",
    gods: ["Poseidon", "Hestia"],
    element: "Aether",
    effect: "If foes with Froth are struck by your fire effects from Hestia, they are engulfed in Steam. \n ▸ Steam Damage (every 0.2 Sec.): 20",
    icon: "/assets/boons/duo/Scalding_Vapor.webp"
  },
  {
    id: "392e298e-c9e0-5914-abc3-ec063ac52d97",
    name: "Sea Star",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Whenever you claim rewards other than Boons, Daedalus Hammers, or rare resources, a copy may appear. \n ▸ Double Reward Chance: 25%/30%/35%/40%",
    icon: "/assets/boons/poseidon/Sea_Star.webp"
  },
  {
    id: "db1be79a-686e-5905-b3f5-0f9bb748e8ea",
    name: "Secret Crush",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Your Attacks gain Power, but you Prime 20 Magick. \n ▸ Bonus Power: +5/+7/+9/+11",
    icon: "/assets/boons/aphrodite/Secret_Crush.webp"
  },
  {
    id: "4f1896e0-582b-51fa-9369-c9b3972babb0",
    name: "Security System",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "At the start of each Encounter, you gain Armor that lasts for *7 Sec.* \n ▸ Temporary Starting Armor: 75/100/125/150",
    icon: "/assets/boons/hephaestus/Security_System.webp"
  },
  {
    id: "b0a4f2a0-80ff-5c0e-8619-42de204f41ef",
    name: "Seismic Servo",
    type: "Duo",
    gods: ["Poseidon", "Hephaestus"],
    element: "Aether",
    effect: "Any Boon effects that recharge over time now recharge faster. \n ▸ Recharge Speed: +35%",
    icon: "/assets/boons/duo/Seismic_Servo.webp"
  },
  {
    id: "0d859595-638f-5d15-bb16-56e24969bf89",
    name: "Self Healing",
    type: "Infusion",
    gods: ["Apollo"],
    element: null,
    effect: "While you have at least 2 Fire Essences, whenever you take damage, restore some Health. \n ▸ Damage Recovered (over 5 Sec.): 30%",
    icon: "/assets/boons/apollo/Self_Healing.webp",
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
    id: "8a0ecab3-8591-587d-9aac-bf3ebefb1867",
    name: "Shameless Attitude",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "You deal more damage. While you have at least 80% Health, the bonus is doubled. \n ▸ Bonus Damage: +5%/+7%/+9%/+11%",
    icon: "/assets/boons/aphrodite/Shameless_Attitude.webp"
  },
  {
    id: "026cd254-d4ec-5e68-a943-cddd4b37454d",
    name: "Shocking Loss",
    type: "Legendary",
    gods: ["Zeus"],
    element: "Air",
    effect: "Whenever you first deal damage to susceptible foes, you may destroy them outright. \n ▸ Instant Destruction Chance: 25%",
    icon: "/assets/boons/zeus/Shocking_Loss.webp"
  },
  {
    id: "498ee15c-c5af-5ea7-bbd1-f1a23d42f5e8",
    name: "Slippery Slope",
    type: "Non-Core",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your splash effects from Poseidon also inflict Froth, and Froth deals more damage. \n ▸ Froth Damage: +20%/+50%/+80%/+110%",
    icon: "/assets/boons/poseidon/Slippery_Slope.webp"
  },
  {
    id: "16427bf1-ec92-5b08-91d9-24ce6f55b69a",
    name: "Slow Cooker",
    type: "Infusion",
    gods: ["Hestia"],
    element: null,
    effect: "Your Attacks and Specials gain Power the more Fire Essences you have. \n ▸ Power per Fire Essence: +2",
    icon: "/assets/boons/hestia/Slow_Cooker.webp"
  },
  {
    id: "018617cf-bd49-59ed-8d7b-42bfc1e0a651",
    name: "Smithy Rush",
    type: "Sprint",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "If a foe is near after you Dash, you can cause a blast that deals *200* damage in the area. \n ▸ Blast Recharge Time: 10 Sec./9 Sec./8 Sec./7 Sec.",
    icon: "/assets/boons/hephaestus/Smithy_Rush.webp"
  },
  {
    id: "785016d2-a36a-5b74-a067-0aa4a1d3d116",
    name: "Smolder Ring",
    type: "Cast",
    gods: ["Hestia"],
    element: "Fire",
    effect: "Your Casts repeatedly inflict Scorch on foes in the binding circle. \n ▸ Scorch Damage (every 1 Sec.): 40/60/80/100",
    icon: "/assets/boons/hestia/Smolder_Ring.webp"
  },
  {
    id: "467bc2c3-8cd4-53e8-84b6-0f9f8e45ecd2",
    name: "Snow Queen",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Gain a barrier that stops *1* instance of damage in each Location, but you Prime Magick. \n ▸ Magick Primed: 25/20/15/10",
    icon: "/assets/boons/demeter/Snow_Queen.webp"
  },
  {
    id: "99a05be1-6e24-537f-880d-3c087556a4f0",
    name: "Snuffed Candle",
    type: "Non-Core",
    gods: ["Hestia"],
    element: "Fire",
    effect: "You deal more damage to foes that are nowhere near other foes. \n ▸ Damage to Isolated Foes: +15%/+18%/+21%/+24%",
    icon: "/assets/boons/hestia/Snuffed_Candle.webp"
  },
  {
    id: "705fdb01-ac8d-5025-b121-4d837c11b35f",
    name: "Solar Ring",
    type: "Cast",
    gods: ["Apollo"],
    element: "Fire",
    effect: "Your Casts inflict Daze, and deal a burst of damage before they expire. \n ▸ Cast Damage: 80/120/160/200",
    icon: "/assets/boons/apollo/Solar_Ring.webp"
  },
  {
    id: "da004d70-d8bb-5868-a665-a45ca980589f",
    name: "Spiritual Affirmation",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Air",
    effect: "Gain Max Health and Max Magick now and for the rest of this night. \n ▸ Bonus Life & Magick Gain: +15%/+20%/+25%/+30%",
    icon: "/assets/boons/aphrodite/Spiritual_Affirmation.webp"
  },
  {
    id: "d477b146-1783-5971-bf9f-16a9e50b4ff4",
    name: "Stabbing Rush",
    type: "Sprint",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Dash creates a row of falling blades along your path. \n ▸ Blades Damage: 30/45/60/75",
    icon: "/assets/boons/ares/Stabbing_Rush.webp"
  },
  {
    id: "20342519-7937-5ea2-874d-be411bc7da52",
    name: "Static Shock",
    type: "Non-Core",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your strikes emit chain-lightning that bounces up to *4* times, but you Prime 50 Magick. \n ▸ Chain-Lightning Damage: 10/15/20/25",
    icon: "/assets/boons/zeus/Static_Shock.webp"
  },
  {
    id: "ec639226-5b7f-573f-aed5-924d6ebb8b2d",
    name: "Steady Growth",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Whenever you clear enough Encounters, a random Boon you have gains Rarity. \n ▸ Encounters per Rarity Upgrade: 6/5/4/3",
    icon: "/assets/boons/demeter/Steady_Growth.webp"
  },
  {
    id: "befdf2bb-8636-53b8-9032-61dea93f92cb",
    name: "Storm Ring",
    type: "Cast",
    gods: ["Zeus"],
    element: "Air",
    effect: "Your Casts cause lightning bolts to repeatedly strike *1* foe at a time in the binding circle. \n ▸ Bolt Damage (every 0.35 Sec.): 25/30/35/40",
    icon: "/assets/boons/zeus/Storm_Ring.webp"
  },
  {
    id: "7c7d2a9c-0768-551a-be38-c3de75e4b378",
    name: "Sun Worshiper",
    type: "Duo",
    gods: ["Hera", "Apollo"],
    element: "Aether",
    effect: "In each Encounter, the first foe you slay returns to fight for you. \n ▸ Servant Damage: +200%",
    icon: "/assets/boons/duo/Sun_Worshiper.webp",
    prerequisites: [
      {
        boonIds: [
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "b9a505d1-2f12-57f1-9d18-b40f98a70a71", // Engagement Ring
          "25a736fc-b220-55cd-a713-e05a01b4dbfa", // Nexus Rush
          "da411c4d-69ec-5427-8d4e-a7101c649833"  // Born Gain
        ],
        any: true,
        description: "Requires Engagement Ring, Nexus Rush, or Born Gain"
      }
    ]
  },
  {
    id: "41d2708d-2d25-572e-b145-abd2152f7874",
    name: "Sunny Disposition",
    type: "Duo",
    gods: ["Apollo", "Aphrodite"],
    element: "Aether",
    effect: "Whenever you create Heartthrobs, create more. \n ▸ Bonus Heartthrobs: +2.",
    icon: "/assets/boons/duo/Sunny_Disposition.webp",
    prerequisites: [
      {
        boonIds: [
          "0a10c1fd-89af-5dec-8dd5-d20ba7f1aaf6"  // Heart Breaker
        ],
        any: true,
        description: "Requires Heart Breaker"
      },
      {
        boonIds: [
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "677ad451-8bea-54fc-94c9-82953d9044e8", // Nova Flourish
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      }
    ]
  },
  {
    id: "09fcd20a-2b99-5492-841d-db0f338e1ae1",
    name: "Super Nova",
    type: "Non-Core",
    gods: ["Apollo"],
    element: "Air",
    effect: "Your Casts expand in size until they expire. \n ▸ Max Cast Size: 40%/50%/60%/70%",
    icon: "/assets/boons/apollo/Super_Nova.webp"
  },
  {
    id: "39706212-eaea-552d-800f-d1671ddfc8cc",
    name: "Sweet Surrender",
    type: "Non-Core",
    gods: ["Aphrodite"],
    element: "Water",
    effect: "Weak-afflicted foes take more damage. \n ▸ Damage vs. Weak: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/aphrodite/Sweet_Surrender.webp",
    prerequisites: [
      {
        boonIds: [
          "f879486a-3356-5538-b340-3140a893bdba", // Rapture Ring
          "5ff82219-40a3-5149-818a-bb093674c43b", // Passion Rush
          "936e899f-cc41-5003-bdb9-66a6ebae52a1"  // Glamour Gain
        ],
        any: true,
        description: "Requires Rapture Ring, Passion Rush, or Glamour Gain"
      }
    ]
  },
  {
    id: "4b08ee45-008d-5f11-a89a-8a2dc68ff363",
    name: "Sword Ring",
    type: "Cast",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Casts create a falling blade over each foe in the binding circle. \n ▸ Blade Damage: 120/160/200/240",
    icon: "/assets/boons/ares/Sword_Ring.webp"
  },
  {
    id: "6b5ce82f-7776-54f3-afd1-1625119b2020",
    name: "Sworn Flourish",
    type: "Special",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Specials deal more damage and inflict Hitch. \n ▸ Special Damage: +60%/+70%/+80%/+90%",
    icon: "/assets/boons/hera/Sworn_Flourish.webp"
  },
  {
    id: "b13b119a-0570-534b-8a30-abf4c38b0da5",
    name: "Sworn Strike",
    type: "Attack",
    gods: ["Hera"],
    element: "Earth",
    effect: "Your Attacks deal more damage and inflict Hitch. \n ▸ Attack Damage: +50%/+60%/+70%/+80%",
    icon: "/assets/boons/hera/Sworn_Strike.webp"
  },
  {
    id: "7ab48430-8d7a-5daa-827d-f91ddc154548",
    name: "Thermal Dynamics",
    type: "Duo",
    gods: ["Zeus", "Hestia"],
    element: "Aether",
    effect: "Your Blitz effects also inflict Scorch whenever they deal damage. \n ▸ Scorch Damage: 160",
    icon: "/assets/boons/duo/Thermal_Dynamics.webp"
  },
  {
    id: "13f515f5-6415-51e1-a45f-6fb7f2eb2b63",
    name: "Thunder Rush",
    type: "Sprint",
    gods: ["Zeus"],
    element: "Air",
    effect: "Rushing causes surrounding foes to be struck by lightning bolts. \n ▸ Bolt Damage (every 0.35 Sec.): 20/25/30/35",
    icon: "/assets/boons/zeus/Thunder_Rush.webp"
  },
  {
    id: "5ce45cef-32e6-5a80-9d69-f48ef53f07de",
    name: "Tidal Ring",
    type: "Cast",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Casts also immediately hit foes with a powerful splash that inflicts Froth. \n ▸ Splash Damage: 60/90/120/150",
    icon: "/assets/boons/poseidon/Tidal_Ring.webp"
  },
  {
    id: "f3b24e95-48e4-5813-8b41-01674038821d",
    name: "Tough Gain",
    type: "Magick",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Whenever you take damage, shrug some of it off and restore 150 Magick. \n ▸ Damage per Hit: -1/-2/-3/-4",
    icon: "/assets/boons/hephaestus/Tough_Gain.webp"
  },
  {
    id: "16265777-2471-507d-9457-ef385a9a5a47",
    name: "Tranquil Gain",
    type: "Magick",
    gods: ["Demeter"],
    element: "Earth",
    effect: "After remaining inactive for *0.5 Sec.*, rapidly restores Magick until you act. \n ▸ Magick Restoration (every 1 Sec.): 50%/75%/100%/125%",
    icon: "/assets/boons/demeter/Tranquil_Gain.webp"
  },
  {
    id: "859ea719-7400-5149-9e2d-33da488fbde7",
    name: "Tropical Cyclone",
    type: "Duo",
    gods: ["Demeter", "Apollo"],
    element: "Aether",
    effect: "While standing in a Gust, you randomly fire gales every *0.3 Sec.* \n ▸ Gale Damage (every 0.5 Sec.): 70.",
    icon: "/assets/boons/duo/Tropical_Cyclone.webp",
    prerequisites: [
      {
        boonIds: [
          "bc4205cb-d68d-50c7-9cfc-47f75316dd7c", // Nova Strike
          "677ad451-8bea-54fc-94c9-82953d9044e8", // Nova Flourish
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "ac3b5773-96b3-5e4d-bbda-4fff994aed86"  // Lucid Gain
        ],
        any: true,
        description: "Requires Nova Strike, Nova Flourish, Solar Ring, Blinding Rush, or Lucid Gain"
      },
      {
        boonIds: [
          "f4b3601e-b839-5f04-a1ae-675a1431b640", // Frigid Rush
          "0760776f-5eaa-534a-833c-8d8dd3ded47c"  // Arctic Gale
        ],
        any: true,
        description: "Requires Frigid Rush or Arctic Gale"
      }
    ]
  },
  {
    id: "d998f057-e8f8-5ecd-872f-6ef808c1fdd7",
    name: "Trusty Shield",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Whenever you enter a Location, gain Armor for that Location, but you Prime 30 Magick. \n ▸ Starting Armor: +10/+15/+20/+25",
    icon: "/assets/boons/hephaestus/Trusty_Shield.webp"
  },
  {
    id: "f0b5c570-1b9e-5daf-8454-9c6bec471d69",
    name: "Uncanny Fortitude",
    type: "Non-Core",
    gods: ["Hephaestus"],
    element: "Earth",
    effect: "Gain bonus Max Health based on your Magick limit. \n ▸ Max Life from Magick: +20%/+30%/+40%/+50%",
    icon: "/assets/boons/hephaestus/Uncanny_Fortitude.webp"
  },
  {
    id: "5c80fb6b-7386-5217-8e29-9a9b66c64415",
    name: "Uncommon Grace",
    type: "Non-Core",
    gods: ["Hera"],
    element: "Fire",
    effect: "While none of your other Boons are Common, deal more damage. \n ▸ Common-Less Bonus Damage: +10%/+15%/+20%/+25%",
    icon: "/assets/boons/hera/Uncommon_Grace.webp"
  },
  {
    id: "a085af6b-c870-57ab-92fe-f74116143174",
    name: "Universal Donor",
    type: "Duo",
    gods: ["Hera", "Ares"],
    element: "Aether",
    effect: "Whenever you exit a Location, keep some of your Plasma bonuses. \n ▸ Max Plasma Bonus Retained: 20%",
    icon: "/assets/boons/duo/Universal_Donor.webp"
  },
  {
    id: "ba9f445b-b3fc-54e4-a63b-782f09b28860",
    name: "Vicious Flourish",
    type: "Special",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Specials deal more damage and inflict Wounds. \n ▸ Special Damage: +30%/+40%/+50%/+60%.",
    icon: "/assets/boons/ares/Vicious_Flourish.webp"
  },
  {
    id: "5eb0886b-24f5-5bb1-b2ba-9208e0212339",
    name: "Vicious Strike",
    type: "Attack",
    gods: ["Ares"],
    element: "Earth",
    effect: "Your Attacks deal more damage and inflict Wounds. \n ▸ Attack Damage: +20%/+30%/+40%/+50%.",
    icon: "/assets/boons/ares/Vicious_Strike.webp"
  },
  {
    id: "05ff4a99-ecf6-5ce8-80e8-742ab1d4def4",
    name: "Visceral Impact",
    type: "Non-Core",
    gods: ["Ares"],
    element: "Earth",
    effect: "After you take damage or a foe is slain, spill Plasma, sometimes twice. \n ▸ Bonus Plasma Chance: 25%/35%/45%/55%",
    icon: "/assets/boons/ares/Visceral_Impact.webp"
  },
  {
    id: "936cb120-f32e-532f-ab9b-61777652f883",
    name: "Volcanic Flourish",
    type: "Special",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Specials can cause a blast that deals *500* damage in the area. \n ▸ Blast Recharge Time: 15 Sec./13 Sec./11 Sec./9 Sec.",
    icon: "/assets/boons/hephaestus/Volcanic_Flourish.webp"
  },
  {
    id: "798575af-a5a4-5b8f-bb3d-a29714214e98",
    name: "Volcanic Strike",
    type: "Attack",
    gods: ["Hephaestus"],
    element: "Fire",
    effect: "Your Attacks can cause a blast that deals *400* damage in the area. \n ▸ Blast Recharge Time: 12 Sec./10 Sec./8 Sec./6 Sec.",
    icon: "/assets/boons/hephaestus/Volcanic_Strike.webp"
  },
  {
    id: "21738f02-be41-5c81-87a3-fc183d862a2f",
    name: "Warm Breeze",
    type: "Duo",
    gods: ["Apollo", "Hestia"],
    element: "Aether",
    effect: "Whenever you Dodge or Daze causes a foe to miss, restore some Health. \n ▸ Life Restored per Evasion: 10",
    icon: "/assets/boons/duo/Warm_Breeze.webp",
    prerequisites: [
      {
        boonIds: [
          "705fdb01-ac8d-5025-b121-4d837c11b35f", // Solar Ring
          "9f297b05-6e18-537a-8845-79c082317b9d", // Blinding Rush
          "abde81b0-8578-5373-b6c8-f49ab73f6a98", // Light Smite
          "b16d3778-57f6-5f4c-b33b-25364fc0238c"  // Dazzling Display
        ],
        any: true,
        description: "Requires Solar Ring, Blinding Rush, Light Smite, or Dazzling Display"
      },
      {
        boonIds: [
          "ed24b45a-d7bc-57d9-817d-989521fc5bf3", // Flame Strike
          "f67e501c-5277-588f-a274-d0216437c764", // Flame Flourish
          "785016d2-a36a-5b74-a067-0aa4a1d3d116", // Smolder Ring
          "ed08770d-871a-5322-a96b-25c501a4992f", // Heat Rush
          "cb343fe8-09fb-5cda-9361-9fb6cd40085d"  // Cardio Gain
        ],
        any: true,
        description: "Requires Flame Strike, Flame Flourish, Smolder Ring, Heat Rush, or Cardio Gain"
      }
    ]
  },
  {
    id: "f35ccd65-627c-5556-b865-6ef1adf19aea",
    name: "Water Fitness",
    type: "Infusion",
    gods: ["Poseidon"],
    element: null,
    effect: "Gain Max Health for each Water Essence you have. \n ▸ Max Life per Water Essence: +15",
    icon: "/assets/boons/poseidon/Water_Fitness.webp"
  },
  {
    id: "33734633-ed5b-526f-acb1-4662f97893e2",
    name: "Wave Flourish",
    type: "Special",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Specials hit foes with a splash that knocks other foes away. \n ▸ Splash Damage: 25/35/45/55",
    icon: "/assets/boons/poseidon/Wave_Flourish.webp"
  },
  {
    id: "f43cb7a0-733f-5797-87f2-e1dcfea27273",
    name: "Wave Strike",
    type: "Attack",
    gods: ["Poseidon"],
    element: "Water",
    effect: "Your Attacks hit foes with a splash that knocks other foes away. \n ▸ Splash Damage: 20/25/30/35",
    icon: "/assets/boons/poseidon/Wave_Strike.webp"
  },
  {
    id: "32284885-da4d-506c-862a-81a47a311753",
    name: "Weed Killer",
    type: "Non-Core",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Your \u03a9 Attack deals more damage, but uses +10 Magick. \n ▸ Omega Attack Damage: +50%/+75%/+100%/+125%",
    icon: "/assets/boons/demeter/Weed_Killer.webp"
  },
  {
    id: "6907f2a1-cf77-5df5-8374-dc0e23f0a2c0",
    name: "Winter Harvest",
    type: "Legendary",
    gods: ["Demeter"],
    element: "Earth",
    effect: "Freeze-afflicted foes shatter at 10% Health, dealing damage in the area. \n ▸ Shatter Area Damage: 100",
    icon: "/assets/boons/demeter/Winter_Harvest.webp"
  },
  {
    id: "d5eb1eea-d7e2-5efe-bf20-e1fa48c1ddfc",
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
  }
];
