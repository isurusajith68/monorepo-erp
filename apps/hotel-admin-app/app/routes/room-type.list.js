"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = loader;
exports.action = action;
exports.default = RoomType;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const input_1 = require("~/components/ui/input");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const popover_1 = require("~/components/ui/popover");
const react_1 = require("react");
const react_2 = require("@remix-run/react");
const react_3 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const react_4 = require("react");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("../app-component/style.css");
async function loader({ request }) {
    const result = await db_server_1.client.query('SELECT * FROM hotelroomtypes');
    if (result.rows.length === 0) {
        return {};
    }
    else {
        return result.rows;
    }
}
// Helper to return json with toast
function jsonWithSuccess(data, message) {
    return (0, react_2.json)({
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
        const query = `DELETE FROM hotelroomtypes WHERE id = $1`;
        await db_server_1.client.query(query, [id]);
        // Returning JSON with success toast data
        return jsonWithSuccess({ result: 'Data deleted successfully' }, 'Room Type deleted successfully! 🗑️');
    }
    else {
        // INSERT request
        const roomtype = formData.get('roomtype');
        const hotelQuery = `INSERT INTO hotelroomtypes (roomtype) VALUES ($1)`;
        await db_server_1.client.query(hotelQuery, [roomtype]);
        // Returning JSON with success toast data
        return jsonWithSuccess({ result: 'Hotel room-type saved successfully!' }, 'Hotel room-type saved successfully!');
    }
}
function RoomType() {
    const navigate = (0, react_3.useNavigate)();
    const [isPopoverOpen, setIsPopoverOpen] = (0, react_1.useState)(false);
    const data = (0, react_2.useLoaderData)();
    const actionData = (0, react_2.useActionData)(); // Capture action data (including toast data)
    const submit = (0, react_2.useSubmit)();
    // UseEffect to handle showing the toast when actionData changes
    (0, react_4.useEffect)(() => {
        if (actionData?.toast) {
            // Show success or error toast based on the type
            (0, react_toastify_1.toast)(actionData.toast.message, { type: actionData.toast.type });
        }
    }, [actionData]);
    const handleEdit = (id) => {
        navigate(`/room-type/${id}`);
    };
    return (<>
      <div className={`ml-[18.4%] h-screen mt-14 ${isPopoverOpen ? 'bg-blue-100' : ''}`}>
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Types List</h1>
            <popover_1.Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
              <popover_1.PopoverTrigger asChild>
                <button_1.Button variant="outline" className="h-9 text-white bg-blue-400 hover:bg-blue-500 lg:ml-[70%]">
                  + Add New
                </button_1.Button>
              </popover_1.PopoverTrigger>
              <popover_1.PopoverContent className="lg:w-[180%] lg:-ml-[280%] lg:mt-[100%] h-52">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Room Type</h4>
                  </div>
                  <div className="grid gap-2 mt-5">
                    <div className="grid items-center gap-4">
                      <react_2.Form method="post">
                        <input_1.Input id="width" name="roomtype" placeholder="Room Type" className="col-span-2 h-10"/>
                        <button_1.Button type="submit" className="text-white bg-blue-500 hover:bg-blue-400 mt-10 lg:ml-[80%]">
                          Add
                        </button_1.Button>
                      </react_2.Form>
                    </div>
                  </div>
                </div>
              </popover_1.PopoverContent>
            </popover_1.Popover>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2"/>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4 border-blue-300 w-[50%] ml-[15%]">
          <table_1.Table className="rounded-xl border border-blue-300 overflow-hidden">
            <table_1.TableHeader className="bg-blue-300 text-center border border-blue-300">
              <table_1.TableRow>
                <table_1.TableHead className="text-center px-4 py-2">ID</table_1.TableHead>
                <table_1.TableHead className="text-center p-12 py-2">Type</table_1.TableHead>
                <table_1.TableHead className="text-center py-2">Action</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody className="bg-blue-50">
              {data.map((data, index) => (<table_1.TableRow key={index} className="hover:bg-blue-100">
                  <table_1.TableCell className="text-center px-4 py-2">
                    {data.id}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {data.roomtype}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center py-2 px-4">
                    <div className="flex items-center lg:ml-[20%]">
                      <div>
                        <button_1.Button onClick={() => handleEdit(data.id)} className="bg-blue-600">
                          Edit
                        </button_1.Button>
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
                                permanently delete the room type.
                              </alert_dialog_1.AlertDialogDescription>
                            </alert_dialog_1.AlertDialogHeader>
                            <alert_dialog_1.AlertDialogFooter>
                              <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                              <react_2.Form method="post">
                                <input type="hidden" name="id" value={data.id}/>
                                <alert_dialog_1.AlertDialogAction asChild>
                                  <button_1.Button type="submit" className="bg-red-500">
                                    Continue
                                  </button_1.Button>
                                </alert_dialog_1.AlertDialogAction>
                              </react_2.Form>
                            </alert_dialog_1.AlertDialogFooter>
                          </alert_dialog_1.AlertDialogContent>
                        </alert_dialog_1.AlertDialog>
                      </div>
                    </div>
                  </table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </div>
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
