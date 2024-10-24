"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const zod_1 = require("zod");
const zod_2 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("react");
const input_with_icon_1 = require("@/components/ui/input-with-icon");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/components/ui/use-toast");
const form_1 = require("@/components/ui/form");
const auth_action_1 = require("@/components/features/auth/auth-action");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const FormSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters long'),
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
const SignUp = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });
    async function onSubmit(data) {
        try {
            const { success, message } = await (0, auth_action_1.registerUser)(data.username, data.email, data.password);
            if (success) {
                (0, use_toast_1.toast)({ title: 'Register successful' });
                //navigate
                router.push('/login');
            }
            else {
                (0, use_toast_1.toast)({ title: 'Register failed', description: message });
            }
        }
        catch (error) {
            (0, use_toast_1.toast)({ title: 'Error', description: 'Something went wrong.' });
        }
    }
    return (<div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className=" bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="  text-3xl font-extrabold text-gray-900">
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
              <link_1.default href="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign In
              </link_1.default>
            </span>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = SignUp;
