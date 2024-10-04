'use client'

import './globals.css'
import NavBar from '@erp/common/src/components/Nav'
import SideBar from '@erp/common/src/components/SideBar'
import { usePathname } from 'next/navigation'
import { HiAcademicCap, HiAnnotation, HiArrowCircleRight } from 'react-icons/hi'
import { HiArchiveBox } from 'react-icons/hi2'

const items = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '', name: 'Isuru' },
]

const logo = {
  url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
  siteName: 'Isuru Sajith',
}
// console.log(window.location.href)
// const activeItem = window.location.pathname

const use = 'next'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentPath = usePathname()

  return (
    <html lang="en">
      <body className="flex flex-col w-full h-screen ">
        {' '}
        <NavBar items={items} logo={logo} activeItem={currentPath} use={use} />
        <div className="flex w-full h-full">
          <div className="flex ">
            <SideBar
              sideBarItems={[
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
              ]}
              userInfo={{
                name: 'Sajith',
                email: 'sajith68@gmail.com',
                profileImage:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s',
              }}
              sideBarHeight="90vh"
              sideBarWidth="18vw"
              handleLogout={() => alert('Logout')}
              use={use}
              activeItem={currentPath}
            />
          </div>
          <div className="flex w-full min-h-[100%] bg bg-blue-100">
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
