"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpTimeLeft = exports.useOtpSuccessStore = exports.useForgetPasswordStore = void 0;
const zustand_1 = require("zustand");
exports.useForgetPasswordStore = (0, zustand_1.create)((set) => ({
    email: '',
    setEmail: (email) => set({ email }),
}));
exports.useOtpSuccessStore = (0, zustand_1.create)((set) => ({
    success: false,
    setSuccess: (success) => set({ success }),
}));
exports.otpTimeLeft = (0, zustand_1.create)((set) => ({
    timeLeft: 0,
    setTimeLeft: (timeLeft) => set({ timeLeft }),
}));
