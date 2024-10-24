"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const invoice_details_1 = __importDefault(require("@/components/features/invoices/invoice-details"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <invoice_details_1.default />
    </div>);
}
