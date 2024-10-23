"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Role;
const react_1 = require("react");
const form_role_1 = require("./_components/form-role");
function Role() {
    return (<div>
      <p className="text-4xl pb-6 pt-8"> User Roles</p>
      <form_role_1.default />
    </div>);
}
