"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
require("./globals.css");
const Nav_1 = require("@erp/common/src/components/Nav");
const SideBar_1 = require("@erp/common/src/components/SideBar");
const navigation_1 = require("next/navigation");
const hi_1 = require("react-icons/hi");
const hi2_1 = require("react-icons/hi2");
const items = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '', name: 'Isuru' },
];
const logo = {
    url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
    siteName: 'Isuru Sajith',
};
// console.log(window.location.href)
// const activeItem = window.location.pathname
const use = 'next';
function RootLayout({ children, }) {
    const currentPath = (0, navigation_1.usePathname)();
    return (<html lang="en">
      <body className="flex flex-col w-full h-screen bg-gray-50">
        {' '}
        <Nav_1.default items={items} logo={logo} activeItem={currentPath} use={use}/>
        <div className="flex w-full h-full">
          <div className="flex ">
            <SideBar_1.default sideBarItems={[
            {
                path: '/',
                name: 'Home',
                icon: <hi_1.HiAcademicCap className="w-6 h-6 text-white"/>,
            },
            {
                path: '/about',
                name: 'About',
                icon: <hi_1.HiAnnotation className="w-6 h-6 text-white"/>,
            },
            {
                path: '/contact',
                name: 'Contact',
                icon: <hi_1.HiArrowCircleRight className="w-6 h-6 text-white"/>,
            },
            {
                path: '/isuru',
                name: 'Isuru',
                icon: <hi2_1.HiArchiveBox className="w-6 h-6 text-white"/>,
            },
        ]} userInfo={{
            name: 'Sajith',
            email: 'sajith68@gmail.com',
            profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
        }} sideBarHeight="90vh" sideBarWidth="20vw" handleLogout={() => alert('Logout')} use={use} activeItem={currentPath}/>
          </div>
          <div className="flex w-full min-h-[100%] bg ">
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>);
}
