"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const layout_1 = __importDefault(require("./layout"));
const page_1 = __importDefault(require("./homepage/page"));
const page_2 = __importDefault(require("./role/page"));
const page_3 = __importDefault(require("./testfile/page"));
const form_role_tan_1 = __importDefault(require("./role/_components/form-role-tan"));
const form_role_new_1 = __importDefault(require("./role/_components/form-role-new"));
const page_4 = __importDefault(require("./modules/page"));
const page_5 = __importDefault(require("./documents/page"));
const page_6 = __importDefault(require("./actions/page"));
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
      <react_router_dom_1.Route path="/test" element={<page_3.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/tform" element={<form_role_tan_1.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/newform" element={<form_role_new_1.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/modules" element={<page_4.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/documents" element={<page_5.default />}></react_router_dom_1.Route>
      <react_router_dom_1.Route path="/actions" element={<page_6.default />}></react_router_dom_1.Route>
      {/* this is a public route */}
      <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/"/>}></react_router_dom_1.Route>
    </react_router_dom_1.Route>));
