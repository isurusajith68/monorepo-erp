"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Invoices;
const form_invoices_1 = __importDefault(require("@/components/features/invoices/form-invoices"));
const react_1 = __importDefault(require("react"));
function Invoices() {
    return (<div>
      <form_invoices_1.default />
    </div>);
}
