"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_add_1 = __importDefault(require("@/components/features/invoices/invoice-add"));
const react_1 = __importDefault(require("react"));
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <invoice_add_1.default id={params.id}/>
    </>);
};
exports.default = Page;
