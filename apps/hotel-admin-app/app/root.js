"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.links = void 0;
exports.Layout = Layout;
exports.default = App;
const react_1 = require("@remix-run/react");
require("./tailwind.css");
const slide_bar_1 = __importDefault(require("./app-component/slide-bar"));
const nav_bar_1 = __importDefault(require("./app-component/nav-bar"));
const links = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
];
exports.links = links;
function Layout({ children }) {
    return (<html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <react_1.Meta />
        <react_1.Links />
      </head>
      <body>
        {children}
        <nav_bar_1.default></nav_bar_1.default>
        <slide_bar_1.default></slide_bar_1.default>
        <react_1.ScrollRestoration />
        <react_1.Scripts />
      </body>
    </html>);
}
function App() {
    return <react_1.Outlet />;
}
