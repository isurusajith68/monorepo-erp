import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import RootLayout from './RootLayout'
import AddBookingPage from './bookings/add/page'
import BookingViewPge from './bookings/[id]/page'
import BookingListPage from './bookings/booking-list-page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<AddBookingPage />} />
      <Route path="bookings" element={<BookingListPage />} />
      <Route path="booking">
        <Route path="add" element={<AddBookingPage />} />
        <Route path=":id" element={<BookingViewPge />} />
      </Route>
    </Route>,
  ),
)
