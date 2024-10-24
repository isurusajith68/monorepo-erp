"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = loader;
exports.default = RoomPriceList;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const input_1 = require("~/components/ui/input");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
const react_2 = require("react");
async function loader({ request }) {
    const result = await db_server_1.client.query('SELECT * FROM roomprices');
    if (result.rows.length === 0) {
        return {};
    }
    else {
        console.log('result.rows', result.rows);
        return result.rows;
    }
}
function RoomPriceList() {
    const navigate = (0, react_1.useNavigate)();
    const data = (0, react_1.useLoaderData)();
    const [searchId, setSearchId] = (0, react_2.useState)('');
    const [searchDate, setsearchDate] = (0, react_2.useState)('');
    const handleEdit = (id) => {
        navigate(`/room-price-edit/${id}`);
    };
    const handleView = (id) => {
        navigate(`/room-price-view/${id}`);
    };
    // Filter the data based on `id` and `oname`
    const filteredData = data.filter((item) => {
        const matchesSearchCriteria = item.scheduleid.toString().includes(searchId);
        return matchesSearchCriteria;
    });
    return (<>
      <div className="ml-[18.4%] h-screen mt-14">
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Room Price Schedule</h1>
            <react_1.Link to={'/room-price-add'} className="lg:ml-[60%] mt-5">
              <button_1.Button className="h-9 text-white bg-blue-400 hover:bg-blue-500 ">
                {' '}
                + Add New
              </button_1.Button>
            </react_1.Link>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2"/>
        </div>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-3 gap-16 ml-28">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Schedule ID
              </label>
              <input_1.Input type="search" className="pl-3 pr-3 py-2 border border-blue-300 rounded-2xl" placeholder="" value={searchId} onChange={(e) => setSearchId(e.target.value)}/>
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                Start Date
              </label>
              <input_1.Input type="date" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" placeholder="" value={searchDate} onChange={(e) => setsearchDate(e.target.value)}/>
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2 w-full">
                End Date
              </label>
              <input_1.Input type="date" className="pl-8 pr-3 py-2 border border-blue-300 rounded-2xl" placeholder=""/>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[85%] ml-[5%]">
          <table_1.Table className="rounded-xl border border-blue-300 overflow-hidden">
            <table_1.TableHeader className="bg-blue-300 text-center border border-blue-300">
              <table_1.TableRow>
                <table_1.TableHead className="text-center px-4 py-2">
                  Schedule ID
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Start Date
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  End Date
                </table_1.TableHead>
                <table_1.TableHead className="text-center py-2">Action</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody className="bg-blue-50">
              {filteredData.map((data, index) => {
            // Convert and format the startdate and enddate to yyyy.mm.dd
            const startDateObj = new Date(data.startdate);
            const formattedStartDate = `${startDateObj.getFullYear()}.${(startDateObj.getMonth() + 1)
                .toString()
                .padStart(2, '0')}.${startDateObj
                .getDate()
                .toString()
                .padStart(2, '0')}`;
            const endDateObj = new Date(data.enddate);
            const formattedEndDate = `${endDateObj.getFullYear()}.${(endDateObj.getMonth() + 1)
                .toString()
                .padStart(2, '0')}.${endDateObj
                .getDate()
                .toString()
                .padStart(2, '0')}`;
            return (<table_1.TableRow key={index} className="hover:bg-blue-100">
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.scheduleid}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {formattedStartDate}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {formattedEndDate}
                    </table_1.TableCell>
                    <table_1.TableCell className=" py-2 px-4">
                      <div className="flex items-center lg:ml-[20%]">
                        <div>
                          <button_1.Button onClick={() => handleView(data.scheduleid)} className="bg-blue-600 ">
                            View
                          </button_1.Button>
                        </div>
                        <div>
                          <button_1.Button onClick={() => handleEdit(data.id)} className="bg-blue-600 ml-5">
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
      </div>
    </>);
}
