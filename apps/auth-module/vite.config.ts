import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import babel from 'vite-plugin-babel'

export default defineConfig({
  // plugins: [react(), babel()],
  // esbuild: {
  //   target: "es2023"  // Target ES2023 for new features
  // },
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
