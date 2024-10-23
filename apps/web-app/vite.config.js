"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const plugin_react_1 = require("@vitejs/plugin-react");
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, './src'),
        },
    },
});
