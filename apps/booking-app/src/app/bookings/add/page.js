"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoomSelection_1 = __importDefault(require("../_components/form/RoomSelection"));
const AddBookingPage = () => {
    return (<>
      <div>
        {/* <BookingForm></BookingForm> */}
        <RoomSelection_1.default />
      </div>
    </>);
};
exports.default = AddBookingPage;
