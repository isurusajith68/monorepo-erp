"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const label_1 = require("~/components/ui/label");
function CheckAvailability() {
    return (<div className="ml-20 mr-20">
      <div className="grid grid-cols-2 gap-20">
        {/* Image Section */}
        <div className="rounded-md overflow-hidden w-[80%] ml-20">
          <img src="img/Capture.jpg" alt="Room Image" className="w-full h-full object-cover"/>
        </div>

        {/* Form Section */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md w-[80%]">
          <h2 className="text-lg font-semibold mb-4">Search Criteria</h2>
          <form>
            <div className="mb-4 grid grid-cols-2 gap-8">
              <label_1.Label htmlFor="hotel" className="block text-sm font-medium text-end mt-4">
                Hotel
              </label_1.Label>
              <input_1.Input type="text" name="name" value={'HillRoots'} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"/>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-8">
              <label_1.Label htmlFor="checkin" className="block text-sm font-medium text-end mt-4">
                Check In Date
              </label_1.Label>
              <input_1.Input type="date" id="checkin" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"/>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-8">
              <label_1.Label htmlFor="checkout" className="block text-sm font-medium text-end mt-4">
                Check Out Date
              </label_1.Label>
              <input_1.Input type="date" id="checkout" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"/>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-8">
              <label_1.Label htmlFor="promo" className="block text-sm font-medium text-end mt-4">
                Promotion Code
              </label_1.Label>
              <input_1.Input type="text" id="promo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"/>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-8">
              <label_1.Label className="block text-sm font-medium text-end">
                Are you Sri Lankan?
              </label_1.Label>
              <div className="flex items-center space-x-4">
                <label_1.Label className="inline-flex items-center">
                  <input_1.Input type="radio" name="srilankan" value="yes" className="form-radio text-red-600"/>
                  <span className="ml-2">Yes</span>
                </label_1.Label>
                <label_1.Label className="inline-flex items-center">
                  <input_1.Input type="radio" name="srilankan" value="no" className="form-radio text-red-600"/>
                  <span className="ml-2">No</span>
                </label_1.Label>
              </div>
            </div>

            <button_1.Button type="submit" className="w-[40%] py-2 bg-red-900 text-white rounded-md ml-40">
              Submit
            </button_1.Button>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = CheckAvailability;
