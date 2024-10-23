"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const react_router_dom_1 = require("react-router-dom");
function RootLayout() {
    return (<div>
      <div className="w-full flex float-start ">
        <p className="text-4xl p-2">nav bar</p>
      </div>
      <react_router_dom_1.Outlet></react_router_dom_1.Outlet>
    </div>);
}
