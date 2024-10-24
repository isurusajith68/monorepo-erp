import { Link } from 'react-router-dom'
import { RiHotelLine } from 'react-icons/ri'
import { MdOutlineCalculate } from 'react-icons/md'
import { FaPeopleGroup } from 'react-icons/fa6'
import { FaAddressBook } from 'react-icons/fa'
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
import { FaHotel } from 'react-icons/fa'

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.'

const Sidebar = ({ logout }: { logout: any }) => {
  return (
    <div className="hidden  bg-muted/40 md:block fixed top-0 left-0 h-full w-[220px] lg:w-[260px]  ">
      <div className="flex h-full max-h-screen flex-col ">
        <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6 bg-blue-400 ">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <RiHotelLine className="w-8 h-8" />
            <span className="">ERP Entry</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1  bg-blue-50 pt-4 flex flex-col">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
            <div className="flex   gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <button
                className="flex w-[90%] gap-4 text-center rounded-xl   bg-blue-800 text-white py-2 px-4 mb-1  hover:bg-blue-600 transition"
                onClick={() => window.open('http://localhost:5173/')}
              >
                <Home className="h-5 w-4" />
                Auth Module
              </button>
            </div>

            {/* <Link
              to="bookings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookOpenText className="h-4 w-4" />
              View Booking
            </Link> */}

            {/* <div
              onClick={() => window.open('http://localhost:5173/')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              Auth Module
            </div> */}

            <div className="flex  gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <button
                className="flex w-[90%]  gap-4 text-center rounded-xl    bg-blue-800 text-white py-2 px-4 mb-1  hover:bg-blue-600 transition"
                onClick={() =>
                  window.open('https://acc.ceyinfo.cloud/dashboard')
                }
              >
                <MdOutlineCalculate className="h-5 w-5" />
                Account Module
              </button>
            </div>

            <div className="flex  gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <button
                className="flex w-[90%]  gap-4 text-center rounded-xl    bg-blue-800 text-white py-2 px-4 mb-1  hover:bg-blue-600 transition"
                onClick={() =>
                  window.open('https://acc.ceyinfo.cloud/dashboard')
                }
              >
                <FaPeopleGroup className="h-5 w-4" />
                HR Module
              </button>
            </div>

            <div className="flex  gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <button
                className="flex w-[90%]  gap-4 text-center rounded-xl    bg-blue-800 text-white py-2 px-4 mb-1  hover:bg-blue-600 transition"
                onClick={() =>
                  window.open('https://acc.ceyinfo.cloud/dashboard')
                }
              >
                <FaAddressBook className="h-5 w-4" />
                Booking Module
              </button>
            </div>
          </nav>
          <button
            className="ml-10 text-center mb-6 w-[60%]  rounded-lg bg-red-600 text-white py-2 px-4 mt-auto  hover:bg-red-500 transition"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
