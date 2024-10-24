"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Index;
const react_1 = require("@remix-run/react");
const button_1 = require("~/components/ui/button");
function Index() {
    return (<div className="font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white flex justify-between items-center px-6 py-4">
        <div className="text-lg font-bold"></div>
        <nav className="flex space-x-4">
          <button_1.Button className="text-white border-white hover:bg-slate-800 hover:text-white">
            SignUp
          </button_1.Button>
          <button_1.Button className="text-white border-white hover:bg-slate-800 hover:text-white">
            Login
          </button_1.Button>
          <div className="text-white text-2xl cursor-pointer">☰</div>{' '}
          {/* Hamburger Icon */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('img/hotel.jpg')` }}>
        {' '}
        {/* Update image path */}
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        {/* Text and Button */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome Ultimate Solution for Hospitality
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industry ERP........
          </h1>

          <react_1.Link className="bg-slate-300 text-blue-900 px-6 py-3 rounded-md hover:bg-white" to={'/creat-organization'}>
            Create Organization
          </react_1.Link>
        </div>
      </section>
    </div>);
}
