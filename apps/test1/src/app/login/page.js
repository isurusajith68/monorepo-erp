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
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/components/ui/use-toast");
const form_1 = require("@/components/ui/form");
const auth_action_1 = require("@/components/features/auth/auth-action");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const FormSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please enter a valid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
const Login = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = (0, navigation_1.useRouter)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleGoogleLogin = async () => {
        setLoading(true);
        const authUrl = await (0, auth_action_1.redirectToGoogleLogin)();
        window.location.href = authUrl;
    };
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function onSubmit(data) {
        try {
            const { success, message } = await (0, auth_action_1.loginUser)(data.email, data.password);
            if (success) {
                (0, use_toast_1.toast)({ title: 'Login successful' });
                //navigate
                router.push('/dashboard');
            }
            else {
                (0, use_toast_1.toast)({
                    title: 'Login failed',
                    description: message,
                    variant: 'destructive',
                });
            }
        }
        catch (error) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'Something went wrong.',
                variant: 'destructive',
            });
        }
    }
    (0, react_1.useEffect)(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                try {
                    const data = await (0, auth_action_1.handleGoogleCallback)(code);
                    // setUserInfo(data);
                }
                catch (err) {
                    // setError("Error logging in");
                }
            }
        };
        handleCallback();
    }, []);
    return (<div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <input_1.Input type={isVisible ? 'text' : 'password'} placeholder="********" {...field}/>
                      <button type="button" onClick={toggleVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {isVisible ? (<lucide_react_1.EyeOff className="h-5 w-5 text-gray-400"/>) : (<lucide_react_1.Eye className="h-5 w-5 text-gray-400"/>)}
                      </button>
                    </div>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <button_1.Button type="submit" className="w-full">
              Login
            </button_1.Button>
            <button_1.Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
              {loading ? ('Redirecting...') : (<>
                  <image_1.default src="https://cdn-teams-slug.flaticon.com/google.jpg" className="w-6 h-6" alt="google icon" width={100} height={100}/>
                  <span className="ml-2">Login with Google</span>
                </>)}
            </button_1.Button>
          </form>
        </form_1.Form>
        <div className="text-sm text-center">
          <span className="text-gray-600">
            Don t have an account?{' '}
            <link_1.default href="/signup" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Sign up
            </link_1.default>
          </span>
        </div>
        <div className="text-sm text-center">
          <link_1.default href="/forget" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Forgot Password?
          </link_1.default>
        </div>
      </div>
    </div>);
};
exports.default = Login;
