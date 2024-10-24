"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const input_1 = require("@/components/ui/input");
const sheet_1 = require("@/components/ui/sheet");
function page() {
    return (<div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <lucide_react_1.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <input_1.Input type="search" placeholder="Search products..." className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"/>
              </div>
            </form>
          </div>
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
        </header>

        {/* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
          </div>
        </main> */}
      </div>
    </div>);
}
