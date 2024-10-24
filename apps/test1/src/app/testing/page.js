"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = __importDefault(require("@/components/features/test/Test"));
const react_1 = __importDefault(require("react"));
const page = () => {
    return (<div>
      hello
      <Test_1.default></Test_1.default>
    </div>);
};
exports.default = page;
