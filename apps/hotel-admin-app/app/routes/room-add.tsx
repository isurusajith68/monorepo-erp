import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { client } from "~/db.server";
import { Checkbox } from "~/components/ui/checkbox";
import { json } from "@remix-run/node"; // Ensure you're importing Remix helpers
import { Buffer } from "buffer"; // Ensure Buffer is available if it's not

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const result = await client.query("SELECT * FROM hotelrooms WHERE id = $1", [11]);

  if (result.rows.length === 0) {
    return {};
  } else {
    return result.rows[0];
  }
};


export async function action({ request }: ActionFunctionArgs) {
  try {
    // Get the combined form data (including fields and images)
    const formData = await request.formData();

    console.log("formData",formData)
    // Extract the fields for hotel data
    const roomno = formData.get("roomno");
    const roomtype = formData.get("roomtype");
    const noofbed = formData.get("noofbed");
    const roomview = formData.get("roomview");
    const ac = formData.get("ac");
    const tv = formData.get("tv");
    const wifi = formData.get("wifi");
    const balcony = formData.get("balcony");

    // SQL query to insert the hotel room data
    const hotelQuery = `
      INSERT INTO hotelrooms (roomno, roomtype, noofbed, roomview, ac, tv, wifi, balcony) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const hotelValues = [roomno, roomtype, noofbed, roomview, ac, tv, wifi, balcony];

    // Execute the SQL query to insert the data
    await client.query(hotelQuery, hotelValues);

    // Loop through the FormData to find and insert image files
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Only process file fields (images)
        const imageBuffer = Buffer.from(await value.arrayBuffer()); // Convert file to Buffer
        const imageQuery = 'INSERT INTO roomimages (images) VALUES ($1)';
        const imageValues = [imageBuffer];

        // Insert each image file into the roomimages table
        await client.query(imageQuery, imageValues);
      }
    }

    // On successful insertion, return a success response
    return json({ success: true, message: "Hotel information and images saved successfully!" });

  } catch (error) {
    // Log any errors that occur and return a failure response
    console.error("Error inserting hotel info:", error);
    return json(
      { success: false, message: "Failed to save hotel information. Please try again." },
      { status: 500 }
    );
  }
}



export default function RoomAddForm() {
  const submit = useSubmit();
  const data = useLoaderData<typeof loader>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [fileRecords, setFileRecords] = useState<string[]>([]); // State for multiple image previews

  console.log("fileRecords",fileRecords)

  const handleImage = () => {
    if (fileRecords) {
      const formData = new FormData();
      fileRecords.map((filer: any, index: any) => {
        formData.append(index.toString(), filer.file);
      });
      console.log("formData11111111111", formData);
      return formData;
    } else {
      return null;
    }
  };

  const handleSubmit = () => {
  
    // Get the additional image form data
    const imageFormData = handleImage();
  
    // Submit the combined form data with Remix's `submit`
    submit(imageFormData);
  
    console.log("Form Data submitted: ", imageFormData);
  };
  
  
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files); // Convert FileList to array
      const newPreviews: string[] = [];
      
      // Generate image previews and handle selected file records
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
  
          // Set the image previews once all files have been processed
          if (newPreviews.length === selectedFiles.length) {
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
  
      // Update file records for both current component and parent component
      setFileRecords((prevRecords: any) => [
        ...prevRecords,
        ...selectedFiles.map((file) => ({ id: null, file, title: "" })),
      ]);
    }
  };
  
 

  return (
    <div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Room</h1>
          <div className="flex space-x-4 mr-10">
            <Link className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg" to={"/room-list"}>
              View List
            </Link>
          </div>
        </div>

        {/* Form */}
        <form method="post" className="grid grid-cols-2 gap-6 p-6" id="my-form">
          {/* Room Number */}
          <div className="flex flex-col">
            <label htmlFor="roomno" className="text-gray-600">Room Number</label>
            <Input
              minLength={2}
              name="roomno"
              className="mt-1 border-blue-500"
              placeholder="Enter room number"
              required
              defaultValue={data.roomno}
            />
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label htmlFor="roomtype" className="text-gray-600">Room Type</label>
            <Input
              name="roomtype"
              className="mt-1 border-blue-500"
              placeholder="Enter room type"
              defaultValue={data.roomtype}
            />
          </div>

          {/* Number of Beds */}
          <div className="flex flex-col">
            <label htmlFor="noofbed" className="text-gray-600">Number of Beds</label>
            <Input
              name="noofbed"
              className="mt-1 border-blue-500"
              placeholder="Enter number of beds"
              defaultValue={data.noofbed}
            />
          </div>

          {/* Room View */}
          <div className="flex flex-col">
            <label htmlFor="roomview" className="text-gray-600">Room View</label>
            <Input
              name="roomview"
              className="mt-1 border-blue-500"
              placeholder="Enter room view"
              defaultValue={data.roomview}
            />
          </div>

          {/* Amenities */}
          <div className="flex flex-col">
            <label htmlFor="amenities" className="text-gray-600">Amenities</label>
          </div>
          <div className="grid grid-cols-4 gap-4 col-span-2">
            <div>
              <label htmlFor="ac" className="text-gray-600">AC</label>
              <Checkbox name="ac" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.ac} />
            </div>

            <div>
              <label htmlFor="tv" className="text-gray-600">TV</label>
              <Checkbox name="tv" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.tv} />
            </div>

            <div>
              <label htmlFor="wifi" className="text-gray-600">Wi-Fi</label>
              <Checkbox name="wifi" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.wifi} />
            </div>

            <div>
              <label htmlFor="balcony" className="text-gray-600">Balcony</label>
              <Checkbox name="balcony" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.balcony} />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="images" className="text-gray-600">Room Images</label>
            <Input
              name="images"
              type="file"
              className="mt-1 border-blue-500"
              onChange={handleImageChange}
              multiple
              placeholder="Upload room images"
            />
            {/* Image Previews */}
            <div className="mt-4 flex gap-1">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Room Preview ${index}`} className="w-20 h-20 object-cover" />
              ))}
            </div>
             {/* Add More Button */}
          <div className="flex flex-col w-32 mt-4">
            <Button className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg">+ Add More</Button>
          </div>
          </div>

          <div className="flex gap-5 ml-[95%]">
          <div>
          <Button onClick={handleSubmit} className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg w-32 ">
            Save
          </Button>
          </div>
          <div>
          <Button className="bg-orange-400 hover:bg-orange-300 text-white px-4 py-2 rounded-lg w-32">
            Close
          </Button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
