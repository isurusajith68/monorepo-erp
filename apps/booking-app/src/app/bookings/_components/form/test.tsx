// import { BookingTest } from 'booking-form'
// import 'test-booking/dist/style.css';
import {
  BookingPage,
  CalendarScreen,
  Hello,
  Index,
  MyButtonComponent,
  RoomSelection,
  RoomSelectionView,
  Tests,
} from 'test-booking'
const Test = () => {
  return (
    <div>
      <header className=" top-0 z-50 flex h-14 items-center justify-center gap-4 border-b  backdrop-blur-md px-4 lg:h-[90px] lg:px-6 bg-[#89749A]">
        <div className="">
          <img src="icon.jpg" className="w-[60px] h-[80px] " />
        </div>
      </header>
      {/* <BookingTest /> */}
      {/* <MyButtonComponent />
        <Tests/>

        <Hello/> */}
      <RoomSelection />
      <CalendarScreen />
      <RoomSelectionView />
      {/* <Index/> */}
      {/* <BookingPage /> */}
      {/* <img src="/img/Capture.jpg" alt="Room" /> */}
    </div>
  )
}

export default Test
