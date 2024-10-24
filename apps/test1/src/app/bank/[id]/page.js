"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bankform_1 = __importDefault(require("@/components/features/bank/bankform"));
const react_1 = __importDefault(require("react"));
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <bankform_1.default id={params.id}/>
    </>);
};
exports.default = Page;
