
import {
  Book,
  BookOpenCheck,
  BookOpenText,
  Home,
  LineChart,
  NotebookPen,
  Package,
  Package2,
  ShoppingCart,
  UserPlus,
  Users,
} from 'lucide-react'
import { TbReportAnalytics } from 'react-icons/tb'
import { IoPersonAddSharp } from 'react-icons/io5'
import { IoPeople } from 'react-icons/io5'
import { Link } from '@remix-run/react'

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.'

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] ">
      <div className="flex h-full max-h-screen flex-col gap-2 bg-blue-400 text-white">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-400">
         
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 text-white">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/hotel-info/20"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <NotebookPen className="h-4 w-4" />
              Hotel Info
            </Link>
            <Link
              to="/room-type/list"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <BookOpenText className="h-4 w-4" />
              Room Type
            </Link>
            <Link
              to="/room-view/list"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <UserPlus className="h-4 w-4" />
              Room Views
            </Link>
            <Link
              to="/room-list"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <IoPeople className="h-4 w-4" />
              Rooms
            </Link>
            <Link
              to="reports/booked-rooms"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <TbReportAnalytics className="h-4 w-4" />
              Room Price
            </Link>
            <Link
              to="roomdetails/add"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            >
              <TbReportAnalytics className="h-4 w-4" />
              Offers
            </Link>
            
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
