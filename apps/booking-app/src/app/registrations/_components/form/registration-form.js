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
const axios_1 = require("axios");
const use_toast_1 = require("@/hooks/use-toast");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
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
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            fullname: '',
        },
    });
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    //   useEffect(() => {
    //     if (id) {
    //       const fetchRegistration = async () => {
    //         try {
    //           // Make API request to get registration data by ID
    //           const response = await Axios.get(
    //             `http://localhost:4000/registration/${id}`
    //           );
    //           if (response.data.success) {
    //             // Reset the form with registration data
    //             console.log("id", response.data.data);
    //             form.reset(response.data.data);
    //           } else {
    //             console.error("registration not found:", response.data.msg);
    //           }
    //         } catch (error) {
    //           console.error("Error fetching registration:", error);
    //         }
    //       };
    //       fetchRegistration();
    //     }
    //   }, [id]);
    const { data, isError, error } = (0, react_query_1.useQuery)({
        queryKey: ['registration', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`http://localhost:4000/registration/${id ?? 0}`);
            return data1.data.data;
            // let data
            // setTimeout(async() => {
            //    data = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
            //    return data.data;
            // }, 2000);
            // const p = new Promise((resolve) => {
            //     setTimeout(async() => {
            //        const data = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
            //        console.log("data",data.data.data)
            //         resolve(data.data.data);
            //     }, 2000);
            // })
            // return p
            // return fetchBookingData(id)
        },
    });
    (0, react_1.useEffect)(() => {
        form.reset(data);
        console.log('firstgggggggggg');
    }, [data]);
    //   useEffect(() => {
    //     if (phoneNumber.length > 0) {
    //       Axios.get(`http://localhost:4000/booking-by-phone/${phoneNumber}`)
    //         .then((response) => {
    //           if (response.data.success) {
    //             setFormData(response.data.data); // Populate form with data
    //           } else {
    //             console.log('No booking found');
    //           }
    //         })
    //         .catch((error) => {
    //           console.error('Error fetching data:', error);
    //         });
    //     }
    //   }, [phoneNumber]);
    //   function onSubmit(data: z.infer<typeof formSchema>) {
    //     // axios.post("https://reqres.in/api/login", userData).then((response) => {
    //     //   console.log(response.status, response.data.token);
    //     // });
    //     // navigate("/");
    //     // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
    //     // toast({
    //     //   className: "text-green-600",
    //     //   title: "Registration",
    //     //   description: <span>Added successfully..</span>,
    //     //   duration: 2000,
    //     // });
    //     //from next js
    //     console.log("data", data);
    //     const id = getValues("id"); // this checks if the data already exists in the database
    //     if (id) {
    //       // If an `id` exists, update the customer with only the changed fields (dirtyFields)
    //       let dirtyValues: any = {};
    //       for (const key in dirtyFields) {
    //         dirtyValues[key] = data[key];
    //       }
    //       console.log("dirtyValues", dirtyValues);
    //       //   await updateCustomer(dirtyValues, id.toString());
    //       toast({
    //         className: "text-green-600",
    //         title: "Customer",
    //         description: <span>Updated successfully..</span>,
    //         duration: 5000,
    //       });
    //     } else {
    //       // If no `id` exists, insert a new customer and get the new `id`
    //       console.log(data);
    //       const sendData = async () => {
    //         const response = await Axios.post(
    //           "http://localhost:4000/registration",
    //           data
    //         );
    //         console.log("response.data", response.data);
    //       };
    //       sendData();
    //       setValue("id", objId.lastInsertRowid, { shouldDirty: false }); // Set the `id` to avoid adding the same data again
    //       toast({
    //         className: "text-green-600",
    //         title: "Customer",
    //         description: <span>Added successfully..</span>,
    //         duration: 2000,
    //       });
    //       // After inserting, use the newly generated `id`
    //       navigate(`/customers/${objId.lastInsertRowid}`);
    //     }
    //   }
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
                const response = await axios_1.default.put(`http://localhost:4000/registrations/${id}`, dirtyValues);
                // Check if update was successful
                if (response.data.success) {
                    toast({
                        className: 'text-green-600',
                        title: 'registration',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                    // Update the UI with the new data (you can handle this as per your frontend logic)
                    const updatedData = response.data.updatedRegistration;
                    // Example: Set updated data into the form
                    reset(updatedData);
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
                const response = await axios_1.default.post('http://localhost:4000/registration', data);
                if (response.data.success) {
                    const newId = response.data.lastInsertRowid;
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
                    const newRegisteration = response.data.newRegisteration;
                    reset(newRegisteration); // Reset the form with new registration data
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
                await axios_1.default.delete(`http://localhost:4000/deleteregistration/${id}`);
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
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Guest Registration</h1>}
        {id && (<h1 className="text-2xl font-bold ">Update Guest Registration </h1>)}
        {!id && (<button_1.Button onClick={() => navigate('/registrations')} className="bg-green-600">
            View List
          </button_1.Button>)}
        {id && (<button_1.Button onClick={() => navigate('/registration/add')} className="bg-green-600">
            + Add
          </button_1.Button>)}
        {/* <Button>View List</Button> */}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      {/* <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mr-4 mt-5 p-2 border-2 border-green-600 rounded"
        /> */}

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
exports.default = RegistrationForm;
