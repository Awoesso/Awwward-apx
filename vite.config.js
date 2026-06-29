import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  // root stays at repository root so the global index.html is used
  root: resolve(__dirname, './'),

  // serve public assets from the vite-project/public folder
  publicDir: resolve(__dirname, 'vite-project/public'),

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'vite-project/src'),
    },
  },

  build: {
    // emit dist into vite-project/dist so the project structure stays tidy
    outDir: resolve(__dirname, 'vite-project/dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
