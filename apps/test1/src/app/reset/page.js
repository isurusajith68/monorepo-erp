"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const z = __importStar(require("zod"));
const forgetPassword_1 = require("@/store/forgetPassword");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const use_toast_1 = require("@/components/ui/use-toast");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const form_1 = require("@/components/ui/form");
const card_1 = require("@/components/ui/card");
const auth_action_1 = require("@/components/features/auth/auth-action");
const passwordSchema = z
    .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});
const Reset = () => {
    const { setSuccess, success } = (0, forgetPassword_1.useOtpSuccessStore)();
    const { setEmail, email } = (0, forgetPassword_1.useForgetPasswordStore)();
    const router = (0, navigation_1.useRouter)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(passwordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });
    (0, react_2.useEffect)(() => {
        if (!email) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'No email found',
                variant: 'destructive',
            });
            router.push('/forget');
        }
        else if (!success) {
            router.push('/reset');
        }
    }, [success, email, router]);
    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const { success, message } = await (0, auth_action_1.resetPassword)(email, values.password);
            if (success) {
                (0, use_toast_1.toast)({ title: 'Success', description: message });
                router.push('/login');
                // setSuccess(false);
                // setEmail("");
            }
            else {
                (0, use_toast_1.toast)({ title: 'Error', description: message, variant: 'destructive' });
            }
        }
        catch (error) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'Failed to reset password. Please try again.',
                variant: 'destructive',
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (!email || !success) {
        return null; // Don't render anything while redirecting
    }
    return (<div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <card_1.Card className="w-full max-w-md">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl font-bold">Reset Password</card_1.CardTitle>
          <card_1.CardDescription>Enter your new password below.</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form_1.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <form_1.FormField control={form.control} name="password" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>New Password</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input type="password" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <form_1.FormField control={form.control} name="confirmPassword" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Confirm New Password</form_1.FormLabel>
                    <form_1.FormControl>
                      <input_1.Input type="password" {...field}/>
                    </form_1.FormControl>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
              <button_1.Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button_1.Button>
            </form>
          </form_1.Form>
        </card_1.CardContent>
        <card_1.CardFooter className="justify-center">
          <button_1.Button variant="link" onClick={() => router.push('/login')}>
            Back to Login
          </button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
};
exports.default = Reset;
