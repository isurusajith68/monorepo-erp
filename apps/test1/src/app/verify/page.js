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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
const react_1 = __importStar(require("react"));
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const use_toast_1 = require("@/components/ui/use-toast");
const auth_action_1 = require("@/components/features/auth/auth-action");
const forgetPassword_1 = require("@/store/forgetPassword");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function Component() {
    const [otp, setOtp] = (0, react_1.useState)(['', '', '', '', '', '']);
    const { timeLeft, setTimeLeft } = (0, forgetPassword_1.otpTimeLeft)();
    const [isExpired, setIsExpired] = (0, react_1.useState)(false);
    const inputRefs = (0, react_1.useRef)([]);
    const { setSuccess } = (0, forgetPassword_1.useOtpSuccessStore)();
    const { email } = (0, forgetPassword_1.useForgetPasswordStore)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        inputRefs.current[0]?.focus();
    }, []);
    (0, react_1.useEffect)(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
        else {
            setIsExpired(true);
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'OTP has expired. Please request a new one.',
                variant: 'destructive',
            });
        }
    }, [timeLeft]);
    (0, react_1.useEffect)(() => {
        if (otp.join('').length === 6 && !isExpired) {
            handleSubmit();
        }
    }, [otp, isExpired]);
    (0, react_1.useEffect)(() => {
        if (!email) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'No email found',
                variant: 'destructive',
            });
            router.push('/forget');
        }
    }, [email]);
    const handleChange = (element, index) => {
        if (isNaN(Number(element.target.value)))
            return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);
        if (element.target.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const handleSubmit = async () => {
        const otpString = otp.join('');
        if (isExpired) {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'OTP has expired. Please request a new one.',
                variant: 'destructive',
            });
            return;
        }
        if (otpString.length === 6) {
            if (email) {
                const res = await (0, auth_action_1.verifyOTP)(email, otpString);
                if (res.success) {
                    (0, use_toast_1.toast)({ title: 'Success', description: res.message });
                    setSuccess(true);
                    router.push('/reset');
                }
                else {
                    (0, use_toast_1.toast)({
                        title: 'Error',
                        description: res.message,
                        variant: 'destructive',
                    });
                }
            }
            else {
                (0, use_toast_1.toast)({
                    title: 'Error',
                    description: 'No email found. Please request OTP again.',
                    variant: 'destructive',
                });
            }
        }
        else {
            (0, use_toast_1.toast)({
                title: 'Error',
                description: 'Please enter a valid 6-digit OTP',
                variant: 'destructive',
            });
        }
    };
    return (<div className="flex h-screen w-full items-center justify-center bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <card_1.Card className="w-full max-w-md">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl font-bold">Enter OTP</card_1.CardTitle>
          <card_1.CardDescription>
            Please enter the 6-digit code sent to your email{' '}
            <span className="font-bold">{email}</span>.
            <div className="mt-1">
              <span className={isExpired ? 'text-red-500 text-xs ' : 'text-xs'}>
                {isExpired ? (<>
                    OTP has expired. Please request a new one.
                    <link_1.default href="/forget" className="text-blue-500 underline ml-1">
                      Resend OTP
                    </link_1.default>
                  </>) : (`OTP will expire in ${timeLeft} seconds.`)}
              </span>
            </div>
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form>
            <div className="flex justify-between mb-6">
              {otp.map((data, index) => (<input_1.Input key={index} type="text" inputMode="numeric" maxLength={1} ref={(el) => (inputRefs.current[index] = el)} value={data} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-12 text-center text-2xl" disabled={isExpired}/>))}
            </div>
            <button_1.Button type="button" className="w-full" disabled={isExpired || otp.join('').length !== 6} onClick={handleSubmit}>
              Verify OTP
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
