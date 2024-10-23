"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailRowSchema = void 0;
exports.default = FormVendors;
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const use_toast_1 = require("@/components/ui/use-toast");
const react_1 = require("react");
const vendor_actions_1 = require("./vendor-actions");
const navigation_1 = require("next/navigation");
exports.detailRowSchema = zod_2.z.object({
    id: zod_2.z.coerce.number().optional(),
    item: zod_2.z.string().optional(),
    quantity: zod_2.z.coerce.number().optional(),
    price: zod_2.z.coerce.number().optional(),
    utilities: zod_2.z.string().optional(),
    description: zod_2.z.string().optional(),
    tax: zod_2.z.coerce.number().optional(),
    amount: zod_2.z.coerce.number().optional(),
});
const FormSchema = zod_2.z.object({
    vendorid: zod_2.z.coerce.number().optional(),
    vendorname: zod_2.z.string().min(2, {
        message: 'Vendor name must be at least 2 characters.',
    }),
    vendortype: zod_2.z.string({
        message: 'Vendor type must be selected.',
    }),
    vendoraddress: zod_2.z.string().min(2, {
        message: 'Vendor address is required.',
    }),
    email: zod_2.z
        .string({
        required_error: 'Vendor email is required.',
    })
        .email('Invalid email address.'),
    phonenumber: zod_2.z.string().min(2, {
        message: 'phone number is required.',
    }),
    vendorservicetype: zod_2.z.string({
        message: 'Service type must be selected.',
    }),
});
//////////////component////////////////////
function FormVendors({ id }) {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            vendorid: '',
        },
    });
    /////////////////use state////////////////////////
    const [projects, setProjects] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    ////////////////use efect////////////////////////
    (0, react_1.useEffect)(() => {
        //fetch project data
        const fetchProjects = async () => {
            const response = await (0, vendor_actions_1.getAllProjects)();
            if (response.success) {
                setProjects(response.data);
            }
        };
        fetchProjects();
        if (id) {
            const checkPurchase = async () => {
                const purchase = await (0, vendor_actions_1.getVendor)(Number(id ?? -1));
                form.reset(purchase.data);
            };
            checkPurchase();
        }
    }, [id]);
    const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading, isSubmitSuccessful }, } = form;
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'purchasedetails',
        control: form.control,
    });
    ///////////////onSubmit//////////////////////
    async function onSubmit(data) {
        //const id = getValues("vendorname");
        const id = getValues('vendorid'); //this is used check alredy avaible that going to add data in db
        console.log('iddddddddd', id);
        if (id) {
            //   const dirtyValues = Object.fromEntries(
            //     Object.entries(data).filter(([key ]  ) => dirtyFields[key])
            // );
            let dirtyValues = {};
            for (const key in dirtyFields) {
                dirtyValues[key] = data[key];
            }
            console.log('dirtyValues', dirtyValues);
            // const dirtyObject = Object.keys(data).filter((key) => data[key] !== getValues(key));
            await (0, vendor_actions_1.updateVendor)(dirtyValues, id.toString());
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Vendor',
                description: <span>Updated successfully..</span>,
                duration: 5000,
            });
            router.refresh();
        }
        else {
            const objId = await (0, vendor_actions_1.insertPurchase)(data);
            setValue('vendorid', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Vendor',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
            router.push(`/vendors/${objId.lastInsertRowid}`);
        }
    }
    function handleDelete() {
        const numID = Number(id);
        const objId = (0, vendor_actions_1.DeleteInvoice)(numID);
        (0, use_toast_1.toast)({
            className: 'text-red-600',
            title: 'Vendor',
            description: <span>Delete successfully..</span>,
            duration: 5000,
        });
        form.reset();
        router.push(`/vendors/${numID}`);
        setValue('vendorname', '');
        setValue('vendortype', '');
        setValue('vendoraddress', '');
        setValue('phonenumber', '');
        setValue('email', '');
        setValue('vendorid', '');
        router.push(`/vendors/list`);
    }
    const calculateSubtotal = () => {
        const subtotal = fields.reduce((total, field, index) => {
            const amount = Number(getValues(`purchasedetails.${index}.amount`)) || 0;
            return total + amount;
        }, 0);
        setValue('subtotal', subtotal);
        // Recalculate total amount with the current discount value
        const discount = Number(getValues('discount')) || 0;
        calculateTotalAmount(discount);
    };
    const calculateTotalAmount = (discount) => {
        const subtotal = Number(getValues('subtotal')) || 0;
        const totalAmount = subtotal - (subtotal * discount) / 100;
        setValue('totalamount', totalAmount);
    };
    const getPrevItem = async () => {
        const ID = Number(id);
        const prevItem = await (0, vendor_actions_1.getPrevMaterialItem)(ID ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/vendors/${prevItem.data.vendorid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Document Traverse',
                description: <span>Reached Start of the Vendor List..</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const ID = Number(id);
        const nextItem = await (0, vendor_actions_1.getNextMaterialItem)(ID ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/vendors/${nextItem.data.vendorid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Document Traverse',
                //description: <span>{nextItem.msg}</span>,
                description: <span>Reached End of the Vendor List..</span>,
                duration: 2000,
            });
        }
    };
    return (<div className="flex mt-16">
      <div className="grow pt-4">
        {!id && (<>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Vendor</p>

            <div className="lg:ml-[78%] lg:mt-[0%]">
              <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/vendors/list')}>
                View List
              </button_1.Button>
            </div>
          </>)}

        {id && (<>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">Update Vendor</p>
            <div className="flex flex-col-3 items-center justify-center lg:ml-[30%]">
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getPrevItem}>
                previous
              </button_1.Button>
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getNextItem}>
                next
              </button_1.Button>
            </div>
            <div className="lg:ml-[85%] lg:mt-[-3%]">
              <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/vendors/list')}>
                View List
              </button_1.Button>
            </div>
          </>)}
        <div className="flex justify-center rounded border-2 mb-10 border-green-200 bg-green-50/45 mx-20 py-10 mt-4 ">
          <div className="">
            <form_1.Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%] space-y-10 ">
                <div className="flex gap-10 space-x-16 ">
                  <div className="w-[400px] space-y-6 ">
                    <div className="">
                      <form_1.FormField control={form.control} name="vendorid" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Vendor ID
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div className="">
                      <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Email
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field}/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="vendortype" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Vendor <br />
                              Type
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                  <select_1.SelectValue placeholder="Select a vendor type"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                  <select_1.SelectItem value="Company">
                                    Company
                                  </select_1.SelectItem>
                                  <select_1.SelectItem value="Person">Person</select_1.SelectItem>
                                </select_1.SelectContent>
                              </select_1.Select>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div>
                      <form_1.FormField control={form.control} name="vendorservicetype" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Service <br />
                              Type
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                  <select_1.SelectValue placeholder="Select a service type"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                  <select_1.SelectItem value="utility provider">
                                    Utility Provider
                                  </select_1.SelectItem>
                                  <select_1.SelectItem value="wholesaler">
                                    Wholesaler
                                  </select_1.SelectItem>
                                  <select_1.SelectItem value="retailer">
                                    Retailer
                                  </select_1.SelectItem>
                                  <select_1.SelectItem value="distributor">
                                    Distributor
                                  </select_1.SelectItem>
                                </select_1.SelectContent>
                              </select_1.Select>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                  </div>

                  <div className="ml-6 w-[400px]  ">
                    <div className="space-y-6">
                      <div className="">
                        <form_1.FormField control={form.control} name="vendorname" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Name
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field}/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div className="">
                        <form_1.FormField control={form.control} name="phonenumber" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Phone Number
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field}/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div className="">
                        <form_1.FormField control={form.control} name="vendoraddress" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Address
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field}/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      {/* <div className="grid justify-items-end pt-2">
          <Button
            className="bg-green-600 w-[80px] "
            type="submit"
          >
            Submit
          </Button>

          {id && (
            <Button
              className="bg-red-600 ml-4 mt-6 "
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div> */}
                      <div className="flex justify-end space-x-4 pt-2">
                        {!id && (<button_1.Button className="bg-green-600 w-[80px]" type="submit">
                            Submit
                          </button_1.Button>)}

                        {id && (<button_1.Button className="bg-green-600 w-[80px]" type="submit">
                            Update
                          </button_1.Button>)}

                        {id && (<button_1.Button className="bg-red-600" type="button" onClick={handleDelete}>
                            Delete
                          </button_1.Button>)}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </form_1.Form>
          </div>
        </div>
      </div>
    </div>);
}
