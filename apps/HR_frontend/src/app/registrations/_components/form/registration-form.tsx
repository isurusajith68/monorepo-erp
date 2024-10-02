import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
const formSchema = z.object({
  //   id: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  id: z.number().optional(),
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  telephone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  province: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  postalcode: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const RegistrationForm = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
    },
  });

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          // Make API request to get customer data by ID
          const response = await Axios.get(
            `http://localhost:4000/registration/${id}`
          );
          if (response.data.success) {
            // Reset the form with customer data
            console.log("id", response.data.data);
            form.reset(response.data.data);
          } else {
            console.error("Customer not found:", response.data.msg);
          }
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

      fetchCustomer();
    }
  }, [id, form]);

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
    const id = getValues("id"); // Check if data already exists
    console.log("Form data:", data);

    if (id) {
      // If `id` exists, fetch updated data and display it in frontend
      try {
        let dirtyValues: any = {};

        // Capture only modified fields
        for (const key in dirtyFields) {
          dirtyValues[key] = data[key];
        }

        console.log("Dirty Values (Fields to Update):", dirtyValues);

        // Send update request
        const response = await Axios.put(
          `http://localhost:4000/registrations/${id}`,
          dirtyValues
        );

        // Check if update was successful
        if (response.data.success) {
          toast({
            className: "text-green-600",
            title: "Customer",
            description: <span>Updated successfully.</span>,
            duration: 5000,
          });

          // Update the UI with the new data (you can handle this as per your frontend logic)
          const updatedData = response.data.updatedRegistration;
          // Example: Set updated data into the form
          reset(updatedData);
        }
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    } else {
      // If no `id`, insert a new customer
      try {
        console.log("Inserting new customer:", data);

        const response = await Axios.post(
          "http://localhost:4000/registration",
          data
        );

        if (response.data.success) {
          const newId = response.data.lastInsertRowid;

          // Set the newly inserted id to avoid duplicate insertions
          setValue("id", newId, { shouldDirty: false });

          toast({
            className: "text-green-600",
            title: "Customer",
            description: <span>Added successfully.</span>,
            duration: 2000,
          });

          // Optionally navigate to the customer detail page after successful insert
          navigate(`/registration/${newId}`);

          // Fetch the newly inserted customer and display it in the UI
          const newCustomer = response.data.newCustomer;
          reset(newCustomer); // Reset the form with new customer data
        }
      } catch (error) {
        console.error("Error inserting customer:", error);
      }
    }
  }
  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Guest Registration {id}</h1>
        { id && <Button onClick={() => navigate("/registration/add")}>Add</Button>}
        {/* <Button>View List</Button> */}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

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
              <Button type="submit">Save</Button>
              <Button type="button">Close</Button>
            </div>
          </form>
        </Form>

        <div></div>
      </div>
    </div>
  );
};

export default RegistrationForm;
