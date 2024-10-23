"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = require("./Dashboard/Dashboard");
// import Customer from "./Customer/Customer";
const RootLayout_1 = require("./RootLayout");
// import Invoice from "./Invoice/Invoice";
// import AddInvoice from "./Invoice/add-invoice";
// import ListInvoice from "./Invoice/list-invoice";
// import { routeNavConfig } from "./route-nav-config";
// import ViewBooking from "@/components/View-booking/ViewBooking";
// import ViewRegistration from "@/components/View-Registration/ViewRegistration";
// import GuestRegistration from "@/components/Guest-Registration/GuestRegistration";
const page_1 = require("./bookings/add/page");
const page_2 = require("./bookings/[id]/page");
const booking_list_page_1 = require("./bookings/booking-list-page");
const registration_list_page_1 = require("./registrations/registration-list-page");
const page_3 = require("./registrations/add/page");
const page_4 = require("./registrations/[id]/page");
const page_5 = require("./reports/page");
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
      <react_router_dom_1.Route path="bookings" element={<booking_list_page_1.default />}/>
      <react_router_dom_1.Route path="booking">
        <react_router_dom_1.Route path="add" element={<page_1.default />}/>
        <react_router_dom_1.Route path=":id" element={<page_2.default />}/>
      </react_router_dom_1.Route>
      <react_router_dom_1.Route path="registrations" element={<registration_list_page_1.default />}/>
      <react_router_dom_1.Route path="registration">
        <react_router_dom_1.Route path="add" element={<page_3.default />}/>
        <react_router_dom_1.Route path=":id" element={<page_4.default />}/>
      </react_router_dom_1.Route>
      <react_router_dom_1.Route path="reports" element={<page_5.default />}/>

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
