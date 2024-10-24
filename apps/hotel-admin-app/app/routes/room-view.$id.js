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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
exports.action = action;
const react_1 = __importDefault(require("react"));
const db_server_1 = require("~/db.server");
const button_1 = require("~/components/ui/button");
const input_1 = require("~/components/ui/input");
const react_2 = require("@remix-run/react");
const utils_1 = __importStar(require("~/lib/utils"));
let loader = async ({ params }) => {
    const { id } = params;
    console.log('kasun', id);
    // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
    const result = await db_server_1.client.query('SELECT * FROM hotelroomview WHERE id = $1', [id]);
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
async function action({ request }) {
    try {
        const formData = await request.formData();
        const formDataCur = Object.fromEntries(formData);
        console.log('curdata', formDataCur);
        if (formDataCur.id) {
            const jsonPayload = formData.get('payload');
            const initialdata = JSON.parse(jsonPayload);
            const diff = (0, utils_1.getDirtyValuesTF)(initialdata, formDataCur, [], 'id');
            const [uq, vals] = (0, utils_1.default)(diff, 'hotelroomview', 'id');
            console.log('2222222', uq);
            console.log('2222222', vals);
            await db_server_1.client.query(uq, vals);
            return (0, react_2.json)({
                success: true,
                message: 'Hotel information saved successfully!',
            });
        }
    }
    catch (error) {
        console.error('Error inserting hotel info:', error);
        // Return error response with details to show in the alert
        return (0, react_2.json)({
            success: false,
            message: 'Failed to save hotel information. Please try again.',
        }, { status: 500 });
    }
    return 0;
}
function ViewEdit() {
    const navigate = (0, react_2.useNavigate)();
    const data = (0, react_2.useLoaderData)();
    console.log('idh', data);
    const fetcher = (0, react_2.useFetcher)();
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
        navigate('/room-view/list');
    };
    return (<div className="ml-[18.3%] h-screen mt-14 bg-blue-200 fixed w-full">
      <div>
        <div className="lg:w-[40%] lg:ml-[20%] h-52 bg-white p-8 shadow-xl mt-36">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Room View</h4>
            </div>
            <div className="grid gap-2 mt-5">
              <div className="grid items-center gap-4">
                <form id="myForm" method="post">
                  <input name="id" type="hidden" defaultValue={data.id}/>
                  <input_1.Input id="width" name="roomview" placeholder="Room View" className="col-span-2 h-10" defaultValue={data.roomview}/>
                  <div className="flex gap-10 lg:ml-[60%]">
                    <div>
                      <button_1.Button onClick={() => navigate('/room-view/list')} className="text-white bg-orange-500 hover:bg-orange-400  w-20 mt-10">
                        close
                      </button_1.Button>
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
    </div>);
}
exports.default = ViewEdit;
