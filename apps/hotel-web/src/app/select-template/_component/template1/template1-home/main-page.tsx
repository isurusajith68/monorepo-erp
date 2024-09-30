'use client'

import React, { useState } from 'react'
import Home from './home-page'
import AboutUsPage from './about-us-page'
import ServicePage from './service-page'
import RoomPage from './room-page'
import ContactPage from './contact-page'
import FooterPage from './footer-page'
import ProfileForm from './user-inputs/home-page-userinput'
import AboutProfileForm from './user-inputs/about-page-userinput'
import ServiceForm from './user-inputs/service-page-inputs'
import RoomForm from './user-inputs/room-page-inputs'
import ContactForm from './user-inputs/contact-page-inputs'

function MainPage() {
  // State to hold the data from the form
  const [formData, setFormData] = useState({
    name: '{GREEN VALLY}',
    phone: '{+94 775518779}',
    email: '{abc@gmail.com}',
    title: '{Discover A Brand Luxurious Hotel}',
    image: '',
    description:
      '{It was time to get rid of the vines. Oh God, let it be Gods pain. Some backyard will be backyard and them. There was a great deal of pain in the two parts of the body}',
    aboutimages: [], // Holds the actual file objects
    aboutimageUrls: [], // Holds the image preview URLs,
    room: '{50}',
    staff: '{120}',
    client: '{450}',
  })

  const [serviceFormData, setServiceFormData] = useState([
    {
      serviceTitle: '{Service Title}',
      serviceDescription: '{Service Description}',
      image: [],
    },
  ])

  const [roomsFormData, setRoomsFormData] = useState([
    {
      roomtitle: '{Room Title}',
      roomprice: '{Room Price}',
      roombeds: '{03',
      roombath: '{02}',
      otherfacility: '{Wifi}',
      roomsdescription: '{Room Description}',
      image: [],
    },
  ])

  const [contactdata, SetContactData] = useState({
    bookingemail: '{book@example.com}',
    generaleemail: '{info@example.com}',
    technicalemail: '{tech@example.com}',
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
        <RoomPage rooms={roomsFormData} />

        {/* Contact Section */}
        <ContactPage contactdata={contactdata} />

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
