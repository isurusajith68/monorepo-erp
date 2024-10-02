// "use client"; // Mark this as a client-side component

// import { useState } from "react";
// import { InsertHotels } from "./user-input-action"; // Import your server-side action

// // Form component for submitting hotel name
// const HotelForm = () => {
//   const [hotelName, setHotelName] = useState("");

//   // Handle form submission
//   const handleSubmit = async (event: any) => {
//     event.preventDefault();

//     try {
//       // Create the object to send to the server
//       const response = await InsertHotels({ name: hotelName }); // Send the hotel name as an object

//       console.log(response);
//       if (response.success) {
//         alert("Hotel inserted successfully with ID: " + response.lastInsertRowid);
//       } else {
//         alert("Error: " + response.msg);
//       }
//     } catch (error) {
//       console.error("Error inserting hotel:", error);
//     }
//   };

//   return (
//     <form>
//       <div>
//         <label htmlFor="hotelName">Hotel Name:</label>
//         <input
//           type="text"
//           id="hotelName"
//           value={hotelName}
//           onChange={(e) => setHotelName(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" onClick={handleSubmit}>Submit</button>
//     </form>
//   );
// };

// export default HotelForm;
