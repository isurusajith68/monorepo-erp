"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const use_toast_1 = require("@/hooks/use-toast");
const react_1 = require("react");
const queries_1 = require("../../services/queries");
const mutation_1 = require("../../services/mutation");
const formSchema = zod_2.z.object({
    //   id: z.string().min(2, {
    //     message: "Username must be at least 2 characters.",
    //   }),
    id: zod_2.z.number().optional(),
    fullname: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    address: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    telephone: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    city: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    province: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    country: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    postalcode: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
const RegistrationForm = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { toast } = (0, use_toast_1.useToast)();
    const [phoneNumber, setPhoneNumber] = (0, react_1.useState)('');
    const [formData, setFormData] = (0, react_1.useState)({
        roomnumber: '',
        checkin: '',
        checkout: '',
        telephone: '',
        email: '',
        adultcount: '',
        childrencount: '',
        bookingdate: '',
    });
    const updateMutation = (0, mutation_1.useUpdateRegistrationMutation)();
    const insertMutation = (0, mutation_1.useInsertRegistrationMutation)();
    const deleteMutation = (0, mutation_1.useDeleteRegistrationMutation)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            fullname: '',
        },
    });
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    const { data, isError, error } = (0, queries_1.useGetRegistrations)(id);
    (0, react_1.useEffect)(() => {
        form.reset(data);
        console.log('firstgggggggggg');
    }, [data]);
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
                const resMutation = updateMutation.mutate({ id, dirtyValues });
                // Check if update was successful
                if (updateMutation.isSuccess) {
                    toast({
                        className: 'text-green-600',
                        title: 'registration',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                }
            }
            catch (error) {
                console.error('Error updating registration:', error);
            }
        }
        else {
            // If no `id`, insert a new registration
            try {
                console.log('Inserting new registration:', data);
                const responseData = await insertMutation.mutateAsync({ data });
                if (responseData.success) {
                    const newId = responseData.lastInsertRowid;
                    // Set the newly inserted id to avoid duplicate insertions
                    setValue('id', newId, { shouldDirty: false });
                    toast({
                        className: 'text-green-600',
                        title: 'Registeration',
                        description: <span>Added successfully.</span>,
                        duration: 2000,
                    });
                    // Optionally navigate to the registration detail page after successful insert
                    navigate(`/registration/${newId}`);
                    // Fetch the newly inserted registration and display it in the UI
                    const newRegisteration = data.newRegisteration;
                    form.reset(newRegisteration); // Reset the form with new registration data
                }
            }
            catch (error) {
                console.error('Error inserting registeration:', error);
            }
        }
    }
    const deleteAction = async (id) => {
        if (id) {
            try {
                console.log('Deleting registration with id:', id);
                // Make the DELETE request to the backend API
                const resMutation = deleteMutation.mutate({ id });
                // Show success toast notification
                toast({
                    className: 'text-red-600',
                    title: 'Registration',
                    description: <span>Deleted successfully..</span>,
                    duration: 3000,
                });
                // Navigate to the registration list after deletion
                navigate('/registration/add');
            }
            catch (error) {
                // Handle any error that occurs during the delete process
                console.error('Error deleting registration:', error);
                toast({
                    className: 'text-red-600',
                    title: 'Error',
                    description: <span>Failed to delete the registration..</span>,
                    duration: 3000,
                });
            }
        }
    };
    const { data: prevItem, isLoading: prevLoading, error: prevError, } = (0, queries_1.useGetPrevRegistration)(id);
    // console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem)
    const getPrevItem = () => {
        if (prevItem && Object.keys(prevItem).length !== 0) {
            navigate(`/registration/${prevItem.id}`);
        }
        else {
            toast({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of registration ID</span>,
                duration: 2000,
            });
        }
    };
    const { data: nextItem } = (0, queries_1.useGetNextRegistraion)(id);
    const getNextItem = () => {
        if (nextItem && Object.keys(nextItem).length !== 0) {
            navigate(`/registration/${nextItem.id}`);
        }
        else {
            toast({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached End of registration ID</span>,
                duration: 2000,
            });
        }
    };
    const { data: getphonedata, isFetched } = (0, queries_1.useGetPhoneNumber)(phoneNumber);
    console.log('first', getphonedata);
    (0, react_1.useEffect)(() => {
        if (isFetched && getphonedata) {
            setValue('telephone', getphonedata.telephone || '');
            setValue('email', getphonedata.email || '');
        }
    }, [isFetched, getphonedata]);
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Guest Registration</h1>}
        {id && (<h1 className="text-2xl font-bold ">Update Guest Registration </h1>)}
        <div className="gap-5 flex">
          {!id && (<button_1.Button onClick={() => navigate('/registrations')} className="bg-green-600">
              View List
            </button_1.Button>)}
          {id && (<div className="gap-5 flex">
              <button_1.Button className="  bg-green-600" type="button" onClick={getPrevItem}>
                previous
              </button_1.Button>
              <button_1.Button className="  bg-green-600" type="button" onClick={getNextItem}>
                next
              </button_1.Button>
            </div>)}
        </div>
        {id && (<button_1.Button onClick={() => navigate('/registration/add')} className="bg-green-600">
            + Add
          </button_1.Button>)}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      {!id && (<input type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mr-4 mt-5 p-2 border-2 border-green-600 rounded"/>)}

      <div className="mt-5 w-full h-2/3 bg-green-100 rounded border border-green-300 p-10 ">
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className=" w-full grid grid-cols-4 gap-4 ">
                <form_1.FormField control={form.control} name="fullname" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Full Name</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="address" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Address</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Email</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="telephone" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Telephone</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
              <div className="w-full grid grid-cols-4 gap-4">
                <form_1.FormField control={form.control} name="city" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>City</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="province" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Province</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="country" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Country</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="postalcode" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Postal Code</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
            </div>

            <div className="flex space-x-3">
              {!id && (<button_1.Button type="submit" className="bg-green-600">
                  Save
                </button_1.Button>)}
              {id && (<button_1.Button type="submit" className="bg-green-600">
                  Upadte
                </button_1.Button>)}
              {/* <Button type="button">Close</Button> */}
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
                          This action cannot be undone. This will permanently
                          delete your data and remove your data from our
                          servers.
                        </alert_dialog_1.AlertDialogDescription>
                      </alert_dialog_1.AlertDialogHeader>
                      <alert_dialog_1.AlertDialogFooter>
                        <alert_dialog_1.AlertDialogCancel>Cancel</alert_dialog_1.AlertDialogCancel>
                        <alert_dialog_1.AlertDialogAction className="bg-red-600" onClick={() => {
                deleteAction(Number(id));
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
exports.default = RegistrationForm;
