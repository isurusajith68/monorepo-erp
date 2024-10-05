import { useEffect, useState } from "react";

function ServicePage({ data, image }: any) {
  const [combinedData, setCombinedData] = useState([]); // State to store combined services and images

  useEffect(() => {
    if (data && data.length > 0 && image && image.length > 0) {
      // Extract serviceFormData from data
      const mappedServices = data.map((item: any) => item.data.serviceFormData || []).flat();

      // Extract serviceimages from image and ensure each service has a corresponding image
      const mappedImages = image
        .map((hotel: any) => hotel.serviceimages || [])
        .flat()
        .filter((img: any) => img.length > 0);

      // Combine services and images into a single array
      const combined = mappedServices.map((service: any, index: number) => ({
        ...service, // Spread service data
        serviceimage: mappedImages[index] || null, // Add corresponding image or null if no image
      }));

      setCombinedData(combined); // Set combined data to state
    }
  }, [data, image]);

  console.log("nnnnnnnnnnnnnn",combinedData)

  return (
    <div>
      <section className="py-16 bg-gray-100">
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
            {combinedData.length > 0 ? (
              combinedData.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {item.serviceimage ? (
                      <img
                        src={item.serviceimage}
                        alt="Service"
                        width={50}
                        height={50}
                        className="ml-2"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4">
                    {item.servicetitle}
                  </h3>
                  <p className="text-gray-600 mt-4 w-full justify-center">
                    {item.servicedescription}
                  </p>
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
