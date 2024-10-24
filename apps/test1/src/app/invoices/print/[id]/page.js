"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const print_invoice_1 = __importDefault(require("@/components/features/invoices/print-invoice"));
const react_1 = __importDefault(require("react"));
function page({ params }) {
    return (<div>
      <print_invoice_1.default id={params.id}/>
    </div>);
}
exports.default = page;
