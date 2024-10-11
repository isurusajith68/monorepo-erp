import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { client } from "~/db.server";
import { Checkbox } from "~/components/ui/checkbox";

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  console.log("idh", id);

  // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
  const result = await client.query("SELECT * FROM hotelinfo WHERE id = $1",[id]);
 
  if(result.rows.length == 0) {
    return {};
  } else {
    console.log("111111111", result.rows);
    return result.rows[0]; 
  }
   // Return the fetched data from the database
};


// // export async function loader({
// //   params,
// // }: LoaderFunctionArgs) {
// //   params.hotelid; "123"
// //   console.log("idh", params.hotelid)

// //   return params.hotelid
// }


export async function action({
  request,
}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const formDataV = Object.fromEntries(formData);  
    console.log("idh-post", formDataV);

    const hotelQuery = `INSERT INTO hotelinfo (name, email, mobile, address, address2, city, country, province, telephone) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    
    const hotelValues = [
      formDataV.name,
      formDataV.email,
      formDataV.mobile,
      formDataV.address1,
      formDataV.address2,
      formDataV.city,
      formDataV.country,
      formDataV.province,
      formDataV.telephone
    ];

    // Execute the query
    await client.query(hotelQuery, hotelValues);
    
    // On successful insertion, return success response
    return json({ success: true, message: "Hotel information saved successfully!" });

  } catch (error) {
    console.error("Error inserting hotel info:", error);

    // Return error response with details to show in the alert
    return json(
      { success: false, message: "Failed to save hotel information. Please try again." },
      { status: 500 }
    );
  }
}



export default function RoomAddForm() {

  const submit = useSubmit();
  const data = useLoaderData<typeof loader>();
  console.log("idh", data)

  const handleSubmit = () => {
    const formData = new FormData(document.getElementById("my-form") as HTMLFormElement);
    submit(formData, { method: "post" });
  };


  return (
   <div className="ml-[18.4%] h-screen mt-16">
    <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg ">
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
      <form method="post" className="grid grid-cols-2 gap-6 p-6"  id="my-form">
        {/* Name and Email */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600">Room Number</label>
          <Input minLength={5} name="name" className="mt-1 border-blue-500" placeholder="Enter room number" required value={data.name} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Room Type</label>
          <Input name="email" className="mt-1 border-blue-500" placeholder="Enter room type" value={data.email}/>
        </div>

        {/* Mobile and Telephone */}
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-gray-600">Number of Beds</label>
          <Input name="mobile" className="mt-1 border-blue-500" placeholder="Enter number of beds" value={data.mobile}/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="telephone" className="text-gray-600">Room View</label>
          <Input name="telephone" className="mt-1 border-blue-500" placeholder="Enter room view" value={data.telephone}/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="amenities" className="text-gray-600">Amenities</label>
        </div>
        {/* City, Country, and Province */}
        <div className="grid grid-cols-4 gap-4 col-span-2">
        <div>
          <label htmlFor="ac" className="text-gray-600">AC</label>
          <Checkbox name="ac" className=" ml-5 w-10 h-10 border-blue-500" value={data.city} />
        </div>

        <div>
          <label htmlFor="tv" className="text-gray-600">TV</label>
          <Checkbox name="tv" className="ml-5 w-10 h-10 border-blue-500" value={data.country}/>
        </div>

        <div>
          <label htmlFor="wi-fi" className="text-gray-600">Wi-Fi</label>
          <Checkbox name="wi-fi" className="ml-5 w-10 h-10 border-blue-500" value={data.province}/>
        </div>
        <div>
            
          <label htmlFor="balcony" className="text-gray-600">Balcony</label>
          <Checkbox name="balcony" className="ml-5 w-10 h-10 border-blue-500" value={data.province}/>
        </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="Image" className="text-gray-600">Room Images</label>
          <Input name="image" type="file" className="mt-1 border-blue-500" placeholder="Enter telephone number" value={data.telephone}/>
        </div>
        <div className="flex flex-col mt-6 w-32">
        <Button className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg">+ Add More</Button>
        </div>
        {/* image view */}
        <div className="flex flex-col col-span-2">
          
        </div>

        <Button  onClick={handleSubmit} className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg">
            Save
          </Button>
          <Button className="bg-orange-400 hover:bg-orange-300 text-white px-4 py-2 rounded-lg">
            Close
          </Button>
      </form>
    </div>
   </div>
  );
}
