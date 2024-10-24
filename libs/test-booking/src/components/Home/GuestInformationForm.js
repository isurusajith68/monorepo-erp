"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GuestInformationForm;
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const textarea_1 = require("@/components/ui/textarea");
function GuestInformationForm() {
    return (<div className="max-w-5xl mx-auto p-6 bg-gray-100">
      {/* Header */}
      <div className="bg-gray-700 text-white p-4 font-bold">
        Guest Information
      </div>

      {/* Form Container */}
      <form className="bg-gray-200 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <select_1.Select>
              <select_1.SelectTrigger className="w-full">
                <select_1.SelectValue placeholder="Mr."/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="light">Mr.</select_1.SelectItem>
                <select_1.SelectItem value="dark">Ms.</select_1.SelectItem>
                <select_1.SelectItem value="system">Mrs.</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          {/* Country */}
          <div>
            <label className="block font-semibold mb-2">Country *</label>
            <select_1.Select>
              <select_1.SelectTrigger className="w-full">
                <select_1.SelectValue placeholder="Select Country"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="light">India</select_1.SelectItem>
                <select_1.SelectItem value="dark">USA</select_1.SelectItem>
                <select_1.SelectItem value="system">Sri Lanka</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          {/* First Name */}
          <div>
            <label className="block font-semibold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input_1.Input placeholder="First Name" className="w-full"/>
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input_1.Input placeholder="Last Name" className="w-full"/>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input_1.Input placeholder="+94710000000" className="w-full"/>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input_1.Input placeholder="help@example.com" className="w-full"/>
          </div>

          {/* Confirm Email */}
          <div>
            <label className="block font-semibold mb-2">
              Confirm Email <span className="text-red-500">*</span>
            </label>
            <input_1.Input placeholder="help@example.com" className="w-full"/>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block font-semibold mb-2">Special Requests</label>
          <textarea_1.Textarea placeholder="Enter your requests" className="w-full" rows={4}/>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500">
          Please note that special characters are not allowed.
        </p>

        {/* Required Fields Notice */}
        <div className="text-red-500 text-sm font-semibold">
          * Required Fields
        </div>
      </form>
    </div>);
}
