"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
exports.action = action;
exports.default = RoomAddForm;
const react_1 = require("react");
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const react_2 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const checkbox_1 = require("~/components/ui/checkbox");
const node_1 = require("@remix-run/node"); // Ensure you're importing Remix helpers
const buffer_1 = require("buffer"); // Ensure Buffer is available if it's not
const use_toast_1 = require("~/hooks/use-toast");
let loader = async ({ params }) => {
    const { id } = params;
    const result = await db_server_1.client.query('SELECT * FROM hotelrooms WHERE id = $1', [
        11,
    ]);
    if (result.rows.length === 0) {
        return {};
    }
    else {
        return result.rows[0];
    }
};
exports.loader = loader;
async function action({ request }) {
    try {
        // Get the form data
        const formData = await request.formData();
        // Extract form fields
        const roomno = formData.get('roomno');
        const roomtype = formData.get('roomtype');
        const noofbed = formData.get('noofbed');
        const roomview = formData.get('roomview');
        const ac = formData.get('ac');
        const tv = formData.get('tv');
        const wifi = formData.get('wifi');
        const balcony = formData.get('balcony');
        // SQL query to insert the hotel room data
        const hotelQuery = `
      INSERT INTO hotelrooms (roomno, roomtype, noofbed, roomview, ac, tv, wifi, balcony) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`;
        const hotelValues = [
            roomno,
            roomtype,
            noofbed,
            roomview,
            ac,
            tv,
            wifi,
            balcony,
        ];
        // Execute SQL query to insert room data
        const result = await db_server_1.client.query(hotelQuery, hotelValues);
        const roomId = result.rows[0].id; // Get inserted room ID
        // Handle image uploads
        const images = formData.getAll('images'); // Get all images
        for (const image of images) {
            if (image && typeof image !== 'string') {
                // Convert the image to a buffer
                const imageBuffer = buffer_1.Buffer.from(await image.arrayBuffer());
                // SQL query to insert the image and room ID
                const imageQuery = `
          INSERT INTO roomimages (images, roomid) 
          VALUES ($1, $2)`;
                await db_server_1.client.query(imageQuery, [imageBuffer, roomId]);
            }
        }
        // If everything is successful, return success toast
        return (0, node_1.json)({
            toast: {
                type: 'success',
                message: 'Room information saved successfully!',
            },
        });
    }
    catch (error) {
        console.error('Error saving room info:', error);
        // Return error toast data on failure
        return (0, node_1.json)({
            toast: { type: 'error', message: 'Failed to save room information.' },
        });
    }
}
function RoomAddForm() {
    const submit = (0, react_2.useSubmit)();
    const data = (0, react_2.useLoaderData)();
    const [imagePreviews, setImagePreviews] = (0, react_1.useState)([]);
    const actionData = (0, react_2.useActionData)();
    const toast = (0, use_toast_1.useToast)(); // Get the toast function from Remix or your UI library
    const handleSubmit = () => {
        // Show toast notification when action data is received
        (0, react_1.useEffect)(() => {
            if (actionData?.toast) {
                if (actionData.toast.type === 'success') {
                    toast.success(actionData.toast.message);
                }
                else if (actionData.toast.type === 'error') {
                    toast.error(actionData.toast.message);
                }
            }
        }, [actionData, toast]);
    };
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files) {
            const selectedFiles = Array.from(files); // Convert FileList to array
            const newPreviews = [];
            // Generate image previews and handle selected file records
            selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result);
                    // Set the image previews once all files have been processed
                    if (newPreviews.length === selectedFiles.length) {
                        setImagePreviews((prevPreviews) => [
                            ...prevPreviews,
                            ...newPreviews,
                        ]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    return (<div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Room</h1>
          <div className="flex space-x-4 mr-10">
            <react_2.Link className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg" to={'/room-list'}>
              View List
            </react_2.Link>
          </div>
        </div>

        {/* Form */}
        <react_2.Form method="post" encType="multipart/form-data" className="grid grid-cols-2 gap-6 p-6" id="my-form">
          {/* Room Number */}
          <div className="flex flex-col">
            <label htmlFor="roomno" className="text-gray-600">
              Room Number
            </label>
            <input_1.Input minLength={2} name="roomno" className="mt-1 border-blue-500" placeholder="Enter room number" required defaultValue={data.roomno}/>
          </div>

          {/* Room Type */}
          <div className="flex flex-col">
            <label htmlFor="roomtype" className="text-gray-600">
              Room Type
            </label>
            <input_1.Input name="roomtype" className="mt-1 border-blue-500" placeholder="Enter room type" defaultValue={data.roomtype}/>
          </div>

          {/* Number of Beds */}
          <div className="flex flex-col">
            <label htmlFor="noofbed" className="text-gray-600">
              Number of Beds
            </label>
            <input_1.Input name="noofbed" className="mt-1 border-blue-500" placeholder="Enter number of beds" defaultValue={data.noofbed}/>
          </div>

          {/* Room View */}
          <div className="flex flex-col">
            <label htmlFor="roomview" className="text-gray-600">
              Room View
            </label>
            <input_1.Input name="roomview" className="mt-1 border-blue-500" placeholder="Enter room view" defaultValue={data.roomview}/>
          </div>

          {/* Amenities */}
          <div className="flex flex-col">
            <label htmlFor="amenities" className="text-gray-600">
              Amenities
            </label>
          </div>
          <div className="grid grid-cols-4 gap-4 col-span-2">
            <div>
              <label htmlFor="ac" className="text-gray-600">
                AC
              </label>
              <checkbox_1.Checkbox name="ac" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.ac}/>
            </div>

            <div>
              <label htmlFor="tv" className="text-gray-600">
                TV
              </label>
              <checkbox_1.Checkbox name="tv" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.tv}/>
            </div>

            <div>
              <label htmlFor="wifi" className="text-gray-600">
                Wi-Fi
              </label>
              <checkbox_1.Checkbox name="wifi" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.wifi}/>
            </div>

            <div>
              <label htmlFor="balcony" className="text-gray-600">
                Balcony
              </label>
              <checkbox_1.Checkbox name="balcony" className="ml-5 w-10 h-10 border-blue-500" defaultValue={data.balcony}/>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="images" className="text-gray-600">
              Room Images
            </label>
            <input_1.Input name="images" type="file" className="mt-1 border-blue-500" onChange={handleImageChange} multiple placeholder="Upload room images"/>
            Image Previews *
            <div className="mt-4 flex gap-1">
              {imagePreviews.map((preview, index) => (<img key={index} src={preview} alt={`Room Preview ${index}`} className="w-20 h-20 object-cover"/>))}
            </div>
            <div className="flex flex-col w-32 mt-4">
              <button_1.Button className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg">
                + Add More
              </button_1.Button>
            </div>
          </div>
          <div className="flex gap-5 ml-[95%]">
            <div>
              <button_1.Button onClick={handleSubmit} className="bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-lg w-32 ">
                Save
              </button_1.Button>
            </div>
            <div>
              <button_1.Button className="bg-orange-400 hover:bg-orange-300 text-white px-4 py-2 rounded-lg w-32">
                Close
              </button_1.Button>
            </div>
          </div>
        </react_2.Form>
      </div>
    </div>);
}
