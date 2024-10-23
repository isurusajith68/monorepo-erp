"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewRegistration;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
function ViewRegistration() {
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Registration</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <button_1.Button>View List</button_1.Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <table_1.Table className="rounded-xl overflow-hidden mt-10">
        <table_1.TableHeader className="bg-green-300 text-center">
          <table_1.TableRow>
            <table_1.TableHead className="text-center">Full Name</table_1.TableHead>
            <table_1.TableHead className="text-center">Address</table_1.TableHead>
            <table_1.TableHead className="text-center">City </table_1.TableHead>
            <table_1.TableHead className="text-center">Province</table_1.TableHead>
            <table_1.TableHead className="text-center">Country</table_1.TableHead>
            <table_1.TableHead className="text-center"> Postal Code</table_1.TableHead>
            <table_1.TableHead className="text-center"> Email</table_1.TableHead>
            <table_1.TableHead className="text-center"> Telephone</table_1.TableHead>
            <table_1.TableHead className="text-center">Status </table_1.TableHead>
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
