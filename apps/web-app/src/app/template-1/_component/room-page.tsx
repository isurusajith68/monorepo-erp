import { useEffect, useState } from 'react'

function RoomPage({ data, image }: any) {
  const [combinedData, setCombinedData] = useState([]) // State to store combined services and images

  useEffect(() => {
    if (data && data.length > 0 && image && image.length > 0) {
      // Extract serviceFormData from data
      const mappedServices = data
        .map((item: any) => item.data.roomsFormData || [])
        .flat()

      // Extract serviceimages from image and ensure each service has a corresponding image
      const mappedImages = image
        .map((hotel: any) => hotel.roomimages || [])
        .flat()
        .filter((img: any) => img.length > 0)

      // Combine services and images into a single array
      const combined = mappedServices.map((service: any, index: number) => ({
        ...service, // Spread service data
        roomimage: mappedImages[index] || null, // Add corresponding image or null if no image
      }))

      setCombinedData(combined) // Set combined data to state
    }
  }, [data, image])

  console.log('nnnnnnnnnnnnnnroom', combinedData)

  return (
    <div>
      <section id="room" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="mb-10">
            <div className="flex ml-[45%]">
              <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2 mr-2"></div>
              <h2 className="text-l font-semibold text-yellow-500 uppercase">
                Our Rooms
              </h2>
              <div className="bg-yellow-500 w-10 h-0.5 mt-3 ml-2"></div>
            </div>
            <p className="text-4xl font-bold  mt-4">Explore Our Rooms</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-5 mr-5">
            {combinedData.length > 0 ? (
              combinedData.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div>
                    {item.roomimage ? (
                      <img
                        src={item.roomimage}
                        alt="Service"
                        width={50}
                        height={50}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-yellow-500 font-bold text-lg">
                        {item.roomprice}/Night
                      </span>
                      <div className="flex items-center">
                        {[...Array(item.rating)].map((_, i) => (
                          <i key={i} className="fa fa-star text-yellow-500"></i>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.roomtitle}
                    </h3>
                    <ul className="flex space-x-4 text-gray-600 mt-4">
                      <li>
                        <i className="fa fa-bed"></i> {item.roombeds} Bed
                      </li>
                      <li>
                        <i className="fa fa-bath"></i> {item.roombath} Bath
                      </li>
                      {item.otherfacility && (
                        <li>
                          <i className="fa fa-wifi"></i> {item.otherfacility}
                        </li>
                      )}
                    </ul>
                    <p className="text-gray-600 mt-4">
                      {item.roomsdescription}
                    </p>
                    <div className="flex justify-between mt-6">
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                        View Detail
                      </button>
                      <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default RoomPage
