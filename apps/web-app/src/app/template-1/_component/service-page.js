"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ServicePage({ data }) {
    return (<div>
      <section className="py-16 bg-gray-100">
        {data.length > 0 ? (data.map((item, index) => (<div key={index}>
              <div className="container mx-auto text-center ml-5 mr-5">
                <div className="mb-2 flex ml-[45%]">
                  <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
                  <h3 className="text-yellow-500 uppercase font-bold text-center">
                    About Us
                  </h3>
                  <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2"></div>
                </div>
                <h2 className="text-4xl font-bold mb-10 text-gray-800 uppercase">
                  Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mr-10">
                  {item.data.serviceFormData &&
                item.data.serviceFormData.length > 0 &&
                item.data.serviceFormData.map((service, serviceIndex) => (<div key={serviceIndex}>
                          <div className="bg-white rounded-lg shadow-lg p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300">
                            <div className="">
                              <img src={service.imageUrl || item.data.imageUrl} alt="icon" width={30} height={30} className="ml-[45%]"/>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mt-4">
                              {service.serviceTitle}
                            </h3>
                            <p className="text-gray-600 mt-4 w-full justify-center">
                              {service.serviceDescription}
                            </p>
                          </div>
                        </div>))}
                </div>
              </div>
            </div>))) : (<p>No hotel data found.</p>)}
      </section>
    </div>);
}
exports.default = ServicePage;
