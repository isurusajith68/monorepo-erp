import { useEffect, useState } from "react";
import Home from "./_component/home-page";
import axios from "axios";
import AboutUsPage from "./_component/about-us-page";
import ServicePage from "./_component/service-page";
import RoomPage from "./_component/room-page";
import ContactPage from "./_component/contact-page";
import FooterPage from "./_component/footer-page";

function Template1() {
   const [data, setData] = useState([]);// Initialize state with null
   const [image, setImage] = useState([]);// Initialize state with null

  const getData = async () => {
    const response = await axios.get("http://localhost:4000/getData");
    setData(response.data.rows);
    console.log("first11",response.data.rows)
  }
  const getImage = async () => {
    const response = await axios.get("http://localhost:4000/getImage");
    setImage(response.data);
    console.log("tttttttttttt",response)
  }

  useEffect(() => {
    getData();
    getImage();
  }, []);

  return (
    <div className="w-full">
    <Home data={data} image={image}></Home>
    <AboutUsPage data={data} image={image}></AboutUsPage>
    <ServicePage data={data} image={image}></ServicePage>
    <RoomPage data={data} image={image}></RoomPage>
    <ContactPage data={data}></ContactPage>
    <FooterPage data={data}></FooterPage>
  </div>
  )
}

export default Template1;