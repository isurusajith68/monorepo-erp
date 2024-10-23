"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Customerlist;
const button_1 = require("@/components/ui/button");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const select_1 = require("@/components/ui/select");
const table_1 = require("@/components/ui/table");
const react_1 = require("react");
const customer_actions_1 = require("./customer-actions");
const navigation_1 = require("next/navigation");
const use_toast_1 = require("@/components/ui/use-toast");
function Customerlist() {
    const [customers, setCustomers] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [selectedCustomerType, setselectedCustomerType] = (0, react_1.useState)('all');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        // get data from customer table
        (0, customer_actions_1.getAllData)().then((response) => {
            if (response.success) {
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setCustomers(sortedData);
            }
            else {
                console.log('error');
            }
        });
    }, []);
    //push to update customer page
    const handleEdit = (id) => {
        router.push(`/customers/${id}`);
    };
    // Real-time search filtering
    const filteredInvoices = customers.filter((customer) => {
        const matchesId = customer.id
            .toString()
            .toLowerCase()
            .includes(searchId.toLowerCase());
        const matchesName = customer.cname
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesProjectType = selectedCustomerType === 'all' ||
            customer.ctype.toLowerCase() === selectedCustomerType.toLowerCase();
        return matchesId && matchesName && matchesProjectType;
    });
    // customer delete function
    const deleteAction = async (id) => {
        if (id) {
            console.log(id);
            await (0, customer_actions_1.DeleteCus)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Customer',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            (0, customer_actions_1.getAllData)().then((response) => {
                if (response.success) {
                    const sortedData = response.data.sort((a, b) => b.id - a.id);
                    setCustomers(sortedData);
                }
                else {
                    console.log('error');
                }
            });
        }
    };
    return (<div>
      <div className="flex justify-between items-center pb-4 mt-16 ">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Customer List</p>
        </div>
        <div>
          <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={() => router.push('/customers/add')}>
            +Add new
          </button_1.Button>
        </div>
      </div>
      <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4 ml-2"/>
      <div className="px-10 py-8">
        <div className="flex mb-4">
          <input type="text" placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="mr-4 p-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="p-2 border border-gray-300 rounded"/>
          <select_1.Select onValueChange={(value) => setselectedCustomerType(value)} defaultValue="all">
            <select_1.SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
              <select_1.SelectValue placeholder="Select Project Type"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">All Customer Types</select_1.SelectItem>
              <select_1.SelectItem value="Person">Person</select_1.SelectItem>
              <select_1.SelectItem value="Company">Company</select_1.SelectItem>

              {/* Add more project types as needed */}
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        <table_1.Table className="rounded-xl overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center">
            <table_1.TableRow>
              <table_1.TableHead className="text-center">Customer ID</table_1.TableHead>
              <table_1.TableHead className="text-center">Customer Name</table_1.TableHead>
              <table_1.TableHead className="text-center">Customer Type</table_1.TableHead>
              <table_1.TableHead className="text-center">Phone Number</table_1.TableHead>
              <table_1.TableHead className="text-center">Email</table_1.TableHead>
              <table_1.TableHead className="text-left"> NIC/BRN</table_1.TableHead>
              <table_1.TableHead className="text-left"> Address</table_1.TableHead>
              <table_1.TableHead className="text-left"> Cus/Company Reg Date</table_1.TableHead>
              <table_1.TableHead className="text-left"> </table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>

          <table_1.TableBody className="bg-green-50">
            {filteredInvoices.map((invoice) => (<table_1.TableRow key={invoice.id}>
                <table_1.TableCell className="text-center">{invoice.id}</table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.cname}</table_1.TableCell>

                <table_1.TableCell className="text-center">{invoice.ctype}</table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.phone}</table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.email}</table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.nic}</table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {invoice.location}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.rdate}</table_1.TableCell>
                <table_1.TableCell className="text-center flex">
                  <button_1.Button className="bg-green-600 ml-5" onClick={() => handleEdit(invoice.id)} type="button">
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
                          delete your data and remove your data from our
                          servers.
                        </alert_dialog_1.AlertDialogDescription>
                      </alert_dialog_1.AlertDialogHeader>
                      <alert_dialog_1.AlertDialogFooter>
                        <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                        <alert_dialog_1.AlertDialogAction className="bg-red-600" onClick={() => deleteAction(invoice.id)}>
                          Delete
                        </alert_dialog_1.AlertDialogAction>
                      </alert_dialog_1.AlertDialogFooter>
                    </alert_dialog_1.AlertDialogContent>
                  </alert_dialog_1.AlertDialog>
                </table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>
      </div>
    </div>);
}
