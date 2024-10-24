"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../index.css");
function RootLayout() {
    return (<div>
      <header>
        <nav>
          <react_router_dom_1.NavLink to="/" className="m-4">
            Home
          </react_router_dom_1.NavLink>
          <react_router_dom_1.NavLink to="/dashboard">Dashboard</react_router_dom_1.NavLink>
        </nav>
      </header>
      <main>
        {/* render the child routes */}
        <react_router_dom_1.Outlet></react_router_dom_1.Outlet>
      </main>
    </div>);
}
