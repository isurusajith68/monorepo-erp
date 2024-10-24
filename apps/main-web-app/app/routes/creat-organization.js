"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateOrganizationForm;
const react_1 = require("@remix-run/react");
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const radio_group_1 = require("~/components/ui/radio-group");
function CreateOrganizationForm() {
    return (<div className="relative h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('img/hotel-2.jpg')` }}>
      {' '}
      {/* Replace with your image path */}
      {/* Form container with a dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Organization
        </h2>

        {/* Email Input */}
        <label className="text-white mb-2 block">Email</label>
        <input_1.Input type="email" placeholder="Email" className="w-full mb-4 rounded-md bg-white"/>

        {/* Password Input */}
        <label className="text-white mb-2 block">Password</label>
        <input_1.Input type="password" placeholder="Password" className="w-full mb-4 rounded-md bg-white"/>

        {/* Phone Number Input */}
        <label className="text-white mb-2 block">Phone Number</label>
        <input_1.Input type="tel" placeholder="Phone Number" className="w-full mb-4 rounded-md bg-white"/>

        {/* Organization Name Input */}
        <label className="text-white mb-2 block">Organization Name</label>
        <input_1.Input type="text" placeholder="Organization Name" className="w-full mb-4 rounded-md bg-white"/>

        {/* Domain Type (Radio Buttons) */}
        <label className="text-white mb-2 block">Domain Type</label>
        <radio_group_1.RadioGroup defaultValue="top" className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <radio_group_1.RadioGroupItem value="top" id="top"/>
            <label htmlFor="top" className="ml-2 text-white">
              Top
            </label>
          </div>
          <div className="flex items-center">
            <radio_group_1.RadioGroupItem value="custom" id="custom"/>
            <label htmlFor="custom" className="ml-2 text-white">
              Custom
            </label>
          </div>
        </radio_group_1.RadioGroup>

        {/* Domain Name Input */}
        <label className="text-white mb-2 block">Domain Name</label>
        <div className="flex items-center">
          <input_1.Input type="text" placeholder="Domain Name" className="w-full mb-4 rounded-md bg-white"/>
          <span className="text-white ml-2">.com</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <react_1.Link to={'/'}>
            <button_1.Button variant="outline" className="w-full mr-2 ">
              Cancel
            </button_1.Button>
          </react_1.Link>
          <react_1.Link to={'/dashbord'}>
            <button_1.Button variant="outline" className="w-full mr-2 ">
              Create
            </button_1.Button>
          </react_1.Link>
        </div>
      </div>
    </div>);
}
