"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const page_1 = __importDefault(require("./signup/page"));
const page_2 = __importDefault(require("./login/page"));
const page_3 = __importDefault(require("./homepage/page"));
const page_4 = __importDefault(require("./dashboard/page"));
const page_5 = __importDefault(require("./protectedRoutes/page"));
// create a browserRouter
exports.router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(
// wrap two childs inside the rootLayout
// <Route path="/" element={<RootLayout />}>
<react_router_dom_1.Route path="/">
      <react_router_dom_1.Route index element={<page_3.default />}></react_router_dom_1.Route>{' '}
      {/* This defines the default child route under the root (/). */}
      <react_router_dom_1.Route path="/login" element={<page_2.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/signup" element={<page_1.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route element={<page_5.default></page_5.default>}>
        <react_router_dom_1.Route path="/dashboard" element={<page_4.default />}></react_router_dom_1.Route>
        <react_router_dom_1.Route path="/loginl" element={<react_router_dom_1.Navigate to="/login"/>}></react_router_dom_1.Route>
      </react_router_dom_1.Route>
      {/* this is a public route */}
      <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
    </react_router_dom_1.Route>));
