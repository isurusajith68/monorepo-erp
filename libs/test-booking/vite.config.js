"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const path_1 = __importDefault(require("path"));
const path_2 = require("path");
const vite_plugin_dts_1 = __importDefault(require("vite-plugin-dts"));
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const vite_plugin_css_injected_by_js_1 = __importDefault(require("vite-plugin-css-injected-by-js"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, 'src'), // Adjust to your src folder path
        },
    },
    build: {
        lib: {
            entry: (0, path_2.resolve)(__dirname, './src/index.ts'),
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
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_plugin_dts_1.default)({ rollupTypes: true }), (0, vite_plugin_css_injected_by_js_1.default)()],
    css: {
        postcss: {
            plugins: [tailwindcss_1.default],
        },
    },
});
