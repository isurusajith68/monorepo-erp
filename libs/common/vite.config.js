"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const path_1 = require("path");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_plugin_dts_1 = __importDefault(require("vite-plugin-dts"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_plugin_dts_1.default)({ include: ['lib'] })],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: (0, path_1.resolve)(__dirname, 'src/main.ts'),
            name: 'MyLib',
            // the proper extensions will be added
            fileName: 'my-lib',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'react',
                },
            },
        },
    },
});
