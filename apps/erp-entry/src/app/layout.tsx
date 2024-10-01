import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../index.css'

export default function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/" className="m-4">
            Home
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>
      <main>
        {/* render the child routes */}
        <Outlet></Outlet>
      </main>
    </div>
  )
}
