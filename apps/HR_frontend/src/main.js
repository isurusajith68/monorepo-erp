"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
require("./index.css");
const page_tsx_1 = __importDefault(require("./app/page.tsx"));
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <page_tsx_1.default />
    {/* <Page /> */}
  </react_1.StrictMode>);
