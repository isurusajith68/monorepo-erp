"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Invoicelist;
const button_1 = require("@/components/ui/button");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const table_1 = require("@/components/ui/table");
const form_1 = require("@/components/ui/form");
const select_1 = require("@/components/ui/select");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const invoice_action_1 = require("./invoice-action");
const use_toast_1 = require("@/components/ui/use-toast");
const zod_1 = require("zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("@hookform/resolvers/zod");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const bank_action_1 = require("../bank/bank-action");
const FormSchema = zod_1.z.object({
    paymeth: zod_1.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    amount: zod_1.z.coerce.number().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    pdate: zod_1.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    paccount: zod_1.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    invoiceid: zod_1.z.number().optional(),
});
function Invoicelist() {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            paymeth: '', // Set an appropriate default value
            amount: 0,
            pdate: new Date().toISOString().split('T')[0],
            paccount: '', // Set an appropriate default value
        },
    });
    const [invoicelist, setinvoicelist] = (0, react_1.useState)([]);
    const [searchId, setSearchId] = (0, react_1.useState)('');
    const [searchName, setSearchName] = (0, react_1.useState)('');
    const router = (0, navigation_1.useRouter)();
    const [open, setOpen] = (0, react_1.useState)(false);
    const [startDate, setStartDate] = (0, react_1.useState)('');
    const [endDate, setEndDate] = (0, react_1.useState)('');
    const [selectedProjectType, setSelectedProjectType] = (0, react_1.useState)('all');
    const [accountDisabled, setAccountDisabled] = (0, react_1.useState)(false);
    const [banks, setBanks] = (0, react_1.useState)([]);
    const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    async function onSubmit(data) {
        const id = getValues('id');
        if (id) {
            let dirtyValues = {};
            for (const key in dirtyFields) {
                dirtyValues[key] = data[key];
            }
            await (0, invoice_action_1.updateInvoiceReceipt)(dirtyValues, id.toString());
        }
        else {
            data.invoiceid = getValues('invoiceid'); // Ensure invoiceid is set
            const objId = await (0, invoice_action_1.insertInvoiceReceipt)(data);
            setValue('id', objId.lastInsertRowid, { shouldDirty: false });
        }
        (0, use_toast_1.toast)({
            className: 'text-blue-600',
            title: 'Payment',
            description: <span>Recorded successfully..</span>,
            duration: 2000,
        });
        // Close the dialog
        setOpen(false);
        // Reset form values
        form.reset();
    }
    (0, react_1.useEffect)(() => {
        const getCus = async () => {
            const cus = await (0, invoice_action_1.getAllData)();
            const sortedData = cus.data.sort((a, b) => b.invoiceid - a.invoiceid);
            setinvoicelist(sortedData); //set data to the usestate variable
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
    }, []);
    const deleteAction = async (id) => {
        if (id) {
            await (0, invoice_action_1.DeleteInvoice)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Invoice',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            const getCus = async () => {
                const cus = await (0, invoice_action_1.getAllData)();
                const sortedData = cus.data.sort((a, b) => b.invoiceid - a.invoiceid);
                setinvoicelist(sortedData);
            };
            getCus();
            router.push('/invoices/list');
        }
    };
    const filteredInvoices = invoicelist.filter((invoice) => {
        const matchesId = invoice.invoiceid
            .toString()
            .toLowerCase()
            .includes(searchId.toLowerCase());
        const matchesName = invoice.customername
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const invoiceDate = new Date(invoice.invoicedate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const matchesDate = (!start || invoiceDate >= start) && (!end || invoiceDate <= end);
        const matchesProjectType = selectedProjectType === 'all' ||
            invoice.itype.toLowerCase() === selectedProjectType.toLowerCase();
        return matchesId && matchesName && matchesDate && matchesProjectType;
    });
    return (<div>
      <div className="flex justify-between items-center pb-4 mt-16">
        <div>
          <p className="text-xl font-bold pb-6 pt-6 ml-5">Invoice Details</p>
        </div>
        <div>
          <button_1.Button className=" mr-16 bg-green-600" type="button" onClick={() => router.push('/invoices/add')}>
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
            <p>Start Date</p>
            <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border border-gray-300 rounded ml-4"/>
          </div>
          <div className="flex items-center ml-3">
            <p>End Date</p>
            <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border border-gray-300 rounded ml-4"/>
            <select_1.Select onValueChange={(value) => setSelectedProjectType(value)} defaultValue="all">
              <select_1.SelectTrigger className="w-[200px] rounded border-2 border-gray-300 ml-2">
                <select_1.SelectValue placeholder="Select Project Type"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="all">All Invoice Types</select_1.SelectItem>
                <select_1.SelectItem value="Person">Person</select_1.SelectItem>
                <select_1.SelectItem value="Company">Company</select_1.SelectItem>

                {/* Add more project types as needed */}
              </select_1.SelectContent>
            </select_1.Select>
          </div>
        </div>
        <table_1.Table className="rounded-xl overflow-hidden">
          <table_1.TableHeader className="bg-green-300 text-center">
            <table_1.TableRow>
              <table_1.TableHead className="text-center">Status </table_1.TableHead>
              <table_1.TableHead className="text-center">Invoice ID</table_1.TableHead>
              <table_1.TableHead className="text-center">Invoice No</table_1.TableHead>
              <table_1.TableHead className="text-center">Type</table_1.TableHead>
              <table_1.TableHead className="text-center">Invoice date</table_1.TableHead>
              <table_1.TableHead className="text-center">Customer Name</table_1.TableHead>
              <table_1.TableHead className="text-center">Due date</table_1.TableHead>

              <table_1.TableHead className="text-center">Project</table_1.TableHead>
              <table_1.TableHead className="text-left">Item Details</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>

          <table_1.TableBody className="bg-green-50">
            {filteredInvoices.map((invoice) => (<table_1.TableRow key={invoice.invoiceid}>
                <table_1.TableCell>
                  <p className="w-10 text-center text-[10px] rounded-lg bg-red-100">
                    status
                  </p>
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {invoice.invoiceid}
                </table_1.TableCell>
                <table_1.TableCell> {invoice.invoiceno}</table_1.TableCell>
                <table_1.TableCell> {invoice.itype}</table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {invoice.invoicedate}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">
                  {invoice.customername}
                </table_1.TableCell>
                <table_1.TableCell className="text-center">{invoice.duedate}</table_1.TableCell>

                <table_1.TableCell className="text-center">{invoice.pname}</table_1.TableCell>
                <table_1.TableCell className="text-center flex">
                  <button_1.Button className="bg-green-600 ml-5" onClick={() => {
                router.push(`/invoices/${invoice.invoiceid}`);
            }} type="button">
                    Edit
                  </button_1.Button>

                  <dialog_1.Dialog open={open} onOpenChange={setOpen}>
                    <dialog_1.DialogTrigger asChild>
                      <button_1.Button className="bg-green-600 ml-4" type="button" onClick={() => {
                setValue('invoiceid', invoice.invoiceid);
                setOpen(true);
            }}>
                        Record Payment
                      </button_1.Button>
                    </dialog_1.DialogTrigger>
                    <dialog_1.DialogContent className="sm:max-w-[425px]">
                      <dialog_1.DialogHeader>
                        <dialog_1.DialogTitle>Record a Receipts</dialog_1.DialogTitle>
                      </dialog_1.DialogHeader>
                      <div className="flex-row gap-4 py-4">
                        <div className="items-center gap-4">
                          <form_1.Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <form_1.FormField control={form.control} name="paymeth" render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormLabel>Payment Method</form_1.FormLabel>
                                    <form_1.FormControl>
                                      <select_1.Select onValueChange={(value) => {
                    field.onChange(value);
                    if (value === 'Cash') {
                        form.setValue('paccount', 'Cash'); // Automatically select "BOC"
                        setAccountDisabled(true); // Disable the Payment Account dropdown
                    }
                    else {
                        setAccountDisabled(false); // Enable the Payment Account dropdown
                    }
                }} defaultValue={field.value} {...field}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                          <select_1.SelectValue placeholder="Select a payment method"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                          <select_1.SelectItem value="Card">
                                            Card
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="Cash">
                                            Cash
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="Online">
                                            Online
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="Cheque">
                                            Cheque
                                          </select_1.SelectItem>
                                        </select_1.SelectContent>
                                      </select_1.Select>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>

                              <form_1.FormField control={form.control} name="paccount" render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormLabel>Payment Account</form_1.FormLabel>
                                    <form_1.FormControl>
                                      <select_1.Select disabled={accountDisabled} onValueChange={field.onChange} value={field.value} {...field}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                          <select_1.SelectValue placeholder="Select a payment account"/>
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

                              <form_1.FormField control={form.control} name="amount" render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormLabel>Amount</form_1.FormLabel>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" {...field}/>
                                    </form_1.FormControl>
                                  </form_1.FormItem>)}/>

                              <form_1.FormField control={form.control} name="pdate" render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormLabel>Payment Date</form_1.FormLabel>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" type="date" {...field}/>
                                    </form_1.FormControl>
                                  </form_1.FormItem>)}/>

                              <button_1.Button type="submit" className="bg-green-600 w-[80px]">
                                Pay
                              </button_1.Button>
                            </form>
                          </form_1.Form>
                        </div>
                      </div>
                    </dialog_1.DialogContent>
                  </dialog_1.Dialog>

                  <button_1.Button className="bg-green-600 ml-5" onClick={() => {
                router.push(`/invoices/print/${invoice.invoiceid}`);
            }} type="button">
                    Print
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
                        <alert_dialog_1.AlertDialogAction className="bg-red-600" onClick={() => deleteAction(invoice.invoiceid)}>
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
