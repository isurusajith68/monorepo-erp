"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const page_1 = __importDefault(require("./_component/template1/page"));
const page_2 = __importDefault(require("./_component/template2/page"));
const page_3 = __importDefault(require("./_component/template4/page"));
const page_4 = __importDefault(require("./_component/template3/page"));
const page_5 = __importDefault(require("./_component/template6/page"));
const page_6 = __importDefault(require("./_component/template5/page"));
function page() {
    return (<div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] ml-10">
        <page_1.default></page_1.default>
        <page_2.default></page_2.default>
        <page_4.default></page_4.default>
        <page_3.default></page_3.default>
        <page_6.default></page_6.default>
        <page_5.default></page_5.default>
      </div>
    </div>);
}
exports.default = page;
