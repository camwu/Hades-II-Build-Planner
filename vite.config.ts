import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

function getLatestModifiedTime(dir: string): Date {
  let latest = new Date(0);
  try {
    if (!fs.existsSync(dir)) return latest;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subLatest = getLatestModifiedTime(fullPath);
        if (subLatest > latest) {
          latest = subLatest;
        }
      } else {
        if (stat.mtime > latest) {
          latest = stat.mtime;
        }
      }
    }
  } catch (err) {
    console.error("Error reading directory for last updated timestamp:", err);
  }
  return latest;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const latestTime = getLatestModifiedTime(path.resolve(__dirname, 'src'));
  const validDate = latestTime.getTime() === 0 ? new Date() : latestTime;
  const isoString = validDate.toISOString();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_LAST_UPDATED': JSON.stringify(isoString),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
