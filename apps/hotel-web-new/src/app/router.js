"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const rootlayout_1 = __importDefault(require("./rootlayout"));
const page_1 = __importDefault(require("./home/page"));
const page_2 = __importDefault(require("./select-template/page"));
const page_3 = __importDefault(require("./create-template-1/page"));
exports.router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(<react_router_dom_1.Route path="/" element={<rootlayout_1.default />}>
      <react_router_dom_1.Route path="home" element={<page_1.default />}/>
      <react_router_dom_1.Route path="select-template" element={<page_2.default />}/>
      <react_router_dom_1.Route path="create-template1" element={<page_3.default />}/>
    </react_router_dom_1.Route>));
