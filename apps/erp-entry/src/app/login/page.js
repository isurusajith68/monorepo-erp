"use strict";
// import { Button } from '@/components/ui/button';
// import React from 'react'
// import { useNavigate } from 'react-router-dom';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default function Dashboard() {
//     const navigate=useNavigate()
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Button
//         className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         onClick={() => {
//           navigate("");
//         }}
//       >
//         Account
//       </Button>
//     </div>
//   )
// }
const react_router_dom_1 = require("react-router-dom");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const form_1 = require("@/components/ui/form");
const use_toast_1 = require("@/hooks/use-toast");
const FormSchema = zod_2.z.object({
    email: zod_2.z.string().email('Please enter a valid email address'),
    password: zod_2.z.string().min(2, 'Password must be at least 6 characters long'),
});
const Login = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const toggleVisibility = () => setIsVisible(!isVisible);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const handleGoogleLogin = async () => {
        setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        //   navigate("/dashboard");
        // }, 2000);
        navigate('/dashboard');
    };
    const onSubmit = (data) => {
        const login = async () => {
            const response = await axios_1.default.post('http://localhost:10000/login', data, {
                withCredentials: true, // This ensures cookies are sent with the request
            });
            console.log('response.data', response);
            if (response.data.success) {
                (0, use_toast_1.toast)({
                    title: 'Logging successfull',
                    description: response.data.message,
                });
                window.localStorage.setItem('loggedin', 'true');
                navigate('/dashboard');
            }
            else {
                (0, use_toast_1.toast)({
                    variant: 'destructive',
                    title: 'Login Error',
                    description: response.data.message,
                });
            }
        };
        login();
        // axios.post("https://reqres.in/api/login", userData).then((response) => {
        //   console.log(response.status, response.data.token);
        // });
        // navigate("/");
    };
    return (
    // <div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-green-300  to-white-500 px-4 sm:px-6 lg:px-8">
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
              {loading ? ('Redirecting...') : (<span className="ml-2">Login with Google</span>)}
            </button_1.Button>
          </form>
        </form_1.Form>
        <div className="text-sm text-center">
          <span className="text-gray-600">
            Don’t have an account?{' '}
            <react_router_dom_1.NavLink to="/signup" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Sign up
            </react_router_dom_1.NavLink>
          </span>
        </div>
        <div className="text-sm text-center">
          <react_router_dom_1.NavLink to="/forgot" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Forgot Password?
          </react_router_dom_1.NavLink>
        </div>
      </div>
    </div>);
};
exports.default = Login;
