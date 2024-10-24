"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = projects;
const view_project_1 = __importDefault(require("@/components/features/projects/view-project"));
const react_1 = __importDefault(require("react"));
function projects() {
    return (<div>
      <view_project_1.default></view_project_1.default>
    </div>);
}
