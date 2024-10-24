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
exports.default = BookingListPage;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
function BookingListPage() {
    const [booking, setBooking] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        // Fetch booking data from the backend
        const fetchBooking = async () => {
            try {
                // Make API request to get booking data by ID
                const response = await axios_1.default.get(`http://localhost:4000/allbookings`);
                if (response.data.success) {
                    // Reset the form with booking data
                    console.log('id', response.data.data);
                    const sortedData = response.data.data.sort((a, b) => b.id - a.id);
                    setBooking(sortedData);
                    // form.reset(response.data.data);
                }
                else {
                    console.error('booking not found:', response.data.msg);
                }
            }
            catch (error) {
                console.error('Error fetching booking:', error);
            }
        };
        fetchBooking();
    }, []);
    const handleEdit = (id) => {
        navigate(`/booking/${id}`);
    };
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
            <table_1.TableHead className="text-center">ID</table_1.TableHead>
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
        <table_1.TableBody className="bg-green-50">
          {booking.map((booking) => (<table_1.TableRow key={booking.id}>
              <table_1.TableCell className="text-center">{booking.id}</table_1.TableCell>
              <table_1.TableCell className="text-center">
                {booking.roomnumber}
              </table_1.TableCell>

              <table_1.TableCell className="text-center">{booking.checkin}</table_1.TableCell>
              <table_1.TableCell className="text-center">{booking.checkout}</table_1.TableCell>
              <table_1.TableCell className="text-center">{booking.telephone}</table_1.TableCell>
              <table_1.TableCell className="text-center">{booking.email}</table_1.TableCell>
              <table_1.TableCell className="text-center">
                {booking.adultcount}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {booking.childrencount}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {booking.bookingdate}
              </table_1.TableCell>
              <table_1.TableCell className="text-center flex">
                <button_1.Button className="bg-green-600 ml-5" onClick={() => handleEdit(booking.id)} type="button">
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
                        Are you absolutely sure?
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
