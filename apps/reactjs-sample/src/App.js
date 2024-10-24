"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const hi_1 = require("react-icons/hi");
const hi2_1 = require("react-icons/hi2");
const SideBar_1 = __importDefault(require("@erp/common/src/components/SideBar"));
const index_1 = require("@erp/common/src/index");
function App() {
    const items = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' },
        { path: '/isuru', name: 'Isuru' },
    ];
    const logo = {
        url: 'https://www.logodesign.net/logo/open-book-in-front-of-sun-in-star-2228ld.png',
        siteName: 'Isuru Sajith',
    };
    const use = 'react';
    //side bar props
    const sideBarItems = [
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
    ];
    const userInfo = {
        name: 'Isuru',
        email: 'isurusajith68@gmail.com',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s',
    };
    return (<react_router_dom_1.BrowserRouter>
      <div className="">
        <index_1.NavBar items={items} logo={logo} use={use}/>

        <SideBar_1.default sideBarItems={sideBarItems} userInfo={userInfo} sideBarHeight="90vh" sideBarWidth="18vw" handleLogout={() => alert('Logout')} use={use}/>
      </div>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
