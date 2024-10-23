"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    build: {
        lib: {
            entry: (0, path_1.resolve)(__dirname, 'src/index.ts'), // Make sure this points to your entry file
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
});
