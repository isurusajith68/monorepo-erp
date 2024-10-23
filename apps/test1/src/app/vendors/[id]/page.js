"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_vendor_1 = require("@/components/features/vendors/form-vendor");
const react_1 = require("react");
const Page = ({ params }) => {
    return (<>
      <form_vendor_1.default id={params.id}/>
    </>);
};
exports.default = Page;
