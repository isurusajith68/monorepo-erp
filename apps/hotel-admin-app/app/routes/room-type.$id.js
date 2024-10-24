"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
exports.action = action;
const react_1 = __importStar(require("react"));
const db_server_1 = require("~/db.server");
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const react_2 = require("@remix-run/react");
const utils_1 = __importStar(require("~/lib/utils"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("../app-component/style.css");
let loader = async ({ params }) => {
    const { id } = params;
    console.log('kasun', id);
    // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
    const result = await db_server_1.client.query('SELECT * FROM hotelroomtypes WHERE id = $1', [id]);
    if (result.rows.length == 0) {
        return {};
    }
    else {
        console.log('111111111', result.rows);
        return result.rows[0];
    }
    // Return the fetched data from the database
};
exports.loader = loader;
////////action///////////////
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
    try {
        const formData = await request.formData();
        const formDataCur = Object.fromEntries(formData);
        console.log('curdata', formDataCur);
        if (formDataCur.id) {
            const jsonPayload = formData.get('payload');
            const initialdata = JSON.parse(jsonPayload);
            const diff = (0, utils_1.getDirtyValuesTF)(initialdata, formDataCur, [], 'id');
            const [uq, vals] = (0, utils_1.default)(diff, 'hotelroomtypes', 'id');
            console.log('2222222', uq);
            console.log('2222222', vals);
            await db_server_1.client.query(uq, vals);
            // Returning JSON with success toast data
            return jsonWithSuccess({ result: 'Data Update successfully' }, 'Room Update successfully! 🗑️');
        }
    }
    catch (error) {
        console.error('Error inserting hotel info:', error);
        // Return error response with details to show in the alert
        return jsonWithSuccess({ result: 'Failed to save hotel information. Please try again.' }, 'Failed to save hotel information. Please try again.');
    }
    return 0;
}
function RoomEdit() {
    const navigate = (0, react_2.useNavigate)();
    const data = (0, react_2.useLoaderData)();
    console.log('idh', data);
    const fetcher = (0, react_2.useFetcher)();
    const actionData = (0, react_2.useActionData)(); // Capture action data (including toast data)
    const submit = (0, react_2.useSubmit)();
    // UseEffect to handle showing the toast when fetcher.data changes
    (0, react_1.useEffect)(() => {
        if (fetcher.data?.toast) {
            // Show success or error toast based on the type
            (0, react_toastify_1.toast)(fetcher.data.toast.message, { type: fetcher.data.toast.type });
        }
    }, [fetcher.data]); // Listen to changes in fetcher.data
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Access form data using the FormData API
        const formElement = document.getElementById('myForm');
        const formData = new FormData(formElement);
        // Submit data to the server
        const jsonPayload = JSON.stringify(data);
        // Append the JSON string to the FormData
        formData.append('payload', jsonPayload);
        // Submit form data
        await fetcher.submit(formData, { method: 'post' });
    };
    return (<div className="ml-[18.3%] h-screen mt-14 bg-blue-200 fixed w-full">
      <div>
        <div className="lg:w-[40%] lg:ml-[20%] h-52 bg-white p-8 shadow-xl mt-36">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Room Type</h4>
            </div>
            <div className="grid gap-2 mt-5">
              <div className="grid items-center gap-4">
                <form id="myForm" method="post">
                  <input name="id" type="hidden" defaultValue={data.id}/>
                  <input_1.Input id="width" name="roomtype" placeholder="Room Type" className="col-span-2 h-10" defaultValue={data.roomtype}/>
                  <div className="flex gap-10 lg:ml-[60%]">
                    <div>
                      <react_2.Link className="text-white bg-orange-500 hover:bg-orange-400  w-20 mt-10 h-20" to={'/room-type/list'}>
                        <button_1.Button>Close</button_1.Button>
                      </react_2.Link>
                    </div>
                    <div>
                      <button_1.Button onClick={handleSubmit} 
    //onClick={() => navigate('/room-type/list')}
    className="text-white bg-blue-500 hover:bg-blue-400 mt-10  ">
                        Update
                      </button_1.Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer to display the notifications */}

      <react_toastify_1.ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} // Show progress bar
     newestOnTop={true} // Display newest toast on top
     closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={true} theme="colored" // You can change to "light" or "dark"
     transition={react_toastify_1.Slide} // Slide animation for toast appearance
     icon={true} // Show icons for success, error, etc.
     className="custom-toast-container" // Add custom classes
     bodyClassName="custom-toast-body" closeButton={false} // No close button for a clean look
     onClick={() => navigate('/room-type/list')}/>
    </div>);
}
exports.default = RoomEdit;
