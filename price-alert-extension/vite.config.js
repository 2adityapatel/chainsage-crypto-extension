import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'public/popup.html'),
        background: resolve(__dirname, 'src/background/background.js'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            return 'background/background.js';
          }
          if (chunkInfo.name === 'popup') {
            return 'popup.js';
          }
          return 'popup.js';
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,

  },
  publicDir: 'public',
});