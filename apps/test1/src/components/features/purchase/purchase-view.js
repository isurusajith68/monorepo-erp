"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailRowSchema = void 0;
exports.default = PurchaseView;
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const react_1 = require("react");
const purchase_action_1 = require("./purchase-action");
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
    project: zod_2.z.string().min(2, {
        message: 'project must be at least 2 characters.',
    }),
    purchasedetails: zod_2.z.array(exports.detailRowSchema),
});
//////////////component////////////////////
function PurchaseView({ id }) {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            purchasedetails: [
                {
                    item: '',
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
    ////////////////use efect////////////////////////
    (0, react_1.useEffect)(() => {
        if (id) {
            const checkPurchase = async () => {
                const purchase = await (0, purchase_action_1.getPurchase)(Number(id ?? -1));
                form.reset(purchase.data);
            };
            checkPurchase();
        }
    }, [id]);
    const { fields, append, remove } = (0, react_hook_form_1.useFieldArray)({
        name: 'purchasedetails',
        control: form.control,
    });
    return (<div className="flex">
      <div className="grow pt-4">
        <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Purchase</p>
        <div className="flex justify-center rounded border-2 mb-10 border-green-200 bg-green-50/45 mx-6 py-4 ">
          <div className="">
            <form_1.Form {...form}>
              <form className="w-[100%] space-y-10 ">
                <div className="flex gap-10 space-x-16 ">
                  <div className="w-[400px] space-y-6 ">
                    <div className="">
                      <form_1.FormField control={form.control} name="purchaseno" render={({ field }) => (<form_1.FormItem className="flex ">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              purchase No
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                            </form_1.FormControl>
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="sellertype" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Seller Type
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="currency" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Currency
                            </form_1.FormLabel>
                            <form_1.FormControl>
                              <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                            </form_1.FormControl>
                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>

                    <div>
                      <form_1.FormField control={form.control} name="duedate" render={({ field }) => (<form_1.FormItem className="flex">
                            <form_1.FormLabel className="pt-4 w-[120px]">
                              Due Date
                            </form_1.FormLabel>

                            <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>

                            <form_1.FormMessage />
                          </form_1.FormItem>)}/>
                    </div>
                  </div>

                  <div className="ml-6 w-[400px]  ">
                    <div className="space-y-6">
                      <div className="">
                        <form_1.FormField control={form.control} name="sellername" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Seller Name
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                              </form_1.FormControl>
                            </form_1.FormItem>)}/>
                      </div>

                      <div className="">
                        <form_1.FormField control={form.control} name="purchasetype" render={({ field }) => (<form_1.FormItem className="flex">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Purchase Type
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div>
                        <form_1.FormField control={form.control} name="purchasedate" render={({ field }) => (<form_1.FormItem className="flex ">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                purchase Date
                              </form_1.FormLabel>
                              <input_1.Input type="date" className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>

                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>

                      <div>
                        <form_1.FormField control={form.control} name="project" render={({ field }) => (<form_1.FormItem className="flex">
                              <form_1.FormLabel className="pt-4 w-[120px]">
                                Project
                              </form_1.FormLabel>
                              <form_1.FormControl>
                                <form_1.FormControl>
                                  <input_1.Input className="rounded border-2 border-green-600" placeholder="" {...field} disabled/>
                                </form_1.FormControl>
                              </form_1.FormControl>
                              <form_1.FormMessage />
                            </form_1.FormItem>)}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ///////////////////table/////////////////////////// */}

                <div className="mt-8 w-[1000px]">
                  <p className="text-xl font-bold pb-6 pt-6 ">Item Table</p>
                  <div className="border-2 rounded-lg border-green-500 p-4 bg-green-100">
                    <table_1.Table>
                      <table_1.TableHeader className="rounded-lg border-green-600 ">
                        <table_1.TableRow>
                          <table_1.TableHead>ITEM</table_1.TableHead>
                          <table_1.TableHead>UTILITIES</table_1.TableHead>
                          <table_1.TableHead>DESCRIPTION</table_1.TableHead>
                          <table_1.TableHead>QUANTITY</table_1.TableHead>
                          <table_1.TableHead>PRICE</table_1.TableHead>
                          <table_1.TableHead>TAX</table_1.TableHead>
                          <table_1.TableHead>AMOUNT</table_1.TableHead>
                        </table_1.TableRow>
                      </table_1.TableHeader>

                      <table_1.TableBody>
                        {fields.map((field, index) => (<table_1.TableRow key={field.id}>
                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.item`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="item 1" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell>
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.utilities`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="utilities" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell>
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.description`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="description" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.quantity`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="quantity" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.price`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="price" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.tax`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="tax" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>

                            <table_1.TableCell className="text-right">
                              <form_1.FormField control={form.control} name={`purchasedetails.${index}.amount`} render={({ field }) => (<form_1.FormItem>
                                    <form_1.FormControl>
                                      <input_1.Input className="rounded border-2 border-green-600" placeholder="account number" {...field} disabled/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                  </form_1.FormItem>)}/>
                            </table_1.TableCell>
                          </table_1.TableRow>))}
                      </table_1.TableBody>
                    </table_1.Table>
                  </div>
                </div>
              </form>
            </form_1.Form>
          </div>
        </div>
      </div>
    </div>);
}
