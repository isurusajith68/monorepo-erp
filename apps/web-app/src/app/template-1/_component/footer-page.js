"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const md_1 = require("react-icons/md");
const sl_1 = require("react-icons/sl");
const io_1 = require("react-icons/io");
function FooterPage({ data }) {
    return (<div>
      <footer className="bg-gray-900 text-white py-12">
        {data.length > 0 ? (data.map((item, index) => (<div key={index}>
              {/* Newsletter Section */}
              <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="bg-white text-center p-6 rounded shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    Subscribe Our{' '}
                    <span className="text-yellow-500">NEWSLETTER</span>
                  </h2>
                  <div className="flex justify-center items-center">
                    <input_1.Input type="email" placeholder="Enter your email" className="p-2 w-1/2 border border-gray-300 rounded-l focus:outline-none"/>
                    <button_1.Button className="bg-yellow-500 text-white px-4 py-2 rounded-r hover:bg-yellow-600 ml-5">
                      SUBMIT
                    </button_1.Button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Hotelier Section */}
                <div className="col-span-1">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">
                    {item.data.data.name}{' '}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {item.data.aboutFormData.description}
                  </p>
                </div>

                {/* Contact Section */}
                <div className="col-span-1">
                  <h3 className="text-xl font-bold mb-4">CONTACT</h3>
                  <p className="text-gray-400 hover:text-yellow-500">
                    <md_1.MdAttachEmail />
                    {item.data.contactdata.bookingemail}{' '}
                  </p>
                  <p className="text-gray-400 hover:text-yellow-500">
                    <md_1.MdAttachEmail />
                    {item.data.contactdata.generaleemail}{' '}
                  </p>
                  <p className="text-gray-400 hover:text-yellow-500">
                    <md_1.MdAttachEmail />
                    {item.data.contactdata.technicalemail}{' '}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    {/* Social Icons */}
                    <a href="#" className="text-white hover:text-yellow-500">
                      <sl_1.SlSocialFacebook size={20}/>
                    </a>
                    <a href="#" className="text-white hover:text-yellow-500">
                      <sl_1.SlSocialTwitter size={20}/>
                    </a>
                    <a href="#" className="text-white hover:text-yellow-500">
                      <sl_1.SlSocialLinkedin size={20}/>
                    </a>
                    <a href="#" className="text-white hover:text-yellow-500">
                      <sl_1.SlSocialYoutube size={20}/>
                    </a>
                  </div>
                </div>

                {/* Company Section */}
                <div className="col-span-1">
                  <h3 className="text-xl font-bold mb-4">COMPANY</h3>
                  <ul className="space-y-2 text-gray-400">
                    <div className="flex space-x-1 hover:text-yellow-500">
                      <io_1.IoIosArrowForward />
                      <li>
                        <a href="#">About Us</a>
                      </li>
                    </div>
                    <div className="flex space-x-1 hover:text-yellow-500">
                      <io_1.IoIosArrowForward />
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </div>
                    <div className="flex space-x-1 hover:text-yellow-500">
                      <io_1.IoIosArrowForward />
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </div>
                    <div className="flex space-x-1 hover:text-yellow-500">
                      <io_1.IoIosArrowForward />
                      <li>
                        <a href="#">Terms & Condition</a>
                      </li>
                    </div>
                    <div className="flex space-x-1 hover:text-yellow-500">
                      <io_1.IoIosArrowForward />
                      <li>
                        <a href="#">Support</a>
                      </li>
                    </div>
                  </ul>
                </div>

                {/* Services Section */}
                <div className="col-span-1">
                  <h3 className="text-xl font-bold mb-4">SERVICES</h3>
                  <ul className="space-y-2 text-gray-400">
                    {item.data.serviceFormData.map((services, index) => (<div key={index}>
                          <div className="hover:text-yellow-500 flex space-x-1">
                            <io_1.IoIosArrowForward />
                            <li key={index}>
                              <a href="#">{services.servicetitle}</a>
                            </li>
                          </div>
                        </div>))}
                  </ul>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="max-w-7xl mx-auto px-4 mt-8 text-center text-gray-500">
                <p>© , All Right Reserved. Designed By Ceyinfo Soluation</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#" className="hover:text-yellow-500">
                    Home
                  </a>
                  <a href="#" className="hover:text-yellow-500">
                    Cookies
                  </a>
                  <a href="#" className="hover:text-yellow-500">
                    Help
                  </a>
                  <a href="#" className="hover:text-yellow-500">
                    FAQs
                  </a>
                </div>
              </div>
            </div>))) : (<p>No hotel data found.</p>)}
      </footer>
    </div>);
}
exports.default = FooterPage;
