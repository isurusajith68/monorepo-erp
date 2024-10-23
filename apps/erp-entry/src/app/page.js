"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const toaster_1 = require("@/components/ui/toaster");
const routes_1 = require("./routes");
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<div>
      <toaster_1.Toaster />
      {/* initialize browser router */}
      <react_router_dom_1.RouterProvider router={routes_1.router}></react_router_dom_1.RouterProvider>
    </div>);
}
