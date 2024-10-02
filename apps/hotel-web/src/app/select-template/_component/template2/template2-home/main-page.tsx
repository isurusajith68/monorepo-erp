'use client'

import React, { useState } from 'react'
import Home from './home-page'
import AboutUsPage from './about-us-page'
import ServicePage from './service-page'
import RoomPage from './room-page'
import FooterPage from './footer-page'
import ProfileForm from './user-inputs/home-page-userinput'
import AboutProfileForm from './user-inputs/about-page-userinput'
import ServiceForm from './user-inputs/service-page-inputs'
import RoomForm from './user-inputs/room-page-inputs'
import ContactForm from './user-inputs/contact-page-inputs'

function MainPage() {
  // State to hold the data from the form
  const [formData, setFormData] = useState({
    name: '{Soho Hotel}',
    title: '{ Our Hotel offers you an unparalleled luxury experience.}',
    image: '',
    description:
      '{No one and some time. Children need a lot of wisdom. Tomorrow there is a mouthful, but the author of the urn, soft and large. From before the porttitor, the developer was not in, always himself.}',
    aboutimages: [], // Holds the actual file objects
    aboutimageUrls: [], // Holds the image preview URLs,
    description2:
      '{Maecenas feugiat mattis ipsum, vitae semper massa porttitor amet. There is no property, no urn, and no place to decorate it, no time to put it on the table, no dignissim massa felis to nothing until there is no porttitor and no sad dignissim.}',
  })

  const [serviceFormData, setServiceFormData] = useState([
    {
      serviceTitle: '{Service Title}',
      serviceDescription: '{Service Description}',
      image: [],
    },
  ])

  const [roomdescription, setRoomDescription] = useState({
    roomsdescription:
      '{Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit amet. Nulla mattis, urna et posuere ornare, neque leo dapibus ante, nec dignissim.}',
  })

  const [roomsFormData, setRoomsFormData] = useState([
    {
      roomtitle: '{Room Title}',
      roomprice: '{Room Price}',
      image: [],
    },
  ])

  const [contactdata, SetContactData] = useState({
    phone: '{+94 775518779}',
    email: '{abc@gmail.com}',
    address: '{colombo 07, Sri Lanka}',
  })

  // Function to handle form data change
  const handleFormDataChange = (newData: any) => {
    setFormData(newData)
  }

  // Function to handle form data change
  const handleServiceFormDataChange = (newData: any) => {
    setServiceFormData(newData)
  }

  // Function to handle form data change
  const handleRoomsFormDataChange = (newData: any) => {
    setRoomsFormData(newData)
  }

  // Function to handle form data change
  const handleContactFormDataChange = (newData: any) => {
    SetContactData(newData)
  }

  // Function to handle form data change
  const handleroomdescriptionChange = (newData: any) => {
    setRoomDescription(newData)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="lg:w-2/3 md:w-2/3 sm:w-2/3  bg-slate-50 relative h-screen overflow-y-auto">
        <h1>template area</h1>
        {/* Home Section */}
        <Home formData={formData} />

        {/* About Us Section */}
        <AboutUsPage formData={formData} />

        {/* Services Section */}
        <ServicePage services={serviceFormData} />

        {/* Rooms Section */}
        <RoomPage rooms={roomsFormData} roomdescription={roomdescription} />

        {/* Contact Section */}
        {/* <ContactPage contactdata={contactdata}/> */}

        {/* Footer Content */}
        <FooterPage
          formData={formData}
          contactdata={contactdata}
          services={serviceFormData}
        />
      </div>

      <div className="hidden md:block lg:w-1/3 md:w-1/3 sm:w-1/3 ">
        <div className="bg-slate-100 h-full w-full">
          <h1>user input area</h1>
          <ProfileForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
          ></ProfileForm>

          <AboutProfileForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
          ></AboutProfileForm>

          <ServiceForm
            serviceFormData={serviceFormData}
            onFormDataChange={handleServiceFormDataChange}
          ></ServiceForm>

          <RoomForm
            roomsFormData={roomsFormData}
            onFormDataChange={handleRoomsFormDataChange}
            roomdescription={roomdescription}
            onFormDataChange1={handleroomdescriptionChange}
          ></RoomForm>

          <ContactForm
            contactdata={contactdata}
            onFormDataChange={handleContactFormDataChange}
          ></ContactForm>
        </div>
      </div>
    </div>
  )
}

export default MainPage
