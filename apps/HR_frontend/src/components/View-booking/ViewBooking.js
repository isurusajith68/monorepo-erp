"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewBooking;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
function ViewBooking() {
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Booking</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <button_1.Button>View List</button_1.Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <table_1.Table className="rounded-xl overflow-hidden mt-10">
        <table_1.TableHeader className="bg-green-300 text-center">
          <table_1.TableRow>
            <table_1.TableHead className="text-center">Room No</table_1.TableHead>
            <table_1.TableHead className="text-center">Check In</table_1.TableHead>
            <table_1.TableHead className="text-center">Check Out </table_1.TableHead>
            <table_1.TableHead className="text-center">Telephone</table_1.TableHead>
            <table_1.TableHead className="text-center">Email</table_1.TableHead>
            <table_1.TableHead className="text-center">Adult Count</table_1.TableHead>
            <table_1.TableHead className="text-center">Children Count</table_1.TableHead>
            <table_1.TableHead className="text-center">Booking Date</table_1.TableHead>
            <table_1.TableHead className="text-center"> </table_1.TableHead>
          </table_1.TableRow>
        </table_1.TableHeader>
        <table_1.TableBody>
          <table_1.TableRow>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
            <table_1.TableCell className="text-center"></table_1.TableCell>
          </table_1.TableRow>
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
