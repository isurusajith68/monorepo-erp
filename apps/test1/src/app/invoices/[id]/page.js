"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_add_1 = require("@/components/features/invoices/invoice-add");
const react_1 = require("react");
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <invoice_add_1.default id={params.id}/>
    </>);
};
exports.default = Page;
