{
  /* <h1>Header</h1>
    <NavLink to="/">Home</NavLink>
    <NavLink to="customer">Customer</NavLink>
    <NavLink to="invoice">Invoice</NavLink>
    <NavLink to="add">Add Invoice</NavLink>
    <NavLink to="list">List Invoice</NavLink>
     */
}
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";
import Sidebar from "../components/Navbar/sidebar";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout() {
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
      <Sidebar />

      {/* Main Content Area with Navbar */}
      <div className="flex flex-col md:ml-[220px] lg:ml-[280px]">
        <Navbar />
        {/* Content adjusts based on sidebar visibility */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
        <Toaster />
      </div>
    </div>
  );
}
