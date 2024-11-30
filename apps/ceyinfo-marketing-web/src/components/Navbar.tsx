import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 border-b backdrop-blur-md border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-bold text-3xl ml-10">
        <span className="text-black">ERP</span>
        <span className="text-blue-600">System</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-gray-700 mr-10">
        <Link to={'/'} className="hover:text-blue-600 font-bold">
          Home
        </Link>
        <Link to={'/features'} className="hover:text-blue-600 font-bold">
          Features
        </Link>
        <Link to={'/pricing'} className="hover:text-blue-600 font-bold">
          Pricing
        </Link>
        <Link to={'/blog'} className="hover:text-blue-600 font-bold">
          Blog
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
