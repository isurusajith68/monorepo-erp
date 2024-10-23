"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoogleCallback;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_action_1 = require("@/components/features/auth/auth-action");
const use_toast_1 = require("@/components/ui/use-toast");
function GoogleCallback() {
    const router = (0, navigation_1.useRouter)();
    const hasRunRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent running the effect more than once
        if (hasRunRef.current)
            return;
        hasRunRef.current = true;
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                try {
                    const { success, message } = await (0, auth_action_1.handleGoogleCallback)(code);
                    if (success) {
                        router.push('/dashboard');
                        (0, use_toast_1.toast)({
                            title: 'Login successful',
                        });
                    }
                    else {
                        router.push('/login');
                        (0, use_toast_1.toast)({
                            title: 'Login failed',
                            description: 'you are not authorized',
                            variant: 'destructive',
                        });
                    }
                }
                catch (err) {
                    console.error('Error during login:', err);
                    router.push('/login');
                }
            }
            else {
                router.push('/login');
            }
        };
        handleCallback();
    }, []);
    return (<div className="flex justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>);
}
