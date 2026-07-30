import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer')
    }
  },
  root: './src/renderer',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  }
})
