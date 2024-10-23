"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccordionContent = exports.AccordionTrigger = exports.AccordionItem = exports.Accordion = void 0;
const React = require("react");
const AccordionPrimitive = require("@radix-ui/react-accordion");
const react_icons_1 = require("@radix-ui/react-icons");
const utils_1 = require("@/lib/utils");
const Accordion = AccordionPrimitive.Root;
exports.Accordion = Accordion;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (<AccordionPrimitive.Item ref={ref} className={(0, utils_1.cn)('border-b', className)} {...props}/>));
exports.AccordionItem = AccordionItem;
AccordionItem.displayName = 'AccordionItem';
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (<AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={(0, utils_1.cn)('flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180', className)} {...props}>
      {children}
      <react_icons_1.ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"/>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>));
exports.AccordionTrigger = AccordionTrigger;
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (<AccordionPrimitive.Content ref={ref} className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
    <div className={(0, utils_1.cn)('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>));
exports.AccordionContent = AccordionContent;
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
