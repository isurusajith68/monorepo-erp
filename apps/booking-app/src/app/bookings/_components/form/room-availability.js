"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("@/components/ui/table");
const react_router_dom_1 = require("react-router-dom");
const select_1 = require("@/components/ui/select");
const queries_1 = require("@/app/roomdetails/_services/queries");
const react_1 = require("react");
const queries_2 = require("../../_services/queries");
const AvailableRooms = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { data, isLoading } = (0, queries_1.useGetAllRoomDetails)();
    const { data: test } = (0, queries_2.useGetAllRoomBooking)();
    const [selectedRooms, setSelectedRooms] = (0, react_1.useState)([]);
    console.log('pasindu', data);
    console.log('pasinduuuuuuuuuuuuuuu', test);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (<>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Room Availability List</h1>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>
      <div className="mt-5 flex items-center ml-10 gap-8">
        <div>
          <select_1.Select>
            <h1 className="mb-2">Room View</h1>
            <select_1.SelectTrigger className="w-[180px] border-2 border-green-300">
              <select_1.SelectValue placeholder="Select"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="ocean">Ocean</select_1.SelectItem>
              <select_1.SelectItem value="street">Street</select_1.SelectItem>
              <select_1.SelectItem value="pool">Pool</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          {/* <h1>Search By Room Number</h1>
        <Input
          type="text"
          className="rounded border-2 border-green-600 bg-white w-60"
          placeholder=""
        /> */}
        </div>
        <div>
          <select_1.Select>
            <h1 className="mb-2">Room Type</h1>
            <select_1.SelectTrigger className="w-[180px] border-2 border-green-300">
              <select_1.SelectValue placeholder="Select"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="normal">Normal</select_1.SelectItem>
              <select_1.SelectItem value="standard">Standard</select_1.SelectItem>
              <select_1.SelectItem value="deluxe">Deluxe</select_1.SelectItem>
              <select_1.SelectItem value="suite">Suite</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          {/* <Button>Export Report</Button> */}
        </div>
        <div>
          <select_1.Select>
            <h1 className="mb-2">Room Price</h1>
            <select_1.SelectTrigger className="w-[180px] border-2 border-green-300">
              <select_1.SelectValue placeholder="Select"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="RO">RO Price</select_1.SelectItem>
              <select_1.SelectItem value="BB">BB Price</select_1.SelectItem>
              <select_1.SelectItem value="HB">HB Price</select_1.SelectItem>
              <select_1.SelectItem value="FB">FB Price</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          {/* <Button onClick={() => navigate('/reports/booked-rooms')}>
          Room Availability
        </Button> */}
        </div>
        <div>
          <h1 className="mb-2 ">End Date</h1>
          <input type="date" placeholder="End Date" className="p-2  rounded ml-4 border-2 border-green-300"/>
        </div>
      </div>
      <div>
        <table_1.Table className="mt-6">
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead className="text-center">Room No</table_1.TableHead>
              <table_1.TableHead className="text-center">Room Type</table_1.TableHead>
              <table_1.TableHead className="text-center">Room View</table_1.TableHead>
              <table_1.TableHead className="text-center">Selected Price</table_1.TableHead>
              <table_1.TableHead className="text-center">Price</table_1.TableHead>
              <table_1.TableHead className="text-center">Maintenance</table_1.TableHead>
              {/* <TableHead className="text-center">FB Price</TableHead> */}
              {/* <TableHead className="text-center">Maintenance</TableHead> */}
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            {data?.map((room) => (<table_1.TableRow>
                <table_1.TableCell className="text-center">{room.roomnumber}</table_1.TableCell>
                <table_1.TableCell className="text-center">{room.roomtype}</table_1.TableCell>
                <table_1.TableCell className="text-center">{room.roomview}</table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {room.selectedprice}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">{room.price}</table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {room.maintenance || 'none'}
                </table_1.TableCell>
                {/* <TableCell className="text-center">Credit Card</TableCell> */}
                {/* <TableCell className="text-center">$250.00</TableCell> */}
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>

        <div className="border-2 border-red-700 mb-40">
          <p>Select Rooms</p>
          <div className="grid grid-cols-3 gap-2 border-2 border-green-300 items-center justify-center">
            {test.map((te) => (<div className="border-2 border-green-300 h-20">
                {te.roomtype}
              </div>))}
            {/* <div className='border-2 border-green-300 h-20'>helo</div>
        <div className='border-2 border-green-300 h-20'>hello</div> */}
          </div>
        </div>
      </div>
      {/* Add BookingForm with selectedRooms */}
    </>);
};
exports.default = AvailableRooms;
