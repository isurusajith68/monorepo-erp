"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RoomSelection_1 = __importDefault(require("../_components/form/RoomSelection"));
const BookingViewPge = () => {
    return (<>
      {/* <BookingForm></BookingForm> */}
      <RoomSelection_1.default />
    </>);
};
exports.default = BookingViewPge;
