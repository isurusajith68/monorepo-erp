import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'

const FormSchema = z.object({
  firstname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  middlename: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phonenumber: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  nic: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address1: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address2: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  district: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  companyname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  modules: z.object({
    booking: z.boolean().default(false),
    finance: z.boolean().default(false),
    inventory: z.boolean().default(false),
    templates: z.boolean().default(false),
    hr: z.boolean().default(false),
    authentication: z.boolean().default(false),
    admin: z.boolean().default(false),
  }),
})

const ProjectBanner = () => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyname: '',
      email: '',
      phonenumber: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // try {
    //   const response = await axios.post(
    //     `http://localhost:4000/erp/erpcreate`,
    //     data,
    //   )

    //   toast({
    //     title: 'You submitted the following values:',
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     ),
    //   })

    //   form.reset()
    //   setOpen(false)
    // } catch (error) {
    //   console.error('Error submitting form:', error)
    //   // Handle error here, such as showing an error message to the user
    // }
    console.log('aaaaaaaaaaaaaaaaa', data)

    try {
      const response = await axios.post(
        `http://localhost:4000/erp/erpcreate`,
        data,
      )
      console.log('response', response)

      // Show success toast
      toast({
        title: 'Success',
        description: 'Form details saved successfully!',
      })

      // Reset form if necessary
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error('Error saving form data:', error)
      toast({
        title: 'Error',
        description: 'Failed to save form details.',
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white p-8 md:p-16 rounded-lg shadow-lg max-w-5xl mx-auto my-8">
      {/* Left Section: Text */}
      <div className="flex-1 space-y-4 md:mr-8">
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight text-center">
          Streamline Your Hotel Oparations With Us{' '}
          {/*<span className="text-blue-600">Monitoring!</span>*/}
        </h1>
        <p className="text-gray-700 text-lg text-center ">
          Transform your hotel with our comprehensive ERP solution. Manage
          everything from one place.
        </p>
        {/* Call-to-Action Buttons */}
        <div className="flex  mt-4 justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition "
                onClick={() => setOpen(true)}
              >
                Create Organization →
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] ">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center font-bold">
                  Create Organization
                </DialogTitle>
                <DialogDescription className="text-center">
                  Add details of your organization. Click 'Send Request' when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              {/* <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Company Name
                  </Label>
                  <Input className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Email
                  </Label>
                  <Input className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Phone Number
                  </Label>
                  <Input className="col-span-3" />
                </div>
              </div> */}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" space-y-1 "
                >
                  <div className="w-full grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="middlename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIC</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address 2</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Module Selection Section */}
                  <div className="w-full mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Module Selection
                    </h3>
                    <div className="grid grid-cols-6 gap-4">
                      <FormField
                        control={form.control}
                        name="modules.booking"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Booking</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.finance"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Finance</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.inventory"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Inventory</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.templates"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">
                              Web Templates
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.hr"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Hr</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.authentication"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">
                              Authentication
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="modules.admin"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value} // Use `checked` instead of `value`
                                onCheckedChange={field.onChange} // onCheckedChange is typically used with boolean values in some UI libraries
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Admin</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="justify-center">
                    <Button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700"
                    >
                      Send Request
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* <button className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
            Learn More
          </button> */}
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 mt-8 md:mt-0">
        <img
          src="Auditing-Assurance.jpg" // Replace with your image URL or import an image
          alt="Project Monitoring"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default ProjectBanner
