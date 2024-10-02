// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function Footer({formData,contactdata}: {formData:any,contactdata:any}) {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left px-6">
          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <p className="text-gray-600 mb-4">And keep up to date with {formData.name}</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-600 hover:text-amber-500">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-500">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-500">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="flex items-center justify-center md:justify-start text-gray-600">
              <HiOutlineLocationMarker className="mr-2" /> {contactdata.address}
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
              <HiOutlinePhone className="mr-2" />{contactdata.phone}
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
              <HiOutlineMail className="mr-2" /> {contactdata.email}
            </p>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-600 mb-4">Sign up to our newsletter for exclusive offers.</p>
            <div className="flex justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 py-2 px-4 rounded-l-md focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-500 text-white py-2 px-4 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pb-8 text-center bg-yellow-600 w-[100%]">
          <p className="text-gray-600">&copy; 2024 {formData.name}. All Rights Reserved</p>
          <p className="text-gray-600 mt-2">
            Currency: <span className="font-semibold">LKR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}