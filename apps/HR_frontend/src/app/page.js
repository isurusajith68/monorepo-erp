"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const router_1 = require("./router");
const toaster_1 = require("@/components/ui/toaster");
// import Axios from "axios";
function App() {
    return (<>
      <toaster_1.Toaster />
      <react_router_dom_1.RouterProvider router={router_1.router}/>
    </>);
}
exports.default = App;
