"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const button_1 = require("@/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
const popover_1 = require("@/components/ui/popover");
const fa_1 = require("react-icons/fa");
function RootLayout() {
    return (<div>
      {/* <div className="w-full flex float-start "> */}
      <nav className="bg-blue-900 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <react_router_dom_1.Link to="/" className="text-white font-semibold text-lg flex space-x-4">
            <div className="bg-green-500 w-10 h-10 rounded-md"/>
            {/* <img src={Logo} alt="Logo" width={150} height={50} className="pt-2" /> */}

            <h1 className="cursor-pointer mt-1">Auth Module App</h1>
          </react_router_dom_1.Link>
        </div>
        <div className="flex space-x-4 items-center">
          <popover_1.Popover>
            <popover_1.PopoverTrigger asChild>
              <button className="focus:outline-none bg-white p-2 rounded-full">
                <fa_1.FaUser className="text-black" size={20}/>
              </button>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="p-4 w-28">
              <div className="flex flex-col gap-2">
                <button_1.Button variant="ghost" className="w-full text-left">
                  Profile
                </button_1.Button>
                <button_1.Button variant="ghost" className="w-full text-left">
                  Settings
                </button_1.Button>
                <button_1.Button variant="ghost" className="w-full text-left">
                  Logout
                </button_1.Button>
              </div>
            </popover_1.PopoverContent>
          </popover_1.Popover>
          <button_1.Button variant="ghost" className="text-white">
            <i className="fas fa-bars"></i>
            {/* <FaBars className="text-white text-2xl" /> */}
          </button_1.Button>
        </div>
      </nav>
      {/* <div className="mx-[10%] border-2 border-rose-600 "> */}
      <div>
        <react_router_dom_1.Outlet></react_router_dom_1.Outlet>
      </div>
    </div>);
}
