"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Booking;
const react_1 = __importDefault(require("react"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const input_1 = require("@/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const formSchema = zod_2.z.object({
    roomnumber: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    //   id: z.string().min(2, {
    //     message: "Username must be at least 2 characters.",
    //   }),
    checkin: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    checkout: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    telephone: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    email: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    adultcount: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    childrencount: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    bookingdate: zod_2.z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});
function Booking() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            roomnumber: '',
        },
    });
    function onSubmit(data) {
        // console.log("first")
        const sendData = async () => {
            const response = await axios_1.default.post('http://localhost:4000/booking', data);
            console.log('response.data', response.data);
        };
        sendData();
        // axios.post("https://reqres.in/api/login", userData).then((response) => {
        //   console.log(response.status, response.data.token);
        // });
        navigate('/');
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", values);
    }
    return (<div>
      <div className="flex items-center  justify-between ml-10 mt-5">
        <h1 className="text-2xl font-bold ">Add Booking</h1>
        <react_router_dom_1.NavLink to={'list'}>View List</react_router_dom_1.NavLink>
        {/* <Button>View List</Button> */}
      </div>
      <hr className="border-2 border-green-300 ml-10 mt-5"></hr>

      <div className="mt-5 w-full h-2/3 bg-green-100 rounded border border-green-300 p-10 ">
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="flex flex-col space-y-8 ">
              <div className=" w-full grid grid-cols-4 gap-4 ">
                <form_1.FormField control={form.control} name="roomnumber" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Room Number</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="checkin" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Check-In</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="checkout" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Check-Out</form_1.FormLabel>
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
                <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Email</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="adultcount" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Adult Count</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="childrencount" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Children Count</form_1.FormLabel>
                      <form_1.FormControl>
                        <input_1.Input type="text" className="rounded border-2 border-green-600" placeholder="" {...field}/>
                      </form_1.FormControl>

                      <form_1.FormMessage />
                    </form_1.FormItem>)}/>
                <form_1.FormField control={form.control} name="bookingdate" render={({ field }) => (<form_1.FormItem>
                      <form_1.FormLabel>Booking Date</form_1.FormLabel>
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
