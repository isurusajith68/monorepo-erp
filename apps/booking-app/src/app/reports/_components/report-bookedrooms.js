"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const react_router_dom_1 = require("react-router-dom");
const ReportBookedRooms = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Room Availability Summary</h1>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>
      <div className="mt-5 flex items-center ml-10 gap-8">
        <div>
          <h1>Search By Room Number</h1>
          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white w-60" placeholder=""/>
        </div>
        <div>
          <button_1.Button>Export Report</button_1.Button>
        </div>
        <div>
          <button_1.Button onClick={() => navigate('/reports/room-availability')}>
            Booked Rooms
          </button_1.Button>
        </div>
      </div>
      <div>
        <table_1.Table className="mt-6">
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead className="text-center">Room No</table_1.TableHead>
              <table_1.TableHead className="text-center">Room Type</table_1.TableHead>
              <table_1.TableHead className="text-center">Room View</table_1.TableHead>
              <table_1.TableHead className="text-center">Ro Price</table_1.TableHead>
              <table_1.TableHead className="text-center">BB Price</table_1.TableHead>
              <table_1.TableHead className="text-center">HB Price</table_1.TableHead>
              <table_1.TableHead className="text-center">FB Price</table_1.TableHead>
              {/* <TableHead className="text-center">Maintenance</TableHead> */}
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            <table_1.TableRow>
              <table_1.TableCell className="text-center">034</table_1.TableCell>
              <table_1.TableCell className="text-center">Deluxe</table_1.TableCell>
              <table_1.TableCell className="text-center">Ocean</table_1.TableCell>
              <table_1.TableCell className="text-center">2000 LKR</table_1.TableCell>
              <table_1.TableCell className="text-center">3000 LKR</table_1.TableCell>
              <table_1.TableCell className="text-center">6000 LKR</table_1.TableCell>
              <table_1.TableCell className="text-center">12000 LKR</table_1.TableCell>
              {/* <TableCell className="text-center">$250.00</TableCell> */}
            </table_1.TableRow>
          </table_1.TableBody>
        </table_1.Table>
      </div>
    </>);
};
exports.default = ReportBookedRooms;
