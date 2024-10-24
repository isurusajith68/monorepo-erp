"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bank_view_1 = __importDefault(require("@/components/features/bank/bank-view"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <bank_view_1.default></bank_view_1.default>
    </div>);
}
exports.default = page;
