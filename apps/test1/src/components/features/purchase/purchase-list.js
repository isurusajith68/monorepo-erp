"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PurchaseList;
const button_1 = require("@/components/ui/button");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const table_1 = require("@/components/ui/table");
const react_1 = require("react");
const link_1 = require("next/link");
const navigation_1 = require("next/navigation");
const use_toast_1 = require("@/components/ui/use-toast");
const purchase_action_1 = require("./purchase-action");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const form_1 = require("@/components/ui/form");
const select_1 = require("@/components/ui/select");
const bank_action_1 = require("../bank/bank-action");
const project_action_1 = require("../projects/project-action");
const FormSchema = zod_2.z.object({
    purchaseaccount: zod_2.z.string().min(2, {
        message: 'Purchase account must be selected.',
    }),
    purchasemethod: zod_2.z.string().min(2, {
        message: 'Purchase method must be selected.',
    }),
    amount: zod_2.z.coerce.number().min(2, {
        message: 'Amount must be at least 2 characters.',
    }),
    purchasedate: zod_2.z.string().min(2, {
        message: 'Purchase date must be selected.',
    }),
    purchaseid: zod_2.z.number().optional(),
});
function PurchaseList() {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            purchaseaccount: 'Cash',
            purchasemethod: '',
            amount: 0,
            purchasedate: new Date().toISOString().split('T')[0],
            purchaseid: 0, // Default empty purchaseid
        },
    });
    const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    async function onSubmit(data) {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 10)}</code>
        //     </pre>
        //   ),
        // });
        //const id = getValues("purchaseno");
        const id = getValues('purchaseid');
        console.log('iddddddddd', id);
        if (id) {
            // let dirtyValues: any = {};
            // for (const key in dirtyFields) {
            //   if (key != "purchasedetails") {
            //     dirtyValues[key] = data[key];
            //   }
            // }
            // await updatePurchase(data, dirtyValues, id.toString());
            // toast({
            //   className: "text-blue-600",
            //   title: "Invoice",
            //   description: <span>Update successfully..</span>,
            //   duration: 5000,
            // });
            //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
            const objId = await (0, purchase_action_1.insertPurchasePayment)(data);
            setValue('purchaseno', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Payment',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
            form.reset();
            setIsOpen(false);
        }
        else {
            //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
            const objId = await (0, purchase_action_1.insertPurchasePayment)(data);
            setValue('purchaseno', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Payment',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
            form.reset();
            setIsOpen(false);
        }
    }
    const [invoicelist, setinvoicelist] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const [startDate, setStartDate] = (0, react_1.useState)('');
    const [endDate, setEndDate] = (0, react_1.useState)('');
    const [selectedProjectType, setSelectedProjectType] = (0, react_1.useState)('all');
    const [banks, setBanks] = (0, react_1.useState)([]);
    const [projects, setProjects] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const getCus = async () => {
            const cus = await (0, purchase_action_1.getAllData)();
            //setinvoicelist(cus.data); //set data to the usestate variable
            const reversedData = cus.data.reverse();
            setinvoicelist(reversedData);
        };
        getCus();
        (0, bank_action_1.SelectAllBank)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                console.log('reversedData', reversedData);
                setBanks(reversedData); // Set the reversed array to state
                console.log('banks', banks);
            }
            else {
                console.log('error');
            }
        });
        (0, project_action_1.SelectAllProjects)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                console.log(reversedData);
                setProjects(reversedData); // Set the reversed array to state
            }
            else {
                console.log('error');
            }
        });
    }, []);
    // function handleDelete(id: number) {
    //   const numID = Number(id);
    //   const objId = DeleteInvoice(numID);
    //   toast({
    //     className: "text-blue-600",
    //     title: "Delete",
    //     description: <span>Delete successfully..</span>,
    //     duration: 5000,
    //   });
    // }
    const deleteAction = async (id) => {
        if (id) {
            await (0, purchase_action_1.DeletePurchase)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Purchase',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            const getCus = async () => {
                const cus = await (0, purchase_action_1.getAllData)();
                setinvoicelist(cus.data); //set data to the usestate variable
            };
            getCus();
            router.push('/purchases/list');
        }
    };
    // Real-time search filtering
    const filteredInvoices = invoicelist.filter((purchase) => {
        const matchesId = purchase.purchaseid
            .toString()
            .toLowerCase()
            .includes(searchId.toLowerCase());
        const matchesName = purchase.sellername
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const purchaseDate = new Date(purchase.purchasedate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const matchesDate = (!start || purchaseDate >= start) && (!end || purchaseDate <= end);
        const matchesProjectType = selectedProjectType === 'all' ||
            purchase.purchasetype.toLowerCase() === selectedProjectType.toLowerCase();
        return matchesId && matchesName && matchesDate && matchesProjectType;
        //return matchesId && matchesName && matchesDate;
    });
    return (<div>
      <div className="flex justify-between items-center pb-4 mt-14">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Purchases Details</p>
        </div>
        <div>
          <button_1.Button className=" mr-10 bg-green-600" type="button" onClick={() => router.push('/purchases')}>
            +Add new
          </button_1.Button>
        </div>
      </div>
      <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4 ml-2"/>
      <div className="px-10 py-8">
        <div className="flex mb-4">
          <input type="text" placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="mr-4 p-2 border border-gray-300 rounded"/>
          <input type="text" placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="p-2 border border-gray-300 rounded"/>
          <div className="flex items-center ml-3">
            <p className="text-sm">Start Date</p>
            <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border border-gray-300 rounded ml-4"/>
          </div>
          <div className="flex items-center ml-3">
            <p className="text-sm">End Date</p>
            <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border border-gray-300 rounded ml-4"/>

            <select_1.Select onValueChange={(value) => setSelectedProjectType(value)} defaultValue="all">
              <select_1.SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2 ml-6">
                <select_1.SelectValue placeholder="Select Purchase Type"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="all">All Purchase Types</select_1.SelectItem>
                <select_1.SelectItem value="goods">Goods</select_1.SelectItem>
                <select_1.SelectItem value="services">Services</select_1.SelectItem>
                <select_1.SelectItem value="assets">Assets</select_1.SelectItem>
                <select_1.SelectItem value="utilities">Utilities</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>
        </div>
        <table_1.Table className="rounded-xl overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center">
            <table_1.TableRow>
              <table_1.TableHead className="text-center px-4 py-2">Status</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Purchase ID
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Purchase no
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Seller name
              </table_1.TableHead>
              {/* <TableHead className="text-center px-4 py-2">Seller type</TableHead> */}
              <table_1.TableHead className="text-center px-4 py-2">
                Purchase type
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">
                Purchase date
              </table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Due date</table_1.TableHead>
              {/* <TableHead className="text-center px-4 py-2">Currency</TableHead> */}
              <table_1.TableHead className="text-center px-4 py-2">Project</table_1.TableHead>
              <table_1.TableHead className="text-center px-4 py-2">Actions</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>

          <table_1.TableBody className="bg-green-50">
            {filteredInvoices.map((purchase) => (<table_1.TableRow key={purchase.purchaseid}>
                <table_1.TableCell className="text-center">
                  <p className="w-10 mx-auto text-center text-[10px] rounded-lg bg-red-100">
                    status
                  </p>
                </table_1.TableCell>

                <table_1.TableCell className="text-center">
                  {purchase.purchaseid}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {purchase.purchaseno}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {purchase.sellername}
                </table_1.TableCell>
                {/* <TableCell className="text-center">{purchase.sellertype}</TableCell> */}
                <table_1.TableCell className="text-center">
                  {purchase.purchasetype}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {purchase.purchasedate}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {purchase.duedate}
                </table_1.TableCell>
                {/* <TableCell className="text-center">{purchase.currency}</TableCell> */}

                {/* <TableCell className="text-center">
              {projects.map((project) => (

                <TableCell className="text-center">
                  {project.pid==purchase.project&&project.pname
                  // project.pid==purchase.project?project.pname:"None"
                  
                  }
                  </TableCell>
             
              ))}
              </TableCell> */}

                <table_1.TableCell className="text-center">
                  {purchase.pname ? purchase.pname : 'None'}
                </table_1.TableCell>

                <table_1.TableCell className="text-center flex items-center">
                  <link_1.default className="font-bold text-slate-500 text-[10px]" href={`/purchases/viewpurchase/${purchase.purchaseid}`}>
                    View Details
                  </link_1.default>

                  {/* <Button
              className="bg-green-600 ml-2 text-[10px] h-6 w-4"
              onClick={() => {
                router.push(`/purchases/${purchase.purchaseid}`);
              }}
              type="button"
            >
              Edit
            </Button> */}

                  <button_1.Button className="bg-green-600 ml-2 " onClick={() => {
                router.push(`/purchases/${purchase.purchaseid}`);
            }} type="button">
                    Edit
                  </button_1.Button>

                  {/* /////////////////////////////////////////////////////////////////////////////////// */}

                  <dialog_1.Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <dialog_1.DialogTrigger asChild>
                      <button_1.Button className="bg-green-600 ml-2 " type="button" onClick={() => {
                setIsOpen(true);
                setValue('purchaseid', purchase.purchaseid);
            }}>
                        Record a Payment
                      </button_1.Button>
                    </dialog_1.DialogTrigger>
                    <dialog_1.DialogContent className="sm:max-w-[425px]">
                      <dialog_1.DialogHeader>
                        <dialog_1.DialogTitle>Record a Payment</dialog_1.DialogTitle>
                      </dialog_1.DialogHeader>
                      <div className="flex-row gap-4 py-4">
                        <div className=" items-center gap-4">
                          <form_1.Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <form_1.FormField control={form.control} name="purchasemethod" render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormLabel className="">
                                      Purchase Method
                                    </form_1.FormLabel>
                                    <form_1.FormControl>
                                      <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                          <select_1.SelectValue placeholder="Select a purchase method"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                          <select_1.SelectItem value="card">
                                            Card
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="cash">
                                            Cash
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="online">
                                            Online
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="cheque">
                                            Cheque
                                          </select_1.SelectItem>
                                        </select_1.SelectContent>
                                      </select_1.Select>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>

                              <form_1.FormField control={form.control} name="purchaseaccount" render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormLabel className="">
                                      Purchase Account
                                    </form_1.FormLabel>
                                    <form_1.FormControl>
                                      <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                          <select_1.SelectValue placeholder="Select a purchase account"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                          <select_1.SelectItem value="Cash">
                                            Cash
                                          </select_1.SelectItem>

                                          {banks.map((bank) => (<select_1.SelectItem key={bank.id} value={`${bank.bname} `}>
                                              {bank.bname}
                                            </select_1.SelectItem>))}
                                        </select_1.SelectContent>
                                      </select_1.Select>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>

                              <form_1.FormField control={form.control} name="amount" render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormLabel className="">Amount</form_1.FormLabel>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" {...field}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>

                              {/* <FormField
              control={form.control}
              name="purchaseid"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Purchaseid</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded border-2 border-green-600/40"
                      placeholder=""
                      {...field}
                      value={purchase.purchaseid}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

                              <form_1.FormField control={form.control} name="purchasedate" render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormLabel className="">
                                      purchase Date
                                    </form_1.FormLabel>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" type="date" {...field}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>

                              <button_1.Button className="bg-green-600 w-[80px]" type="submit">
                                Pay
                              </button_1.Button>
                            </form>
                          </form_1.Form>
                        </div>
                      </div>
                    </dialog_1.DialogContent>
                  </dialog_1.Dialog>

                  {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                  <alert_dialog_1.AlertDialog>
                    <alert_dialog_1.AlertDialogTrigger>
                      <button_1.Button className="ml-2 bg-green-600 bg-destructive ">
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
                        <alert_dialog_1.AlertDialogAction onClick={() => deleteAction(purchase.purchaseid)}>
                          Continue
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
