"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipt_view_list_1 = __importDefault(require("@/components/features/reciepts/recipt-view-list"));
const react_1 = __importDefault(require("react"));
const page = () => {
    return (<div>
      <recipt_view_list_1.default></recipt_view_list_1.default>
    </div>);
};
exports.default = page;
