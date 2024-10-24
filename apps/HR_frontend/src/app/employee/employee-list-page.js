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
exports.default = EmployeeListPage;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
function EmployeeListPage() {
    const [Employee, setEmployee] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Fetch booking data from the backend
    const fetchEmployee = async () => {
        try {
            // Make API request to get booking data by ID
            const response = await axios_1.default.get(`http://localhost:4000/getAllemployees`);
            if (response.data.success) {
                // Reset the form with booking data
                console.log('id', response.data.data);
                const sortedData = response.data.data.sort((a, b) => b.id - a.id);
                setEmployee(sortedData);
                // form.reset(response.data.data);
            }
            else {
                console.error('employee not found:', response.data.msg);
            }
        }
        catch (error) {
            console.error('Error fetching booking:', error);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchEmployee();
    }, []);
    const handleEdit = (id) => {
        navigate(`/employee/${id}`);
    };
    return (<div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">View Employee</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <button_1.Button onClick={() => navigate('/employee/add')}>Add New</button_1.Button>
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      <table_1.Table className="mt-10 overflow-hidden rounded-xl">
        <table_1.TableHeader className="text-center bg-green-300">
          <table_1.TableRow>
            <table_1.TableHead className="text-center">ID</table_1.TableHead>
            <table_1.TableHead className="text-center">Name</table_1.TableHead>
            <table_1.TableHead className="text-center">Email</table_1.TableHead>
            <table_1.TableHead className="text-center">Mobile</table_1.TableHead>
            <table_1.TableHead className="text-center">Designation</table_1.TableHead>
            <table_1.TableHead className="text-center">Department</table_1.TableHead>
            <table_1.TableHead className="text-center">Hire Date</table_1.TableHead>
            <table_1.TableHead className="text-center">Address</table_1.TableHead>
            <table_1.TableHead className="text-center">Salary</table_1.TableHead>
            <table_1.TableHead className="text-center">Status </table_1.TableHead>
            <table_1.TableHead className="text-center"></table_1.TableHead>
          </table_1.TableRow>
        </table_1.TableHeader>
        <table_1.TableBody className="bg-green-50">
          {Employee.map((employees) => (<table_1.TableRow key={employees.id}>
              <table_1.TableCell className="text-center">{employees.id}</table_1.TableCell>
              <table_1.TableCell className="text-center">{employees.emname}</table_1.TableCell>

              <table_1.TableCell className="text-center">{employees.ememail}</table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emmobile}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emdesignation}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emdepartment}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {' '}
                {employees.emhiredate}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emaddress}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emsalary}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {employees.emstatus}
              </table_1.TableCell>

              <table_1.TableCell className="flex text-center">
                <button_1.Button className="ml-5 bg-green-600" onClick={() => handleEdit(employees.id)} type="button">
                  Edit
                </button_1.Button>

                <alert_dialog_1.AlertDialog>
                  <alert_dialog_1.AlertDialogTrigger>
                    <button_1.Button className="ml-5 bg-green-600 bg-destructive">
                      Delete
                    </button_1.Button>
                  </alert_dialog_1.AlertDialogTrigger>
                  <alert_dialog_1.AlertDialogContent>
                    <alert_dialog_1.AlertDialogHeader>
                      <alert_dialog_1.AlertDialogTitle>
                        Are you sure you want to delete this employee?
                      </alert_dialog_1.AlertDialogTitle>
                      <alert_dialog_1.AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data and remove your data from our servers.
                      </alert_dialog_1.AlertDialogDescription>
                    </alert_dialog_1.AlertDialogHeader>
                    <alert_dialog_1.AlertDialogFooter>
                      <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                      <alert_dialog_1.AlertDialogAction className="bg-red-600">
                        Delete
                      </alert_dialog_1.AlertDialogAction>
                    </alert_dialog_1.AlertDialogFooter>
                  </alert_dialog_1.AlertDialogContent>
                </alert_dialog_1.AlertDialog>
              </table_1.TableCell>
            </table_1.TableRow>))}
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
