import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = process.env.VERCEL_ENV !== undefined;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 base: process.env.VITE_BASE_PATH || '/',
   build: {
    outDir: isVercel ? 'dist' : 'docs'
  }


})
