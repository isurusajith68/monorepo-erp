import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { client } from "~/db.server";

export let loader: LoaderFunction = async () => {
  const result = await client.query("SELECT * FROM hotelinfo");
  console.log("111111111",result)
  return result.rows;
};


// export async function loader({
//   params,
// }: LoaderFunctionArgs) {
//   params.hotelid; // "123"
//   console.log("idh", params.hotelid)

//   return params.hotelid
// }

export async function action({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const formDataV = Object.fromEntries(formData)  
  console.log("idh-post",formDataV)

  const hotelQuery = 'INSERT INTO hotelinfo (name, email, mobile, address, address2, city, country, province, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const hotelValues = [formDataV.name, formDataV.email, formDataV.mobile, formDataV.address1, formDataV.address2, formDataV.city, formDataV.country, formDataV.province, formDataV.telephone];  // aboutimage is null for the main image
  
  const hotelResult = await client.query(hotelQuery, hotelValues);
    
  // const todo = await fakeCreateTodo({
  //   title: body.get("title"),
  // });
  // return redirect(`/todos/${todo.id}`);

  return {po:9}
}




export default function HotelInfoForm() {

  const submit = useSubmit();
  const hotelid = useLoaderData<typeof loader>();
  console.log("idh", hotelid)

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
          <Input minLength={5} name="name" className="mt-1 border-blue-500" placeholder="Enter hotel name" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <Input name="email" className="mt-1 border-blue-500" placeholder="Enter email address" />
        </div>

        {/* Mobile and Telephone */}
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-gray-600">Mobile</label>
          <Input name="mobile" className="mt-1 border-blue-500" placeholder="Enter mobile number" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="telephone" className="text-gray-600">Telephone</label>
          <Input name="telephone" className="mt-1 border-blue-500" placeholder="Enter telephone number" />
        </div>

        {/* Address 1 and Address 2 */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="address1" className="text-gray-600">Address 1</label>
          <Input name="address1" className="mt-1 border-blue-500" placeholder="Enter primary address" />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="address2" className="text-gray-600">Address 2</label>
          <Input name="address2" className="mt-1 border-blue-500" placeholder="Enter secondary address" />
        </div>

        {/* City, Country, and Province */}
        <div className="grid grid-cols-3 gap-4 col-span-2">
        <div>
          <label htmlFor="city" className="text-gray-600">City</label>
          <Input name="city" className="mt-1 border-blue-500" placeholder="Enter city" />
        </div>

        <div>
          <label htmlFor="country" className="text-gray-600">Country</label>
          <Input name="country" className="mt-1 border-blue-500" placeholder="Enter country" />
        </div>

        <div>
          <label htmlFor="province" className="text-gray-600">Province</label>
          <Input name="province" className="mt-1 border-blue-500" placeholder="Enter province" />
        </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
   </div>
  );
}
