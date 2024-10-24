"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_finacial_summary_1 = __importDefault(require("@/components/features/reports/project-finacial-summary"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <project_finacial_summary_1.default></project_finacial_summary_1.default>
    </div>);
}
exports.default = page;
