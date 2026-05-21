# Hades II Build Planner

An interactive, high-fidelity companion application for planning character builds in Supergiant Games' **Hades II**

## 🚀 Live App
You can access the live application here: **[Hades II Build Planner](https://hades-ii-build-planner-54268731549.us-west2.run.app/)**

## ✨ Features

- **Fluid Drag & Drop UI**: Assign boons smoothly from the sidebar library by dragging and dropping using `@dnd-kit` powered drag mechanics.
- **Dynamic Elements & Status Tracker**: Keep automated tallies of Elemental Essences (Air, Earth, Fire, Water, Aether) and active Status Curses as you assign boons.
- **Instantly Shareable Builds**: The application automatically synchronizes your current planner config directly into the browser URL query parameters. Copy the link to bookmark or your build instantly!
- **LocalStorage State Persistence**: Your selected boons, custom build name, and library filter preferences are saved to your local browser storage.

## 📝 How to Use

1. **Explore & Filter**: 
    - Search for boons in the collapsible Boon Library sidebar using the search bar (press `/` to focus). 
    - You can search by boon name, boon effect, Olympian god, Elemental Essence, Status Curse, or boon slot (Attack, Special, Cast, Sprint, Magick, Non-Core, Infusion, Legendary, Duo).
    - Toggle checkboxes to filter by God Pools or hide already assigned boons.
2. **Assign slots**: 
    - Drag and drop boons from the library into their respective slots to assign them to your build.
    - Alternatively, clicking a slot will filter the library to show valid boons that can fit into that slot (ex: clicking on an empty Special slot will filter the library to show just Special boons for assignment).
3. **Purge/Remove Boons**: Drag a boon into the *Pool of Purging* to discard it, or simply click on the X in the top right corner of the boon card.
4. **Name Your Build**: Click on the **"Untitled Build"** (or current name) heading at the top of the planner, type your custom name, and press `Enter` to set it.
5. **Save and Share Your Build**: Click the **Copy Share Link** button to copy a custom, serialized URL directly to your clipboard for bookmarking or sharing.

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
