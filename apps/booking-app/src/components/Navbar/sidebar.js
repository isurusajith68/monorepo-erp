"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
exports.description = 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';
const Sidebar = () => {
    return (<div className="hidden border-r bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] ">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-400">
          <react_router_dom_1.Link to="/" className="flex items-center gap-2 font-semibold">
            <lucide_react_1.Package2 className="h-6 w-6"/>
            <span className="">Booking App</span>
          </react_router_dom_1.Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <react_router_dom_1.Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.Home className="h-4 w-4"/>
              Dashboard
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/booking/add" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.ShoppingCart className="h-4 w-4"/>
              Add Booking
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="bookings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.Package className="h-4 w-4"/>
              View Booking
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="registration/add" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.Users className="h-4 w-4"/>
              Guest Registration
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="registrations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.LineChart className="h-4 w-4"/>
              View Registration
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="reports" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <lucide_react_1.LineChart className="h-4 w-4"/>
              Reports
            </react_router_dom_1.Link>
          </nav>
        </div>
      </div>
    </div>);
};
exports.default = Sidebar;
