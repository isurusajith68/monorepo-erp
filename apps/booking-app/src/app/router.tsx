import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
// import Customer from "./Customer/Customer";
import RootLayout from './RootLayout'
// import Invoice from "./Invoice/Invoice";
// import AddInvoice from "./Invoice/add-invoice";
// import ListInvoice from "./Invoice/list-invoice";
// import { routeNavConfig } from "./route-nav-config";

// import ViewBooking from "@/components/View-booking/ViewBooking";
// import ViewRegistration from "@/components/View-Registration/ViewRegistration";
// import GuestRegistration from "@/components/Guest-Registration/GuestRegistration";

import AddBookingPage from './bookings/add/page'
import BookingViewPge from './bookings/[id]/page'
import BookingListPage from './bookings/booking-list-page'
import RegistrationListPage from './registrations/registration-list-page'
import AddRegistrationPage from './registrations/add/page'
import RegistrationViewPage from './registrations/[id]/page'
import ViewReport from './reports/page'

// const getRoutes = (children: any[]) => {
//    const res =  children &&
//      children.map((c) => (
//       <Route path={c.path} element={  c.children.length == 0 &&    c.element} >
//       { getRoutes(c.children) }
//       </Route>

//     ))
//     return res;
// };

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="bookings" element={<BookingListPage />} />
      <Route path="booking">
        <Route path="add" element={<AddBookingPage />} />
        <Route path=":id" element={<BookingViewPge />} />
      </Route>
      <Route path="registrations" element={<RegistrationListPage />} />
      <Route path="registration">
        <Route path="add" element={<AddRegistrationPage />} />
        <Route path=":id" element={<RegistrationViewPage />} />
      </Route>
      <Route path="reports" element={<ViewReport />} />

      {/* <Route path="view-booking" element={<ViewBooking />} />
      <Route path="guest-registration" element={<GuestRegistration />} />
      <Route path="view-registration" element={<ViewRegistration />} /> */}
    </Route>,
  ),
)

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
