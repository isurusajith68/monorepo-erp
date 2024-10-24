"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = __importDefault(require("./Dashboard/Dashboard"));
// import Customer from "./Customer/Customer";
const RootLayout_1 = __importDefault(require("./RootLayout"));
// import RegistrationListPage from "./registrations/registration-list-page";
// import AddRegistrationPage from "./registrations/add/page";
// import RegistrationViewPage from "./registrations/[id]/page";
// import StoreListPage from "./store/store-list";
// import ViewStorePage from "./store/[id]/page";
// import AddStorePage from "./store/add/page";
const employee_list_page_1 = __importDefault(require("./employee/employee-list-page"));
const page_1 = __importDefault(require("./employee/[id]/page"));
const page_2 = __importDefault(require("./employee/add/page"));
// const getRoutes = (children: any[]) => {
//    const res =  children &&
//      children.map((c) => (
//       <Route path={c.path} element={  c.children.length == 0 &&    c.element} >
//       { getRoutes(c.children) }
//       </Route>
//     ))
//     return res;
// };
exports.router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(<react_router_dom_1.Route path="/" element={<RootLayout_1.default />}>
      <react_router_dom_1.Route index element={<Dashboard_1.default />}/>
      <react_router_dom_1.Route path="employees" element={<employee_list_page_1.default />}/>
      <react_router_dom_1.Route path="employee">
        <react_router_dom_1.Route path="add" element={<page_2.default />}/>
        <react_router_dom_1.Route path=":id" element={<page_1.default />}/>
      </react_router_dom_1.Route>
      {/* <Route path="registrations" element={<RegistrationListPage />} />
    <Route path="registration">
      <Route path="add" element={<AddRegistrationPage />} />
      <Route path=":id" element={<RegistrationViewPage />} />
    </Route>
    <Route path="stores" element={<StoreListPage />} />
    <Route path="store">
      <Route path="add" element={<AddStorePage />} />
      <Route path=":id" element={<ViewStorePage />} />
    </Route> */}

      {/* <Route path="view-booking" element={<ViewBooking />} />
    <Route path="guest-registration" element={<GuestRegistration />} />
    <Route path="view-registration" element={<ViewRegistration />} /> */}
    </react_router_dom_1.Route>));
{
    /* <div>
  {routeNavConfig.map(rn=> {
    
    const res = (<Route path={rn.path} element={rn.element }>
      {
      rn.children && rn.children.map(c=> (<Route path={c.path} element={c.element}/>))}
      </Route>
      )
   return res})}
   
  
  
  {routeNavConfig.map((rn) => {
    const res = (
      <Route path={rn.path}  element={    rn.children?.length == 0 &&    rn.element}>
        { getRoutes(rn.children) }
      </Route>
    );
    return res;
  })}
  </div> */
}
