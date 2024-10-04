import { BrowserRouter } from 'react-router-dom'
import NavBar from '@erp/common/src/components/Nav'
import SideBar from '@erp/common/src/components/SideBar'
import { HiAcademicCap, HiAnnotation, HiArrowCircleRight } from 'react-icons/hi'
import { HiArchiveBox } from 'react-icons/hi2'

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

  //side bar props
  const sideBarItems = [
    {
      path: '/',
      name: 'Home',
      icon: <HiAcademicCap className="w-6 h-6 text-white" />,
    },
    {
      path: '/about',
      name: 'About',
      icon: <HiAnnotation className="w-6 h-6 text-white" />,
    },
    {
      path: '/contact',
      name: 'Contact',
      icon: <HiArrowCircleRight className="w-6 h-6 text-white" />,
    },
    {
      path: '/isuru',
      name: 'Isuru',
      icon: <HiArchiveBox className="w-6 h-6 text-white" />,
    },
  ]

  const userInfo = {
    name: 'Isuru',
    email: 'isurusajith68@gmail.com',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s',
  }

  return (
    <BrowserRouter>
      <NavBar items={items} logo={logo} use={use} />

      <SideBar
        sideBarItems={sideBarItems}
        userInfo={userInfo}
        sideBarHeight="90vh"
        sideBarWidth="18vw"
        handleLogout={() => alert('Logout')}
        use={use}
      />
    </BrowserRouter>
  )
}

export default App
