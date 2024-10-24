"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Role;
const react_1 = __importDefault(require("react"));
const form_role_1 = __importDefault(require("./_components/form-role"));
function Role() {
    return (<div>
      <p className="text-4xl pb-6 pt-8"> User Roles</p>
      <form_role_1.default />
    </div>);
}
