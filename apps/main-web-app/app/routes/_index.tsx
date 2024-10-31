import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";



export default function Index() {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white flex justify-between items-center px-6 py-4">
        <div className="text-lg font-bold">
          
        </div>
        <nav className="flex space-x-4">
          <Button className="text-white border-white hover:bg-slate-800 hover:text-white">SignUp</Button>
          <Button className="text-white border-white hover:bg-slate-800 hover:text-white">Login</Button>
          <div className="text-white text-2xl cursor-pointer">☰</div> {/* Hamburger Icon */}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url('img/hotel.jpg')` }}> {/* Update image path */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

        {/* Text and Button */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome Ultimate Solution for Hospitality 
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry ERP........</h1>

          <Link className="bg-slate-300 text-blue-900 px-6 py-3 rounded-md hover:bg-white" to={"/creat-organization"}>
            Create Organization
          </Link>
        </div>
      </section>
    </div>
  );
}
