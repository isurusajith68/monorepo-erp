"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
{
    /* <h1>Header</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="customer">Customer</NavLink>
      <NavLink to="invoice">Invoice</NavLink>
      <NavLink to="add">Add Invoice</NavLink>
      <NavLink to="list">List Invoice</NavLink>
       */
}
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const navbar_1 = require("../components/Navbar/navbar");
const sidebar_1 = require("../components/Navbar/sidebar");
const toaster_1 = require("@/components/ui/toaster");
function RootLayout() {
    return (
    // <div className="root-layout h-screen flex flex-col">
    //   {/* Navbar at the top */}
    //   <Navbar />
    //   {/* Main content wrapper */}
    //   <div className="flex flex-1">
    //     {/* Sidebar on the left */}
    //     <Sidebar />
    //     {/* Main content (should not overflow sidebar) */}
    //     <main className="ml-[220px] lg:ml-[280px] p-4 bg-gray-100 overflow-auto w-full">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <div className="relative min-h-screen w-full">
      {/* Sidebar is now fixed, so it's outside the grid */}
      <sidebar_1.default />

      {/* Main Content Area with Navbar */}
      <div className="flex flex-col md:ml-[220px] lg:ml-[280px]">
        <navbar_1.default />
        {/* Content adjusts based on sidebar visibility */}
        <div className="flex-1 overflow-y-auto p-4">
          <react_router_dom_1.Outlet />
        </div>
        <toaster_1.Toaster />
      </div>
    </div>);
}
