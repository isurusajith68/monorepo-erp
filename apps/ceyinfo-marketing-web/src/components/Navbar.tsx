function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-bold text-xl">
        <span className="text-black">CeyInfo</span>
        <span className="text-blue-600">SOLUTIONS</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-gray-700">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
        <a href="/features" className="hover:text-blue-600">
          Features
        </a>
        <a href="/pricing" className="hover:text-blue-600">
          Pricing
        </a>
        <a href="/blog" className="hover:text-blue-600">
          Blog
        </a>
      </div>
    </nav>
  )
}

export default Navbar
