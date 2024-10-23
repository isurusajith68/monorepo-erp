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
const use_toast_1 = require("@/hooks/use-toast");
const mutation_1 = require("../../_services/mutation");
const queries_1 = require("../../_services/queries");
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
    roomprice: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
// const fetchBookingData = async (id?:string) => {
//     const { data } = await Axios.get(`http://localhost:4000/booking/${id?? 0}`);
//     console.log("firstfetchhhh",data)
//     return data.data;
// };
const BookingForm = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    // const id= params.id;
    const { toast } = (0, use_toast_1.useToast)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {},
    });
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isSubmitSuccessful }, } = form;
    const updateMutation = (0, mutation_1.useUpdateBookingMutation)();
    const insertMutation = (0, mutation_1.useInsertBookingMutation)();
    const deleteMutation = (0, mutation_1.useDeleteBookingMutation)();
    //   useEffect(() => {
    //     if (id) {
    //       const fetchBooking = async () => {
    //         try {
    //           // Make API request to get booking data by ID
    //           const response = await Axios.get(
    //             `http://localhost:4000/booking/${id}`
    //           );
    //           if (response.data.success) {
    //             // Reset the form with booking data
    //             console.log("id", response.data.data);
    //             form.reset(response.data.data);
    //           } else {
    //             console.error("booking not found:", response.data.msg);
    //           }
    //         } catch (error) {
    //           console.error("Error fetching booking:", error);
    //         }
    //       };
    //       fetchBooking();
    //     }
    //   }, [id, form]);
    // const { isPending , error, data } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>  Axios.get(`http://localhost:4000/booking/${id}`)
    //   })
    // console.log("qqq")
    const { data, isLoading, isError, error } = (0, queries_1.useGetBooking)(id);
    // const { data, isLoading, isError, error } = useQuery({
    //   queryKey: ["booking", id],
    //   queryFn: async () => {
    //     let data1;
    //     data1 = await Axios.get(`http://localhost:4000/booking/${id ?? 0}`);
    //     return data1.data.data;
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
    //     // return fetchBookingData(id)
    //   },
    // });
    (0, react_1.useEffect)(() => {
        form.reset(data);
        // console.log("firstgggggggggg",data);
    }, [data]);
    //------------------------------------------------------------------------------------------------
    // function onSubmit(data: any) {
    //   // // console.log("first")
    //   // const sendData = async () => {
    //   //   const response = await Axios.post(
    //   //     "http://localhost:4000/booking",
    //   //     data
    //   //   );
    //   //   console.log("response.data", response.data);
    //   // };
    //   // sendData();
    //   // // axios.post("https://reqres.in/api/login", userData).then((response) => {
    //   // //   console.log(response.status, response.data.token);
    //   // // });
    //   // // navigate("/");
    //   // // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
    //   // toast({
    //   //     className: "text-green-600",
    //   //     title: "Booking",
    //   //     description: <span>Added successfully..</span>,
    //   //     duration: 2000,
    //   //   })
    //   console.log("data", data);
    //   const id = getValues("id"); // this checks if the data already exists in the database
    //   if (id) {
    //     // If an `id` exists, update the customer with only the changed fields (dirtyFields)
    //     let dirtyValues: any = {};
    //     for (const key in dirtyFields) {
    //       dirtyValues[key] = data[key];
    //     }
    //     console.log("dirtyValues", dirtyValues);
    //   //   await updateCustomer(dirtyValues, id.toString());
    //     toast({
    //       className: "text-green-600",
    //       title: "Customer",
    //       description: <span>Updated successfully..</span>,
    //       duration: 5000,
    //     });
    //   } else {
    //     // If no `id` exists, insert a new customer and get the new `id`
    //     console.log(data);
    //     const sendData = async () => {
    //       const response = await Axios.post(
    //         "http://localhost:4000/customer",
    //         data
    //       );
    //       console.log("response.data", response.data);
    //     };
    //     sendData();
    //     setValue("id", objId.lastInsertRowid, { shouldDirty: false }); // Set the `id` to avoid adding the same data again
    //     toast({
    //       className: "text-green-600",
    //       title: "Customer",
    //       description: <span>Added successfully..</span>,
    //       duration: 2000,
    //     });
    //     // After inserting, use the newly generated `id`
    //     navigate(`/customers/${objId.lastInsertRowid}`);
    //   }
    // }
    // async function onSubmit(data: any) {
    //   const id = getValues("id"); // Check if data already exists
    //   console.log("Form data:", data);
    //   if (id) {
    //     // If `id` exists, fetch updated data and display it in frontend
    //     try {
    //       let dirtyValues: any = {};
    //       // Capture only modified fields
    //       for (const key in dirtyFields) {
    //         dirtyValues[key] = data[key];
    //       }
    //       console.log("Dirty Values (Fields to Update):", dirtyValues);
    //       // Use mutateAsync for update mutation
    //       const resMutation = await updateMutation.mutateAsync({ id, dirtyValues });
    //       console.log("Update resMutation:", resMutation);
    //       // Check if the update was successful
    //       if (resMutation && !updateMutation.isError) {
    //         toast({
    //           className: "text-green-600",
    //           title: "Booking",
    //           description: <span>Updated successfully.</span>,
    //           duration: 5000,
    //         });
    //         // Optionally reset the form with updated data (if returned by the API)
    //         const updatedData = resMutation.updatedBooking;
    //         form.reset(updatedData);
    //       }
    //     } catch (error) {
    //       console.error("Error updating booking:", error);
    //     }
    //   } else {
    //     // If no `id`, insert a new booking
    //     try {
    //       // Use mutateAsync for insert mutation
    //       const resMutation = await insertMutation.mutateAsync({ data });
    //       console.log("Insert resMutation:", resMutation);
    //       // Check if the insertion was successful
    //       if (resMutation && insertMutation.isSuccess) {
    //         const newId = resMutation.lastInsertRowid;
    //         console.log("Newly inserted ID:", newId);
    //         // Set the newly inserted id to avoid duplicate insertions
    //         setValue("id", newId, { shouldDirty: false });
    //         toast({
    //           className: "text-green-600",
    //           title: "Booking",
    //           description: <span>Added successfully.</span>,
    //           duration: 2000,
    //         });
    //         // Optionally navigate to the booking detail page after successful insert
    //         navigate(`/booking/${newId}`);
    //         // Fetch the newly inserted booking and display it in the UI
    //         const newBooking = resMutation.newBooking;
    //         form.reset(newBooking); // Reset the form with new booking data
    //       }
    //     } catch (error) {
    //       console.error("Error inserting booking:", error);
    //     }
    //   }
    // }
    async function onSubmit(data) {
        const id = getValues('id'); // Check if data already exists
        // console.log("Form data:", data);
        if (id) {
            // If `id` exists, fetch updated data and display it in frontend
            try {
                let dirtyValues = {};
                // Capture only modified fields
                for (const key in dirtyFields) {
                    dirtyValues[key] = data[key];
                }
                // console.log("Dirty Values (Fields to Update):", dirtyValues);
                // const mutation = useMutation({
                //     mutationFn: () => {
                //       return Axios.put(`http://localhost:4000/bookings/${id}`, dirtyValues);
                //     },
                //   });
                // Send update request
                // const response = await Axios.put(
                //   `http://localhost:4000/bookings/${id}`,
                //   dirtyValues
                // );
                const resMutation = updateMutation.mutate({ id, dirtyValues });
                // console.log("Inserting new resMutation:", resMutation);
                // console.log("Inserting new booking:", updateMutation);
                // Check if update was successful
                if (!updateMutation.isError) {
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                    // Update the UI with the new data (you can handle this as per your frontend logic)
                    //   const updatedData = response.data.updatedBooking;
                    //   // Example: Set updated data into the form
                    //   form.reset(updatedData);
                }
            }
            catch (error) {
                console.error('Error updating booking:', error);
            }
        }
        else {
            // If no `id`, insert a new booking
            try {
                // const resMutation = insertMutation.mutate({ data });
                // console.log("Inserting new resMutation:", resMutation);
                // console.log("Inserting new booking:", insertMutation);
                const responseData = await insertMutation.mutateAsync({ data });
                // console.log("Response Data from Mutation:", responseData);
                // const response = await Axios.post(
                //   "http://localhost:4000/booking",
                //   data
                // );
                if (responseData.success) {
                    const newId = responseData.lastInsertRowid;
                    // console.log("first",responseData.lastInsertRowid)
                    // Set the newly inserted id to avoid duplicate insertions
                    setValue('id', newId, { shouldDirty: false });
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Added successfully.</span>,
                        duration: 2000,
                    });
                    // console.log("idddddddddddddddddddddddddddd",newId)
                    // Optionally navigate to the booking detail page after successful insert
                    navigate(`/booking/${newId}`);
                    // Fetch the newly inserted booking and display it in the UI
                    const newBooking = data.newBooking;
                    form.reset(newBooking); // Reset the form with new booking data
                }
                // if (response.data.success) {
                //   const newId = response.data.lastInsertRowid;
                //   // Set the newly inserted id to avoid duplicate insertions
                //   setValue("id", newId, { shouldDirty: false });
                //   toast({
                //     className: "text-green-600",
                //     title: "Booking",
                //     description: <span>Added successfully.</span>,
                //     duration: 2000,
                //   });
                //   // Optionally navigate to the booking detail page after successful insert
                //   navigate(`/booking/${newId}`);
                //   // Fetch the newly inserted booking and display it in the UI
                //   const newBooking = response.data.newBooking;
                //   form.reset(newBooking); // Reset the form with new booking data
                // }
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
                // console.log("Deleting booking with id:", id);
                const resMutation = deleteMutation.mutate({ id });
                // Make the DELETE request to the backend API
                // await Axios.delete(`http://localhost:4000/bookings/delete/${id}`)
                // Show success toast notification
                toast({
                    className: 'text-red-600',
                    title: 'Booking',
                    description: <span>Deleted successfully..</span>,
                    duration: 3000,
                });
                // Navigate to the booking list after deletion
                navigate('/booking/add');
            }
            catch (error) {
                // Handle any error that occurs during the delete process
                console.error('Error deleting booking:', error);
                toast({
                    className: 'text-red-600',
                    title: 'Error',
                    description: <span>Failed to delete the booking..</span>,
                    duration: 3000,
                });
            }
        }
    };
    const { data: prevItem, isLoading: prevLoading, error: prevError, } = (0, queries_1.useGetPrevBooking)(id);
    console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem);
    const getPrevItem = () => {
        if (prevItem && Object.keys(prevItem).length !== 0) {
            navigate(`/booking/${prevItem.id}`);
        }
        else {
            toast({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of Customer ID</span>,
                duration: 2000,
            });
        }
    };
    const { data: nextItem } = (0, queries_1.useGetNextBooking)(id);
    const getNextItem = () => {
        if (nextItem && Object.keys(nextItem).length !== 0) {
            navigate(`/booking/${nextItem.id}`);
        }
        else {
            toast({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached End of Customer ID</span>,
                duration: 2000,
            });
        }
    };
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Booking </h1>}
        {id && <h1 className="text-2xl font-bold ">Update Booking </h1>}
        {/* <NavLink to={"list"}>View List</NavLink> */}
        <div className="gap-5 flex">
          <button_1.Button onClick={() => navigate('/bookings')} className="bg-green-600">
            View List
          </button_1.Button>
          {id && (<div className="gap-5 flex">
              <button_1.Button className="  bg-green-600" type="button" onClick={getPrevItem}>
                previous
              </button_1.Button>
              <button_1.Button className="  bg-green-600" type="button" onClick={getNextItem}>
                next
              </button_1.Button>
            </div>)}
        </div>
        {!id && (<button_1.Button onClick={() => navigate('/booking/add')} className="bg-green-600">
            + Add
          </button_1.Button>)}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      {isLoading || updateMutation.isPending || prevLoading ? (<div> loading...</div>) : (<div className="mt-5 w-full h-2/3 bg-green-100 rounded border border-green-300 p-10 ">
          <form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="flex flex-col space-y-8 ">
                <div className=" w-full grid grid-cols-3 gap-4 ">
                  <form_1.FormField control={form.control} name="roomnumber" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Room Number</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="checkin" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Check-In</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="date" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field} value={field.value
                    ? new Date(field.value)
                        .toISOString()
                        .split('T')[0]
                    : ''}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="checkout" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Check-Out</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="date" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field} value={field.value
                    ? new Date(field.value)
                        .toISOString()
                        .split('T')[0]
                    : ''}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <form_1.FormField control={form.control} name="adultcount" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Adult Count</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="childrencount" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Children Count</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="bookingdate" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Booking Date</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="date" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field} value={field.value
                    ? new Date(field.value)
                        .toISOString()
                        .split('T')[0]
                    : ''}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <form_1.FormField control={form.control} name="telephone" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Telephone</form_1.FormLabel>
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
                  <form_1.FormField control={form.control} name="roomprice" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Room Price</form_1.FormLabel>
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
                    update
                  </button_1.Button>)}
                {/* <Button type="button">Close</Button> */}
                {id && (<div>
                    <alert_dialog_1.AlertDialog>
                      <alert_dialog_1.AlertDialogTrigger asChild>
                        <button_1.Button className=" bg-green-600 bg-destructive">
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
        </div>)}
    </div>);
};
exports.default = BookingForm;
