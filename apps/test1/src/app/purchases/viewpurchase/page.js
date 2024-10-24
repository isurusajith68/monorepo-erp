"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const purchase_view_1 = __importDefault(require("@/components/features/purchase/purchase-view"));
function page() {
    return (<div>
      <purchase_view_1.default />
    </div>);
}
