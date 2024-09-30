import React from 'react'

interface Service {
  id: number
  imageUrl: string
  serviceTitle: string
  serviceDescription: string
}

interface ServicePageProps {
  services: Service[]
}

function ServicePage({ services }: ServicePageProps) {
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
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300"
              >
                <div className="">
                  <img
                    src={service.imageUrl}
                    alt="icon"
                    width={30}
                    height={30}
                    className="ml-[45%]"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-4">
                  {service.serviceTitle}
                </h3>
                <p className="text-gray-600 mt-4 w-full justify-center">
                  {service.serviceDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage
