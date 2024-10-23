"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const link_1 = require("next/link");
const lucide_react_1 = require("lucide-react");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const sheet_1 = require("@/components/ui/sheet");
function Navbar() {
    return (<div>
      {/* Adjusted styles for fixed height navbar */}
      <div className="flex items-center justify-between w-full h-[60px] bg-green-300 border-b px-4 fixed top-0 left-[240px] right-0 z-50">
        <header className="flex items-center gap-4">
          <sheet_1.Sheet>
            <sheet_1.SheetTrigger asChild>
              <button_1.Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <lucide_react_1.Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </button_1.Button>
            </sheet_1.SheetTrigger>
            <sheet_1.SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <link_1.default href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <lucide_react_1.Package2 className="h-6 w-6"/>
                  <span className="sr-only">Acme Inc</span>
                </link_1.default>
                <link_1.default href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <lucide_react_1.Home className="h-5 w-5"/>
                  Dashboard
                </link_1.default>
                <link_1.default href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                  <lucide_react_1.ShoppingCart className="h-5 w-5"/>
                  Orders
                  <badge_1.Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </badge_1.Badge>
                </link_1.default>
                <link_1.default href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <lucide_react_1.Package className="h-5 w-5"/>
                  Products
                </link_1.default>
                <link_1.default href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <lucide_react_1.Users className="h-5 w-5"/>
                  Customers
                </link_1.default>
                <link_1.default href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <lucide_react_1.LineChart className="h-5 w-5"/>
                  Analytics
                </link_1.default>
              </nav>
            </sheet_1.SheetContent>
          </sheet_1.Sheet>
        </header>
        {/* Right-side content */}
        <div className="flex items-center gap-4">
          {/* User menu */}
          <dropdown_menu_1.DropdownMenu>
            <dropdown_menu_1.DropdownMenuTrigger asChild>
              <button_1.Button variant="secondary" size="icon" className="rounded-full">
                <lucide_react_1.UserCog className="h-5 w-5"/>
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
        </div>
        {/* <div>
          {user && (
            <div>
              <p>{user.email}</p>
            </div>
          )}
        </div> */}
      </div>
      {/* Content area offset for navbar height */}
      <main className="mt-[60px]"></main>
    </div>);
}
