"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const purchase_list_1 = __importDefault(require("@/components/features/purchase/purchase-list"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <purchase_list_1.default />
    </div>);
}
