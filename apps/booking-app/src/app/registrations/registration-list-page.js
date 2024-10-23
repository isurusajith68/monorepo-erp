"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_1 = require("react");
const axios_1 = require("axios");
const react_router_dom_1 = require("react-router-dom");
const use_toast_1 = require("@/hooks/use-toast");
const RegistrationListPage = () => {
    const { toast } = (0, use_toast_1.useToast)();
    const [registration, setRegistration] = (0, react_1.useState)([]);
    //   const [searchId, setSearchId] = useState("");
    //   const [selectedCustomerType, setselectedCustomerType] = useState("all");
    //   const [searchName, setSearchName] = useState("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const fetchRegistration = async () => {
        try {
            // Make API request to get registration data by ID
            const response = await axios_1.default.get(`http://localhost:4000/allregistration`);
            if (response.data.success) {
                // Reset the form with registration data
                console.log('id', response.data.data);
                const sortedData = response.data.data.sort((a, b) => b.id - a.id);
                setRegistration(sortedData);
                // form.reset(response.data.data);
            }
            else {
                console.error('Registration not found:', response.data.msg);
            }
        }
        catch (error) {
            console.error('Error fetching registration:', error);
        }
    };
    (0, react_1.useEffect)(() => {
        // Fetch registration data from the backend
        fetchRegistration();
    }, []);
    const handleEdit = (id) => {
        navigate(`/registration/${id}`);
    };
    //   const filteredInvoices = customers.filter((customer: any) => {
    //     const matchesId = customer.id
    //       .toString()
    //       .toLowerCase()
    //       .includes(searchId.toLowerCase());
    //     const matchesName = customer.cname
    //       .toLowerCase()
    //       .includes(searchName.toLowerCase());
    //     const matchesProjectType =
    //       selectedCustomerType === "all" ||
    //       customer.ctype.toLowerCase() === selectedCustomerType.toLowerCase();
    //     return matchesId && matchesName && matchesProjectType;
    //   });
    // customer delete function
    const deleteAction = async (id) => {
        if (id) {
            try {
                console.log('Deleting registration with id:', id);
                // Make the DELETE request to the backend API
                await axios_1.default.delete(`http://localhost:4000/deleteregistration/${id}`);
                // Show success toast notification
                toast({
                    className: 'text-red-600',
                    title: 'Registration',
                    description: <span>Deleted successfully..</span>,
                    duration: 3000,
                });
                fetchRegistration();
            }
            catch (error) {
                // Handle any error that occurs during the delete process
                console.error('Error deleting registration:', error);
                toast({
                    className: 'text-red-600',
                    title: 'Error',
                    description: <span>Failed to delete the registration..</span>,
                    duration: 3000,
                });
            }
        }
    };
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">View Registration</h1>
        {/* <NavLink to={'list'}>View List</NavLink> */}
        <button_1.Button onClick={() => navigate('/registration/add')} className="bg-green-600">
          + Add
        </button_1.Button>
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <table_1.Table className="rounded-xl overflow-hidden mt-10">
        <table_1.TableHeader className="bg-green-300 text-center">
          <table_1.TableRow>
            <table_1.TableHead className="text-center">ID</table_1.TableHead>
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
        <table_1.TableBody className="bg-green-50">
          {registration.map((registration) => (<table_1.TableRow key={registration.id}>
              <table_1.TableCell className="text-center">{registration.id}</table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.fullname}
              </table_1.TableCell>

              <table_1.TableCell className="text-center">
                {registration.address}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">{registration.city}</table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.province}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.country}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.postalcode}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.email}
              </table_1.TableCell>
              <table_1.TableCell className="text-center">
                {registration.telephone}
              </table_1.TableCell>
              <table_1.TableCell className="text-center flex">
                <button_1.Button className="bg-green-600 ml-5" onClick={() => handleEdit(registration.id)} type="button">
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
                      <alert_dialog_1.AlertDialogAction className="bg-red-600" onClick={() => deleteAction(registration.id)}>
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
};
exports.default = RegistrationListPage;
