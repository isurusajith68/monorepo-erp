import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Make sure this points to your entry file
      name: 'Common', // Your library name
      fileName: (format) => `common.${format}.js`, // Output file name
      formats: ['es', 'umd'], // Specify output formats
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React', // Global variable name for React
          'react-dom': 'ReactDOM', // Global variable name for ReactDOM
        },
      },
    },
  },
})
