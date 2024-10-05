"use client";

import React, { useEffect, useState } from "react";
import Home from "./home-page";
import AboutUsPage from "./about-us-page";
import ServicePage from "./service-page";
import RoomPage from "./room-page";
import ContactPage from "./contact-page";
import FooterPage from "./footer-page";
import ProfileForm from "./user-inputs/home-page-userinput";
import AboutProfileForm from "./user-inputs/about-page-userinput";
import ServiceForm from "./user-inputs/service-page-inputs";
import RoomForm from "./user-inputs/room-page-inputs";
import ContactForm from "./user-inputs/contact-page-inputs";
import { Button } from "@/components/ui/button";
import { InsertHotelData } from "./user-inputs/user-input-action";



function MainPage() {
  // State to hold the data from the form
  const [formData, setFormData] = useState(
    {
      name: "{GREEN VALLY}",
      phone: "{+94 775518779}",
      email: "{abc@gmail.com}",
      title: "{Discover A Brand Luxurious Hotel}",
      fileRecords: [],
    },
  );

  const [aboutFormData, setAboutFormData] = useState(
    {
      description:
        "{It was time to get rid of the vines. Oh God, let it be Gods pain. Some backyard will be backyard and them. There was a great deal of pain in the two parts of the body}",
      aboutimages: [], // Holds the actual file objects
      room: "{50}",
      staff: "{120}",
      client: "{450}",
    }
  );

  const [serviceFormData, setServiceFormData] = useState([
    {
      servicetitle: "{Service Title}",
      servicedescription: "{Service Description}",
      serviceimage: [],
    },
  ]);

  const [roomsFormData, setRoomsFormData] = useState([
    {
      roomtitle: "{Room Title}",
      roomprice: "{Room Price}",
      roombeds: "{03}",
      roombath: "{02}",
      otherfacility: "{Wifi}",
      roomsdescription: "{Room Description}",
      roomimage: [],
    },
  ]);

  const [contactdata, setContactData] = useState({
    bookingemail: "{book@example.com}",
    generaleemail: "{info@example.com}",
    technicalemail: "{tech@example.com}",
    address: "{colombo 07, Sri Lanka}",
  });

  // Function to handle form data change
  const handleFormDataChange = (newData: any) => {
    setFormData(newData);
  };

  useEffect(() => {
    console.log("set unada", serviceFormData);
  }, [serviceFormData]);

  useEffect(() => {
    console.log("room set unada", roomsFormData);
  }, [roomsFormData]);

  useEffect(() => {
    console.log("image set unada", aboutFormData);
  }, [aboutFormData]);

    // Function to handle form data change
  const handleAboutFormDataChange = (newData: any) => {
    setAboutFormData(newData);
  };

  // Function to handle form data change
  const handleServiceFormDataChange = (newData: any) => {
    setServiceFormData(newData);
  };

  // Function to handle form data change
  const handleRoomsFormDataChange = (newData: any) => {
    setRoomsFormData(newData);
  };

  // Function to handle form data change
  const handleContactFormDataChange = (newData: any) => {
    setContactData(newData);
  };

  const handleImage = () => {
    if (formData.fileRecords) {
      const formDataa = new FormData();
      formData.fileRecords.map((filer: any, index: any) => {
        formDataa.append(index.toString(), filer.file);
      });
      console.log("formData11111111111", formDataa);
      return formDataa;
    } else {
      return null;
    }
  };
  const handleaboutImage = () => {
    if (aboutFormData.aboutimages) {
      const formDataa = new FormData();
      aboutFormData.aboutimages.map((filer: any, index: any) => {
        formDataa.append(index.toString(), filer.file);
      });
      console.log("formData222222222", formDataa);
      return formDataa;
    } else {
      return null;
    }
  };

  ////////
  const handlserviceImage =  () => {
    const formData = new FormData();
  let imgKey = 0
    serviceFormData.forEach((service, index) => {
      // Append each image file for this service

      service.serviceimage.forEach((imageFile, imgIndex) => {
        formData.append(`${imgKey}`, imageFile);
      });
      imgKey++
    });
    return formData;
  }
  
  const handleroomImage = () => {
    const formData = new FormData();
    let imgKey = 0;
  
    // Iterate over the serviceFormData to append service details and images
    roomsFormData.forEach((room, index) => {
      // Append each image file for this service
      room.roomimage.forEach((imageFile, imgIndex) => {
        formData.append(`${imgKey}`, imageFile); // Append each image with a unique key
        imgKey++; // Increment imgKey for each image
      });
    });
  
    return formData;
  };
  
  ////////Submit function ////////////

    const handleSubmit = async (event: any) => {
      event.preventDefault();
    
      try {
        // Update serviceFormData with serviceimage set to null
        const updatedServiceFormData = serviceFormData.map(service => ({
          ...service,
          serviceimage: null, // Set serviceimage to null
          imageUrl: null
        }));
         // Update roomsFormData with roomimage set to null
         const updatedroomsFormData = roomsFormData.map(rooms => ({
          ...rooms,
          roomimage: null, // Set serviceimage to null
          imageUrl: null
        }));
    
        // Call InsertHotelData with the updated serviceFormData
        const response = await InsertHotelData({
          data: { ...formData, fileRecords: null }, // Send sanitized formData
          aboutFormData: { ...aboutFormData, aboutimages: null },
          serviceFormData: updatedServiceFormData, // Use the updated serviceFormData
          roomsFormData: updatedroomsFormData,
          contactdata: contactdata,
          imageData: handleImage(), // File data for image uploads
          aboutImageData: handleaboutImage(), // File data for about image uploads
          roomImageData: handleroomImage(), // File data for room image uploads
          serviceImageData: handlserviceImage(), // File data for service image uploads
        });
    
        if (response.success) {
          alert(
            "Hotel data inserted successfully with ID: " +
              response.lastInsertRowid
          );
        } else {
          alert("Error: " + response.msg);
        }
      } catch (error) {
        console.error("Error inserting hotel data:", error);
      }
    };
    

  return (
    <div className="flex flex-col md:flex-row">
      <div className="lg:w-2/3 md:w-2/3 sm:w-2/3  bg-slate-50 relative h-screen overflow-y-auto">
        <h1>template area</h1>
        {/* Home Section */}
        <Home formData={formData} />

        {/* About Us Section */}
        <AboutUsPage aboutFormData={aboutFormData} />

        {/* Services Section */}
        <ServicePage services={serviceFormData} />

        {/* Rooms Section */}
        <RoomPage rooms={roomsFormData} />

        {/* Contact Section */}
        <ContactPage contactdata={contactdata} />

        {/* Footer Content */}
        <FooterPage
          formData={formData}
          aboutFormData={aboutFormData}
          contactdata={contactdata}
          services={serviceFormData}
        />
      </div>

      <div className="lg:w-1/3 md:w-1/3 sm:w-1/3 bg-slate-50 relative h-screen overflow-y-auto">
        <h1>Form area</h1>
        {/* Profile Form */}
        <ProfileForm
          formData={formData}
          setParentFormDataChange={handleFormDataChange}
        />

        {/* About Profile Form */}
        <AboutProfileForm
          aboutFormData={aboutFormData}
          handleAboutFormDataChange={handleAboutFormDataChange}
        />

        {/* Service Form */}
        <ServiceForm
          serviceFormData={serviceFormData}
          handleServiceFormDataChange={handleServiceFormDataChange}
        />

        {/* Room Form */}
        <RoomForm
          roomsFormData={roomsFormData}
          handleRoomsFormDataChange={handleRoomsFormDataChange}
        />

        {/* Contact Form */}
        <ContactForm
          contactdata={contactdata}
          handleContactFormDataChange={handleContactFormDataChange}
        />

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default MainPage;
