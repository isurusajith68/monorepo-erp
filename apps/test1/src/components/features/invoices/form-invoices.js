"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvoiceForm;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const use_toast_1 = require("@/components/ui/use-toast");
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const select_1 = require("@/components/ui/select");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const invoice_action_1 = require("./invoice-action");
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const react_label_1 = require("@radix-ui/react-label");
const project_action_1 = require("../projects/project-action");
const customer_actions_1 = require("../customers/customer-actions");
const textarea_1 = require("@/components/ui/textarea");
const FormSchema2 = zod_2.z.object({
    paymeth: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    amount: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    pdate: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    paccount: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    invoiceid: zod_2.z.number().optional(),
});
const detailRowSchema = zod_2.z.object({
    id: zod_2.z.coerce.number().optional(),
    itemdetails: zod_2.z.string().optional(),
    quentity: zod_2.z.coerce.number().optional(),
    rate: zod_2.z.coerce.number().optional(),
    tax: zod_2.z.coerce.number().optional(),
    amount: zod_2.z.coerce.number().optional(),
    price: zod_2.z.coerce.number().optional(),
});
const FormSchema = zod_2.z.object({
    customername: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    invoiceid: zod_2.z.number().optional(),
    invoicedate: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    invoiceno: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    project: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    ctype: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    itype: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    currency: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    duedate: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    subtotal: zod_2.z.coerce.number().optional(),
    totalAmount: zod_2.z.coerce.number().optional(),
    discount: zod_2.z.coerce.number().optional(),
    remark: zod_2.z.string().optional(),
    invoicedetails: zod_2.z.array(detailRowSchema),
});
function InvoiceForm({ id }) {
    const router = (0, navigation_1.useRouter)();
    const [customers, setCustomers] = (0, react_1.useState)([]);
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [open, setOpen] = (0, react_1.useState)(false);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            invoicedetails: [
                { itemdetails: '', quentity: 0, rate: 0, tax: 0, amount: 0 },
            ],
        },
    });
    const form2 = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema2),
        defaultValues: {
            pdate: new Date().toISOString().split('T')[0],
        },
    });
    (0, react_1.useEffect)(() => {
        // Fetch customers when the component mounts
        const fetchCustomers = async () => {
            const response = await (0, customer_actions_1.getAllCustomers)();
            if (response.success) {
                setCustomers(response.data);
            }
        };
        fetchCustomers();
        const fetchProjects = async () => {
            const response = await (0, project_action_1.getAllProjects)();
            if (response.success) {
                setProjects(response.data);
            }
        };
        fetchProjects();
        if (id) {
            const getCus = async () => {
                const cus = await (0, invoice_action_1.getInvoice)(Number(id ?? -1));
                form.reset(cus.data);
            };
            getCus();
        }
    }, [id]);
    const { control: control2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, getValues: getValues2, formState: { isDirty: isDirty2, dirtyFields: dirtyFields2, isLoading: isLoading2, isSubmitSuccessful: isSubmitSuccessful2, }, } = form2;
    // const {
    //   watch,
    //   setValue,
    //   getValues,
    //   formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
    // } = form;
    const { control: control, handleSubmit: handleSubmit, watch: watch, setValue: setValue, getValues: getValues, formState: { isDirty: isDirty, dirtyFields: dirtyFields, isLoading: isLoading, isSubmitSuccessful: isSubmitSuccessful, }, } = form;
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'invoicedetails',
        control: form.control,
    });
    async function onSubmit(data) {
        const id = getValues('invoiceid');
        if (id) {
            let dirtyValues = {};
            for (const key in dirtyFields) {
                if (key != 'invoicedetails') {
                    dirtyValues[key] = data[key];
                }
            }
            await (0, invoice_action_1.updateInvoice)(data, dirtyValues, id.toString());
        }
        else {
            const objId = await (0, invoice_action_1.insertInvoice)(data);
            setValue('invoiceid', objId.lastInsertRowid, { shouldDirty: false });
            router.push(`/invoices/${objId.lastInsertRowid}`);
        }
        (0, use_toast_1.toast)({
            className: 'text-blue-600',
            title: 'Customer',
            description: <span>Added successfully..</span>,
            duration: 5000,
        });
        // router.push(`/invoices/list`);
    }
    const getPrevItem = async () => {
        const prevItem = await (0, invoice_action_1.getPrevMaterialItem)(id ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/invoices/${prevItem.data.invoiceid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of Material-items..</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const nextItem = await (0, invoice_action_1.getNextMaterialItem)(id ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/invoices/${nextItem.data.invoiceid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>{nextItem.msg}</span>,
                duration: 2000,
            });
        }
    };
    const deleteAction = async () => {
        if (id) {
            await (0, invoice_action_1.DeleteInvoice)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Invoice',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
            router.push('/invoices/list');
        }
    };
    const calculateSubtotal = () => {
        const subtotal = fields.reduce((total, field, index) => {
            const amount = Number(getValues(`invoicedetails.${index}.amount`)) || 0;
            return total + amount;
        }, 0);
        setValue('subtotal', subtotal);
        // Recalculate total amount with the current discount value
        const discount = Number(getValues('discount')) || 0;
        calculateTotalAmount(discount);
    };
    const calculateTotalAmount = (discount) => {
        const subtotal = Number(getValues('subtotal')) || 0;
        const totalAmount = subtotal - (subtotal * discount) / 100;
        setValue('totalAmount', totalAmount);
    };
    async function onSubmit2(data) {
        try {
            console.log('iddddddddddddddddd', id);
            console.log('helooooooooooooooooooooooo', data);
            if (id) {
                // let dirtyValues: any = {};
                // for (const key in dirtyFields) {
                //   dirtyValues[key] = data[key];
                // }
                // Try updating the invoice receipt
                //await updateInvoiceReceipt(dirtyValues, id.toString());
                data.invoiceid = getValues('invoiceid'); // Ensure invoiceid is set
                // Try inserting the invoice receipt
                const objId = await (0, invoice_action_1.insertInvoiceReceipt)(data);
                setValue('id', objId.lastInsertRowid, { shouldDirty: false });
                (0, use_toast_1.toast)({
                    className: 'text-blue-600',
                    title: 'Payment',
                    description: <span>Recorded successfully.</span>,
                    duration: 2000,
                });
                // Close the dialog
                setOpen(false);
                // Reset form values
                form.reset();
            }
            else {
                data.invoiceid = getValues('invoiceid'); // Ensure invoiceid is set
                // Try inserting the invoice receipt
                const objId = await (0, invoice_action_1.insertInvoiceReceipt)(data);
                setValue('id', objId.lastInsertRowid, { shouldDirty: false });
            }
            // If everything is successful, show the success toast
        }
        catch (error) {
            // Handle any errors that occur during the async operations
            console.error('An error occurred:', error);
            // Display an error toast to the user
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Error',
                description: <span>Failed to record payment. Please try again.</span>,
                duration: 3000,
            });
        }
    }
    return (<div className="flex flex-col items-center pt-4 ml-5 mr-5 mt-16">
      <div className="grow pt-4">
        <div className="flex justify-between items-center pb-4">
          <div>
            {!id && (<p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Invoice</p>)}
            {id && (<p className="text-xl font-bold pb-6 pt-3 pl-6 ">
                Update Invoice
              </p>)}
          </div>
          <div className="flex gap-2">
            <div>
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getPrevItem}>
                previous
              </button_1.Button>
            </div>
            <div>
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getNextItem}>
                next
              </button_1.Button>
            </div>
          </div>
        </div>
        <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4"/>
        <div className="flex justify-center">
          <div className="w-full">
            <form_1.Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/invoices/list')}>
                  View List
                </button_1.Button>

                <div className="flex flex-wrap gap-6">
                  <div className="w-full md:w-[400px]">
                    <form_1.FormField control={form.control} name="invoiceid" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Invoice ID</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input disabled className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="invoiceno" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Invoice Ref No</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>

                    <form_1.FormField control={form.control} name="ctype" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Customer Type</form_1.FormLabel>
                          <form_1.FormControl>
                            <select_1.Select onValueChange={field.onChange} value={field.value}>
                              <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <select_1.SelectValue placeholder="select type"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectItem value="Person">Person</select_1.SelectItem>
                                <select_1.SelectItem value="Company">Company</select_1.SelectItem>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="currency" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Currency</form_1.FormLabel>
                          <form_1.FormControl>
                            <select_1.Select onValueChange={field.onChange} value={field.value}>
                              <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <select_1.SelectValue placeholder="select type"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectItem value="LKR">LKR</select_1.SelectItem>
                                <select_1.SelectItem value="USD">USD</select_1.SelectItem>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>

                    <form_1.FormField control={form.control} name="duedate" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Due date</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                  </div>

                  <div className="w-full md:w-[400px]">
                    <form_1.FormField control={form.control} name="customername" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Customer Name</form_1.FormLabel>
                          <form_1.FormControl>
                            <select_1.Select onValueChange={field.onChange} value={field.value}>
                              <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <select_1.SelectValue placeholder="Select a customer"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectGroup>
                                  <select_1.SelectLabel>Customers</select_1.SelectLabel>
                                  {customers.map((customer) => (<select_1.SelectItem id="cus-name" key={customer.id} value={`${customer.cname}`}>
                                      {customer.cname}
                                    </select_1.SelectItem>))}
                                </select_1.SelectGroup>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="remark" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel className="pt-4 w-[120px]">
                            Remark
                          </form_1.FormLabel>
                          <form_1.FormControl>
                            <textarea_1.Textarea placeholder="Tell us a little bit about yourself" className="resize-none rounded border-2 border-green-600 " {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="itype" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Invoice Type</form_1.FormLabel>
                          <form_1.FormControl>
                            <select_1.Select onValueChange={field.onChange} value={field.value}>
                              <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <select_1.SelectValue placeholder="select type"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectItem value="Person">Person</select_1.SelectItem>
                                <select_1.SelectItem value="Company">Company</select_1.SelectItem>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>

                    <form_1.FormField control={form.control} name="invoicedate" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Invoice date</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="project" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Select project</form_1.FormLabel>
                          <form_1.FormControl>
                            <select_1.Select onValueChange={field.onChange} value={field.value}>
                              <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                <select_1.SelectValue placeholder="Select a project"/>
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectGroup>
                                  <select_1.SelectLabel>Project</select_1.SelectLabel>
                                  {projects.map((project) => (<select_1.SelectItem key={project.pid} value={`${project.pname} `}>
                                      {project.pname}
                                    </select_1.SelectItem>))}
                                </select_1.SelectGroup>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <p className="text-xl font-bold pb-6 pt-6">Item Table</p>
                  <button_1.Button type="button" onClick={() => append({
            itemdetails: '',
            quentity: 0,
            rate: 0,
            tax: 0,
            amount: 0,
        })}>
                    Add row
                  </button_1.Button>
                  <table_1.Table>
                    <table_1.TableHeader>
                      <table_1.TableRow>
                        <table_1.TableHead>REMOVE</table_1.TableHead>
                        <table_1.TableHead>ITEM DETAILS</table_1.TableHead>
                        <table_1.TableHead>QUANTITY</table_1.TableHead>
                        <table_1.TableHead>PRICE</table_1.TableHead>
                        <table_1.TableHead>TAX</table_1.TableHead>
                        <table_1.TableHead>AMOUNT</table_1.TableHead>
                        <table_1.TableHead>ADD</table_1.TableHead>
                      </table_1.TableRow>
                    </table_1.TableHeader>

                    <table_1.TableBody>
                      {fields.map((field, index) => (<table_1.TableRow key={field.id}>
                          <table_1.TableCell className="p-1 text-center font-medium">
                            <button_1.Button type="button" variant={'outline'} className="text-2xl" onClick={() => {
                remove(index);
                calculateSubtotal(); // Recalculate subtotal after removal
            }}>
                              <md_1.MdOutlineRemoveCircleOutline className="text-destructive"/>
                            </button_1.Button>
                          </table_1.TableCell>

                          <table_1.TableCell className="text-right">
                            <form_1.FormField control={form.control} name={`invoicedetails.${index}.itemdetails`} render={({ field }) => (<form_1.FormItem>
                                  <form_1.FormControl>
                                    <input_1.Input className="rounded border-2 border-green-600" placeholder="item 1" {...field}/>
                                  </form_1.FormControl>
                                  <form_1.FormMessage />
                                </form_1.FormItem>)}/>
                          </table_1.TableCell>

                          <table_1.TableCell>
                            <form_1.FormField control={form.control} name={`invoicedetails.${index}.quentity`} render={({ field }) => (<form_1.FormItem>
                                  <form_1.FormControl>
                                    <input_1.Input className="rounded border-2 border-green-600" placeholder="Paid" {...field} onChangeCapture={(e) => {
                    const quantity = Number(e.target.value) || 0;
                    const price = Number(getValues(`invoicedetails.${index}.price`)) || 0;
                    const tax = Number(getValues(`invoicedetails.${index}.tax`)) || 0;
                    const amount = quantity * price + tax;
                    setValue(`invoicedetails.${index}.amount`, amount);
                    calculateSubtotal(); // Recalculate subtotal
                }}/>
                                  </form_1.FormControl>
                                  <form_1.FormMessage />
                                </form_1.FormItem>)}/>
                          </table_1.TableCell>

                          <table_1.TableCell className="text-right">
                            <form_1.FormField control={form.control} name={`invoicedetails.${index}.price`} render={({ field }) => (<form_1.FormItem>
                                  <form_1.FormControl>
                                    <input_1.Input className="rounded border-2 border-green-600" placeholder="$250.00" {...field} onChangeCapture={(e) => {
                    const price = Number(e.target.value) || 0;
                    const quantity = Number(getValues(`invoicedetails.${index}.quentity`)) || 0;
                    const tax = Number(getValues(`invoicedetails.${index}.tax`)) || 0;
                    const amount = quantity * price + tax;
                    setValue(`invoicedetails.${index}.amount`, amount);
                    calculateSubtotal(); // Recalculate subtotal
                }}/>
                                  </form_1.FormControl>
                                  <form_1.FormMessage />
                                </form_1.FormItem>)}/>
                          </table_1.TableCell>

                          <table_1.TableCell className="text-right">
                            <form_1.FormField control={form.control} name={`invoicedetails.${index}.tax`} render={({ field }) => (<form_1.FormItem>
                                  <form_1.FormControl>
                                    <input_1.Input className="rounded border-2 border-green-600" placeholder="$250.00" {...field} onChangeCapture={(e) => {
                    const tax = Number(e.target.value) || 0;
                    const quantity = Number(getValues(`invoicedetails.${index}.quentity`)) || 0;
                    const price = Number(getValues(`invoicedetails.${index}.price`)) || 0;
                    const amount = quantity * price + tax;
                    setValue(`invoicedetails.${index}.amount`, amount);
                    calculateSubtotal(); // Recalculate subtotal
                }}/>
                                  </form_1.FormControl>
                                  <form_1.FormMessage />
                                </form_1.FormItem>)}/>
                          </table_1.TableCell>

                          <table_1.TableCell className="text-right">
                            <form_1.FormField control={form.control} name={`invoicedetails.${index}.amount`} render={({ field }) => (<form_1.FormItem>
                                  <form_1.FormControl>
                                    <input_1.Input className="rounded border-2 border-green-600" placeholder="$250.00" {...field} readOnly/>
                                  </form_1.FormControl>
                                  <form_1.FormMessage />
                                </form_1.FormItem>)}/>
                          </table_1.TableCell>

                          <table_1.TableCell className="p-1 text-center font-medium">
                            <button_1.Button variant={'outline'} className="text-2xl" type="button" onClick={() => append({})}>
                              <fa_1.FaPlus className="text-destructive"/>
                            </button_1.Button>
                          </table_1.TableCell>
                        </table_1.TableRow>))}
                    </table_1.TableBody>
                  </table_1.Table>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <button_1.Button className="bg-green-600" type="submit">
                      Submit
                    </button_1.Button>

                    <alert_dialog_1.AlertDialog>
                      <alert_dialog_1.AlertDialogTrigger asChild>
                        <button_1.Button className="bg-red-600 ml-4" type="button">
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
                          <alert_dialog_1.AlertDialogAction onClick={deleteAction}>
                            Continue
                          </alert_dialog_1.AlertDialogAction>
                        </alert_dialog_1.AlertDialogFooter>
                      </alert_dialog_1.AlertDialogContent>
                    </alert_dialog_1.AlertDialog>

                    {/* /vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}

                    <dialog_1.Dialog open={open} onOpenChange={setOpen}>
                      <dialog_1.DialogTrigger asChild>
                        <button_1.Button className="bg-green-600 ml-4" type="button" onClick={() => setOpen(true)}>
                          Record Payment
                        </button_1.Button>
                      </dialog_1.DialogTrigger>
                      <dialog_1.DialogContent className="sm:max-w-[425px]">
                        <dialog_1.DialogHeader>
                          <dialog_1.DialogTitle>Record</dialog_1.DialogTitle>
                        </dialog_1.DialogHeader>
                        <div className="flex-row gap-4 py-4">
                          <div className="items-center gap-4">
                            <form_1.Form {...form2}>
                              <form onSubmit={form2.handleSubmit(onSubmit2)} // Ensure form2 and onSubmit2 are used
     className="space-y-6">
                                <form_1.FormField control={form2.control} name="paymeth" render={({ field }) => (<form_1.FormItem>
                                      <form_1.FormLabel>Payment Method</form_1.FormLabel>
                                      <form_1.FormControl>
                                        <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                          <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                            <select_1.SelectValue placeholder="Select a payment method"/>
                                          </select_1.SelectTrigger>
                                          <select_1.SelectContent>
                                            <select_1.SelectItem value="Card">
                                              Card
                                            </select_1.SelectItem>
                                            <select_1.SelectItem value="Cash">
                                              BOC
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

                                <form_1.FormField control={form2.control} name="paccount" render={({ field }) => (<form_1.FormItem>
                                      <form_1.FormLabel>Payment Account</form_1.FormLabel>
                                      <form_1.FormControl>
                                        <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                          <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                            <select_1.SelectValue placeholder="Select a payment account"/>
                                          </select_1.SelectTrigger>
                                          <select_1.SelectContent>
                                            <select_1.SelectItem value="None">
                                              None
                                            </select_1.SelectItem>
                                            <select_1.SelectItem value="BOC">
                                              BOC
                                            </select_1.SelectItem>
                                            <select_1.SelectItem value="Peoples">
                                              Peoples
                                            </select_1.SelectItem>
                                            <select_1.SelectItem value="HNB">
                                              HNB
                                            </select_1.SelectItem>
                                          </select_1.SelectContent>
                                        </select_1.Select>
                                      </form_1.FormControl>
                                      <form_1.FormMessage />
                                    </form_1.FormItem>)}/>

                                <form_1.FormField control={form2.control} name="amount" render={({ field }) => (<form_1.FormItem>
                                      <form_1.FormLabel>Amount</form_1.FormLabel>
                                      <form_1.FormControl>
                                        <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" {...field}/>
                                      </form_1.FormControl>
                                    </form_1.FormItem>)}/>

                                <form_1.FormField control={form2.control} name="pdate" render={({ field }) => (<form_1.FormItem>
                                      <form_1.FormLabel>Payment Date</form_1.FormLabel>
                                      <form_1.FormControl>
                                        <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" type="date" {...field}/>
                                      </form_1.FormControl>
                                    </form_1.FormItem>)}/>

                                <button_1.Button type="submit" className="bg-green-600 w-[80px]" onClick={() => {
            setValue2('invoiceid', getValues('invoiceid')); // Set invoiceid when opening the form
        }}>
                                  Pay
                                </button_1.Button>
                              </form>
                            </form_1.Form>
                          </div>
                        </div>
                      </dialog_1.DialogContent>
                    </dialog_1.Dialog>
                  </div>
                  <div className="w-80 h-64 bg-green-200 mr-10 mb-11 p-4 items-center rounded-md  ">
                    <div className="flex justify-between items-center ">
                      <react_label_1.Label className="font-bold">Sub Total</react_label_1.Label>
                      <form_1.FormField control={form.control} name="subtotal" render={({ field }) => (<form_1.FormItem>
                            <form_1.FormControl>
                              <input_1.Input className="w-36" {...field} readOnly placeholder="Sub Total"/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <react_label_1.Label className="font-bold">Discount (%)</react_label_1.Label>
                      <form_1.FormField control={form.control} name="discount" render={({ field }) => (<form_1.FormItem>
                            <form_1.FormControl>
                              <input_1.Input className="w-36" {...field} placeholder="Discount" onChange={(e) => {
                const discount = Number(e.target.value) || 0;
                field.onChange(e);
                calculateTotalAmount(discount);
            }}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <react_label_1.Label className="font-bold">Total Amount</react_label_1.Label>
                      <form_1.FormField control={form.control} name="totalAmount" render={({ field }) => (<form_1.FormItem>
                            <form_1.FormControl>
                              <input_1.Input className="w-36" {...field} readOnly placeholder="Total Amount"/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <react_label_1.Label className="font-bold">Total Paid</react_label_1.Label>
                      <input_1.Input type="text" disabled className="w-36"/>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <react_label_1.Label className="font-bold">Amount Due</react_label_1.Label>
                      <input_1.Input type="text" disabled className="w-36"/>
                    </div>
                  </div>
                </div>
              </form>
            </form_1.Form>
          </div>
        </div>
      </div>
    </div>);
}
