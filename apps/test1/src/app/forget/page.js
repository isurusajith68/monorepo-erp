"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
const react_1 = require("react");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const auth_action_1 = require("@/components/features/auth/auth-action");
const use_toast_1 = require("@/components/ui/use-toast");
const navigation_1 = require("next/navigation");
const forgetPassword_1 = require("@/store/forgetPassword");
const lucide_react_1 = require("lucide-react");
function Component() {
    const [email, setEmailEnter] = (0, react_1.useState)('');
    const { setEmail } = (0, forgetPassword_1.useForgetPasswordStore)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { setTimeLeft } = (0, forgetPassword_1.otpTimeLeft)();
    const router = (0, navigation_1.useRouter)();
    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (!email) {
                (0, use_toast_1.toast)({
                    title: 'Error',
                    description: 'Email is required',
                    variant: 'destructive',
                });
                setIsLoading(false);
                return;
            }
            const res = await (0, auth_action_1.sendMail)(email);
            if (res.success) {
                setEmail(email);
                setTimeLeft(60);
                router.push('/verify');
                (0, use_toast_1.toast)({
                    title: 'Success',
                    description: res.message,
                });
            }
            else {
                (0, use_toast_1.toast)({
                    title: 'Error',
                    description: res.message,
                    variant: 'destructive',
                });
            }
        }
        catch (error) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: error.res?.message || 'An unexpected error occurred',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <card_1.Card className="w-full max-w-md">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl font-bold">Forgot Password</card_1.CardTitle>
          <card_1.CardDescription>
            Enter your email address and we ll send you a otp to reset your
            password.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="email">Email</label_1.Label>
              <input_1.Input id="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmailEnter(e.target.value)} disabled={isLoading}/>
            </div>
            <button_1.Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (<>
                  <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Resetting...
                </>) : ('Reset Password')}
            </button_1.Button>
          </form>
        </card_1.CardContent>
        <card_1.CardFooter className="justify-center">
          <button_1.Button variant="link" onClick={() => router.push('/login')}>
            Back to Login
          </button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
