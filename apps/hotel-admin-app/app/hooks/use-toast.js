"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToast = useToast;
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
function useToast() {
    return {
        success: (message) => react_toastify_1.toast.success(message),
        error: (message) => react_toastify_1.toast.error(message),
    };
}
