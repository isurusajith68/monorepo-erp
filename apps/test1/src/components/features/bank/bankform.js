"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
const react_1 = require("react");
const bank_action_1 = require("./bank-action");
const select_1 = require("@/components/ui/select");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const navigation_1 = require("next/navigation");
const FormSchema = zod_2.z.object({
    id: zod_2.z.coerce.number().optional(),
    oname: zod_2.z.string().min(2, {
        message: '',
    }),
    bname: zod_2.z.string().min(2, {
        message: 'Enter Bank Name',
    }),
    acctype: zod_2.z.string().min(2, {
        message: 'Select Account Type',
    }),
    accbranch: zod_2.z.string().min(2, {
        message: 'Enter Branch Name',
    }),
    accnumber: zod_2.z.coerce.number().min(5, {
        message: 'Bank account number must be at least 5 digits long',
    }),
    camount: zod_2.z.coerce.number().min(2, {
        message: 'Enter The Current Balance Of Account',
    }),
});
function BankeForm({ id }) {
    const [bank, setBank] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            oname: 'bankname',
            bname: '',
            acctype: '',
            accbranch: '',
            accnumber: '',
            camount: '',
        },
    });
    (0, react_1.useEffect)(() => {
        if (id) {
            //form.setValue("id",id);
            const getPro = async () => {
                const pro = await (0, bank_action_1.getBank)(Number(id ?? -1)); //-1 id set as-1(no user)
                form.reset(pro.data); //getcustomer return data from db.it set in form again from db
                console.log('hello', pro.data);
            };
            getPro();
        }
    }, [id]);
    const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    async function onSubmit(data) {
        console.log('data', data);
        try {
            const id = getValues('id');
            if (id) {
                const dirtyValues = Object.fromEntries(Object.entries(data).filter(([key]) => dirtyFields[key]));
                console.log('Updating with dirty values:', dirtyValues); // Debugging
                const result = await (0, bank_action_1.updateBank)(dirtyValues, id.toString());
                console.log('Update result:', result); // Debugging
                if (result.success) {
                    (0, use_toast_1.toast)({
                        className: 'text-blue-600',
                        title: 'Bank',
                        description: <span>Updated successfully..</span>,
                        duration: 5000,
                    });
                }
                else {
                    (0, use_toast_1.toast)({
                        className: 'text-red-600',
                        title: 'Bank',
                        description: <span>Update failed..</span>,
                        duration: 5000,
                    });
                }
            }
            else {
                const result = await (0, bank_action_1.InsertBank)(data);
                setValue('id', result.lastInsertRowid, { shouldDirty: false });
                console.log('Insert result:', result); // Debugging
                router.push(`/bank/${result.lastInsertRowid}`);
                if (result.success) {
                    (0, use_toast_1.toast)({
                        className: 'text-blue-600',
                        title: 'Bank',
                        description: <span>Added successfully..</span>,
                        duration: 5000,
                    });
                }
                else {
                    (0, use_toast_1.toast)({
                        className: 'text-red-600',
                        title: 'Bank',
                        description: <span>Add failed..</span>,
                        duration: 5000,
                    });
                }
            }
        }
        catch (error) {
            console.error('Error occurred:', error);
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Bank',
                description: <span>Updated successfully..</span>,
                duration: 5000,
            });
        }
    }
    const deleteAction = async () => {
        if (id) {
            await (0, bank_action_1.DeleteBank)(Number(id));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Bank',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
        }
    };
    const getPrevItem = async () => {
        const prevItem = await (0, bank_action_1.getPrevMaterialItem)(id ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/bank/${prevItem.data.id}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of banks accounts..</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const nextItem = await (0, bank_action_1.getNextMaterialItem)(id ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/bank/${nextItem.data.id}`);
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
    return (<div>
      {!id && (<h2 className="text-2xl font-bold mb-4 mt-20 ml-5">New Bank Account</h2>)}
      {id && (<h2 className="text-2xl font-bold mb-4 mt-20 ml-5">
          Update Bank Account
        </h2>)}
      {id && (<div className="flex flex-col-3 items-center justify-center lg:ml-[30%]">
          <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getPrevItem}>
            previous
          </button_1.Button>
          <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getNextItem}>
            next
          </button_1.Button>
        </div>)}
      <div className="lg:ml-[75%] lg:mt-[-3%]">
        <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/bank/')}>
          View List
        </button_1.Button>
      </div>
      <div className="p-8 rounded-lg ml-10  lg:w-[90%] md:w-[90%] sm:w-[80%]">
        <form_1.Form {...form}>
          <form className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4 ml-10" onSubmit={form.handleSubmit(onSubmit)}>
            <form_1.FormField control={form.control} name="bname" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <form_1.FormLabel>Bank Name</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <form_1.FormField control={form.control} name="acctype" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <form_1.FormLabel>Account Type</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <select_1.Select onValueChange={field.onChange} value={field.value}>
                          <select_1.SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <select_1.SelectValue placeholder="select type"/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="Current">Current</select_1.SelectItem>
                            <select_1.SelectItem value="Savings">Savings</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="accbranch" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <form_1.FormLabel>Account Branch</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="accnumber" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Account Number</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="camount" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-4 justify-items-center">
                    <div className="mb-2">
                      <form_1.FormLabel>Current Balance</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4 lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <div className="justify-items-end flex">
              {!id && (<button_1.Button type="submit" className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700">
                  Submit
                </button_1.Button>)}
              {id && (<button_1.Button type="submit" className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white  hover:bg-green-700">
                  Update
                </button_1.Button>)}

              {id && (<alert_dialog_1.AlertDialog>
                  <alert_dialog_1.AlertDialogTrigger asChild>
                    <button_1.Button className="mt-4 ml-5 px-4 py-2 md:w-[50%] lg:w-[20%] bg-red-600 text-white  hover:bg-red-700">
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
                      <alert_dialog_1.AlertDialogAction onClick={() => deleteAction()}>
                        Continue
                      </alert_dialog_1.AlertDialogAction>
                    </alert_dialog_1.AlertDialogFooter>
                  </alert_dialog_1.AlertDialogContent>
                </alert_dialog_1.AlertDialog>)}
            </div>
          </form>
        </form_1.Form>
      </div>
    </div>);
}
exports.default = BankeForm;
