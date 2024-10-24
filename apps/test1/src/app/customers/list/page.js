"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const customer_list_1 = __importDefault(require("@/components/features/customers/customer-list"));
function page() {
    return (<div>
      <customer_list_1.default />
    </div>);
}
