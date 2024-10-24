"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GuestRegistration;
const react_1 = __importDefault(require("react"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const formSchema = zod_2.z.object({
    id: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    fullname: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    address: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    telephone: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    city: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    province: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    country: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    postalcode: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
function GuestRegistration() {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            fullname: '',
        },
    });
    function onSubmit(values) {
        console.log(values);
    }
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Guest Registration</h1>
        <react_router_dom_1.NavLink to={'list'}>View List</react_router_dom_1.NavLink>
        {/* <Button>View List</Button> */}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <div className="mt-5 w-full h-2/3 bg-green-100 rounded border border-green-300 p-10 ">
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className=" w-full grid grid-cols-4 gap-4 ">
                <form_1.FormField control={form.control} name="fullname" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Full Name</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="address" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Address</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Email</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="telephone" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Telephone</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
              <div className="w-full grid grid-cols-4 gap-4">
                <form_1.FormField control={form.control} name="city" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>City</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="province" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Province</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="country" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Country</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="postalcode" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Postal Code</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
              </div>
            </div>

            <div className="flex space-x-3">
              <button_1.Button type="submit">Save</button_1.Button>
              <button_1.Button type="button">Close</button_1.Button>
            </div>
          </form>
        </form_1.Form>

        <div></div>
      </div>
    </div>);
}
