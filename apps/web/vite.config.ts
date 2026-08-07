import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Same-origin /api → cookie SameSite=Lax works without Secure cross-site hacks
      '/api': {
        target: 'http://localhost:5164',
        changeOrigin: true,
      },
    },
  },
})
