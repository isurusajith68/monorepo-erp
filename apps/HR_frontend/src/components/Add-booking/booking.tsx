import React from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";

const formSchema = z.object({
  roomnumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  //   id: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  checkin: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  checkout: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  telephone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  adultcount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  childrencount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bookingdate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function  Booking() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomnumber: "",
    },
  });

  function onSubmit(data: any) {
    // console.log("first")
    const sendData = async () => {
      const response = await Axios.post(
        "http://localhost:4000/booking",
        data
      );
      console.log("response.data", response.data);
    };

    sendData();

    // axios.post("https://reqres.in/api/login", userData).then((response) => {
    //   console.log(response.status, response.data.token);
    // });

    navigate("/");
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
  }
  return (
    <div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Add Booking</h1>
        <NavLink to={"list"}>View List</NavLink>
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
                  name="roomnumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                  name="checkin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-In</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                  name="checkout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-Out</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                          className="rounded border-2 border-green-600"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                  name="adultcount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adult Count</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                  name="childrencount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children Count</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
                  name="bookingdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Date</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="rounded border-2 border-green-600"
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
}
