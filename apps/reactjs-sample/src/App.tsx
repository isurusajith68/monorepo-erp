import { BrowserRouter, Link } from 'react-router-dom'
import NavBar from '@erp/common/src/components/Nav'

function App() {
  const items = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/isuru', name: 'Isuru' },
  ]

  const logo = {
    url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
    siteName: 'Isuru Sajith',
  }

  const use = 'react'

  return (
    <BrowserRouter>
      <NavBar items={items} logo={logo} use={use} />
      <Link to="/about">About</Link>
    </BrowserRouter>
  )
}

export default App
