import { defineConfig } from 'vite'        // ← this line was missing
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://portfolio-o3jz.onrender.com',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://portfolio-o3jz.onrender.com',
        changeOrigin: true
      }
    }
  }
})