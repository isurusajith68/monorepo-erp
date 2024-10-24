"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const button_1 = require("@/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
const fa_1 = require("react-icons/fa");
function HomePage() {
    const Navigate = (0, react_router_dom_1.useNavigate)();
    return (
    // <div>
    //   <div className=" flex items-center justify-center">
    //     <p className="text-4xl text-blue-800 ">Welcome to Auth Module</p>
    //   </div>
    //   <div className="mt-8 flex items-center justify-center gap-4">
    //     <Button
    //       onClick={() => {
    //         Navigate('newform')
    //       }}
    //     >
    //       Roles
    //     </Button>
    //     <Button
    //       onClick={() => {
    //         Navigate('modules')
    //       }}
    //     >
    //       Modules
    //     </Button>
    //     <Button
    //       onClick={() => {
    //         Navigate('documents')
    //       }}
    //     >
    //       Documents
    //     </Button>
    //   </div>
    // </div>
    <div className="h-screen bg-gradient-to-r from-cyan-600 to-teal-200">
      {/* Main Content */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg  w-[50%] h-[60%] flex">
          {/* Left Section */}
          <div className="w-[65%] mt-[100px]   ">
            <h2 className="text-blue-700 font-bold text-4xl  ml-[60px] leading-[60px]  ">
              Manage <br />
              Documents & <br />
              Permissions
            </h2>
          </div>

          {/* Right Section */}
          <div className=" w-[35%] bg-blue-800 rounded-lg shadow-lg ">
            <div className="space-y-6 p-8 mt-8">
              {[
            { item: 'User Role List', route: 'newform' },
            { item: 'Module List', route: 'modules' },
            { item: 'Document List', route: 'documents' },
            { item: 'Action List', route: 'actions' },
            { item: 'Permission', route: '' },
        ].map((item) => (<button_1.Button key={item.item} className="w-full flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-full" onClick={() => {
                Navigate(item.route);
            }}>
                  <fa_1.FaCheckCircle className="text-green-400 h-5 w-5"/>
                  <span>{item.item}</span>
                  <fa_1.FaChevronRight className="ml-2"/>
                </button_1.Button>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
