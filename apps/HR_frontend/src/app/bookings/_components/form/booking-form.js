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
    roomnumber: zod_2.z.coerce.number().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    //   id: z.string().min(2, {
    //     message: "Username must be at least 2 characters.",
    //   }),
    id: zod_2.z.number().optional(),
    checkin: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    checkout: zod_2.z.string().min(2, {
        message: 'You must select a Date',
    }),
    telephone: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    adultcount: zod_2.z.coerce.number().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    childrencount: zod_2.z.coerce.number().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    bookingdate: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
const BookingForm = () => {
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
            const fetchCustomer = async () => {
                try {
                    // Make API request to get customer data by ID
                    const response = await axios_1.default.get(`http://localhost:4000/booking/${id}`);
                    if (response.data.success) {
                        // Reset the form with customer data
                        console.log('id', response.data.data);
                        form.reset(response.data.data);
                    }
                    else {
                        console.error('Customer not found:', response.data.msg);
                    }
                }
                catch (error) {
                    console.error('Error fetching customer:', error);
                }
            };
            fetchCustomer();
        }
    }, [id, form]);
    //   function onSubmit(data: any) {
    //     // // console.log("first")
    //     // const sendData = async () => {
    //     //   const response = await Axios.post(
    //     //     "http://localhost:4000/booking",
    //     //     data
    //     //   );
    //     //   console.log("response.data", response.data);
    //     // };
    //     // sendData();
    //     // // axios.post("https://reqres.in/api/login", userData).then((response) => {
    //     // //   console.log(response.status, response.data.token);
    //     // // });
    //     // // navigate("/");
    //     // // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
    //     // toast({
    //     //     className: "text-green-600",
    //     //     title: "Booking",
    //     //     description: <span>Added successfully..</span>,
    //     //     duration: 2000,
    //     //   })
    //     console.log("data", data);
    //     const id = getValues("id"); // this checks if the data already exists in the database
    //     if (id) {
    //       // If an `id` exists, update the customer with only the changed fields (dirtyFields)
    //       let dirtyValues: any = {};
    //       for (const key in dirtyFields) {
    //         dirtyValues[key] = data[key];
    //       }
    //       console.log("dirtyValues", dirtyValues);
    //     //   await updateCustomer(dirtyValues, id.toString());
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
    //           "http://localhost:4000/customer",
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
                const response = await axios_1.default.put(`http://localhost:4000/bookings/${id}`, dirtyValues);
                // Check if update was successful
                if (response.data.success) {
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                    // Update the UI with the new data (you can handle this as per your frontend logic)
                    const updatedData = response.data.updatedBooking;
                    // Example: Set updated data into the form
                    reset(updatedData);
                }
            }
            catch (error) {
                console.error('Error updating booking:', error);
            }
        }
        else {
            // If no `id`, insert a new booking
            try {
                console.log('Inserting new booking:', data);
                const response = await axios_1.default.post('http://localhost:4000/booking', data);
                if (response.data.success) {
                    const newId = response.data.lastInsertRowid;
                    // Set the newly inserted id to avoid duplicate insertions
                    setValue('id', newId, { shouldDirty: false });
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Added successfully.</span>,
                        duration: 2000,
                    });
                    // Optionally navigate to the customer detail page after successful insert
                    navigate(`/booking/${newId}`);
                    // Fetch the newly inserted booking and display it in the UI
                    const newBooking = response.data.newBooking;
                    reset(newBooking); // Reset the form with new booking data
                }
            }
            catch (error) {
                console.error('Error inserting booking:', error);
            }
        }
    }
    //   const deleteAction = async (id) => {
    //     if (id) {
    //       try {
    //         console.log("Deleting customer with id:", id);
    //         // Make the DELETE request to the backend API
    //         await Axios.delete(`http://localhost:4000/deletecustomers/${id}`);
    //         // Show success toast notification
    //         toast({
    //           className: "text-red-600",
    //           title: "Customer",
    //           description: <span>Deleted successfully..</span>,
    //           duration: 3000,
    //         });
    //         // Navigate to the customer list after deletion
    //         navigate("/booking/add");
    //       } catch (error) {
    //         // Handle any error that occurs during the delete process
    //         console.error("Error deleting customer:", error);
    //         toast({
    //           className: "text-red-600",
    //           title: "Error",
    //           description: <span>Failed to delete the customer..</span>,
    //           duration: 3000,
    //         });
    //       }
    //     }
    //   };
    const deleteAction = async (id) => {
        if (id) {
            try {
                console.log('Deleting booking with id:', id);
                // Make the DELETE request to the backend API
                await axios_1.default.delete(`http://localhost:4000/deletebooking/${id}`);
                // Show success toast notification
                toast({
                    className: 'text-red-600',
                    title: 'Booking',
                    description: <span>Deleted successfully..</span>,
                    duration: 3000,
                });
                // Navigate to the customer list after deletion
                navigate('/booking/add');
            }
            catch (error) {
                // Handle any error that occurs during the delete process
                console.error('Error deleting customer:', error);
                toast({
                    className: 'text-red-600',
                    title: 'Error',
                    description: <span>Failed to delete the customer..</span>,
                    duration: 3000,
                });
            }
        }
    };
    return (<div>
      <div className="flex items-center justify-between mt-5 ml-10">
        <h1 className="text-2xl font-bold ">Add Booking {id}</h1>
        {/* <NavLink to={"list"}>View List</NavLink> */}
        {id && <button_1.Button onClick={() => navigate('/booking/add')}>Add</button_1.Button>}
      </div>
      <hr className="mt-5 ml-10 border-2 border-green-300"></hr>

      <div className="w-full p-10 mt-5 bg-green-100 border border-green-300 rounded h-2/3 ">
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className="grid w-full grid-cols-4 gap-4 ">
                <form_1.FormField control={form.control} name="roomnumber" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Room Number</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="checkin" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Check-In</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="date" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="checkout" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Check-Out</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="date" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="telephone" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Telephone</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
              <div className="grid w-full grid-cols-4 gap-4">
                <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Email</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="adultcount" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Adult Count</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="childrencount" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Children Count</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="bookingdate" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Booking Date</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="date" className="bg-white border-2 border-green-600 rounded" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
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
exports.default = BookingForm;
