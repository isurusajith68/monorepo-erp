function AboutUsPage({ data, image }: any) {
  const Image = image
  console.log('Image Data:', Image)

  return (
    <section className="py-16 bg-gray-100">
      {data.length > 0 ? (
        data.map((item: any, index: any) => (
          <div key={index}>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 mr-5">
              {/* Text and Stats Section */}
              <div className="mt-24 ml-5">
                <div className="mb-2 flex">
                  <h3 className="text-yellow-500 uppercase font-bold">
                    About Us
                  </h3>
                  <div className="bg-yellow-500 w-16 h-0.5 mt-3 ml-2"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to{' '}
                  <span className="text-yellow-500">{item.data.data.name}</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  {' '}
                  {item.data.aboutFormData.description}
                </p>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-white shadow-lg p-6 rounded-lg">
                    <i className="fa fa-hotel text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {item.data.aboutFormData.room}
                    </h3>
                    <p className="text-gray-600">Rooms</p>
                  </div>
                  <div className="text-center bg-white shadow-lg p-6 rounded-lg">
                    <i className="fa fa-users text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {item.data.aboutFormData.staff}
                    </h3>
                    <p className="text-gray-600">Staffs</p>
                  </div>
                  <div className="text-center bg-white shadow-lg p-6 rounded-lg">
                    <i className="fa fa-user-friends text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {item.data.aboutFormData.client}
                    </h3>
                    <p className="text-gray-600">Clients</p>
                  </div>
                </div>
                <div>
                  <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600">
                    Explore More
                  </button>
                </div>
              </div>

              {/* Check if there are any images */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 mr-5">
                {Image.length > 0 ? (
                  Image.map(
                    (hotel: any, index: any) =>
                      hotel.aboutimages && ( // Only render if aboutimage exists
                        <img
                          key={index}
                          src={hotel.aboutimages}
                          alt={`Preview ${index + 1}`}
                          className={`object-cover rounded-lg ${
                            index === 0
                              ? 'w-[90%] h-[110%] mt-10'
                              : index === 1
                                ? 'w-[80%] h-[110%]'
                                : index === 2
                                  ? 'w-[60%] h-[60%] mt-20 -ml-10 '
                                  : index === 3
                                    ? 'w-[70%] h-[100%] ml-16 mt-5'
                                    : 'w-[70%] h-[100%]'
                          }`}
                        />
                      ),
                  )
                ) : (
                  <p>No images found.</p>
                )}
              </div>
            </div>
            {/* <div className="grid grid-cols-2 grid-rows-2 gap-4 mr-5">
          {item.aboutFormData.aboutimageUrls &&
            item.aboutFormData.aboutimageUrls.map((imageUrl: any, index: any) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Preview ${index + 1}`}
                className={`object-cover rounded-lg ${
                  index === 0
                    ? "w-[100%] h-[110%] mt-10"
                    : index === 1
                    ? "w-[120%] h-[120%] mr-5"
                    : index === 2
                    ? "w-[80%] h-[80%] mt-20 ml-10"
                    : "w-[80%] h-[80%] mt-10"
                }`}
              />
            ))}
        </div> */}
          </div>
        ))
      ) : (
        <p>No hotel data found.</p>
      )}
    </section>
  )
}

export default AboutUsPage
