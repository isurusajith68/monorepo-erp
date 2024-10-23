"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const print_invoice_1 = require("@/components/features/invoices/print-invoice");
const react_1 = require("react");
function page({ params }) {
    return (<div>
      <print_invoice_1.default id={params.id}/>
    </div>);
}
exports.default = page;
