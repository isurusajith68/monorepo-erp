import { Link } from 'react-router-dom'
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FaUser } from 'react-icons/fa'

// export const description =
// 'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.'

const Navbar = ({ logout }: { logout: any }) => {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b  backdrop-blur-md px-4 lg:h-[60px] lg:px-6 bg-blue-400">
      {' '}
      {/*bg-white/90*/}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/orders"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              to="/products"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              to="/customers"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              to="/analytics"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <div className="flex space-x-4 items-center ">
        <Popover>
          <PopoverTrigger asChild>
            <button className="focus:outline-none bg-white p-2 rounded-full mr-2">
              <FaUser className="text-black" size={20} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-28">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full text-left">
                Profile
              </Button>
              <Button variant="ghost" className="w-full text-left">
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => {
                  logout()
                  //navigate('')
                }}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        {/* <Button variant="ghost" className="text-white"> */}
        {/* <i className="fas fa-bars"></i> */}
        {/* <FaBars className="text-white text-2xl" /> */}
        {/* </Button> */}
      </div>
    </header>
  )
}

export default Navbar
