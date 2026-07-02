import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Garde cette option pour GitHub Codespaces
  },
  // Use the vite-project folder as the Vite root
  root: fileURLToPath(new URL('.', import.meta.url)),
  // Public dir lives inside the vite-project folder
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
});
