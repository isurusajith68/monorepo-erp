import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import RootLayout from "./rootlayout";
import Home from "./home/page";
import SelectTemplate from "./select-template/page";
import CreateTemplate1 from "./create-template-1/page";

 
  

  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="select-template" element={<SelectTemplate />} />
        <Route path="create-template1" element={<CreateTemplate1 />} />
      </Route>
    )
  );
 
  