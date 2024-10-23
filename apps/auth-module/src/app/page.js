"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@/App.css");
const react_router_dom_1 = require("react-router-dom");
const routes_1 = require("./routes");
const toaster_1 = require("@/components/ui/toaster");
function App() {
    return (<>
      {/* <h1 className='text-6xl'>hello</h1>
       <Button>hello</Button> */}
      <toaster_1.Toaster />
      {/* initialize browser router */}
      <react_router_dom_1.RouterProvider router={routes_1.router}></react_router_dom_1.RouterProvider>
    </>);
}
exports.default = App;
