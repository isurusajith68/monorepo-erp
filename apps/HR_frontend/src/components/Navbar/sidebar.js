"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const fa_1 = require("react-icons/fa");
const fa6_1 = require("react-icons/fa6");
const fa6_2 = require("react-icons/fa6");
const io5_1 = require("react-icons/io5");
const fa_2 = require("react-icons/fa");
exports.description = 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';
const Sidebar = () => {
    return (<div className="hidden border-r bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] ">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-400">
          <react_router_dom_1.Link to="/" className="flex items-center gap-2 font-semibold">
            <fa_2.FaUsersCog className="w-6 h-6"/>
            <span className="text-xl f">HR Management App</span>
          </react_router_dom_1.Link>
          {/* <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 font-medium lg:px-4">
            <react_router_dom_1.Link to="/" className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg -2 pex-3 tgap-3 hover:text-primary ">
              <io5_1.IoHome className="w-5 h-5"/>
              Dashboard
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="employees" className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary">
              <fa_1.FaUserPlus className="w-5 h-5"/>
              Employees
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="bookings" className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary">
              <fa6_1.FaUserPen className="w-5 h-5"/>
              Attendance
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="registration/add" className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary">
              <fa6_2.FaHospitalUser className="w-5 h-5"/>
              Leaves
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="registrations" className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary">
              <lucide_react_1.LineChart className="w-5 h-5"/>
              Report
            </react_router_dom_1.Link>
          </nav>
        </div>
      </div>
    </div>);
};
exports.default = Sidebar;
