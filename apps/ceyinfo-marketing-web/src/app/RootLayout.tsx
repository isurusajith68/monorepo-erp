import { Outlet } from 'react-router-dom'

// import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/Navbar'

export default function RootLayout() {
  return (
    <div className="relative min-h-screen w-full">
      {/* <Sidebar /> */}

      {/* Main Content Area with Navbar */}
      <div className="flex flex-col ">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
        {/* <Toaster /> */}
      </div>
    </div>
  )
}
