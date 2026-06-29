import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Garde cette option pour GitHub Codespaces
  },
  // Use repository root as Vite root so the global index.html is served
  root: resolve(__dirname, '../'),
  // Public dir lives inside the vite-project folder
  publicDir: resolve(__dirname, './public'),
})