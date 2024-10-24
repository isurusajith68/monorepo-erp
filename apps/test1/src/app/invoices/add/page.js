"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const invoice_add_1 = __importDefault(require("@/components/features/invoices/invoice-add"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <invoice_add_1.default />
    </div>);
}
