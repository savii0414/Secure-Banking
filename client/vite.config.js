import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    sourcemap: false, // optional: disables source maps
  },
  server: {
    port:3001,
    open:true,
  },
})
