"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const home_page_1 = __importDefault(require("./home-page"));
const about_us_page_1 = __importDefault(require("./about-us-page"));
const service_page_1 = __importDefault(require("./service-page"));
const room_page_1 = __importDefault(require("./room-page"));
const contact_page_1 = __importDefault(require("./contact-page"));
const footer_page_1 = __importDefault(require("./footer-page"));
const home_page_userinput_1 = __importDefault(require("./user-inputs/home-page-userinput"));
const about_page_userinput_1 = __importDefault(require("./user-inputs/about-page-userinput"));
const service_page_inputs_1 = __importDefault(require("./user-inputs/service-page-inputs"));
const room_page_inputs_1 = __importDefault(require("./user-inputs/room-page-inputs"));
const contact_page_inputs_1 = __importDefault(require("./user-inputs/contact-page-inputs"));
const button_1 = require("@/components/ui/button");
const user_input_action_1 = require("./user-inputs/user-input-action");
function MainPage() {
    // State to hold the data from the form
    const [formData, setFormData] = (0, react_1.useState)({
        name: '{GREEN VALLY}',
        phone: '{+94 775518779}',
        email: '{abc@gmail.com}',
        title: '{Discover A Brand Luxurious Hotel}',
        fileRecords: [],
    });
    const [aboutFormData, setAboutFormData] = (0, react_1.useState)({
        description: '{It was time to get rid of the vines. Oh God, let it be Gods pain. Some backyard will be backyard and them. There was a great deal of pain in the two parts of the body}',
        aboutimages: [], // Holds the actual file objects
        room: '{50}',
        staff: '{120}',
        client: '{450}',
    });
    const [serviceFormData, setServiceFormData] = (0, react_1.useState)([
        {
            servicetitle: '{Service Title}',
            servicedescription: '{Service Description}',
            serviceimage: [],
        },
    ]);
    const [roomsFormData, setRoomsFormData] = (0, react_1.useState)([
        {
            roomtitle: '{Room Title}',
            roomprice: '{Room Price}',
            roombeds: '{03}',
            roombath: '{02}',
            otherfacility: '{Wifi}',
            roomsdescription: '{Room Description}',
            roomimage: [],
        },
    ]);
    const [contactdata, setContactData] = (0, react_1.useState)({
        bookingemail: '{book@example.com}',
        generaleemail: '{info@example.com}',
        technicalemail: '{tech@example.com}',
        address: '{colombo 07, Sri Lanka}',
    });
    // Function to handle form data change
    const handleFormDataChange = (newData) => {
        setFormData(newData);
    };
    (0, react_1.useEffect)(() => {
        console.log('set unada', serviceFormData);
    }, [serviceFormData]);
    (0, react_1.useEffect)(() => {
        console.log('room set unada', roomsFormData);
    }, [roomsFormData]);
    (0, react_1.useEffect)(() => {
        console.log('image set unada', aboutFormData);
    }, [aboutFormData]);
    // Function to handle form data change
    const handleAboutFormDataChange = (newData) => {
        setAboutFormData(newData);
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
        setContactData(newData);
    };
    const handleImage = () => {
        if (formData.fileRecords) {
            const formDataa = new FormData();
            formData.fileRecords.map((filer, index) => {
                formDataa.append(index.toString(), filer.file);
            });
            console.log('formData11111111111', formDataa);
            return formDataa;
        }
        else {
            return null;
        }
    };
    const handleaboutImage = () => {
        if (aboutFormData.aboutimages) {
            const formDataa = new FormData();
            aboutFormData.aboutimages.map((filer, index) => {
                formDataa.append(index.toString(), filer.file);
            });
            console.log('formData222222222', formDataa);
            return formDataa;
        }
        else {
            return null;
        }
    };
    ////////
    const handlserviceImage = () => {
        const formData = new FormData();
        let imgKey = 0;
        serviceFormData.forEach((service, index) => {
            // Append each image file for this service
            service.serviceimage.forEach((imageFile, imgIndex) => {
                formData.append(`${imgKey}`, imageFile);
            });
            imgKey++;
        });
        return formData;
    };
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update serviceFormData with serviceimage set to null
            const updatedServiceFormData = serviceFormData.map((service) => ({
                ...service,
                serviceimage: null, // Set serviceimage to null
                imageUrl: null,
            }));
            // Update roomsFormData with roomimage set to null
            const updatedroomsFormData = roomsFormData.map((rooms) => ({
                ...rooms,
                roomimage: null, // Set serviceimage to null
                imageUrl: null,
            }));
            // Call InsertHotelData with the updated serviceFormData
            const response = await (0, user_input_action_1.InsertHotelData)({
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
                alert('Hotel data inserted successfully with ID: ' +
                    response.lastInsertRowid);
            }
            else {
                alert('Error: ' + response.msg);
            }
        }
        catch (error) {
            console.error('Error inserting hotel data:', error);
        }
    };
    return (<div className="flex flex-col md:flex-row">
      <div className="lg:w-2/3 md:w-2/3 sm:w-2/3  bg-slate-50 relative h-screen overflow-y-auto">
        <h1>template area</h1>
        {/* Home Section */}
        <home_page_1.default formData={formData}/>

        {/* About Us Section */}
        <about_us_page_1.default aboutFormData={aboutFormData}/>

        {/* Services Section */}
        <service_page_1.default services={serviceFormData}/>

        {/* Rooms Section */}
        <room_page_1.default rooms={roomsFormData}/>

        {/* Contact Section */}
        <contact_page_1.default contactdata={contactdata}/>

        {/* Footer Content */}
        <footer_page_1.default formData={formData} aboutFormData={aboutFormData} contactdata={contactdata} services={serviceFormData}/>
      </div>

      <div className="lg:w-1/3 md:w-1/3 sm:w-1/3 bg-slate-50 relative h-screen overflow-y-auto">
        <h1>Form area</h1>
        {/* Profile Form */}
        <home_page_userinput_1.default formData={formData} setParentFormDataChange={handleFormDataChange}/>

        {/* About Profile Form */}
        <about_page_userinput_1.default aboutFormData={aboutFormData} handleAboutFormDataChange={handleAboutFormDataChange}/>

        {/* Service Form */}
        <service_page_inputs_1.default serviceFormData={serviceFormData} handleServiceFormDataChange={handleServiceFormDataChange}/>

        {/* Room Form */}
        <room_page_inputs_1.default roomsFormData={roomsFormData} handleRoomsFormDataChange={handleRoomsFormDataChange}/>

        {/* Contact Form */}
        <contact_page_inputs_1.default contactdata={contactdata} handleContactFormDataChange={handleContactFormDataChange}/>

        <button_1.Button type="submit" onClick={handleSubmit}>
          Submit
        </button_1.Button>
      </div>
    </div>);
}
exports.default = MainPage;
