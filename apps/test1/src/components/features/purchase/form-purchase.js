"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailRowSchema = void 0;
exports.default = FormPurchase;
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const use_toast_1 = require("@/components/ui/use-toast");
const table_1 = require("@/components/ui/table");
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const react_1 = require("react");
const purchase_action_1 = require("./purchase-action");
const textarea_1 = require("@/components/ui/textarea");
const navigation_1 = require("next/navigation");
const dialog_1 = require("@/components/ui/dialog");
const bank_action_1 = require("../bank/bank-action");
const vendor_actions_1 = require("../vendors/vendor-actions");
const project_action_1 = require("../projects/project-action");
exports.detailRowSchema = zod_2.z.object({
    id: zod_2.z.coerce.number().optional(),
    item: zod_2.z.string().min(2, {
        message: 'Item must be at selected.',
    }),
    utilities: zod_2.z.string().min(2, {
        message: 'Purchase type must be at selected.',
    }),
    quantity: zod_2.z.coerce.number().min(0, {
        message: 'Quantity must be at least 2 characters.',
    }),
    price: zod_2.z.coerce.number().min(0, {
        message: 'Price must be at least 2 characters.',
    }),
    description: zod_2.z.any().optional(),
    tax: zod_2.z.coerce.number().min(0, {
        message: 'Tax must be at least 2 characters.',
    }),
    amount: zod_2.z.coerce.number().optional(),
});
const FormSchema = zod_2.z.object({
    pid: zod_2.z.coerce.number().optional(),
    purchaseid: zod_2.z.coerce.number().optional(),
    purchaseno: zod_2.z.string().min(2, {
        message: 'purchaseno must be at least 2 characters.',
    }),
    sellername: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    sellertype: zod_2.z.string().min(2, {
        message: 'Seller type must be selected.',
    }),
    purchasedate: zod_2.z.string({
        required_error: 'A date of birth is required.',
    }),
    duedate: zod_2.z.string({
        required_error: 'A date of birth is required.',
    }),
    purchasetype: zod_2.z.string().min(2, {
        message: 'purchasetype must be at least 2 characters.',
    }),
    currency: zod_2.z.string().min(2, {
        message: 'currency must be at least 2 characters.',
    }),
    project: zod_2.z.string().min(1, {
        message: 'project must be at least 2 characters.',
    }),
    remark: zod_2.z.string().optional(),
    purchasedetails: zod_2.z.array(exports.detailRowSchema),
    subtotal: zod_2.z.coerce.number().optional(),
    discount: zod_2.z.coerce.number().optional(),
    totalamount: zod_2.z.coerce.number().optional(),
    totalpaid: zod_2.z.coerce.number().optional(),
    dueamount: zod_2.z.coerce.number().optional(),
});
const FormSchema2 = zod_2.z.object({
    purchaseaccount: zod_2.z.string().min(2, {
        message: 'Purchase account must be selected.',
    }),
    purchasemethod: zod_2.z.string().min(2, {
        message: 'Purchase method must be selected.',
    }),
    amount: zod_2.z.coerce.number().min(2, {
        message: 'Amount must be at least 2 characters.',
    }),
    purchasedate: zod_2.z.string().min(2, {
        message: 'Purchase date must be selected.',
    }),
    purchaseid: zod_2.z.number().optional(),
});
//////////////component////////////////////
function FormPurchase({ id }) {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            currency: 'lkr',
            purchasedate: new Date().toISOString().split('T')[0], // Set today's date as default value
            duedate: new Date().toISOString().split('T')[0],
            remark: '',
            purchasedetails: [
                {
                    item: 'other',
                    quantity: 0,
                    price: 0,
                    utilities: '',
                    description: '',
                    tax: 0,
                    amount: 0,
                },
            ],
        },
    });
    const form2 = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema2),
        defaultValues: {
            purchaseaccount: 'Cash',
            //purchasemethod: "",
            //amount: 0,
            purchasedate: new Date().toISOString().split('T')[0],
            // purchaseid: 0, // Default empty purchaseid
        },
    });
    const { control: control2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, getValues: getValues2, trigger: trigger2, formState: { isDirty: isDirty2, dirtyFields: dirtyFields2, isLoading: isLoading2, isSubmitSuccessful: isSubmitSuccessful2, errors: error1, }, } = form2;
    const { control: control, handleSubmit: handleSubmit, watch: watch, setValue: setValue, getValues: getValues, trigger: trigger, formState: { isDirty: isDirty, dirtyFields: dirtyFields, isLoading: isLoading, isSubmitSuccessful: isSubmitSuccessful, }, } = form;
    /////////////////use state////////////////////////
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [vendors, setVendors] = (0, react_1.useState)([]);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [paidStatus, setpaidStatus] = (0, react_1.useState)(false);
    const [banks, setBanks] = (0, react_1.useState)([]);
    const router = (0, navigation_1.useRouter)();
    const focusRef = (0, react_1.useRef)(null);
    ////////////////use efect////////////////////////
    (0, react_1.useEffect)(() => {
        const fetchProjects = async () => {
            const response = await (0, project_action_1.getAllProjects)();
            if (response.success) {
                setProjects(response.data);
                console.log('projects', projects);
            }
        };
        fetchProjects();
        const fetchVendors = async () => {
            const response = await (0, vendor_actions_1.getAllData)();
            if (response.success) {
                setVendors(response.data);
            }
        };
        fetchVendors();
        (0, bank_action_1.SelectAllBank)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                console.log('reversedData', reversedData);
                setBanks(reversedData); // Set the reversed array to state
                console.log('banks', banks);
            }
            else {
                console.log('error');
            }
            // const fetchBanks = async () => {
            //   const response = await SelectAllBank();
            //   if (response.success) {
            //     setBanks(response.data);
            //   }
            //   console.log("banks",banks)
            //};
            //fetchBanks();
        });
        if (id) {
            const checkPurchase = async () => {
                const purchase = await (0, purchase_action_1.getPurchase)(Number(id ?? -1));
                console.log('purchase', purchase.data);
                form.reset(purchase.data);
                // const a=purchase.data.totalamount - purchase.data.totalpaid
                // console.log("a",typeof a)
                setValue('dueamount', purchase.data.totalamount - purchase.data.totalpaid, { shouldDirty: false });
                // await trigger("dueamount");  // Trigger validation to mark the field as dirty
                if (getValues('totalpaid') ?? 0 > 0) {
                    setpaidStatus(true);
                }
            };
            checkPurchase();
        }
        // focusRef.current.focus()
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, [id]);
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'purchasedetails',
        control: form.control,
    });
    ///////////////onSubmit//////////////////////
    async function onSubmit(data) {
        //const id = getValues("purchaseno");
        const { dueamount, ...dataWithoutDueAmount } = data; // Destructure and exclude `dueamount`
        if (id) {
            let dirtyValues = {};
            for (const key in dirtyFields) {
                if (key != 'purchasedetails' && key !== 'dueamount') {
                    dirtyValues[key] = data[key];
                }
            }
            await (0, purchase_action_1.updatePurchase)(dataWithoutDueAmount, dirtyValues, id.toString());
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Purchase',
                description: <span>Update successfully..</span>,
                duration: 5000,
            });
            //router.push("/purchases/list");
            //router.refresh();
            //router.replace(router.asPath);
            window.location.reload();
            //router.reload();
        }
        else {
            const objId = await (0, purchase_action_1.insertPurchase)(data);
            setValue('purchaseid', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Purchase',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
            router.push(`/purchases/${objId.lastInsertRowid}`);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function onSubmit2(data) {
        console.log('data trigger', data);
        if (id) {
            // let dirtyValues: any = {};
            // for (const key in dirtyFields) {
            //   if (key != "purchasedetails") {
            //     dirtyValues[key] = data[key];
            //   }
            // }
            // await updatePurchase(data, dirtyValues, id.toString());
            // toast({
            //   className: "text-blue-600",
            //   title: "Invoice",
            //   description: <span>Update successfully..</span>,
            //   duration: 5000,
            // });
            //setValue("purchaseid", id);
            //setValue2("purchaseid", parseInt(id, 10));
            //const nid=parseInt(id);
            //console.log("const nid=parseInt(id);",nid)
            const objId = await (0, purchase_action_1.insertPurchasePayment)(data);
            setValue2('purchaseno', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-green-600',
                title: 'Payment',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
            form2.reset();
            window.location.reload();
        }
        else {
            //data.purchaseid = getValues("purchaseid"); // Ensure purchaseid is set
            const objId = await (0, purchase_action_1.insertPurchasePayment)(data);
            setValue2('purchaseno', objId.lastInsertRowid, { shouldDirty: false });
            (0, use_toast_1.toast)({
                className: 'text-blue-600',
                title: 'Invoice',
                description: <span>Added successfully..</span>,
                duration: 5000,
            });
        }
        setIsOpen(false);
        router.push(`/purchases/${id}`);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    function handleDelete() {
        const numID = Number(id);
        const objId = (0, purchase_action_1.DeletePurchase)(numID);
        (0, use_toast_1.toast)({
            className: 'text-red-600',
            title: 'Purchase',
            description: <span>Delete successfully..</span>,
            duration: 5000,
        });
        //form.reset();
        router.push(`/purchases/list`);
    }
    // useEffect to update amount when quantity or price changes
    // useEffect(() => {
    //   watchFields.forEach((field, index) => {
    //     const quantity = field.quantity || 0;
    //     const price = field.price || 0;
    //     const amount = quantity * price;
    //     form.setValue(`purchasedetails.${index}.amount`, amount);
    //     console.log("amounnnnnnnnnnt",amount)
    //     console.log("amounnnnnnnnnnt")
    //   });
    // }, [watchFields, form]);
    const calculateSubtotal = () => {
        const subtotal = fields.reduce((total, field, index) => {
            const amount = Number(getValues(`purchasedetails.${index}.amount`)) || 0;
            return total + amount;
        }, 0);
        setValue('subtotal', subtotal, { shouldDirty: true });
        // Recalculate total amount with the current discount value
        const discount = Number(getValues('discount')) || 0;
        calculateTotalAmount(discount);
    };
    const calculateTotalAmount = (discount) => {
        const subtotal = Number(getValues('subtotal')) || 0;
        const totalAmount = subtotal - (subtotal * discount) / 100;
        setValue('totalamount', totalAmount, { shouldDirty: true });
    };
    const getPrevItem = async () => {
        const ID = Number(id);
        const prevItem = await (0, purchase_action_1.getPrevMaterialItem)(ID ?? 0);
        if (prevItem.data && Object.keys(prevItem.data).length !== 0) {
            router.push(`/purchases/${prevItem.data.purchaseid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Document Traverse',
                description: <span>Reached Start of the Purchase list..</span>,
                duration: 2000,
            });
        }
    };
    const getNextItem = async () => {
        const ID = Number(id);
        const nextItem = await (0, purchase_action_1.getNextMaterialItem)(ID ?? 0);
        if (nextItem.data && Object.keys(nextItem.data).length !== 0) {
            router.push(`/purchases/${nextItem.data.purchaseid}`);
        }
        else {
            (0, use_toast_1.toast)({
                className: 'text-red-600',
                title: 'Document Traverse',
                //description: <span>{nextItem.msg}</span>,
                description: <span>Reached End of the Purchase list..</span>,
                duration: 2000,
            });
        }
    };
    const handleValidateClick = async () => {
        const isValid = await trigger2();
        if (isValid) {
            console.log('Form is valid!');
            onSubmit2(form2.getValues());
        }
        else {
            console.log('Form is invalid!');
        }
    };
    return (<div className="flex mt-16">
      <div className="grow pt-4">
        {!id && (<>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Purchase</p>
            <div className="lg:ml-[85%] lg:mt-[-3%]">
              <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/purchases/list')}>
                View List
              </button_1.Button>
            </div>
          </>)}
        {id && (<>
            <p className="text-xl font-bold pb-6 pt-3 pl-6 ">Update Purchase</p>
            <div className="flex flex-col-3 items-center justify-center lg:ml-[30%]">
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getPrevItem}>
                previous
              </button_1.Button>
              <button_1.Button className=" mr-5 bg-green-600" type="button" onClick={getNextItem}>
                next
              </button_1.Button>
            </div>
            <div className="lg:ml-[85%] lg:mt-[-3%]">
              <button_1.Button className=" mr-5 bg-green-600 " type="button" onClick={() => router.push('/purchases/list')}>
                View List
              </button_1.Button>
            </div>
          </>)}
        <div className="flex justify-center  mx-6 py-4 ">
          <div className="">
            <form_1.Form {...form}>
              <form key={1} onSubmit={handleSubmit(onSubmit)} className="w-[100%] space-y-10">
                <div className="flex justify-center gap-10  mx-10 py-4 rounded border-2 mb-10 border-green-200 ">
                  <div className="w-[400px] space-y-6 m-6">
                    <div className="">
                      <form_1.FormField control={form.control} name="purchaseid" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Purchase <br />
                              ID
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="Auto ID" {...field} disabled/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                    <div>
                      <form_1.FormField control={form.control} name="sellername" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Vendor <br />
                              Name
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <select_1.Select onValueChange={field.onChange} value={field.value}>
                                <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                  <select_1.SelectValue placeholder="Select a Vendor Name"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                  <select_1.SelectGroup>
                                    <select_1.SelectItem value="other">Other</select_1.SelectItem>

                                    {vendors.map((vendor) => (<select_1.SelectItem key={vendor.vendorid} value={`${vendor.vendorname} `}>
                                        {vendor.vendorname}
                                      </select_1.SelectItem>))}
                                  </select_1.SelectGroup>
                                </select_1.SelectContent>
                              </select_1.Select>
                            </form_1.FormControl>
                            {/* <FormDescription className="">This is your public display name.</FormDescription> */}

                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="currency" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Currency
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                  <select_1.SelectValue placeholder="Select the Currency"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                  <select_1.SelectItem value="lkr"> LKR</select_1.SelectItem>
                                  <select_1.SelectItem value="usd">USD</select_1.SelectItem>
                                </select_1.SelectContent>
                              </select_1.Select>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="duedate" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Due Date
                            </form_1.FormLabel>
                            {/* <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[260px] pl-3 text-left font-normal rounded border-2 border-green-600 w-[300px]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "yyyy-MM-dd")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}

                            <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field}/>

                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="project" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Project
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <select_1.Select 
        // onValueChange={field.onChange}
        // value={field.value}
        onValueChange={(value) => {
                const selectedProject = projects.find((project) => project.pname === value.trim());
                setValue('pid', selectedProject?.pid || ''); // Set the pid or an empty string if not found
                field.onChange(value); // Update the value in the form
            }} value={field.value}>
                                <select_1.SelectTrigger className="w-[400px] rounded border-2 border-green-600">
                                  <select_1.SelectValue placeholder="Select a project"/>
                                </select_1.SelectTrigger>
                                <select_1.SelectContent>
                                  <select_1.SelectGroup>
                                    <select_1.SelectLabel>Project</select_1.SelectLabel>
                                    <select_1.SelectItem value={`${0}`}>None</select_1.SelectItem>
                                    {projects.map((project) => (<select_1.SelectItem key={project.pid} value={`${project.pid} `}>
                                        {project.pname}
                                      </select_1.SelectItem>))}
                                  </select_1.SelectGroup>
                                </select_1.SelectContent>
                              </select_1.Select>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                  </div>

                  <div className="w-[400px] m-6 ">
                    <div className="space-y-6">
                      {/* <div className="">
          <FormField
            control={form.control}
            name="vendorname"
            render={({ field }) => (
              <FormItem className="flex ">
                <FormLabel className="pt-4 w-[120px]">
                  Seller Name
                </FormLabel>
                <FormControl>
                  {field.value === "other" ? (
                    <FormField
                      control={form.control}
                      name="newsellername"
                      render={({ field }) => (
                        <FormItem className="flex ">
                          <FormControl>
                            <Input
                              className="rounded border-2 border-green-600 w-[300px]"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="rounded border-2 border-green-600">
                        <SelectValue placeholder="Select a seller type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CEB">
                          CEB
                        </SelectItem>
                        <SelectItem value="Water Board">
                          Water Board
                        </SelectItem>
                        <SelectItem value="other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
                      <div className="">
                        <form_1.FormField control={form.control} name="purchaseno" render={({ field }) => (<form_1.FormItem className="flex">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Purchase <br />
                                Ref No
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input {...field} // Spread the field props here
         ref={(el) => {
                field.ref(el); // Manually call the field ref function
                focusRef.current = el; // Also assign the element to your custom ref
            }} className="rounded border-2 border-green-600" placeholder=""/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div>
                        <form_1.FormField control={form.control} name="sellertype" render={({ field }) => (<form_1.FormItem className="flex">
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

                      <div className="">
                        <form_1.FormField control={form.control} name="purchasetype" render={({ field }) => (<form_1.FormItem className="flex">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Purchase <br />
                                Type
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                  <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                    <select_1.SelectValue placeholder="Select a purchase type"/>
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    <select_1.SelectItem value="goods">Goods</select_1.SelectItem>
                                    <select_1.SelectItem value="services">
                                      Services
                                    </select_1.SelectItem>
                                    <select_1.SelectItem value="assets">
                                      Assets
                                    </select_1.SelectItem>
                                    <select_1.SelectItem value="utilities">
                                      Utilities
                                    </select_1.SelectItem>
                                  </select_1.SelectContent>
                                </select_1.Select>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div>
                        <form_1.FormField control={form.control} name="purchasedate" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                purchase Date
                              </form_1.FormLabel>
                              <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field}/>

                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>
                      <div>
                        <form_1.FormField control={form.control} name="remark" render={({ field }) => (<form_1.FormItem className="flex">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Remark
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <textarea_1.Textarea placeholder="" className="resize-none rounded border-2 border-green-600  h-[120px]" {...field}/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ///////////////////////////////////////////table////////////////////////////////////////////// */}

                <div className="mt-8 w-[100%]">
                  <p className="text-xl font-bold pb-6 pt-6 ">Item Table</p>

                  {!paidStatus && (<button_1.Button className="mb-4" type="button" onClick={() => append({
                itemdetails: '',
                quantity: 0,
                price: 0,
                rate: 0,
                tax: 0,
                amount: 0,
            })}>
                      Add row
                    </button_1.Button>)}

                  <div className="border-2 rounded-lg border-green-300 p-4 bg-green-100 ">
                    <table_1.Table className="">
                      <table_1.TableHeader className="rounded-lg border-green-600 gap-0">
                        <table_1.TableRow>
                          {!paidStatus && (<table_1.TableHead className="text-center">ADD</table_1.TableHead>)}
                          <table_1.TableHead className="text-center">ITEM</table_1.TableHead>
                          <table_1.TableHead className="w-[150px] text-center">
                            EXPENSE CATEGORY
                          </table_1.TableHead>
                          <table_1.TableHead className="w-[300px] text-center ">
                            DESCRIPTION
                          </table_1.TableHead>
                          <table_1.TableHead className="w-[100px] text-center ">
                            QUANTITY
                          </table_1.TableHead>
                          <table_1.TableHead className="w-[150px] text-center">
                            UNIT PRICE
                          </table_1.TableHead>
                          <table_1.TableHead className="w-[150px] text-center">
                            TAX
                          </table_1.TableHead>
                          <table_1.TableHead className="w-[150px] text-center">
                            AMOUNT
                          </table_1.TableHead>
                          {!paidStatus && (<table_1.TableHead className="text-center">
                              REMOVE
                            </table_1.TableHead>)}
                        </table_1.TableRow>
                      </table_1.TableHeader>

                      <table_1.TableBody>
                        {fields.map((field, index) => (<table_1.TableRow key={field.id}>
                            {!paidStatus && (<table_1.TableCell className="p-1 text-center font-medium">
                                <button_1.Button variant={'outline'} className="text-2xl" type="button" onClick={() => append({
                    itemdetails: '',
                    quantity: 0,
                    price: 0,
                    rate: 0,
                    tax: 0,
                    amount: 0,
                })}>
                                  <fa_1.FaPlus className="text-destructive"/>
                                </button_1.Button>
                              </table_1.TableCell>)}

                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.item`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field} disabled={paidStatus}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                          <select_1.SelectValue placeholder="Select a Item"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                          <select_1.SelectItem value="other">
                                            Other
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="electricity bill">
                                            Electricity Bill
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="water bill">
                                            Water Bill
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="item3">
                                            Item 3
                                          </select_1.SelectItem>
                                        </select_1.SelectContent>
                                      </select_1.Select>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="w-[150px]">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.utilities`} render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormControl>
                                      <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field} disabled={paidStatus}>
                                        <select_1.SelectTrigger className="rounded border-2 border-green-600">
                                          <select_1.SelectValue placeholder="Select a purchase type"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                          <select_1.SelectItem value="goods">
                                            Goods
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="services">
                                            Services
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="assets">
                                            Assets
                                          </select_1.SelectItem>
                                          <select_1.SelectItem value="utilities">
                                            Utilities
                                          </select_1.SelectItem>
                                        </select_1.SelectContent>
                                      </select_1.Select>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell>
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.description`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <textarea_1.Textarea placeholder="" className="w-[300px] resize-none rounded border-2 border-green-600" {...field} disabled={paidStatus}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right w-[100px]">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.quantity`} render={({ field }) => (<form_1.FormItem className="">
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600 " placeholder="quantity" {...field} disabled={paidStatus} onChangeCapture={(e) => {
                    const quantity = parseFloat(e.target.value) || 0;
                    setValue(`purchasedetails.${index}.quantity`, quantity);
                    // Get the current price
                    const price = Number(getValues(`purchasedetails.${index}.price`) || 0);
                    const tax = Number(getValues(`purchasedetails.${index}.tax`) || 0);
                    // Calculate and set the amount
                    const amount = price * quantity + tax;
                    setValue(`purchasedetails.${index}.amount`, amount);
                    calculateSubtotal();
                }}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right w-[150px]">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.price`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="price" {...field} disabled={paidStatus} onChangeCapture={(e) => {
                    const price = parseFloat(e.target.value) || 0;
                    setValue(`purchasedetails.${index}.price`, price);
                    const quantity = Number(getValues(`purchasedetails.${index}.quantity`) || 0);
                    const tax = Number(getValues(`purchasedetails.${index}.tax`) || 0);
                    const amount = price * quantity + tax;
                    setValue(`purchasedetails.${index}.amount`, amount);
                    calculateSubtotal();
                }}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right w-[150px]">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.tax`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="tax" {...field} disabled={paidStatus} onChangeCapture={(e) => {
                    const tax = parseFloat(e.target.value) || 0;
                    setValue(`purchasedetails.${index}.tax`, tax);
                    const price = Number(getValues(`purchasedetails.${index}.price`) || 0);
                    const quantity = Number(getValues(`purchasedetails.${index}.quantity`) || 0);
                    const amount = price * quantity + tax;
                    setValue(`purchasedetails.${index}.amount`, amount);
                    calculateSubtotal();
                }}/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="w-[150px]">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.amount`} render={({ field }) => (<form_1.FormControl>
                                    <input_1.Input type="number" className="rounded border-2 border-green-600" {...field} readOnly/>
                                  </form_1.FormControl>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="p-1 text-center font-medium">
                              {!paidStatus && (<button_1.Button type="button" variant={'outline'} className="text-2xl" onClick={() => remove(index)}>
                                  <md_1.MdOutlineRemoveCircleOutline className="text-destructive"/>
                                </button_1.Button>)}
                            </table_1.TableCell>
                          </table_1.TableRow>))}
                      </table_1.TableBody>
                    </table_1.Table>
                  </div>
                </div>

                {/* //////////////////////////////////////////////////below form///////////////////////////////////////////////////// */}

                <div className="flex justify-end  ">
                  <div className=" w-[300px] rounded-lg bg-green-100 flex flex-col items-center  ">
                    <div className="p-6 ">
                      <form_1.FormField control={form.control} name="subtotal" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Sub Total
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} readOnly/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>

                      <form_1.FormField control={form.control} name="discount" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Discount <br /> %
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} onChange={(e) => {
                const discount = Number(e.target.value) || 0;
                field.onChange(e); // Ensure the form's state is updated
                calculateTotalAmount(discount);
            }}/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>

                      <form_1.FormField control={form.control} name="totalamount" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Total Amount
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} readOnly/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>

                      <form_1.FormField control={form.control} name="totalpaid" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Total Paid
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} readOnly/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>

                      <form_1.FormField control={form.control} name="dueamount" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Due Amount
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} readOnly/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>

                      <div className="flex justify-end">
                        {!id && (<button_1.Button className="bg-green-600 mt-6 flex justify-end" type="submit">
                            Submit
                          </button_1.Button>)}
                        {id && (<button_1.Button className="bg-green-600 mt-6 flex justify-end" type="submit">
                            update
                          </button_1.Button>)}
                        {/* ///////////////////////////pay form////////////////////////////////////////////////////////////////////////////// */}
                        {id && (<dialog_1.Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <dialog_1.DialogTrigger asChild>
                              <button_1.Button className="bg-green-600 ml-4 mt-6" type="button" onClick={() => {
                setIsOpen(true);
                //setValue2("purchaseid", parseInt(id));
            }}>
                                Pay
                              </button_1.Button>
                            </dialog_1.DialogTrigger>
                            <dialog_1.DialogContent className="sm:max-w-[425px]">
                              <dialog_1.DialogHeader>
                                <dialog_1.DialogTitle>Record a Payment</dialog_1.DialogTitle>
                              </dialog_1.DialogHeader>
                              <div className="flex-row gap-4 py-4">
                                <div className=" items-center gap-4">
                                  <form_1.Form {...form2}>
                                    <form key={2} onSubmit={handleSubmit(onSubmit2)} className="space-y-6">
                                      <form_1.FormField control={form2.control} name="purchasemethod" render={({ field }) => (<form_1.FormItem className="">
                                            <form_1.FormLabel className="">
                                              Purchase Method
                                            </form_1.FormLabel>
                                            <form_1.FormControl>
                                              <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                                <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                                  <select_1.SelectValue placeholder="Select a purchase method"/>
                                                </select_1.SelectTrigger>
                                                <select_1.SelectContent>
                                                  <select_1.SelectItem value="card">
                                                    Card
                                                  </select_1.SelectItem>
                                                  <select_1.SelectItem value="cash">
                                                    Cash
                                                  </select_1.SelectItem>
                                                  <select_1.SelectItem value="online">
                                                    Online
                                                  </select_1.SelectItem>
                                                  <select_1.SelectItem value="cheque">
                                                    Cheque
                                                  </select_1.SelectItem>
                                                </select_1.SelectContent>
                                              </select_1.Select>
                                            </form_1.FormControl>
                                            <form_1.FormMessage />
                                          </form_1.FormItem>)}/>

                                      <form_1.FormField control={form2.control} name="purchaseaccount" render={({ field }) => (<form_1.FormItem className="">
                                            <form_1.FormLabel className="">
                                              Purchase Account
                                            </form_1.FormLabel>
                                            <form_1.FormControl>
                                              <select_1.Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                                <select_1.SelectTrigger className="rounded border-2 border-green-600/40">
                                                  <select_1.SelectValue placeholder="Select a purchase account"/>
                                                </select_1.SelectTrigger>
                                                <select_1.SelectContent>
                                                  <select_1.SelectItem value="Cash">
                                                    Cash
                                                  </select_1.SelectItem>

                                                  {banks.map((bank) => (<select_1.SelectItem key={bank.id} value={`${bank.bname} `}>
                                                      {bank.bname}
                                                    </select_1.SelectItem>))}
                                                </select_1.SelectContent>
                                              </select_1.Select>
                                            </form_1.FormControl>
                                            <form_1.FormMessage />
                                          </form_1.FormItem>)}/>

                                      <form_1.FormField control={form2.control} name="amount" render={({ field }) => (<form_1.FormItem className="">
                                            <form_1.FormLabel className="">
                                              Amount
                                            </form_1.FormLabel>
                                            <form_1.FormControl>
                                              <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Convert the value to a number
             type="number" // Set the input type to number for better user experience
            />
                                            </form_1.FormControl>
                                            <form_1.FormMessage />
                                          </form_1.FormItem>)}/>

                                      <form_1.FormField control={form2.control} name="purchasedate" render={({ field }) => (<form_1.FormItem className="">
                                            <form_1.FormLabel className="">
                                              purchase Date
                                            </form_1.FormLabel>
                                            <form_1.FormControl>
                                              <input_1.Input className="rounded border-2 border-green-600/40" placeholder="" type="date" {...field}/>
                                            </form_1.FormControl>
                                            <form_1.FormMessage />
                                          </form_1.FormItem>)}/>

                                      {/* <Button
              className="bg-green-600 w-[80px]"
              type="submit"
              onClick={() => {
                setValue2("purchaseid", parseInt(id)); // Set purchaseid when opening the form
              }}
            >
              Pay
            </Button> */}

                                      <button_1.Button className="bg-green-600 w-[80px]" type="button" onClick={() => {
                setValue2('purchaseid', parseInt(id)); // Set purchaseid when opening the form
                handleValidateClick();
                //onSubmit2(form2.getValues());
            }}>
                                        Pay
                                      </button_1.Button>

                                      {/* onSubmit={form2.handleSubmit(onSubmit2)} */}
                                    </form>
                                  </form_1.Form>
                                </div>
                              </div>
                            </dialog_1.DialogContent>
                          </dialog_1.Dialog>)}
                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        {id && (<button_1.Button className="bg-red-600 ml-4 mt-6 " type="button" onClick={handleDelete}>
                            Delete
                          </button_1.Button>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              </form>
            </form_1.Form>
          </div>
        </div>
      </div>
    </div>);
}
