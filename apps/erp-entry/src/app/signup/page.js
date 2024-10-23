"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zod_2 = require("@hookform/resolvers/zod");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
//import { registerUser } from "./auth/auth-actions";  // Replace with your actual registerUser function
const react_router_dom_1 = require("react-router-dom");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const form_1 = require("@/components/ui/form");
const react_hook_form_1 = require("react-hook-form");
const input_with_icon_1 = require("@/components/ui/input-with-icon");
const axios_1 = require("axios");
const use_toast_1 = require("@/hooks/use-toast");
const FormSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters long'),
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(2, 'Password must be at least 6 characters long'),
    // role: z.string().min(1,"Role must be selected."),
});
const SignUp = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });
    const { toast } = (0, use_toast_1.useToast)();
    function onSubmit(data) {
        console.log('data', data);
        const registerUser = async () => {
            try {
                const response = await axios_1.default.post('http://localhost:10000/registerUser', data);
                console.log('response.data', response);
                if (response.data.success) {
                    toast({ title: 'Register successful' });
                    navigate('/login'); // Redirect to login page after successful registration
                }
                else {
                    toast({
                        variant: 'destructive',
                        title: 'Register failed',
                        description: response.data.message,
                    });
                }
            }
            catch (err) {
                console.log('error response', err);
            }
        };
        registerUser();
    }
    return (<div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-green-300  to-white-500 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <form_1.FormField control={form.control} name="username" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Username</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input placeholder="Enter your username" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <form_1.FormField control={form.control} name="email" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Email</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input placeholder="Enter your email" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <form_1.FormField control={form.control} name="password" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Password</form_1.FormLabel>
                    <form_1.FormControl>
                      <div className="relative">
                        <input_with_icon_1.InputWithIcon type={isVisible ? 'text' : 'password'} placeholder="********" {...field} icon={isVisible ? (<lucide_react_1.EyeOff size={20} onClick={toggleVisibility} className="cursor-pointer"/>) : (<lucide_react_1.Eye size={20} onClick={toggleVisibility} className="cursor-pointer"/>)}/>
                      </div>
                    </form_1.FormControl>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>

              {/* <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Acountant">Acountant</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
              <div>
                <button_1.Button type="submit" className="w-full">
                  Register
                </button_1.Button>
              </div>
            </form>
          </form_1.Form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = SignUp;
