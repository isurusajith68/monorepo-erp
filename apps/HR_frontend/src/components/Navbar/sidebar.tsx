import { Link } from 'react-router-dom'
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react'

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.'

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] ">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-400">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="w-6 h-6" />
            <span className="">Booking App</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="employees"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="w-4 h-4" />
              Employees
            </Link>
            <Link
              to="bookings"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <Package className="w-4 h-4" />
              View Item
            </Link>
            <Link
              to="registration/add"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <Users className="w-4 h-4" />
              Guest Registration
            </Link>
            <Link
              to="registrations"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <LineChart className="w-4 h-4" />
              View Registration
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
