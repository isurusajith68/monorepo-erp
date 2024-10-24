"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FacilitiesSection;
const react_1 = __importDefault(require("react"));
function FacilitiesSection({ services }) {
    return (<section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Hotel Facilities</h2>
        <div className="border-b-2 w-16 mx-auto mb-8 border-yellow-600"></div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((facility, index) => (<div key={index} className="flex items-center">
            <div className="text-yellow-600 mr-4">
              <div className="">
                <img src={facility.imageUrl} alt="icon" width={30} height={30} className="ml-[45%]"/>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{facility.serviceTitle}</h3>
              <p className="text-gray-600">{facility.serviceDescription}</p>
            </div>
          </div>))}
      </div>
    </section>);
}
