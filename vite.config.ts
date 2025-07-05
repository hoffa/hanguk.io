import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ViteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    react(),
    tailwindcss(),
    ViteImagemin({
      mozjpeg: {
        quality: 40,
        progressive: true,
      },
    }),
  ],
})
