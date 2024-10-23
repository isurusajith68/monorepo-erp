"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const router_1 = require("./router");
// import Axios from "axios";
function App() {
    return (<>
      <react_router_dom_1.RouterProvider router={router_1.router}/>
    </>);
}
exports.default = App;
