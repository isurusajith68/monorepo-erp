"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const react_router_dom_1 = require("react-router-dom");
function RootLayout() {
    return (<div className="relative min-h-screen w-full">
      <div>
        <react_router_dom_1.Outlet />
      </div>
    </div>);
}
