"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function ContactPage({ contactdata }) {
    return (<div id="contact" className="w-full bg-slate-100">
      <div className="mb-2 flex ml-[45%]">
        <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
        <h3 className="text-yellow-500 uppercase font-bold text-center">
          CONTACT US
        </h3>
        <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2"></div>
      </div>
      <h1 className="text-center text-4xl font-bold mb-8">
        CONTACT <span className="text-yellow-500">For Any Query</span>
      </h1>

      {/* Contact Info Section */}
      <div className="flex gap-8 mb-8">
        {/* Contact Details */}
        <div className="flex ml-10 justify-between w-[90%]">
          <div>
            <div className="flex">
              <h2 className="text-lg font-semibold text-yellow-500">BOOKING</h2>
              <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
            </div>
            <p className="text-sm">📧 {contactdata.bookingemail}</p>
          </div>
          <div>
            <div className="flex">
              <h2 className="text-lg font-semibold text-yellow-500">GENERAL</h2>
              <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
            </div>
            <p className="text-sm">📧 {contactdata.generaleemail}</p>
          </div>
          <div>
            <div className="flex">
              <h2 className="text-lg font-semibold text-yellow-500">
                TECHNICAL
              </h2>
              <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
            </div>
            <p className="text-sm">📧 {contactdata.technicalemail}</p>
          </div>
        </div>
      </div>
      {/* Map and Form Section */}
      <div className="flex">
        {/* Google Map */}
        <div className="h-64 mb-4 md:mb-0 ml-5 mr-5 w-[50%]">
          <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31794.01339285793!2d79.854445!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259292f539357:0x644f964aefabf95!2sColombo,+Sri+Lanka!5e0!3m2!1sen!2sin!4v1639554367815!5m2!1sen!2sin" loading="lazy"></iframe>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <form className="flex flex-col space-y-4 mr-10 mb-10">
            <div className="flex flex-col-2 gap-9">
              <input type="text" placeholder="Your Name" className="border border-gray-300 p-2 rounded"/>
              <input type="email" placeholder="Your Email" className="border border-gray-300 p-2 rounded"/>
            </div>
            <input type="text" placeholder="Subject" className="border border-gray-300 p-2 rounded"/>
            <textarea placeholder="Message" className="border border-gray-300 p-2 rounded h-32"></textarea>
            <button type="submit" className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>);
}
exports.default = ContactPage;
