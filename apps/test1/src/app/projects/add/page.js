"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_projects_1 = __importDefault(require("@/components/features/projects/form-projects"));
const react_1 = __importDefault(require("react"));
function page() {
    return (<div>
      <form_projects_1.default></form_projects_1.default>
    </div>);
}
exports.default = page;
