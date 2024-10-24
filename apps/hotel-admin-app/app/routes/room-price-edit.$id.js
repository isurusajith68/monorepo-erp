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
exports.default = RoomPriceSchedule;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const input_1 = require("~/components/ui/input");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const utils_1 = __importStar(require("~/lib/utils"));
let loader = async ({ params }) => {
    const { id } = params;
    console.log('kasun', id);
    // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
    const result = await db_server_1.client.query('SELECT * FROM roomprices WHERE id = $1', [
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
async function action({ request }) {
    try {
        const formData = await request.formData();
        const formDataCur = Object.fromEntries(formData);
        console.log('curdata', formDataCur);
        if (formDataCur.id) {
            const jsonPayload = formData.get('payload');
            const initialdata = JSON.parse(jsonPayload);
            const diff = (0, utils_1.getDirtyValuesTF)(initialdata, formDataCur, [], 'id');
            const [uq, vals] = (0, utils_1.default)(diff, 'roomprices', 'id');
            console.log('2222222', uq);
            console.log('2222222', vals);
            await db_server_1.client.query(uq, vals);
            return (0, react_1.json)({
                success: true,
                message: 'Hotel information saved successfully!',
            });
        }
    }
    catch (error) {
        console.error('Error inserting hotel info:', error);
        // Return error response with details to show in the alert
        return (0, react_1.json)({
            success: false,
            message: 'Failed to save hotel information. Please try again.',
        }, { status: 500 });
    }
    return 0;
}
function RoomPriceSchedule() {
    const navigate = (0, react_1.useNavigate)();
    const data = (0, react_1.useLoaderData)();
    const fetcher = (0, react_1.useFetcher)();
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
        //navigate('/room-price-list')
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
        const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits
        return `${year}-${month}-${day}`;
    };
    return (<>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <react_1.Link to={'/room-price-list'} className="lg:ml-[60%] mt-5">
              <button_1.Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                Price List
              </button_1.Button>
            </react_1.Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2"/>
          <div className="lg:ml-[80%] mt-8 mb-5">
            <button_1.Button onClick={handleSubmit} className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
              Update
            </button_1.Button>
            <button_1.Button className="h-9 text-white bg-orange-400 hover:bg-orange-500 ml-8">
              Close
            </button_1.Button>
          </div>
        </div>

        <react_1.Form method="post" id="myForm">
          <input name="id" type="hidden" defaultValue={data.id}/>
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <input_1.Input type="search" name="scheduleid" className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={data.scheduleid}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Start Date
                </label>
                <input_1.Input type="date" name="startdate" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={formatDate(data.startdate)}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  End Date
                </label>
                <input_1.Input type="date" name="enddate" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={formatDate(data.enddate)}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <input_1.Input type="text" name="remarks" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44" defaultValue={data.remarks}/>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mt-10 ml-14">
              Add Room Price Details
            </h1>
          </div>
          <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[95%]">
            <table_1.Table className="rounded-xl border border-blue-300 overflow-hidden">
              <table_1.TableHeader className="bg-blue-300 text-center border border-blue-300">
                <table_1.TableRow>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    Room NO
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    Room Type
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    Room View
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2"> Beds</table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    RO Price
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    BB Price
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    HB Price
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    Fb Price
                  </table_1.TableHead>
                  <table_1.TableHead className="text-center px-4 py-2">
                    {' '}
                    Action
                  </table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody className="bg-blue-50">
                <table_1.TableRow className="hover:bg-blue-100">
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input name="roomno" defaultValue={data.roomno} className="border-none" readOnly></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input name="roomtype" defaultValue={data.roomtype} className="border-none" readOnly></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input name="roomview" defaultValue={data.roomview} className="border-none" readOnly></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input name="noofbed" defaultValue={data.noofbed} className="border-none" readOnly></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input className="bg-white" name="roprice" defaultValue={data.roprice}></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input className="bg-white" name="bbprice" defaultValue={data.bbprice}></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input className="bg-white" name="hbprice" defaultValue={data.hbprice}></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <input_1.Input className="bg-white" name="fbprice" defaultValue={data.fbprice}></input_1.Input>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    <div className="flex gap-5 ml-2">
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
                                permanently delete your account and remove your
                                data from our servers.
                              </alert_dialog_1.AlertDialogDescription>
                            </alert_dialog_1.AlertDialogHeader>
                            <alert_dialog_1.AlertDialogFooter>
                              <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                              <alert_dialog_1.AlertDialogAction>
                                Continue
                              </alert_dialog_1.AlertDialogAction>
                            </alert_dialog_1.AlertDialogFooter>
                          </alert_dialog_1.AlertDialogContent>
                        </alert_dialog_1.AlertDialog>
                      </div>
                    </div>
                  </table_1.TableCell>
                </table_1.TableRow>
              </table_1.TableBody>
            </table_1.Table>
          </div>
        </react_1.Form>
      </div>
    </>);
}
