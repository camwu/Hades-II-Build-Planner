# Hades II Build Planner

An interactive, high-fidelity companion application for planning character builds in Supergiant Games' **Hades II**

## 🚀 Live App
You can access the live application here: **[Hades II Build Planner](https://hades-ii-build-planner-54268731549.us-west2.run.app/)**

## ✨ Features

- **Fluid Drag & Drop UI**: Assign boons smoothly from the sidebar library by dragging and dropping using `@dnd-kit` powered drag mechanics.
- **Altar of Ashes (Arcana Cards)**: Unlock and toggle cards from Melinoë's deck of 25 unique Arcana cards. Automatically tracks Grasp costs against your current budget and validates special Awakening requirements (such as zero-cost cards requiring specific surrounding/count activations) in real time.
- **Dynamic Elements & Status Tracker**: Keep automated tallies of Elemental Essences (Air, Earth, Fire, Water, Aether) and active Status Curses as you assign boons.
- **Instantly Shareable Builds**: The application automatically synchronizes both your selected boons and active Arcana card layouts directly into the browser URL query parameters (`ar`). Copy the link to share or bookmark your exact build instantly!
- **LocalStorage State Persistence**: Your selected boons, active Arcana setup, custom build name, and library filter preferences are saved automatically to your local browser storage.
- **Mirrored Dual-Sidebar Interface**: Retractable, buttery smooth sidebar panels on both left and right flanks that slide into deep slate card frames, maintaining design alignment across both planning wings.

## 📝 How to Use

1. **Explore & Filter**: 
    - Search for boons in the collapsible Boon Library sidebar using the search bar (press `/` to focus). 
    - Search by boon name, boon effect, Olympian god, Elemental Essence, Status Curse, or slot (Attack, Special, Cast, Sprint, Magick, Non-Core, Infusion, Legendary, Duo).
    - Filter by God Pools, or hide already assigned boons.
2. **Assign Slots**: 
    - Drag and drop boons from the library into their slots to assign them to your character build.
    - Alternatively, click a slot to auto-filter the library list to valid options (e.g. clicking Special brings up only Special boons).
3. **Toggle Arcana Cards (Altar of Ashes)**:
    - Expand the right-hand **Altar of Ashes** sidebar panel to toggle your deck cards.
    - Select cards within your active Grasp limit constraints.
    - Hover over card layouts to view full Awakening conditions, exact Roman numeral codes, and Grasp allocation stats.
4. **Purge/Remove Boons**: Drag a boon card into the central *Pool of Purging* to discard it, or click the X icon on the card banner.
5. **Name Your Build**: Click the build title header at the top of the interface, type a custom name, and save it.
6. **Save & Share**: Click the **Copy Share Link** button to copy a fully serialized custom URL containing both your boon slots and active Arcana grid configuration.

## 📦 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Interactions**: [@dnd-kit/core](https://dnd-kit.com/) for drag-and-drop orchestration
- **Animations**: [Motion](https://motion.dev/) (fomerly Framer Motion) for smooth layout transitions and sidebar peek mechanics
- **Icons**: [Lucide React](https://lucide.github.io/lucide/) for vector iconography

## 🛠️ Local Development

Follow these steps to run this app locally on your machine.

### Installation

1. Install necessary dependencies from the package root:
   ```bash
   npm install
   ```

### Execution

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal).

### Production Build

4. Compile the static optimized bundle ready for deployment:
   ```bash
   npm run build
   ```

## Disclaimer

Hades II Build Planner is an unofficial, fan-developed project that is not affiliated with or endorsed by Supergiant Games. Hades II, its characters, and all art assets are property of Supergiant Games.
