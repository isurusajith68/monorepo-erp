import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adjust to your src folder path
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'react-beautiful-timeline',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
