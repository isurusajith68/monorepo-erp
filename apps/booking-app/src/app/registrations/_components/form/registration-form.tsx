import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
const formSchema = z.object({
  //   id: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  id: z.number().optional(),
  fullname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  telephone: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  province: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  postalcode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const RegistrationForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formData, setFormData] = useState({
    roomnumber: '',
    checkin: '',
    checkout: '',
    telephone: '',
    email: '',
    adultcount: '',
    childrencount: '',
    bookingdate: '',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
    },
  })

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form

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

  const { data, isError, error } = useQuery({
    queryKey: ['registration', id],
    queryFn: async () => {
      let data1
      data1 = await Axios.get(`http://localhost:4000/registration/${id ?? 0}`)
      return data1.data.data

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
  })
  useEffect(() => {
    form.reset(data)
    console.log('firstgggggggggg')
  }, [data])

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
  async function onSubmit(data: any) {
    const id = getValues('id') // Check if data already exists
    console.log('Form data:', data)

    if (id) {
      // If `id` exists, fetch updated data and display it in frontend
      try {
        let dirtyValues: any = {}

        // Capture only modified fields
        for (const key in dirtyFields) {
          dirtyValues[key] = data[key]
        }

        console.log('Dirty Values (Fields to Update):', dirtyValues)

        // Send update request
        const response = await Axios.put(
          `http://localhost:4000/registrations/${id}`,
          dirtyValues,
        )

        // Check if update was successful
        if (response.data.success) {
          toast({
            className: 'text-green-600',
            title: 'registration',
            description: <span>Updated successfully.</span>,
            duration: 5000,
          })

          // Update the UI with the new data (you can handle this as per your frontend logic)
          const updatedData = response.data.updatedRegistration
          // Example: Set updated data into the form
          reset(updatedData)
        }
      } catch (error) {
        console.error('Error updating registration:', error)
      }
    } else {
      // If no `id`, insert a new registration
      try {
        console.log('Inserting new registration:', data)

        const response = await Axios.post(
          'http://localhost:4000/registration',
          data,
        )

        if (response.data.success) {
          const newId = response.data.lastInsertRowid

          // Set the newly inserted id to avoid duplicate insertions
          setValue('id', newId, { shouldDirty: false })

          toast({
            className: 'text-green-600',
            title: 'Registeration',
            description: <span>Added successfully.</span>,
            duration: 2000,
          })

          // Optionally navigate to the registration detail page after successful insert
          navigate(`/registration/${newId}`)

          // Fetch the newly inserted registration and display it in the UI
          const newRegisteration = response.data.newRegisteration
          reset(newRegisteration) // Reset the form with new registration data
        }
      } catch (error) {
        console.error('Error inserting registeration:', error)
      }
    }
  }

  const deleteAction = async (id: number) => {
    if (id) {
      try {
        console.log('Deleting registration with id:', id)

        // Make the DELETE request to the backend API
        await Axios.delete(`http://localhost:4000/deleteregistration/${id}`)

        // Show success toast notification
        toast({
          className: 'text-red-600',
          title: 'Registration',
          description: <span>Deleted successfully..</span>,
          duration: 3000,
        })

        // Navigate to the registration list after deletion
        navigate('/registration/add')
      } catch (error) {
        // Handle any error that occurs during the delete process
        console.error('Error deleting registration:', error)
        toast({
          className: 'text-red-600',
          title: 'Error',
          description: <span>Failed to delete the registration..</span>,
          duration: 3000,
        })
      }
    }
  }

  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        {!id && <h1 className="text-2xl font-bold ">Add Guest Registration</h1>}
        {id && (
          <h1 className="text-2xl font-bold ">Update Guest Registration </h1>
        )}
        {!id && (
          <Button
            onClick={() => navigate('/registrations')}
            className="bg-green-600"
          >
            View List
          </Button>
        )}
        {id && (
          <Button
            onClick={() => navigate('/registration/add')}
            className="bg-green-600"
          >
            + Add
          </Button>
        )}
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className=" w-full grid grid-cols-4 gap-4 ">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                          //   value={formData.email}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telephone</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                          //   value={formData.telephone}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600 bg-white"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-3">
              {!id && (
                <Button type="submit" className="bg-green-600">
                  Save
                </Button>
              )}
              {id && (
                <Button type="submit" className="bg-green-600">
                  Upadte
                </Button>
              )}
              {/* <Button type="button">Close</Button> */}
              {id && (
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="ml-5 bg-green-600 bg-destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your data and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600"
                          onClick={() => {
                            deleteAction(id)
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </form>
        </Form>

        <div></div>
      </div>
    </div>
  )
}

export default RegistrationForm
