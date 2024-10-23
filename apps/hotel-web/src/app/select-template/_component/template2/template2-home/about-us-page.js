"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function AboutUsPage({ formData }) {
    return (<div>
      <div className="bg-gray-100 py-16 text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome To {formData.name}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {formData.description}
        </p>
        <button className="mt-6 bg-yellow-600 text-white px-8 py-3 rounded-lg">
          Learn More
        </button>
      </div>
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h3 className="text-3xl font-bold mb-4">About Us</h3>
            <p className="text-gray-600 mb-6">{formData.description2}</p>
            <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
          {/* Images Section */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 mr-5 w-[40%]">
            {formData.aboutimageUrls &&
            formData.aboutimageUrls.map((imageUrl, index) => (<img key={index} src={imageUrl} alt={`Preview ${index + 1}`} className={`object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 ${index === 0
                    ? 'col-span-2 row-span-2 w-full h-full'
                    : 'w-full h-full'}`}/>))}
          </div>
        </div>
      </div>
    </div>);
}
exports.default = AboutUsPage;
