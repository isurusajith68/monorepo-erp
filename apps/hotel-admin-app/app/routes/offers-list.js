"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = loader;
exports.action = action;
exports.default = Offers;
const button_1 = require("~/components/ui/button");
const table_1 = require("~/components/ui/table");
const input_1 = require("~/components/ui/input");
const alert_dialog_1 = require("~/components/ui/alert-dialog");
const popover_1 = require("~/components/ui/popover");
const react_1 = require("react");
const label_1 = require("~/components/ui/label");
const react_2 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
async function loader({ request }) {
    const result = await db_server_1.client.query('SELECT * FROM hoteloffers');
    if (result.rows.length === 0) {
        return {};
    }
    else {
        return result.rows;
    }
}
async function action({ request }) {
    const formData = await request.formData();
    const id = formData.get('id');
    console.log('ssssssss', formData);
    if (id) {
        // DELETE request
        const query = `DELETE FROM hoteloffers WHERE id = $1`;
        await db_server_1.client.query(query, [id]);
        return (0, react_2.json)({
            success: true,
            message: 'Hotel room-type deleted successfully!',
        });
    }
    else {
        // INSERT request
        const offername = formData.get('offername');
        const discount = formData.get('discount');
        const startdate = formData.get('startdate');
        const enddate = formData.get('enddate');
        const hotelQuery = `INSERT INTO hoteloffers (offername, discount, startdate, enddate) VALUES ($1, $2, $3, $4)`;
        const values = [offername, discount, startdate, enddate];
        await db_server_1.client.query(hotelQuery, values);
        return (0, react_2.json)({
            success: true,
            message: 'Hotel room-type saved successfully!',
        });
    }
}
function Offers() {
    const navigate = (0, react_2.useNavigate)();
    const [isPopoverOpen, setIsPopoverOpen] = (0, react_1.useState)(false);
    const data = (0, react_2.useLoaderData)();
    const fetcher = (0, react_2.useFetcher)();
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Access form data using the FormData API
        const formElement = document.getElementById('myForm');
        const formData = new FormData(formElement);
        console.log(formData, 'hhhh');
        // Submit form data
        await fetcher.submit(formData, { method: 'post' });
        navigate(`/offers-list/`);
    };
    const handleEdit = (id) => {
        navigate(`/offers/${id}`);
    };
    return (<>
      <div className={`ml-[18.4%] h-screen mt-14 ${isPopoverOpen ? 'bg-blue-100' : ''}`}>
        <div className="ml-5 mt-2 text-xl font-semibold">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mt-12">Special Offer List</h1>
            <popover_1.Popover onOpenChange={(open) => setIsPopoverOpen(open)} open={isPopoverOpen}>
              <popover_1.PopoverTrigger asChild>
                <button_1.Button variant="outline" className="h-9 text-white bg-blue-400 hover:bg-blue-500 lg:ml-[70%]">
                  + Add Offer
                </button_1.Button>
              </popover_1.PopoverTrigger>
              <popover_1.PopoverContent className="lg:w-[180%] lg:-ml-[140%] lg:mt-[40%] h-full">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-xl leading-none">
                      Special Offer
                    </h4>
                  </div>
                  <div className="grid gap-2 mt-5">
                    <form method="post" id="myForm">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <div>
                          <label_1.Label>Offers Name</label_1.Label>
                          <input_1.Input name="offername" id="width" placeholder="Offer Name" className="col-span-2 h-10 border-2 border-blue-300"/>
                        </div>
                        <div>
                          <label_1.Label>Discount Percentage</label_1.Label>
                          <input_1.Input name="discount" id="width" placeholder="Discount Percentage" className="col-span-2 h-10 border-2 border-blue-300"/>
                        </div>
                        <div>
                          <label_1.Label>Start Date</label_1.Label>
                          <input_1.Input name="startdate" type="date" id="width" placeholder="Start Date" className="col-span-2 h-10 border-2 border-blue-300"/>
                        </div>
                        <div>
                          <label_1.Label>End Date</label_1.Label>
                          <input_1.Input name="enddate" type="date" id="width" placeholder="End Date" className="col-span-2 h-10 border-2 border-blue-300"/>
                        </div>
                      </div>
                    </form>
                    <div className="ml-[70%] mt-10">
                      <button_1.Button onClick={handleSubmit} className="text-white bg-blue-500 hover:bg-blue-400 ">
                        Add Offers
                      </button_1.Button>
                      <button_1.Button onClick={() => setIsPopoverOpen(false)} // Close popover when clicked
     className=" text-white bg-orange-500 hover:bg-orange-400 ml-8">
                        Close
                      </button_1.Button>
                    </div>
                  </div>
                </div>
              </popover_1.PopoverContent>
            </popover_1.Popover>
          </div>
          <hr className="bg-blue-400 h-0.5 mt-2"/>
        </div>

        <div className="overflow-x-auto mt-5 pl-12 pr-4  border-blue-300 w-[70%] ml-[15%]">
          <table_1.Table className="rounded-xl border border-blue-300 overflow-hidden">
            <table_1.TableHeader className="bg-blue-300 text-center border border-blue-300">
              <table_1.TableRow>
                <table_1.TableHead className="text-center px-4 py-2">ID </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Offer Name{' '}
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Discount
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  Start Date
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">
                  End Date
                </table_1.TableHead>
                <table_1.TableHead className="text-center px-4 py-2">Action</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody className="bg-blue-50">
              {data.map((data, index) => {
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
                      {data.id}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.offername}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {data.discount}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {formattedStartDate}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center px-4 py-2">
                      {formattedEndDate}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-center py-2 px-4">
                      <div className="flex items-center">
                        <div>
                          <button_1.Button onClick={() => handleEdit(data.id)} className="bg-blue-600 ml-24">
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
                  </table_1.TableRow>);
        })}
            </table_1.TableBody>
          </table_1.Table>
        </div>
      </div>
    </>);
}
