"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const finacialsummary_1 = __importDefault(require("@/components/features/reports/finacialsummary"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <finacialsummary_1.default></finacialsummary_1.default>
    </div>);
}
exports.default = page;
