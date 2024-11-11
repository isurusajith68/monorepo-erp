import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../index.css'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'
import { toast } from '@/hooks/use-toast'
import Sidebar from '@/components/Navbar/sidebar'
import Navbar from '@/components/Navbar/navbar'
import { Toaster } from '@/components/ui/toaster'
import useModuleStore, { useHotelIdStore } from './stores/modules-store'

export default function RootLayout() {
  const navigate = useNavigate()
  const { removeAllModules } = useModuleStore()
  const { removeAllIds } = useHotelIdStore()

  const logout = async () => {
    const response = await Axios.get('http://localhost:10000/logout', {
      withCredentials: true,
    })

    console.log('logout respone', response)
    if (response.data.success) {
      removeAllModules()
      removeAllIds()
      toast({
        title: 'Logout successfull',
        description: response.data.message,
      })
      window.localStorage.clear()
      navigate('/')
      //window.location.href = "/";
    }
  }
  return (
    // <div>
    //   <header>
    //     <nav>
    //       <NavLink to="/" className="m-4">
    //         Home
    //       </NavLink>
    //       <NavLink to="/dashboard">Dashboard</NavLink>
    //     </nav>
    //   </header>
    //   <main>
    //     {/* render the child routes */}
    //     <Outlet></Outlet>
    //   </main>
    // </div>

    // <div>
    //   {/* <div className="w-full flex float-start "> */}
    //   <nav className="bg-blue-400 p-4 flex justify-between items-center">
    //     <div className="flex items-center space-x-4">
    //       <Link
    //         to="/"
    //         className="text-white font-semibold text-lg flex space-x-4"
    //       >
    //         <div className="bg-green-400 w-10 h-10 rounded-md" />
    //         {/* <img src={Logo} alt="Logo" width={150} height={50} className="pt-2" /> */}

    //         <h1 className="cursor-pointer mt-1">HILL ROOST ERP</h1>
    //       </Link>
    //     </div>
    //     <div className="flex space-x-4 items-center ">
    //       <Popover>
    //         <PopoverTrigger asChild>
    //           <button className="focus:outline-none bg-white p-2 rounded-full mr-2">
    //             <FaUser className="text-black" size={20} />
    //           </button>
    //         </PopoverTrigger>
    //         <PopoverContent className="p-4 w-28">
    //           <div className="flex flex-col gap-2">
    //             <Button variant="ghost" className="w-full text-left">
    //               Profile
    //             </Button>
    //             <Button variant="ghost" className="w-full text-left">
    //               Settings
    //             </Button>
    //             <Button
    //               variant="ghost"
    //               className="w-full text-left"
    //               onClick={() => {
    //                 logout()
    //                 navigate('')
    //               }}
    //             >
    //               Logout
    //             </Button>
    //           </div>
    //         </PopoverContent>
    //       </Popover>
    //       {/* <Button variant="ghost" className="text-white"> */}
    //       {/* <i className="fas fa-bars"></i> */}
    //       {/* <FaBars className="text-white text-2xl" /> */}
    //       {/* </Button> */}
    //     </div>
    //   </nav>
    //   <Sidebar />
    //   <Navbar/>
    //   {/* <div className="mx-[10%] border-2 border-rose-600 "> */}
    //   <div>
    //     <Outlet></Outlet>
    //   </div>
    // </div>

    <div className="relative min-h-screen w-full">
      {/* Sidebar is now fixed, so it's outside the grid */}
      <Sidebar logout={logout} />

      {/* Main Content Area with Navbar */}
      <div className="flex flex-col md:ml-[220px] lg:ml-[260px]">
        <Navbar logout={logout} />
        {/* Content adjusts based on sidebar visibility */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
        <Toaster />
      </div>
    </div>
  )
}
