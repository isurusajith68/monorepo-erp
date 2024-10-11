import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useSubmit } from "@remix-run/react";
import { client } from "~/db.server";

export let loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  console.log("kasun", id);

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



export default function HotelInfoForm() {

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
        <h1 className="text-2xl font-bold text-white ml-10">Hotel Info</h1>
        <div className="flex space-x-4 mr-10">
          <Button  onClick={handleSubmit} className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg">
            Save
          </Button>
          <Button className="bg-orange-300 text-white px-4 py-2 rounded-lg">
            Close
          </Button>
        </div>
      </div>

      {/* Form */}
      <form method="post" className="grid grid-cols-2 gap-6 p-6"  id="my-form">
        {/* Name and Email */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600">Name</label>
          <Input minLength={5} name="name" className="mt-1 border-blue-500" placeholder="Enter hotel name" required value={data.name} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <Input name="email" className="mt-1 border-blue-500" placeholder="Enter email address" value={data.email}/>
        </div>

        {/* Mobile and Telephone */}
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-gray-600">Mobile</label>
          <Input name="mobile" className="mt-1 border-blue-500" placeholder="Enter mobile number" value={data.mobile}/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="telephone" className="text-gray-600">Telephone</label>
          <Input name="telephone" className="mt-1 border-blue-500" placeholder="Enter telephone number" value={data.telephone}/>
        </div>

        {/* Address 1 and Address 2 */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="address1" className="text-gray-600">Address 1</label>
          <Input name="address1" className="mt-1 border-blue-500" placeholder="Enter primary address" value={data.address}/>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="address2" className="text-gray-600">Address 2</label>
          <Input name="address2" className="mt-1 border-blue-500" placeholder="Enter secondary address" value={data.address2}/>
        </div>

        {/* City, Country, and Province */}
        <div className="grid grid-cols-3 gap-4 col-span-2">
        <div>
          <label htmlFor="city" className="text-gray-600">City</label>
          <Input name="city" className="mt-1 border-blue-500" placeholder="Enter city" value={data.city} />
        </div>

        <div>
          <label htmlFor="country" className="text-gray-600">Country</label>
          <Input name="country" className="mt-1 border-blue-500" placeholder="Enter country" value={data.country}/>
        </div>

        <div>
          <label htmlFor="province" className="text-gray-600">Province</label>
          <Input name="province" className="mt-1 border-blue-500" placeholder="Enter province" value={data.province}/>
        </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
   </div>
  );
}
