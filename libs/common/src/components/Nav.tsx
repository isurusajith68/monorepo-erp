// import NextLink from 'next/link'
import { NavLink as ReactLink } from 'react-router-dom'
import React, { useState } from 'react'

const NextLink = React.lazy(() => import('next/link'))

type NavItem = {
  path: string
  name: string
}

type Logo = {
  url: string
  siteName?: string
}

type NavBarProps = {
  items: NavItem[]
  logo: Logo
  activeItem?: string
  use?: string
}

export default function NavBar({ items, logo, activeItem, use }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const renderLink = (item: NavItem) => {
    if (use === 'next') {
      return (
        <NextLink
          href={item.path}
          className={
            item.path === activeItem ? 'text-red-500 font-bold' : 'text-white'
          }
        >
          {item.name}
        </NextLink>
      )
    }
    if (use === 'react') {
      return (
        <ReactLink
          to={item.path}
          className={({ isActive }) =>
            isActive ? 'text-red-500 font-bold' : 'text-white'
          }
        >
          {item.name}
        </ReactLink>
      )
    }
    return <a href={item.path}>{item.name}</a>
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div
        className={
          isOpen
            ? 'container mx-auto flex justify-between items-center'
            : 'container mx-auto flex justify-between items-center'
        }
      >
        <div className="flex gap-5 text-white">
          <a href="/">
            <img src={logo.url} alt="Logo" className="h-8 w-auto" />
          </a>
          <span className="text-white">{logo.siteName}</span>
        </div>
        {!isOpen ? (
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <ul className="hidden md:flex space-x-4">
          {items.map((item, index) => (
            <li key={index}>{renderLink(item)}</li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden block space-y-2 mt-4">
          {items.map((item, index) => (
            <li key={index}>{renderLink(item)}</li>
          ))}
        </ul>
      )}
    </nav>
  )
}
