"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = __importDefault(require("@/components/features/dashboard/dashboard"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <dashboard_1.default></dashboard_1.default>
    </div>);
}
exports.default = page;
