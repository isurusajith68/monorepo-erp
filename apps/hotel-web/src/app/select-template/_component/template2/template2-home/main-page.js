"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const home_page_1 = require("./home-page");
const about_us_page_1 = require("./about-us-page");
const service_page_1 = require("./service-page");
const room_page_1 = require("./room-page");
const footer_page_1 = require("./footer-page");
const home_page_userinput_1 = require("./user-inputs/home-page-userinput");
const about_page_userinput_1 = require("./user-inputs/about-page-userinput");
const service_page_inputs_1 = require("./user-inputs/service-page-inputs");
const room_page_inputs_1 = require("./user-inputs/room-page-inputs");
const contact_page_inputs_1 = require("./user-inputs/contact-page-inputs");
function MainPage() {
    // State to hold the data from the form
    const [formData, setFormData] = (0, react_1.useState)({
        name: '{Soho Hotel}',
        title: '{ Our Hotel offers you an unparalleled luxury experience.}',
        image: '',
        description: '{No one and some time. Children need a lot of wisdom. Tomorrow there is a mouthful, but the author of the urn, soft and large. From before the porttitor, the developer was not in, always himself.}',
        aboutimages: [], // Holds the actual file objects
        aboutimageUrls: [], // Holds the image preview URLs,
        description2: '{Maecenas feugiat mattis ipsum, vitae semper massa porttitor amet. There is no property, no urn, and no place to decorate it, no time to put it on the table, no dignissim massa felis to nothing until there is no porttitor and no sad dignissim.}',
    });
    const [serviceFormData, setServiceFormData] = (0, react_1.useState)([
        {
            serviceTitle: '{Service Title}',
            serviceDescription: '{Service Description}',
            image: [],
        },
    ]);
    const [roomdescription, setRoomDescription] = (0, react_1.useState)({
        roomsdescription: '{Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit amet. Nulla mattis, urna et posuere ornare, neque leo dapibus ante, nec dignissim.}',
    });
    const [roomsFormData, setRoomsFormData] = (0, react_1.useState)([
        {
            roomtitle: '{Room Title}',
            roomprice: '{Room Price}',
            image: [],
        },
    ]);
    const [contactdata, SetContactData] = (0, react_1.useState)({
        phone: '{+94 775518779}',
        email: '{abc@gmail.com}',
        address: '{colombo 07, Sri Lanka}',
    });
    // Function to handle form data change
    const handleFormDataChange = (newData) => {
        setFormData(newData);
    };
    // Function to handle form data change
    const handleServiceFormDataChange = (newData) => {
        setServiceFormData(newData);
    };
    // Function to handle form data change
    const handleRoomsFormDataChange = (newData) => {
        setRoomsFormData(newData);
    };
    // Function to handle form data change
    const handleContactFormDataChange = (newData) => {
        SetContactData(newData);
    };
    // Function to handle form data change
    const handleroomdescriptionChange = (newData) => {
        setRoomDescription(newData);
    };
    return (<div className="flex flex-col md:flex-row">
      <div className="lg:w-2/3 md:w-2/3 sm:w-2/3  bg-slate-50 relative h-screen overflow-y-auto">
        <h1>template area</h1>
        {/* Home Section */}
        <home_page_1.default formData={formData}/>

        {/* About Us Section */}
        <about_us_page_1.default formData={formData}/>

        {/* Services Section */}
        <service_page_1.default services={serviceFormData}/>

        {/* Rooms Section */}
        <room_page_1.default rooms={roomsFormData} roomdescription={roomdescription}/>

        {/* Contact Section */}
        {/* <ContactPage contactdata={contactdata}/> */}

        {/* Footer Content */}
        <footer_page_1.default formData={formData} contactdata={contactdata} services={serviceFormData}/>
      </div>

      <div className="hidden md:block lg:w-1/3 md:w-1/3 sm:w-1/3 ">
        <div className="bg-slate-100 h-full w-full">
          <h1>user input area</h1>
          <home_page_userinput_1.default formData={formData} onFormDataChange={handleFormDataChange}></home_page_userinput_1.default>

          <about_page_userinput_1.default formData={formData} onFormDataChange={handleFormDataChange}></about_page_userinput_1.default>

          <service_page_inputs_1.default serviceFormData={serviceFormData} onFormDataChange={handleServiceFormDataChange}></service_page_inputs_1.default>

          <room_page_inputs_1.default roomsFormData={roomsFormData} onFormDataChange={handleRoomsFormDataChange} roomdescription={roomdescription} onFormDataChange1={handleroomdescriptionChange}></room_page_inputs_1.default>

          <contact_page_inputs_1.default contactdata={contactdata} onFormDataChange={handleContactFormDataChange}></contact_page_inputs_1.default>
        </div>
      </div>
    </div>);
}
exports.default = MainPage;
