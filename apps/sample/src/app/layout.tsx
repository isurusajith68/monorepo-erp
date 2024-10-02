'use client'

import Link from 'next/link'
import './globals.css'
import NavBar from '@erp/common/src/components/Nav'
import { usePathname } from 'next/navigation'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentPath = usePathname()

  return (
    <html lang="en">
      <body>
        {' '}
        <NavBar items={items} logo={logo} activeItem={currentPath} />
        {children}
        <Link href="/about">About</Link>
      </body>
    </html>
  )
}
