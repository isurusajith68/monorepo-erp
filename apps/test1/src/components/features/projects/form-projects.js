"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectForm;
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const select_1 = require("@/components/ui/select");
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
const react_1 = require("react");
const project_action_1 = require("./project-action");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const customer_actions_1 = require("../customers/customer-actions");
const navigation_1 = require("next/navigation");
const FormSchema = zod_2.z.object({
    pid: zod_2.z.coerce.number().optional(),
    powner: zod_2.z.string().min(2, {
        message: '',
    }),
    pname: zod_2.z.string().min(2, {
        message: '',
    }),
    estibudget: zod_2.z.string().min(2, {
        message: '',
    }),
    prdate: zod_2.z.string().min(2, {
        message: '',
    }),
    pdate: zod_2.z.string().min(2, {
        message: '',
    }),
    pdescription: zod_2.z.string().min(2, {
        message: '',
    }),
});
// export default function CustomerForm({ idSearchParam}: {idSearchParam?: string, }) {
function ProjectForm({ pid }) {
    const [customers, setCustomers] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            powner: '',
            pname: '',
            estibudget: '',
            prdate: new Date().toISOString().split('T')[0],
            pdate: new Date().toISOString().split('T')[0],
            pdescription: '',
        },
    });
    (0, react_1.useEffect)(() => {
        const fetchCustomers = async () => {
            const response = await (0, customer_actions_1.getAllCustomers)();
            if (response.success) {
                setCustomers(response.data);
            }
        };
        fetchCustomers();
        if (pid) {
            //form.setValue("id",id);
            const getPro = async () => {
                const pro = await (0, project_action_1.getProject)(Number(pid ?? -1)); //-1 id set as-1(no user)
                form.reset(pro.data); //getcustomer return data from db.it set in form again from db
                console.log('hello', pro.data);
            };
            getPro();
        }
    }, [pid]);
    console.log(customers);
    const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    async function onSubmit(data) {
        console.log('data', data);
        try {
            const id = getValues('pid');
            if (id) {
                const dirtyValues = Object.fromEntries(Object.entries(data).filter(([key]) => dirtyFields[key]));
                const result = await (0, project_action_1.updateProject)(dirtyValues, id.toString());
                if (result.success) {
                    (0, use_toast_1.toast)({
                        className: 'text-blue-600',
                        title: 'Project',
                        description: <span>Updated successfully..</span>,
                        duration: 5000,
                    });
                }
                else {
                    (0, use_toast_1.toast)({
                        className: 'text-red-600',
                        title: 'Project',
                        description: <span>Update failed..</span>,
                        duration: 5000,
                    });
                }
            }
            else {
                const result = await (0, project_action_1.InsertProject)(data);
                setValue('pid', result.lastInsertRowid, { shouldDirty: false });
                console.log(data);
                router.push(`/projects/${result.lastInsertRowid}`);
                if (result.success) {
                    (0, use_toast_1.toast)({
                        className: 'text-blue-600',
                        title: 'Project',
                        description: <span>Added successfully..</span>,
                        duration: 5000,
                    });
                }
                else {
                    (0, use_toast_1.toast)({
                        className: 'text-red-600',
                        title: 'Project',
                        description: <span>Add failed..</span>,
                        duration: 5000,
                    });
                }
            }
        }
        catch (error) {
            console.error(error);
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Project',
                description: <span>Updated successfully..</span>,
                duration: 5000,
            });
        }
    }
    const deleteAction = async () => {
        if (pid) {
            await (0, project_action_1.DeleteProjects)(Number(pid));
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Project',
                description: <span>Deleted successfully..</span>,
                duration: 3000,
            });
        }
    };
    const getPrevItem = async () => {
        const prevItem = await (0, project_action_1.getPrevMaterialItem)(pid ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/projects/${prevItem.data.pid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of projects..</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const nextItem = await (0, project_action_1.getNextMaterialItem)(pid ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/projects/${nextItem.data.pid}`);
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
      {!pid && (<h2 className="text-2xl font-bold mb-4 mt-20 ml-5">New Project</h2>)}
      {pid && (<h2 className="text-2xl font-bold mb-4 mt-20 ml-5">Update Project</h2>)}

      {pid && (<div className="flex flex-col-3 items-center justify-center lg:ml-[33%]">
          <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getPrevItem}>
            previous
          </button_1.Button>
          <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getNextItem}>
            next
          </button_1.Button>
        </div>)}
      <div className="lg:ml-[75%] lg:mt-[-3%]">
        <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/projects/')}>
          View List
        </button_1.Button>
      </div>

      <div className="p-8 rounded-lg ml-10  lg:w-[90%] md:w-[90%] sm:w-[80%]">
        <form_1.Form {...form}>
          <form className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4 ml-10" onSubmit={form.handleSubmit(onSubmit)}>
            <form_1.FormField control={form.control} name="pid" render={({ field }) => (<form_1.FormItem>
                  <div className=" mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Project NO </form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} readOnly className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="powner" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Project Owner</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <select_1.Select onValueChange={field.onChange} value={field.value}>
                          <select_1.SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                            <select_1.SelectValue placeholder=""/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectGroup>
                              <select_1.SelectLabel>Customers</select_1.SelectLabel>
                              {customers.map((customer) => (<select_1.SelectItem key={customer.id} value={`${customer.cname}`}>
                                  {customer.cname}
                                </select_1.SelectItem>))}
                            </select_1.SelectGroup>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="pname" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Project Name</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600 mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            {/*         <FormField
          control={form.control}
          name="ptype"
          render={({ field }) => (
            <FormItem>
              <div className="mt-2 justify-items-center">
                <div className="mb-2 ">
                  <FormLabel>Project type</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Person">Person</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
*/}

            {/*        <FormField
          control={form.control}
          name="initialbudget"
          render={({ field }) => (
            <FormItem>
              <div className="mt-2 justify-items-center">
                <div className="mb-2 ">
                  <FormLabel>Initial Payment</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availablebudget"
          render={({ field }) => (
            <FormItem>
              <div className="mt-2 justify-items-center">
                <div className="mb-2">
                  <FormLabel>Amount Due</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <div className="mt-2 justify-items-center">
                <div className="mb-2 ">
                  <FormLabel>Account</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]">
                        <SelectValue placeholder="select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Person">Person</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
*/}
            <form_1.FormField control={form.control} name="pdescription" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Project Description</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <textarea placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4 w-[100%] lg:w-[80%] md:w-[88%]  sm:w-[82%] h-32 "/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <form_1.FormField control={form.control} name="prdate" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 lg:mt-[-16%]">
                      <form_1.FormLabel>Project Registerd Date</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input type="date" placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4  lg:w-[40%] md:w-[30%]  sm:w-[30%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <h1></h1>
            <form_1.FormField control={form.control} name="pdate" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2 ">
                      <form_1.FormLabel>Project End Date</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input type="date" placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4  lg:w-[40%] md:w-[30%]  sm:w-[30%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <form_1.FormField control={form.control} name="estibudget" render={({ field }) => (<form_1.FormItem>
                  <div className="mt-2 justify-items-center">
                    <div className="mb-2">
                      <form_1.FormLabel>Estimated Budget</form_1.FormLabel>
                    </div>
                    <div>
                      <form_1.FormControl>
                        <input_1.Input placeholder="" {...field} className="p-2 border-2 border-green-600  mr-4  lg:w-[80%] md:w-[88%]  sm:w-[82%]"/>
                      </form_1.FormControl>
                    </div>
                  </div>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <h1></h1>
            <div className="justify-items-end flex">
              {!pid && (<button_1.Button type="submit" className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white hover:bg-green-700">
                  Submit
                </button_1.Button>)}
              {pid && (<button_1.Button type="submit" className="mt-4 lg:ml-[37%] md:ml-[6%] md:w-[50%] lg:w-[20%]  w-2/6 px-4 py-2 bg-green-600 text-white hover:bg-green-700">
                  Update
                </button_1.Button>)}

              {pid && (<alert_dialog_1.AlertDialog>
                  <alert_dialog_1.AlertDialogTrigger asChild>
                    <button_1.Button className="mt-4 ml-5 px-4 py-2 md:w-[50%] lg:w-[20%] bg-red-600 text-white hover:bg-red-700">
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
