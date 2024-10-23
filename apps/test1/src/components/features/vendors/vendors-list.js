"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Customerlist;
const button_1 = require("@/components/ui/button");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const select_1 = require("@/components/ui/select");
const table_1 = require("@/components/ui/table");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const use_toast_1 = require("@/components/ui/use-toast");
const vendor_actions_1 = require("./vendor-actions");
function Customerlist() {
    const ITEMS_PER_PAGE = 20;
    const [vendors, setVendors] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [selectedvendorsendorType, setselectedVendorType] = (0, react_1.useState)('all');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        (0, vendor_actions_1.getAllData)().then((response) => {
            if (response.success) {
                //setVendors(response.data);
                const reversedData = response.data.reverse();
                setVendors(reversedData);
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const handleEdit = (id) => {
        router.push(`/vendors/${id}`);
    };
    const filteredVendors = vendors.filter((vendor) => {
        const matchesId = vendor.vendorid
            .toString()
            .toLowerCase()
            .includes(searchId.toLowerCase());
        const matchesName = vendor.vendorname
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesVendorType = selectedvendorsendorType === 'all' ||
            vendor.vendortype.toLowerCase() === selectedvendorsendorType.toLowerCase();
        return (matchesId && matchesName && matchesVendorType); /* 1. if this all true,return the current
                                                                   processing value to filteredVendors
                                                                  2.this all variables are boolean type variables
                                                                  3.this || is a just or operator and === also same
                                                                  4.filter method only pass passed value to the the
                                                                   filteredVendors
                                                                  5.filter method exermine the gave function and if pass the
                                                                  current value against to the function,then return value */
    });
    const deleteAction = async (id) => {
        if (id) {
            console.log(id);
            await (0, vendor_actions_1.DeleteVendor)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Vendor',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            (0, vendor_actions_1.getAllData)().then((response) => {
                if (response.success) {
                    const reversedData = response.data.reverse();
                    setVendors(reversedData);
                }
                else {
                    console.log('error');
                }
            });
        }
    };
    //...
    const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE);
    const paginatedVendors = filteredVendors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (<div>
      <div className="flex justify-between items-center pb-4 mt-16">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Vendor List</p>
        </div>
        <div>
          <button_1.Button className=" mr-12 bg-green-600" type="button" onClick={() => router.push('/vendors')}>
            Add new
          </button_1.Button>
        </div>
      </div>
      <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4 ml-2"/>
      <div className="px-10 py-8">
        <div className="flex mb-4">
          <input type="text" placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="mr-4 p-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="p-2 border border-gray-300 rounded"/>
          <select_1.Select onValueChange={(value) => setselectedVendorType(value)} defaultValue="all">
            <select_1.SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
              <select_1.SelectValue placeholder="Select Project Type"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">All Vendor Types</select_1.SelectItem>
              <select_1.SelectItem value="Person">Person</select_1.SelectItem>
              <select_1.SelectItem value="Company">Company</select_1.SelectItem>

              {/* Add more project types as needed */}
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        <table_1.Table className="rounded-xl overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center">
            <table_1.TableRow>
              <table_1.TableHead className="text-center">Vendor ID</table_1.TableHead>
              <table_1.TableHead className="text-center">Vendor Name</table_1.TableHead>
              <table_1.TableHead className="text-center">Vendor Type</table_1.TableHead>
              <table_1.TableHead className="text-center">Phone Number</table_1.TableHead>
              <table_1.TableHead className="text-center">Email</table_1.TableHead>

              <table_1.TableHead className="text-center"> Location</table_1.TableHead>

              <table_1.TableHead className="text-center">Action </table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>

          <table_1.TableBody className="bg-green-50">
            {filteredVendors.map((vendor) => (<table_1.TableRow key={vendor.vendorid}>
                <table_1.TableCell className="text-center">{vendor.vendorid}</table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {vendor.vendorname}
                </table_1.TableCell>

                <table_1.TableCell className="text-center">
                  {vendor.vendortype}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {vendor.phonenumber}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">{vendor.email}</table_1.TableCell>

                <table_1.TableCell className="text-center">
                  {vendor.vendoraddress}
                </table_1.TableCell>

                <table_1.TableCell className="flex justify-center">
                  <button_1.Button className="bg-green-600 ml-5" onClick={() => handleEdit(vendor.vendorid)} type="button">
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
                          delete your account and remove your data from our
                          servers.
                        </alert_dialog_1.AlertDialogDescription>
                      </alert_dialog_1.AlertDialogHeader>
                      <alert_dialog_1.AlertDialogFooter>
                        <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                        <alert_dialog_1.AlertDialogAction onClick={() => deleteAction(vendor.vendorid)}>
                          Continue
                        </alert_dialog_1.AlertDialogAction>
                      </alert_dialog_1.AlertDialogFooter>
                    </alert_dialog_1.AlertDialogContent>
                  </alert_dialog_1.AlertDialog>
                </table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-4">
          <Button
            className="mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className="ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div> */}
      </div>
    </div>);
}
