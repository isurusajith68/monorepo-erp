const ProjectBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white p-8 md:p-16 rounded-lg shadow-lg max-w-5xl mx-auto my-8">
      {/* Left Section: Text */}
      <div className="flex-1 space-y-4 md:mr-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Next Gen Project <span className="text-blue-600">Monitoring!</span>
        </h1>
        <p className="text-gray-500 text-lg">
          A powerful and versatile project management tool that helps you get
          things done.
        </p>
        {/* Call-to-Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            Try Protarck for free →
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 mt-8 md:mt-0">
        <img
          src="https://via.placeholder.com/500x300" // Replace with your image URL or import an image
          alt="Project Monitoring"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default ProjectBanner
