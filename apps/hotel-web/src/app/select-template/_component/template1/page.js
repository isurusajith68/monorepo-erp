"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
function Template1() {
    return (<div>
      <div className="ml-10">
        <h1>Template 1</h1>
        <p>This is a template 1</p>
      </div>

      <div className="bg-slate-100 border-2 w-[100%] text-center ml-10">
        <image_1.default src="/img/Screenshot 2024-09-09 211107.png" width={500} height={10} alt={'hh'}/>
      </div>
      <link_1.default href={'create-template1'}>
        <button_1.Button className="mt-2 ml-[90%]">Use This</button_1.Button>
      </link_1.default>
    </div>);
}
exports.default = Template1;
