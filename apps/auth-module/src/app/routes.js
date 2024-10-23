"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const layout_1 = require("./layout");
const page_1 = require("./homepage/page");
const page_2 = require("./role/page");
// create a browserRouter
exports.router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(
// wrap two childs inside the rootLayout
// <Route path="/" element={<RootLayout />}>
<react_router_dom_1.Route path="/" element={<layout_1.default />}>
      <react_router_dom_1.Route index element={<page_1.default />}></react_router_dom_1.Route>
      {/* This defines the default child route under the root (/). */}
      {/* <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route> */}
      <react_router_dom_1.Route path="/role" element={<page_2.default />}></react_router_dom_1.Route>

      {/* this is a public route */}
      <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
    </react_router_dom_1.Route>));
