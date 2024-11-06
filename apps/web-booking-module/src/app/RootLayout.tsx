{
  /* <h1>Header</h1>
    <NavLink to="/">Home</NavLink>
    <NavLink to="customer">Customer</NavLink>
    <NavLink to="invoice">Invoice</NavLink>
    <NavLink to="add">Add Invoice</NavLink>
    <NavLink to="list">List Invoice</NavLink>
     */
}

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/navbar'
import Sidebar from '../components/Navbar/sidebar'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout() {
  return (
    <div className="relative min-h-screen w-full">
      <Outlet />
      <Toaster />
    </div>
  )
}
