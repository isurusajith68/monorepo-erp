"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("@remix-run/dev");
const vite_1 = require("vite");
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, dev_1.vitePlugin)({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        (0, vite_tsconfig_paths_1.default)(),
    ],
});
