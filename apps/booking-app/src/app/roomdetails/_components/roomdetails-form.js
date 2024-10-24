"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const select_1 = require("@/components/ui/select");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const use_toast_1 = require("@/hooks/use-toast");
const mutation_1 = require("../../bookings/_services/mutation");
const queries_1 = require("../../bookings/_services/queries");
const checkbox_1 = require("@/components/ui/checkbox");
const mutation_2 = require("../_services/mutation");
const queries_2 = require("../_services/queries");
const formSchema = zod_2.z.object({
    roomnumber: zod_2.z.coerce.number().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    id: zod_2.z.number().optional(),
    roomtype: zod_2.z.string().min(2, {
        message: 'You must select a Date',
    }),
    selectedprice: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    price: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    maintenance: zod_2.z.boolean().default(false).optional(),
    roomview: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
const RoomDetailsForm = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const { toast } = (0, use_toast_1.useToast)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            maintenance: false,
        },
    });
    const { control, watch, setValue, getValues, formState: { isDirty, dirtyFields, isSubmitSuccessful }, } = form;
    const updateMutation = (0, mutation_2.useUpdateRoomDetailsMutation)();
    const insertMutation = (0, mutation_2.useInsertRoomDetailsMutation)();
    const deleteMutation = (0, mutation_1.useDeleteBookingMutation)();
    const { data, isLoading, isError, error } = (0, queries_2.useGetRoomDetails)(id);
    (0, react_1.useEffect)(() => {
        form.reset(data);
    }, [data]);
    async function onSubmit(data) {
        const id = getValues('id'); // Check if data already exists
        if (id) {
            // If `id` exists, fetch updated data and display it in frontend
            try {
                let dirtyValues = {};
                // Capture only modified fields
                for (const key in dirtyFields) {
                    dirtyValues[key] = data[key];
                }
                const resMutation = updateMutation.mutate({ id, dirtyValues });
                // Check if update was successful
                if (!updateMutation.isError) {
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Updated successfully.</span>,
                        duration: 5000,
                    });
                }
            }
            catch (error) {
                console.error('Error updating booking:', error);
            }
        }
        else {
            // If no `id`, insert a new booking
            try {
                const responseData = await insertMutation.mutateAsync({ data });
                if (responseData.success) {
                    const newId = responseData.lastInsertRowid;
                    setValue('id', newId, { shouldDirty: false });
                    toast({
                        className: 'text-green-600',
                        title: 'Booking',
                        description: <span>Added successfully.</span>,
                        duration: 2000,
                    });
                    navigate(`/roomdetails/${newId}`);
                    // Fetch the newly inserted booking and display it in the UI
                    const newRoomdetail = data.newRoomdetail;
                    form.reset(newRoomdetail); // Reset the form with new booking data
                }
                else {
                    toast({
                        className: 'text-red-600',
                        title: 'Booking',
                        description: <span>{responseData.msg}</span>,
                        duration: 2000,
                    });
                }
            }
            catch (error) {
                console.error('Error inserting booking:', error);
            }
        }
    }
    const deleteAction = async (id) => {
        if (id) {
            try {
                // console.log("Deleting booking with id:", id);
                const resMutation = deleteMutation.mutate({ id });
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
    // console.log('prevvvvvvvvvvvvvvvvvvvvvvvv', prevItem)
    const getPrevItem = () => {
        if (prevItem && Object.keys(prevItem).length !== 0) {
            navigate(`/booking/${prevItem.id}`);
        }
        else {
            toast({
                className: 'text-blue-600',
                title: 'Document Traverse',
                description: <span>Reached Start of Booking ID</span>,
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
                description: <span>Reached End of Booking ID</span>,
                duration: 2000,
            });
        }
    };
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Room Details </h1>}
        {id && <h1 className="text-2xl font-bold ">Update Room Details</h1>}
        {/* <NavLink to={"list"}>View List</NavLink> */}
        <div className="gap-5 flex">
          {!id && (<button_1.Button onClick={() => navigate('/bookings')} className="bg-green-600">
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
        {id && (<button_1.Button onClick={() => navigate('/roomdetails/add')} className="bg-green-600">
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
                        <form_1.FormLabel>Room No</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="roomtype" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Room Type</form_1.FormLabel>
                        <form_1.FormControl>
                          {/* <Select
                    onValueChange={field.onChange}
                  //   value={field.value || "LKR"}
                  >
                    <SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                      <SelectValue placeholder="select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LKR">LKR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select> */}
                          <select_1.Select onValueChange={field.onChange} value={field.value}>
                            <select_1.SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <select_1.SelectValue placeholder="select type"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                              <select_1.SelectItem value="normal">Normal</select_1.SelectItem>
                              <select_1.SelectItem value="standard">Standard</select_1.SelectItem>
                              <select_1.SelectItem value="deluxe">Deluxe</select_1.SelectItem>
                              <select_1.SelectItem value="suite">Suite</select_1.SelectItem>
                            </select_1.SelectContent>
                          </select_1.Select>
                        </form_1.FormControl>
                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="roomview" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Room View</form_1.FormLabel>
                        <form_1.FormControl>
                          <select_1.Select onValueChange={field.onChange} value={field.value}>
                            <select_1.SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <select_1.SelectValue placeholder="select type"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                              <select_1.SelectItem value="ocean">Ocean</select_1.SelectItem>
                              <select_1.SelectItem value="street">Street</select_1.SelectItem>
                              <select_1.SelectItem value="pool">Pool</select_1.SelectItem>
                            </select_1.SelectContent>
                          </select_1.Select>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <form_1.FormField control={form.control} name="selectedprice" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Selected Price</form_1.FormLabel>
                        <form_1.FormControl>
                          <select_1.Select onValueChange={field.onChange} value={field.value}>
                            <select_1.SelectTrigger className="w-[180px] border-2 border-green-600 bg-white">
                              <select_1.SelectValue placeholder="select type"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                              <select_1.SelectItem value="ro">RO Price</select_1.SelectItem>
                              <select_1.SelectItem value="bb">BB Price</select_1.SelectItem>
                              <select_1.SelectItem value="hb">HB Price</select_1.SelectItem>
                              <select_1.SelectItem value="fb">FB Price</select_1.SelectItem>
                            </select_1.SelectContent>
                          </select_1.Select>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                  <form_1.FormField control={form.control} name="price" render={({ field }) => (<form_1.FormItem>
                        <form_1.FormLabel>Price</form_1.FormLabel>
                        <form_1.FormControl>
                          <input_1.Input type="text" className="rounded border-2 border-green-600 bg-white" placeholder="" {...field}/>
                        </form_1.FormControl>

                        <form_1.FormMessage />
                      </form_1.FormItem>)}/>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  <form_1.FormField control={form.control} name="maintenance" render={({ field }) => (<form_1.FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <form_1.FormControl>
                          <checkbox_1.Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                        </form_1.FormControl>
                        <div className="space-y-1 leading-none">
                          <form_1.FormLabel>
                            This Room Cant't book because of maintenance
                          </form_1.FormLabel>
                          {/* <FormDescription>
                  You can manage your mobile notifications in the{' '}
                  <Link to="/examples/forms">mobile settings</Link>{' '}
                  page.
                </FormDescription> */}
                        </div>
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
exports.default = RoomDetailsForm;
