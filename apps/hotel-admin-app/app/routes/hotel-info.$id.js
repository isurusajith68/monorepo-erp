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
exports.default = HotelInfoForm;
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const utils_1 = __importStar(require("~/lib/utils"));
const react_2 = require("react");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("../app-component/style.css");
let loader = async ({ params }) => {
    const { id } = params;
    console.log('kasun', id);
    // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
    const result = await db_server_1.client.query('SELECT * FROM hotelinfo WHERE id = $1', [
        id,
    ]);
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
    try {
        const formData = await request.formData();
        const formDataCur = Object.fromEntries(formData);
        console.log('curdata', formDataCur);
        if (formDataCur.id) {
            const jsonPayload = formData.get('payload');
            const initialdata = JSON.parse(jsonPayload);
            const diff = (0, utils_1.getDirtyValuesTF)(initialdata, formDataCur, [], 'id');
            const [uq, vals] = (0, utils_1.default)(diff, 'hotelinfo', 'id');
            console.log('2222222', uq);
            console.log('2222222', vals);
            if (uq) {
                await db_server_1.client.query(uq, vals);
            }
            // Returning JSON with success toast data
            return jsonWithSuccess({ result: 'Hotel Info successfully Updated' }, 'Hotel Info successfully Updated !!');
        }
        else {
            const hotelQuery = `INSERT INTO hotelinfo (name, email, mobile, address1, address2, city, country, province, telephone) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            const hotelValues = [
                formDataCur.name,
                formDataCur.email,
                formDataCur.mobile,
                formDataCur.address1,
                formDataCur.address2,
                formDataCur.city,
                formDataCur.country,
                formDataCur.province,
                formDataCur.telephone,
            ];
            // Execute the query
            await db_server_1.client.query(hotelQuery, hotelValues);
            // On successful insertion, return success response
            return jsonWithSuccess({ result: 'Hotel Info successfully Insert' }, 'Hotel Info successfully Insert !!');
        }
    }
    catch (error) {
        console.error('Error inserting hotel info:', error);
        // Return error response with details to show in the alert
        return jsonWithSuccess({ result: 'Hotel Info successfully Insert' }, 'Error inserting hotel info: !!');
    }
}
function HotelInfoForm() {
    const data = (0, react_1.useLoaderData)();
    console.log('idh', data);
    const fetcher = (0, react_1.useFetcher)();
    const actionData = (0, react_1.useActionData)(); // Capture action data (including toast data)
    const submit = (0, react_1.useSubmit)();
    // UseEffect to handle showing the toast when fetcher.data changes
    (0, react_2.useEffect)(() => {
        if (fetcher.data?.toast) {
            // Show success or error toast based on the type
            (0, react_toastify_1.toast)(fetcher.data.toast.message, { type: fetcher.data.toast.type });
        }
    }, [fetcher.data]); // Listen to changes in fetcher.data
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event, 'hhhh');
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
    return (<div className="ml-[18.4%] h-screen mt-16">
      <div className="max-w-2xl mx-auto mt-24 bg-white shadow-lg rounded-lg ">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-400 w-full rounded-t-lg h-14">
          <h1 className="text-2xl font-bold text-white ml-10">Hotel Info</h1>
          <div className="flex space-x-4 mr-10">
            {!data.id && (<button_1.Button onClick={handleSubmit} className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg">
                Save
              </button_1.Button>)}
            {data.id && (<button_1.Button onClick={handleSubmit} className="bg-blue-200 text-blue-700 px-4 py-2 rounded-lg">
                Update
              </button_1.Button>)}

            <button_1.Button className="bg-orange-300 text-white px-4 py-2 rounded-lg">
              Close
            </button_1.Button>
          </div>
        </div>

        {/* Form */}
        <form method="post" className="grid grid-cols-2 gap-6 p-6" id="myForm">
          {/* Name and Email */}
          <div className="flex flex-col">
            <input name="id" type="hidden" defaultValue={data.id}/>
            <label htmlFor="name" className="text-gray-600">
              Name
            </label>
            <input_1.Input minLength={5} name="name" className="mt-1 border-blue-500" placeholder="Enter hotel name" required defaultValue={data.name}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input_1.Input name="email" className="mt-1 border-blue-500" placeholder="Enter email address" defaultValue={data.email}/>
          </div>

          {/* Mobile and Telephone */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="text-gray-600">
              Mobile
            </label>
            <input_1.Input name="mobile" className="mt-1 border-blue-500" placeholder="Enter mobile number" defaultValue={data.mobile}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="telephone" className="text-gray-600">
              Telephone
            </label>
            <input_1.Input name="telephone" className="mt-1 border-blue-500" placeholder="Enter telephone number" defaultValue={data.telephone}/>
          </div>

          {/* Address 1 and Address 2 */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="address1" className="text-gray-600">
              Address 1
            </label>
            <input_1.Input name="address1" className="mt-1 border-blue-500" placeholder="Enter primary address" defaultValue={data.address1}/>
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="address2" className="text-gray-600">
              Address 2
            </label>
            <input_1.Input name="address2" className="mt-1 border-blue-500" placeholder="Enter secondary address" defaultValue={data.address2}/>
          </div>

          {/* City, Country, and Province */}
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <div>
              <label htmlFor="city" className="text-gray-600">
                City
              </label>
              <input_1.Input name="city" className="mt-1 border-blue-500" placeholder="Enter city" defaultValue={data.city}/>
            </div>

            <div>
              <label htmlFor="country" className="text-gray-600">
                Country
              </label>
              <input_1.Input name="country" className="mt-1 border-blue-500" placeholder="Enter country" defaultValue={data.country}/>
            </div>

            <div>
              <label htmlFor="province" className="text-gray-600">
                Province
              </label>
              <input_1.Input name="province" className="mt-1 border-blue-500" placeholder="Enter province" defaultValue={data.province}/>
            </div>
          </div>
        </form>
        <react_toastify_1.ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} // Show progress bar
     newestOnTop={true} // Display newest toast on top
     closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={true} theme="colored" // You can change to "light" or "dark"
     transition={react_toastify_1.Slide} // Slide animation for toast appearance
     icon={true} // Show icons for success, error, etc.
     className="custom-toast-container" // Add custom classes
     bodyClassName="custom-toast-body" closeButton={false} // No close button for a clean look
    />
      </div>
    </div>);
}
