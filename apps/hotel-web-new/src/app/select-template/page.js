"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("./_component/template-1/page"));
function SelectTemplate() {
    return (<div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] ml-10">
        <page_1.default></page_1.default>
      </div>
    </div>);
}
exports.default = SelectTemplate;
