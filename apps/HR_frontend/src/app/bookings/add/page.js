"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const booking_form_1 = __importDefault(require("../_components/form/booking-form"));
const AddBookingPage = () => {
    return (<>
      Add booking
      <div>
        <booking_form_1.default></booking_form_1.default>
      </div>
    </>);
};
exports.default = AddBookingPage;
