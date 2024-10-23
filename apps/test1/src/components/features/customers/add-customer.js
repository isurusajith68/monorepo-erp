"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomerFormAdd;
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const select_1 = require("@/components/ui/select");
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
const customer_actions_1 = require("./customer-actions");
const react_2 = require("react");
const navigation_1 = require("next/navigation");
const textarea_1 = require("@/components/ui/textarea");
const FormSchema = zod_2.z.object({
    cname: zod_2.z
        .string()
        .min(2, { message: 'Name must be at least 2 characters.' })
        .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name must contain only alphabetic characters and spaces.',
    }),
    id: zod_2.z.number().optional(),
    phone: zod_2.z.string().regex(/^\+?[0-9]\d{9}$/, {
        message: 'Invalid phone number format.',
    }),
    nic: zod_2.z.string().optional(),
    rdate: zod_2.z.string().min(2, {
        message: 'You must select a Date',
    }),
    ctype: zod_2.z.string().min(1, {
        message: 'You must select a customer type.',
    }),
    email: zod_2.z.string().email().nullable().optional(),
    location: zod_2.z.string().optional(),
});
function CustomerFormAdd({ id }) {
    const router = (0, navigation_1.useRouter)();
    const focusRef = (0, react_1.useRef)(null);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            nic: '',
            location: '',
            rdate: new Date().toISOString().split('T')[0], //default date
        },
    });
    (0, react_2.useEffect)(() => {
        if (id) {
            //form.setValue("id",id);
            const getCus = async () => {
                const cus = await (0, customer_actions_1.getCustomer)(Number(id ?? -1)); //-1 id set as-1(no user)
                form.reset(cus.data); //getcustomer return data from db.it set in form again from db
            };
            getCus();
        }
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, [id]);
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    async function onSubmit(data) {
        console.log('data', data.phone);
        const id = getValues('id'); // this checks if the data already exists in the database
        if (id) {
            // If an `id` exists, update the customer with only the changed fields (dirtyFields)
            let dirtyValues = {};
            for (const key in dirtyFields) {
                dirtyValues[key] = data[key];
            }
            console.log('dirtyValues', dirtyValues);
            await (0, customer_actions_1.updateCustomer)(dirtyValues, id.toString());
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Customer',
                description: <span>Updated successfully..</span>,
                duration: 5000,
            });
        }
        else {
            // If no `id` exists, insert a new customer and get the new `id`
            const objId = await (0, customer_actions_1.insertcustomer)(data);
            setValue('id', objId.lastInsertRowid, { shouldDirty: false }); // Set the `id` to avoid adding the same data again
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Customer',
                description: <span>Added successfully..</span>,
                duration: 2000,
            });
            // After inserting, use the newly generated `id`
            router.push(`/customers/${objId.lastInsertRowid}`);
        }
    }
    const getPrevItem = async () => {
        const prevItem = await (0, customer_actions_1.getPrevMaterialItem)(id ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/customers/${prevItem.data.id}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of Customer ID</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const nextItem = await (0, customer_actions_1.getNextMaterialItem)(id ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/customers/${nextItem.data.id}`);
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
            router.push('/customers/list');
        }
    };
    return (<div className="flex flex-col items-center pt-4 ml-5 mr-5 mb-20 mt-12">
      <div className="grow pt-4">
        <div className="flex justify-between items-center pb-4">
          <div>
            {!id && (<p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Customer</p>)}
            {id && (<p className="text-xl font-bold pb-6 pt-3 pl-6 ">
                Update Customer
              </p>)}
          </div>
          {id && (<div className="flex gap-2">
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
            </div>)}
          <div>
            <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={() => router.push('/customers/list')}>
              View List
            </button_1.Button>
          </div>
        </div>

        <hr className="w-[95%] border-[1.5px]  border-green-300 mb-4"/>
        <div className="flex justify-center">
          <div className="w-full">
            <form_1.Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="flex flex-wrap gap-6">
                  <div className="w-full md:w-[400px]">
                    <form_1.FormField control={form.control} name="id" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Customer ID</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input disabled type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>

                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="cname" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Customer Name</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field} ref={(el) => {
                field.ref(el); // Manually call the field ref function
                focusRef.current = el; // Also assign the element to your custom ref
            }}/>
                          </form_1.FormControl>
                          <form_1.FormDescription>
                            The name of an individual customer or the name of a
                            company.
                          </form_1.FormDescription>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <div className="mt-5">
                      <form_1.FormField control={form.control} name="phone" render={({ field }) => (<form_1.FormItem>
                            <form_1.FormLabel>Phone Number</form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                            </form_1.FormControl>

                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <form_1.FormField control={form.control} name="nic" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>NIC/BRN</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="rdate" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>
                            Customer / Company Registed Date
                          </form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                  </div>

                  <div className="w-full md:w-[400px]">
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

                    <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Email</form_1.FormLabel>
                          <form_1.FormControl>
                            <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <form_1.FormField control={form.control} name="location" render={({ field }) => (<form_1.FormItem>
                          <form_1.FormLabel>Address</form_1.FormLabel>
                          <form_1.FormControl>
                            <textarea_1.Textarea className="rounded border-2 border-green-600" placeholder="" {...field}/>
                          </form_1.FormControl>
                          <form_1.FormDescription>
                            The Address of company or an individual person.
                          </form_1.FormDescription>
                          <form_1.FormMessage />
                        </form_1.FormItem>)}/>
                    <div className="flex items-center justify-end mt-10">
                      <div>
                        <button_1.Button className="bg-green-600 mr-5" type="button" onClick={() => router.push('/customers/list')}>
                          Cancel
                        </button_1.Button>
                      </div>
                      <div>
                        {!id && (<button_1.Button className="bg-green-600" type="submit">
                            Save
                          </button_1.Button>)}
                        {id && (<button_1.Button className="bg-green-600" type="submit">
                            Update
                          </button_1.Button>)}
                      </div>
                      {id && (<div>
                          <alert_dialog_1.AlertDialog>
                            <alert_dialog_1.AlertDialogTrigger asChild>
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
                                  This action cannot be undone. This will
                                  permanently delete your data and remove your
                                  data from our servers.
                                </alert_dialog_1.AlertDialogDescription>
                              </alert_dialog_1.AlertDialogHeader>
                              <alert_dialog_1.AlertDialogFooter>
                                <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                                <alert_dialog_1.AlertDialogAction className="bg-red-600" onClick={() => {
                deleteAction(id);
            }}>
                                  Delete
                                </alert_dialog_1.AlertDialogAction>
                              </alert_dialog_1.AlertDialogFooter>
                            </alert_dialog_1.AlertDialogContent>
                          </alert_dialog_1.AlertDialog>
                        </div>)}
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
