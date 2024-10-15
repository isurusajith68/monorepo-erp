import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../assets/group5.png'
import { AiOutlineMenu } from 'react-icons/ai'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FaBars, FaUser, FaUserCircle } from 'react-icons/fa'

export default function RootLayout() {
  return (
    <div>
      {/* <div className="w-full flex float-start "> */}
      <nav className="bg-blue-900 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white font-semibold text-lg flex space-x-4"
          >
            <div className="bg-green-500 w-10 h-10 rounded-md" />
            {/* <img src={Logo} alt="Logo" width={150} height={50} className="pt-2" /> */}

            <h1 className="cursor-pointer mt-1">Auth Module App</h1>
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="focus:outline-none bg-white p-2 rounded-full">
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
                <Button variant="ghost" className="w-full text-left">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" className="text-white">
            <i className="fas fa-bars"></i>
            {/* <FaBars className="text-white text-2xl" /> */}
          </Button>
        </div>
      </nav>
      {/* <div className="mx-[10%] border-2 border-rose-600 "> */}
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
