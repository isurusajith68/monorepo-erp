// import Link from 'next/link'
// import { useEffect, useState } from 'react'
import React from 'react'
import { NavLink as ReactLink } from 'react-router-dom'
const NextLink = React.lazy(() => import('next/link'))

type NavItem = {
  path: string
  name: string
  icon?: JSX.Element
}

type UserInfo = {
  name: string
  email: string
  profileImage?: string
}

type SideBarProps = {
  sideBarItems?: NavItem[]
  userInfo: UserInfo
  sideBarHeight?: string
  sideBarWidth?: string
  use?: string
  activeItem?: string
  handleLogout?: () => void
}

/**
 * SideBar component
 *
 * @param {NavItem[]} [sideBarItems] - Nav items to be displayed in the sidebar
 * @param {UserInfo} userInfo - User information
 * @param {string} [sideBarHeight] - Height of the sidebar
 * @param {string} [sideBarWidth] - Width of the sidebar
 * @param {() => void} [handleLogout] - Function to be called when the logout button is clicked
 * @param {'next' | 'react'} [use] - Which framework to use for linking
 * @param {string} [activeItem] - The currently active item
 *
 * @returns {JSX.Element} A JSX element representing the sidebar
 */
const SideBar = ({
  sideBarItems,
  userInfo,
  sideBarHeight,
  sideBarWidth,
  handleLogout,
  use,
  activeItem,
}: SideBarProps) => {
  // alert(sideBarHeight)
  return (
    <div
      className={`sticky top-0 left-0 bg-white ${
        sideBarHeight ? `h-[${sideBarHeight}]` : 'h-[100vh]'
      } flex flex-col justify-between rounded-lg shadow-lg z-10 ${'left-0'} ${
        sideBarWidth ? '' : 'min-w-[20vw]'
      }`}
      style={{
        minWidth: '200px',
        maxWidth: sideBarWidth ? sideBarWidth : '20vw',
      }}
    >
      <div className="px-2">
        <div className="flex flex-col relative">
          <div className="flex items-center p-4 gap-3 ">
            <img
              src={userInfo.profileImage}
              alt="profile"
              className="w-12 h-12 rounded-full border-green-500 border-2"
            />
            <div
              style={{
                width: '200px',
                overflow: 'hidden',
              }}
              className="flex flex-col gap-1 text-white"
            >
              <h1 className="text font-bold text-blue-900">{userInfo.name}</h1>
              <p className="text-sm  text-gray-600 break-words overflow-hidden text-ellipsis">
                {userInfo.email}
              </p>
            </div>
          </div>
          <div className="border"></div>
          {sideBarItems?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-4 mt-2 gap-4 border-t p-2 border-white"
            >
              {use === 'next' && (
                <NextLink
                  href={item.path}
                  className={
                    item.path === activeItem
                      ? 'p-2  flex gap-2 text-blue-600 hover:bg-blue-800 hover:rounded-lg border transition duration-300 border-white shadow-sm bg-blue-900 rounded-lg cursor-pointer  items-center'
                      : 'p-2  flex gap-2 hover:bg-blue-500 hover:rounded-lg border transition duration-300  border-white shadow-sm bg-blue-700 rounded-lg cursor-pointer  items-center'
                  }
                >
                  {item.icon}
                  <span className="ml-2 text-white">{item.name}</span>
                </NextLink>
              )}

              {use === 'react' && (
                <ReactLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'p-2  flex gap-2 text-blue-600 hover:bg-blue-800 hover:rounded-lg border transition duration-300 border-white shadow-sm bg-blue-900 rounded-lg cursor-pointer  items-center'
                      : 'p-2  flex gap-2 hover:bg-blue-500 hover:rounded-lg border transition duration-300  border-white shadow-sm bg-blue-700 rounded-lg cursor-pointer  items-center'
                  }
                >
                  {item.icon}
                  <span className="ml-2 text-white">{item.name}</span>
                </ReactLink>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col  px-4 gap-4 border-t p-2 border-white mb-4">
        <button
          onClick={handleLogout}
          className="p-2  flex gap-2 text-blue-600 hover:bg-red-500 hover:rounded-lg border transition duration-300 border-white shadow-sm bg-red-700 rounded-lg cursor-pointer items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          <span className="ml-2 text-white">Logout</span>
        </button>
      </div>
    </div>
  )
}
export default SideBar
