"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const form_purchase_1 = __importDefault(require("@/components/features/purchase/form-purchase"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <form_purchase_1.default />
    </div>);
}
