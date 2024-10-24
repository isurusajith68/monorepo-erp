"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { BookingTest } from 'booking-form'
// import 'test-booking/dist/style.css';
const test_booking_1 = require("test-booking");
const Test = () => {
    return (<div>
      <header className=" top-0 z-50 flex h-14 items-center justify-center gap-4 border-b  backdrop-blur-md px-4 lg:h-[90px] lg:px-6 bg-[#89749A]">
        <div className="">
          <img src="icon.jpg" className="w-[60px] h-[80px] "/>
        </div>
      </header>
      {/* <BookingTest /> */}
      {/* <MyButtonComponent />
          <Tests/>
  
          <Hello/> */}
      <test_booking_1.RoomSelection />
      <test_booking_1.CalendarScreen />
      <test_booking_1.RoomSelectionView />
      {/* <Index/> */}
      {/* <BookingPage /> */}
      {/* <img src="/img/Capture.jpg" alt="Room" /> */}
    </div>);
};
exports.default = Test;
