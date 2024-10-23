"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedRoute;
const react_router_dom_1 = require("react-router-dom");
function ProtectedRoute() {
    const isLoggedIn = window.localStorage.getItem('loggedin');
    return isLoggedIn === 'true' ? <react_router_dom_1.Outlet></react_router_dom_1.Outlet> : <react_router_dom_1.Navigate to="/"/>;
}
