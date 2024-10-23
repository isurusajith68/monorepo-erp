"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = require("axios");
const use_toast_1 = require("@/hooks/use-toast");
const formSchema = zod_2.z.object({
    id: zod_2.z.number().optional(),
    emname: zod_2.z.string().min(2, {
        message: 'employee name must be at least 2 characters.',
    }),
    ememail: zod_2.z.string().min(2, {
        message: 'employee email must be at least 2 characters.',
    }),
    emmobile: zod_2.z.string().min(2, {
        message: 'employee mobile must be at least 2 characters.',
    }),
    emdesignation: zod_2.z.string().min(2, {
        message: 'employee designation must be at least 2 characters.',
    }),
    emdepartment: zod_2.z.string().min(2, {
        message: 'employee department must be at least 2 characters.',
    }),
    emhiredate: zod_2.z.string().min(2, {
        message: 'You must select a Date',
    }),
    emaddress: zod_2.z.string().min(2, {
        message: 'employee address must be at least 2 characters.',
    }),
    emsalary: zod_2.z.string().min(2, {
        message: 'employee salary must be at least 2 characters.',
    }),
    emstatus: zod_2.z.string().min(2, {
        message: 'employee status must be at least 2 characters.',
    }),
});
const EmployeeForm = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    // const id= params.id;
    const { toast } = (0, use_toast_1.useToast)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {},
    });
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    (0, react_1.useEffect)(() => {
        if (id) {
            const fetchEmployee = async () => {
                try {
                    // Make API request to get customer data by ID
                    const response = await axios_1.default.get(`http://localhost:4000/employee/${id}`);
                    if (response.data.success) {
                        // Reset the form with customer data
                        console.log('id', response.data.data);
                        form.reset(response.data.data);
                    }
                    else {
                        console.error('Employee not found:', response.data.msg);
                    }
                }
                catch (error) {
                    console.error('Error fetching customer:', error);
                }
            };
            fetchEmployee();
        }
    }, [id, form]);
    async function onSubmit(data) {
        const id = getValues('id'); // Check if data already exists
        console.log('Form data:', data);
        if (id) {
            // If `id` exists, fetch updated data and display it in frontend
            try {
                let dirtyValues = {};
                // Capture only modified fields
                for (const key in dirtyFields) {
                    dirtyValues[key] = data[key];
                }
                console.log('Dirty Values (Fields to Update):', dirtyValues);
                // Send update request
                const response = await axios_1.default.put(`http://localhost:4000/employee/${id}`, dirtyValues);
                // Check if update was successful
                if (response.data.success) {
                    toast({
                        className: 'text-green-600',
                        title: 'Employee',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                    // Update the UI with the new data (you can handle this as per your frontend logic)
                    const updatedData = response.data.updatedEmployee;
                    // Example: Set updated data into the form
                    reset(updatedData);
                }
            }
            catch (error) {
                console.error('Error updating employee:', error);
            }
        }
        else {
            // If no `id`, insert a new booking
            try {
                console.log('Inserting new employee:', data);
                const response = await axios_1.default.post('http://localhost:4000/emp', data);
                // console.log("object", data);
                if (response.data.success) {
                    const newId = response.data.lastInsertRowid;
                    // Set the newly inserted id to avoid duplicate insertions
                    setValue('id', newId, { shouldDirty: false });
                    toast({
                        className: 'text-green-600',
                        title: 'Employee',
                        description: <span>Added successfully.</span>,
                        duration: 2000,
                    });
                    // Optionally navigate to the customer detail page after successful insert
                    navigate(`/employee/${newId}`);
                    // Fetch the newly inserted booking and display it in the UI
                    const newEmployee = response.data.newEmployee;
                    reset(newEmployee); // Reset the form with new booking data
                }
            }
            catch (error) {
                console.error('Error inserting employee:', error);
            }
        }
    }
    const deleteAction = async (id) => {
        if (id) {
            try {
                console.log('Deleting employee with id:', id);
                // Make the DELETE request to the backend API
                await axios_1.default.delete(`http://localhost:4000/deleteemploye/${id}`);
                // Show success toast notification
                toast({
                    className: 'text-red-600',
                    title: 'Employee',
                    description: <span>Deleted successfully..</span>,
                    duration: 3000,
                });
                // Navigate to the customer list after deletion
                navigate('/booking/add');
            }
            catch (error) {
                // Handle any error that occurs during the delete process
                console.error('Error deleting employee:', error);
                toast({
                    className: 'text-red-600',
                    title: 'Error',
                    description: <span>Failed to delete the employee..</span>,
                    duration: 3000,
                });
            }
        }
    };
    return (<div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">Add Employee {id}</h1>
        {/* <NavLink to={"list"}>View List</NavLink> */}
        {id && <button_1.Button onClick={() => navigate('/booking/add')}>Add</button_1.Button>}
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      <div className="w-full p-10 mt-5 bg-green-100 border border-green-300 rounded h-2/3 ">
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className="grid w-full grid-cols-4 gap-4 ">
                <form_1.FormField control={form.control} name="emname" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Name</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="ememail" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Email</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="emmobile" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Mobile</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="emdesignation" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Designation</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="emdepartment" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Department</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="emhiredate" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Hire Date</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="date" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>

                <form_1.FormField control={form.control} name="emaddress" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Address</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>

              <form_1.FormField control={form.control} name="emsalary" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Salary</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                    </form_1.FormControl>

                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>

              <form_1.FormField control={form.control} name="emstatus" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Status</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                    </form_1.FormControl>

                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
            </div>

            <div className="flex space-x-3">
              <button_1.Button type="submit">Save</button_1.Button>
              <button_1.Button type="button">Close</button_1.Button>
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
                          Are you sure you want to delete this employee?
                        </alert_dialog_1.AlertDialogTitle>
                        <alert_dialog_1.AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your data and remove your data from our
                          servers.
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
          </form>
        </form_1.Form>

        <div></div>
      </div>
    </div>);
};
exports.default = EmployeeForm;
