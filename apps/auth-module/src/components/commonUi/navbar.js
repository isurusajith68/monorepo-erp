"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("../ui/button");
function Navbar() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)(); // Get current path
    const tabs = [
        { item: 'User Role List', route: '/newform' },
        { item: 'Module List', route: '/modules' },
        { item: 'Document List', route: '/documents' },
        { item: 'Action List', route: '/actions' },
        { item: 'Permission', route: '' },
    ];
    return (<div className="">
      <div className="border-2 border-blue-200 shadow-sm m-6 p-4 rounded-md flex justify-center space-x-10">
        {tabs.map((tab) => (<button_1.Button key={tab.item} className={`px-8 py-2 rounded-full ${location.pathname === tab.route ? 'bg-blue-600' : 'bg-blue-900'} text-white`} onClick={() => navigate(tab.route)}>
            {tab.item}
          </button_1.Button>))}
      </div>
    </div>);
}
