"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
function HomePage({ formData }) {
    return (<div>
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-lg font-semibold text-gray-800">
              {formData.name}
            </a>
          </div>
          <div className="space-x-6 mr-20">
            <a href="#" className="text-gray-700">
              Home
            </a>
            <a href="#" className="text-gray-700">
              About Us
            </a>
            <a href="#" className="text-gray-700">
              Gallery
            </a>
            <a href="#" className="text-gray-700">
              Rooms
            </a>
            <a href="#" className="text-gray-700">
              Contact Us
            </a>
          </div>
        </div>
      </nav>
      <div className="relative bg-cover bg-center h-[600px] z-0" style={{
            backgroundImage: `url(${formData.imageUrl})`,
        }}>
        <div className="absolute z-10 inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-lg uppercase tracking-wider">
            Luxurious Hotel Experience
          </p>
          <h1 className="text-5xl font-bold mb-6">{formData.title}</h1>
          <div className="flex space-x-4">
            <button className="bg-yellow-600 text-black px-6 py-3 rounded-lg hover:bg-yellow-600">
              Our Rooms
            </button>
            <button className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200">
              Book a Room
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-slate-100 -mt-10 z-50 absolute w-[90%] ml-10 mr-10 ">
        <form className="flex space-x-4 bg-white p-6 rounded-lg shadow-md w-full  h-28 justify-between">
          {/* Check-in Date */}
          <div className="flex flex-col space-y-1">
            <label_1.Label htmlFor="checkIn">Check in</label_1.Label>
            <input_1.Input id="checkIn" type="date" name="checkIn"/>
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col space-y-1">
            <label_1.Label htmlFor="checkOut">Check out</label_1.Label>
            <input_1.Input id="checkOut" type="date" name="checkOut"/>
          </div>

          {/* Adults Select */}
          <div className="flex flex-col space-y-1 w-40">
            <label_1.Label htmlFor="adult">Adults</label_1.Label>
            <select_1.Select>
              <select_1.SelectTrigger className="w-full">
                <select_1.SelectValue placeholder="Select adults"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="1">1</select_1.SelectItem>
                <select_1.SelectItem value="2">2</select_1.SelectItem>
                <select_1.SelectItem value="3">3</select_1.SelectItem>
                <select_1.SelectItem value="4">4</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          {/* Children Select */}
          <div className="flex flex-col space-y-1 w-40">
            <label_1.Label htmlFor="child">Children</label_1.Label>
            <select_1.Select>
              <select_1.SelectTrigger className="w-full">
                <select_1.SelectValue placeholder="Select children"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="0">0</select_1.SelectItem>
                <select_1.SelectItem value="1">1</select_1.SelectItem>
                <select_1.SelectItem value="2">2</select_1.SelectItem>
                <select_1.SelectItem value="3">3</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          {/* Submit Button */}
          <button_1.Button type="submit" className="bg-yellow-500 text-white mt-4">
            Submit
          </button_1.Button>
        </form>
      </div>
    </div>);
}
exports.default = HomePage;
