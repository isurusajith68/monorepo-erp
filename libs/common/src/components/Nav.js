"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBar = void 0;
// import NextLink from 'next/link'
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importStar(require("react"));
const NextLink = react_1.default.lazy(() => Promise.resolve().then(() => __importStar(require('next/link'))));
/**
 * A navigation bar component.
 *
 * @param {NavItem[]} items - An array of navigation items. Each item should have a `path` and a `name`.
 * @param {Logo} logo - A logo for the navigation bar. The `url` should be the URL of the logo image, and the `siteName` should be the name of the site.
 * @param {string} [activeItem] - The path of the currently active item.
 * @param {string} [use] - The framework to use for linking. Either 'next' or 'react'. If not specified, links will be rendered as regular HTML links.
 */
const NavBar = ({ items, logo, activeItem, use }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const renderLink = (item) => {
        if (use === 'next') {
            return (<NextLink href={item.path} className={item.path === activeItem ? 'text-red-500 font-bold' : 'text-white'}>
          {item.name}
        </NextLink>);
        }
        if (use === 'react') {
            return (<react_router_dom_1.NavLink to={item.path} className={({ isActive }) => isActive ? 'text-red-500 font-bold' : 'text-white'}>
          {item.name}
        </react_router_dom_1.NavLink>);
        }
        return <a href={item.path}>{item.name}</a>;
    };
    return (<nav className="bg-gray-800 p-4">
      <div className={isOpen
            ? 'container mx-auto flex justify-between items-center'
            : 'container mx-auto flex justify-between items-center'}>
        <div className="flex gap-5 text-white">
          <a href="/">
            <img src={logo.url} alt="Logo" className="h-8 w-auto"/>
          </a>
          <span className="text-white">{logo.siteName}</span>
        </div>
        {!isOpen ? (<button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </button>) : (<button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>)}

        <ul className="hidden md:flex space-x-4">
          {items.map((item, index) => (<li key={index}>{renderLink(item)}</li>))}
        </ul>
      </div>
      {isOpen && (<ul className="md:hidden block space-y-2 mt-4">
          {items.map((item, index) => (<li key={index}>{renderLink(item)}</li>))}
        </ul>)}
    </nav>);
};
exports.NavBar = NavBar;
