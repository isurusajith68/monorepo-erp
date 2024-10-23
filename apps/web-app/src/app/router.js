"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const page_1 = require("./template-1/page");
const rootlayout_1 = require("./rootlayout");
const page_2 = require("./template-2/page");
exports.router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(<react_router_dom_1.Route path="/" element={<rootlayout_1.default />}>
      <react_router_dom_1.Route path="template-1" element={<page_1.default />}/>
      <react_router_dom_1.Route path="template-2" element={<page_2.default />}/>
    </react_router_dom_1.Route>));
