"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BanksList;
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const react_1 = require("react");
const bank_action_1 = require("./bank-action");
const navigation_1 = require("next/navigation");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
const select_1 = require("@/components/ui/select");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_alert_dialog_1 = require("@radix-ui/react-alert-dialog");
function BanksList() {
    const [bank, setBank] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const [searchType, setSearchType] = (0, react_1.useState)('all');
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        (0, bank_action_1.SelectAllBank)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setBank(reversedData); // Set the reversed array to state
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const handleEdit = (id) => {
        router.push(`/bank/${id}`);
    };
    const deleteAction = async (id) => {
        if (id) {
            await (0, bank_action_1.DeleteBank)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Bank',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            (0, bank_action_1.SelectAllBank)().then((response) => {
                if (response.success) {
                    console.log(response.data);
                    setBank(response.data);
                }
                else {
                    console.log('error');
                }
            });
            router.push('/bank');
        }
    };
    const AddNew = () => {
        router.push(`/bank/add`);
    };
    //search project
    const handleSearchChangeID = (e) => {
        setSearchId(e.target.value);
    };
    const handleSearchChangeName = (e) => {
        setSearchName(e.target.value);
    };
    const filteredBank = bank.filter((bank) => {
        // Check if the project type matches the search type or if "all" is selected
        const matchesProjectType = searchType === 'all' ||
            bank.acctype.toLowerCase() === searchType.toLowerCase();
        // Check if the project ID, name, and date match the search criteria
        const matchesSearchCriteria = bank.accnumber.toString().includes(searchId) &&
            bank.oname.toLowerCase().includes(searchName.toLowerCase());
        // Return true only if all conditions are met
        return matchesProjectType && matchesSearchCriteria;
    });
    //...
    return (<>
      <div className="ml-5 mt-20 text-xl font-semibold">
        <div className="flex items-center ">
          <h1 className="text-3xl font-bold ">Bank Accounts</h1>
          <button_1.Button onClick={AddNew} type="button" className="h-9 text-white bg-green-600 lg:ml-[70%]">
            +Add New
          </button_1.Button>
        </div>
        <hr className="bg-green-400 h-0.5 mt-2"/>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="relative flex flex-col-4 gap-16 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[80%]">
            <div className="flex flex-col-2 gap-3 lg:w-[70%] ">
              <label className="font-extralight text-sm mt-2 w-24">
                Acc-No.
              </label>
              <input_1.Input type="search" className="pl-3 pr-3 py-2 border border-gray-300 " placeholder="" value={searchId} onChange={handleSearchChangeID}/>
            </div>
            {/* <div className="flex flex-col-2 gap-3 lg:w-[80%] ">
          <label className="font-extralight text-sm mt-2">Owner Name</label>
          <Input
            type="search"
            className="pl-8 pr-3 py-2 border border-gray-300 "
            placeholder=""
            value={searchName}
            onChange={handleSearchChangeName}
          />
        </div>
        */}
            <div className="flex flex-col-2 gap-1 lg:w-[100%] ">
              <label className="font-extralight text-sm mt-2 lg:w-[30%]">
                Acc-Type
              </label>
              <select_1.Select onValueChange={(value) => setSearchType(value)} defaultValue="all">
                <select_1.SelectTrigger className="w-[200px]  border-2 border-gray-300 ml-2">
                  <select_1.SelectValue placeholder="Select Project Type"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="all">All Types</select_1.SelectItem>
                  <select_1.SelectItem value="Current">Current</select_1.SelectItem>
                  <select_1.SelectItem value="Savings">Savings</select_1.SelectItem>

                  {/* Add more project types as needed */}
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 pl-12 pr-4  border-green-300">
        <table_1.Table className="rounded-xl border border-green-300 overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center border border-green-300">
            <table_1.TableRow>
              <table_1.TableHead className="text-center px-4 py-2">
                Account ID
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Bank Name</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Account Type
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Account Branch
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Account Number
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Current Amount
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Action</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody className="bg-green-50">
            {filteredBank.map((bank, index) => (<table_1.TableRow key={index} className="hover:bg-green-100">
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.id}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.bname}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.acctype}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.accbranch}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.accnumber}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  {bank.camount}
                </table_1.TableCell>
                <table_1.TableCell className="text-center px-4 py-2">
                  <div className="flex gap-5 ml-2">
                    <div>
                      <button_1.Button onClick={() => handleEdit(bank.id)} className="bg-green-600">
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
                            <alert_dialog_1.AlertDialogAction onClick={() => deleteAction(bank.id)}>
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
