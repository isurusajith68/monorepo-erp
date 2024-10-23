"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReciptsList;
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_alert_dialog_1 = require("@radix-ui/react-alert-dialog");
const react_1 = require("react");
const recipt_action_1 = require("./recipt-action");
const navigation_1 = require("next/navigation");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
function ReciptsList() {
    const [reciept, setReciept] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const [searchType, setSearchType] = (0, react_1.useState)('all');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        (0, recipt_action_1.SelectAllRecipts)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                console.log(reversedData);
                setReciept(reversedData); // Set the reversed array to state
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const handleEdit = (id) => {
        router.push(`/reciepts/${id}`);
    };
    const deleteAction = async (id) => {
        if (id) {
            await (0, recipt_action_1.DeleteRecipts)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Reciept',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            (0, recipt_action_1.SelectAllRecipts)().then((response) => {
                if (response.success) {
                    console.log(response.data);
                    setReciept(response.data);
                }
                else {
                    console.log('error');
                }
            });
            router.push('/reciepts');
        }
    };
    const AddNew = () => {
        router.push(`/reciepts/add`);
    };
    //search project
    const handleSearchChangeID = (e) => {
        setSearchId(e.target.value);
    };
    const handleSearchChangeName = (e) => {
        setSearchName(e.target.value);
    };
    const handleSearchChangeType = (e) => {
        setSearchType(e.target.value);
    };
    const filteredRecipts = reciept.filter((reciept) => {
        // Check if the project type matches the search type or if "all" is selected
        const matchesProjectType = searchType === 'all' ||
            reciept.project.toLowerCase() === searchType.toLowerCase();
        // Check if the project ID, name, and date match the search criteria
        const matchesSearchCriteria = reciept.id.toString().includes(searchId) &&
            reciept.name.toLowerCase().includes(searchName.toLowerCase());
        // Return true only if all conditions are met
        return matchesProjectType && matchesSearchCriteria;
    });
    //...
    return (<>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex">
          <h1 className="text-3xl font-bold pb-3">Reciepts</h1>
          <button_1.Button onClick={AddNew} type="button" className="lg:ml-[80%]  h-9 text-white bg-green-600">
            +Add New
          </button_1.Button>
        </div>
        <hr className="bg-green-400 h-0.5"/>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2">No</label>
              <input_1.Input type="search" className="pl-3 pr-3 py-2 border border-gray-300 rounded-2xl" placeholder="" value={searchId} onChange={handleSearchChangeID}/>
            </div>
            <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
              <label className="font-extralight text-sm mt-2">Name</label>
              <input_1.Input type="search" className="pl-8 pr-3 py-2 border border-gray-300 rounded-2xl" placeholder="" value={searchName} onChange={handleSearchChangeName}/>
            </div>
            {/*   <div className="flex flex-col-2 gap-1 lg:w-[100%] ">
          <label className="font-extralight text-sm mt-2 lg:w-[30%]">
            P-Type
          </label>
          <Select
            onValueChange={(value) => setSearchType(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[200px] rounded-2xl border-2 border-gray-300 ml-2">
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Wedding">Wedding</SelectItem>
              <SelectItem value="Company">Company</SelectItem>

               Add more project types as needed
            </SelectContent>
          </Select>
        </div>*/}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4  border-green-300">
        <table_1.Table className="rounded-xl border border-green-300 overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center border border-green-300">
            <table_1.TableRow>
              <table_1.TableHead className="text-center px-4 py-2">Recipt ID</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Recipt No</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Name</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Phone Number
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Email</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Payment Method
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Amount</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Bank Account
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Project</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Action</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody className="bg-green-50">
            {filteredRecipts.map((reciept, index) => (<table_1.TableRow key={index} className="hover:bg-green-100">
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.id}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.rno}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.name}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.pnumber}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.email}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.pmethod}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.amount}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.baccount}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {reciept.project}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <button_1.Button onClick={() => handleEdit(reciept.id)} className="bg-green-600">
                        Edit
                      </button_1.Button>
                    </div>
                    <div>
                      <alert_dialog_1.AlertDialog>
                        <react_alert_dialog_1.AlertDialogTrigger>
                          <button_1.Button className="ml-5 bg-green-600 bg-destructive">
                            Delete
                          </button_1.Button>
                        </react_alert_dialog_1.AlertDialogTrigger>
                        <alert_dialog_1.AlertDialogContent>
                          <alert_dialog_1.AlertDialogHeader>
                            <alert_dialog_1.AlertDialogTitle>
                              Are you absolutely sure?
                            </alert_dialog_1.AlertDialogTitle>
                            <alert_dialog_1.AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </alert_dialog_1.AlertDialogDescription>
                          </alert_dialog_1.AlertDialogHeader>
                          <alert_dialog_1.AlertDialogFooter>
                            <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                            <alert_dialog_1.AlertDialogAction onClick={() => deleteAction(reciept.id)}>
                              Continue
                            </alert_dialog_1.AlertDialogAction>
                          </alert_dialog_1.AlertDialogFooter>
                        </alert_dialog_1.AlertDialogContent>
                      </alert_dialog_1.AlertDialog>
                    </div>
                  </div>
                </table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>
      </div>
    </>);
}
