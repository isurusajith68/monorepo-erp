"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
exports.default = RoomPriceScheduleView;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const input_1 = require("~/components/ui/input");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
let loader = async ({ params }) => {
    const { id } = params;
    console.log('kasun', id);
    // Perform the query, using hotelid if needed (e.g., filtering by hotelid)
    const result = await db_server_1.client.query('SELECT * FROM roomprices WHERE scheduleid = $1', [id]);
    if (result.rows.length == 0) {
        return {};
    }
    else {
        console.log('111111111', result.rows);
        return result.rows;
    }
    // Return the fetched data from the database
};
exports.loader = loader;
function RoomPriceScheduleView() {
    const navigate = (0, react_1.useNavigate)();
    const dataArray = (0, react_1.useLoaderData)();
    // Get the first object from the array
    const singleData = dataArray[0];
    const data = (0, react_1.useLoaderData)();
    console.log('data', singleData);
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
        </div>

        <react_1.Form method="post" id="myForm">
          <input name="id" type="hidden" defaultValue={singleData.id}/>
          <div className="flex justify-between items-center mt-4 w-full">
            <div className="relative flex flex-col-3 gap-5 ml-28 mr-14">
              <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Schedule ID
                </label>
                <input_1.Input type="search" name="scheduleid" className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={singleData.scheduleid}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  Start Date
                </label>
                <input_1.Input type="date" name="startdate" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={formatDate(singleData.startdate)}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2 w-full">
                  End Date
                </label>
                <input_1.Input type="date" name="enddate" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" defaultValue={formatDate(singleData.enddate)}/>
              </div>
              <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
                <label className="font-extralight text-sm mt-2">Remarks</label>
                <input_1.Input type="text" name="remarks" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl w-44" defaultValue={singleData.remarks}/>
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
                {data.map((data, index) => {
            return (<table_1.TableRow key={index} className="hover:bg-blue-100">
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.roomno}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.roomtype}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.roomview}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.noofbed}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.roprice}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.bbprice}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.hbprice}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center px-4 py-2">
                        {data.fbprice}
                      </table_1.TableCell>
                      <table_1.TableCell className="text-center py-2 px-4">
                        <div className="flex items-center">
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
                    </table_1.TableRow>);
        })}
              </table_1.TableBody>
            </table_1.Table>
          </div>
        </react_1.Form>
        <div className="bg-slate-100 w-[40%] h-44 ml-16 mt-20 rounded-lg shadow-xl">
          <h3 className="ml-5 mt-5">RO : Room Only</h3>
          <h3 className="ml-5 mt-5">BB : Bed & Breakfast</h3>
          <h3 className="ml-5 mt-5">
            HB : Half Board (Breakfast & Dinner normally)
          </h3>
          <h3 className="ml-5 mt-5">
            FB : Full Board (Breakfast , Lunch & Dinner)
          </h3>
        </div>
      </div>
    </>);
}
