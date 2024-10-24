"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const lucide_react_1 = require("lucide-react");
const tb_1 = require("react-icons/tb");
const io5_1 = require("react-icons/io5");
const react_1 = require("@remix-run/react");
exports.description = 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';
const Sidebar = () => {
    return (<div className="hidden border-r bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] ">
      <div className="flex h-full max-h-screen flex-col gap-2 bg-blue-400 text-white">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-400">
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 text-white">
            <react_1.Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <lucide_react_1.Home className="h-4 w-4"/>
              Dashboard
            </react_1.Link>
            <react_1.Link to="/hotel-info/23" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <lucide_react_1.NotebookPen className="h-4 w-4"/>
              Hotel Info
            </react_1.Link>
            <react_1.Link to="/room-type/list" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <lucide_react_1.BookOpenText className="h-4 w-4"/>
              Room Type
            </react_1.Link>
            <react_1.Link to="/room-view/list" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <lucide_react_1.UserPlus className="h-4 w-4"/>
              Room Views
            </react_1.Link>
            <react_1.Link to="/room-list" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <io5_1.IoPeople className="h-4 w-4"/>
              Rooms
            </react_1.Link>
            <react_1.Link to="/room-price-list" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <tb_1.TbReportAnalytics className="h-4 w-4"/>
              Room Price
            </react_1.Link>
            <react_1.Link to="offers-list" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary">
              <tb_1.TbReportAnalytics className="h-4 w-4"/>
              Offers
            </react_1.Link>
          </nav>
        </div>
      </div>
    </div>);
};
exports.default = Sidebar;
