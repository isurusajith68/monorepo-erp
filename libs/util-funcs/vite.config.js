"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const path_1 = require("path");
const vite_plugin_dts_1 = __importDefault(require("vite-plugin-dts"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    build: { lib: { entry: (0, path_1.resolve)(__dirname, 'src/main.ts'), formats: ['es'] } },
    resolve: { alias: { src: (0, path_1.resolve)('src/') } },
    plugins: [(0, vite_plugin_dts_1.default)()],
});
