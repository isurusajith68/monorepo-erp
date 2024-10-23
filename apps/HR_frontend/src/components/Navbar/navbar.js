"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const sheet_1 = require("@/components/ui/sheet");
exports.description = 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';
const Navbar = () => {
    return (<header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-white/90 backdrop-blur-md px-4 lg:h-[60px] lg:px-6 bg-green-500">
      <sheet_1.Sheet>
        <sheet_1.SheetTrigger asChild>
          <button_1.Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <lucide_react_1.Menu className="h-5 w-5"/>
            <span className="sr-only">Toggle navigation menu</span>
          </button_1.Button>
        </sheet_1.SheetTrigger>
        <sheet_1.SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <react_router_dom_1.Link to="#" className="flex items-center gap-2 text-lg font-semibold">
              <lucide_react_1.Package2 className="h-6 w-6"/>
              <span className="sr-only">Acme Inc</span>
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Home className="h-5 w-5"/>
              Dashboard
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/orders" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
              <lucide_react_1.ShoppingCart className="h-5 w-5"/>
              Orders
              <badge_1.Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </badge_1.Badge>
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/products" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Package className="h-5 w-5"/>
              Products
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/customers" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Users className="h-5 w-5"/>
              Customers
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/analytics" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
              <lucide_react_1.LineChart className="h-5 w-5"/>
              Analytics
            </react_router_dom_1.Link>
          </nav>
        </sheet_1.SheetContent>
      </sheet_1.Sheet>
      <div className="w-full flex-1"></div>
      <dropdown_menu_1.DropdownMenu>
        <dropdown_menu_1.DropdownMenuTrigger asChild>
          <button_1.Button variant="secondary" size="icon" className="rounded-full">
            <lucide_react_1.CircleUser className="h-5 w-5"/>
            <span className="sr-only">Toggle user menu</span>
          </button_1.Button>
        </dropdown_menu_1.DropdownMenuTrigger>
        <dropdown_menu_1.DropdownMenuContent align="end">
          <dropdown_menu_1.DropdownMenuLabel>My Account</dropdown_menu_1.DropdownMenuLabel>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>Settings</dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuItem>Support</dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>Logout</dropdown_menu_1.DropdownMenuItem>
        </dropdown_menu_1.DropdownMenuContent>
      </dropdown_menu_1.DropdownMenu>
    </header>);
};
exports.default = Navbar;
