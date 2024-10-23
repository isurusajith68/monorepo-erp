"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (<textarea className={(0, utils_1.cn)('flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props}/>);
});
exports.Textarea = Textarea;
Textarea.displayName = 'Textarea';
