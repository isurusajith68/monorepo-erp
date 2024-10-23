"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputWithIcon = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const InputWithIcon = React.forwardRef(({ className, type, icon, ...props }, ref) => {
    return (<div className="relative flex items-center">
        {icon && (<span className="hover absolute right-3 text-muted-foreground">
            {icon}
          </span>)}
        <input type={type} className={(0, utils_1.cn)('flex h-10 w-full rounded-md border border-input bg-background px-0 py-2 pl-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props}/>
      </div>);
});
exports.InputWithIcon = InputWithIcon;
InputWithIcon.displayName = 'InputWithIcon';
