"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = loader;
exports.action = action;
exports.default = RoomList;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const react_2 = require("react");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("../app-component/style.css");
async function loader({ request }) {
    // Query to fetch hotel rooms and their associated images using INNER JOIN
    const query = `
    SELECT hotelrooms.*, roomimages.images
    FROM hotelrooms
    INNER JOIN roomimages
    ON hotelrooms.id = roomimages.roomid;
  `;
    // Execute the joined query
    const result = await db_server_1.client.query(query);
    // Process and map the results to convert the images from Buffer to Base64
    const hotels = result.rows.reduce((acc, row) => {
        const existingHotel = acc.find((hotel) => hotel.id === row.id);
        const imageBase64 = row.images
            ? `data:image/jpeg;base64,${row.images.toString('base64')}`
            : null;
        if (existingHotel) {
            // If the hotel already exists in the array, push the new image to its images array
            existingHotel.images.push(imageBase64);
        }
        else {
            // If the hotel doesn't exist, create a new entry
            acc.push({
                ...row,
                images: imageBase64 ? [imageBase64] : [],
            });
        }
        return acc;
    }, []);
    // Check if there are no rows, return an empty object
    if (hotels.length === 0) {
        return (0, react_1.json)({});
    }
    else {
        // Return the processed hotel data with images
        console.log('Processed hotels data: ', { hotels });
        return (0, react_1.json)({ hotels });
    }
}
// Helper to return json with toast
function jsonWithSuccess(data, message) {
    return (0, react_1.json)({
        ...data,
        toast: {
            type: 'success',
            message,
        },
    });
}
async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get('id');
    if (id) {
        // DELETE request
        const query = `DELETE FROM hotelrooms WHERE id = $1`;
        await db_server_1.client.query(query, [id]);
        // Returning JSON with success toast data
        return jsonWithSuccess({ result: 'Data deleted successfully' }, 'Room deleted successfully! 🗑️');
    }
    else {
        // If no ID, returning a generic success message
        return jsonWithSuccess({ result: 'Operation successful' }, 'Operation successful! 🎉');
    }
}
function RoomList() {
    const navigate = (0, react_1.useNavigate)();
    const data = (0, react_1.useLoaderData)()?.hotels || []; // Fallback to an empty array
    console.log('first', data);
    const actionData = (0, react_1.useActionData)(); // Capture action data (including toast data)
    const submit = (0, react_1.useSubmit)();
    // UseEffect to handle showing the toast when actionData changes
    (0, react_2.useEffect)(() => {
        if (actionData?.toast) {
            // Show success or error toast based on the type
            (0, react_toastify_1.toast)(actionData.toast.message, { type: actionData.toast.type });
        }
    }, [actionData]);
    const handleEdit = (id) => {
        navigate(`/room-type/${id}`);
    };
    return (<>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room List</h1>
            <react_1.Link to={'/room-add'} className="lg:ml-[70%]">
              <button_1.Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                {' '}
                + Add New
              </button_1.Button>
            </react_1.Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2"/>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%] mb-14">
          <table_1.Table className="rounded-xl border border-blue-300 overflow-hidden mb-14">
            <table_1.TableHeader className="bg-blue-300 text-center border border-blue-300">
              <table_1.TableRow>
                <table_1.TableHead className="text-center px-4 py-2">
                  Room Number{' '}
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Room Type{' '}
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  No of Beds
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Amenities{' '}
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Room Image{' '}
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">Action</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody className="bg-blue-50">
              {data.length > 0 ? (data.map((data, index) => (<table_1.TableRow key={index} className="hover:bg-blue-100">
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.roomno}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.roomtype}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.noofbed}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.ac === 'on' && (<span style={{ color: 'green', marginRight: '10px' }}>
                          AC
                        </span>)}
                      {data.tv === 'on' && (<span style={{ color: 'blue', marginRight: '10px' }}>
                          TV
                        </span>)}
                      {data.wifi === 'on' && (<span style={{ color: 'purple', marginRight: '10px' }}>
                          WiFi
                        </span>)}
                      {data.balcony === 'on' && (<span style={{ color: 'orange', marginRight: '10px' }}>
                          Balcony
                        </span>)}
                    </table_1.TableCell>

                    {/* Display the base64 image */}
                    <table_1.TableCell className="text-center px-4 py-2">
                      <div className="flex flex-row gap-4">
                        {data.images && data.images.length > 0
                ? data.images.map((image, index) => (<img key={index} // Unique key for each image
                 src={image} alt={`Room Image ${index + 1}`} width={50} height={50}/>))
                : 'No Image Available'}
                      </div>
                    </table_1.TableCell>

                    <table_1.TableCell className="text-center px-4 py-2">
                      <div className="flex gap-5 ml-2">
                        <div>
                          <button_1.Button className="bg-blue-600">Edit</button_1.Button>
                        </div>
                        <div>
                          <alert_dialog_1.AlertDialog>
                            <alert_dialog_1.AlertDialogTrigger asChild>
                              <button_1.Button className="ml-5 bg-blue-600 bg-destructive">
                                Delete
                              </button_1.Button>
                            </alert_dialog_1.AlertDialogTrigger>
                            <alert_dialog_1.AlertDialogContent>
                              <alert_dialog_1.AlertDialogHeader>
                                <alert_dialog_1.AlertDialogTitle>
                                  Are you absolutely sure?
                                </alert_dialog_1.AlertDialogTitle>
                                <alert_dialog_1.AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </alert_dialog_1.AlertDialogDescription>
                              </alert_dialog_1.AlertDialogHeader>
                              <alert_dialog_1.AlertDialogFooter>
                                <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                                <react_1.Form method="post">
                                  <input type="hidden" name="id" value={data.id}/>
                                  <alert_dialog_1.AlertDialogAction asChild>
                                    <button_1.Button type="submit" className="bg-red-500">
                                      Continue
                                    </button_1.Button>
                                  </alert_dialog_1.AlertDialogAction>
                                </react_1.Form>
                              </alert_dialog_1.AlertDialogFooter>
                            </alert_dialog_1.AlertDialogContent>
                          </alert_dialog_1.AlertDialog>
                        </div>
                      </div>
                    </table_1.TableCell>
                  </table_1.TableRow>))) : (<table_1.TableRow>
                  <table_1.TableCell colSpan={6} className="text-center px-4 py-2">
                    No data available
                  </table_1.TableCell>
                </table_1.TableRow>)}
            </table_1.TableBody>
          </table_1.Table>
        </div>
        {/* ToastContainer to display the notifications */}

        <react_toastify_1.ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} // Show progress bar
     newestOnTop={true} // Display newest toast on top
     closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={true} theme="colored" // You can change to "light" or "dark"
     transition={react_toastify_1.Slide} // Slide animation for toast appearance
     icon={true} // Show icons for success, error, etc.
     className="custom-toast-container" // Add custom classes
     bodyClassName="custom-toast-body" closeButton={false} // No close button for a clean look
    />
      </div>
    </>);
}
