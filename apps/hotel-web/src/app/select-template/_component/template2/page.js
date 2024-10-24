"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
function Template2() {
    return (<div>
      <div className="ml-10">
        <h1>Template 2</h1>
        <p>This is a template 2</p>
      </div>
      <div className="bg-slate-100 border-2 w-[100%] text-center ml-10">
        <image_1.default src="/img/sohohotel.png" width={410} height={10} alt={'hh'}/>
      </div>
      <link_1.default href={'create-template2'}>
        <button_1.Button className="mt-2 ml-[90%]">Use This</button_1.Button>
      </link_1.default>
    </div>);
}
exports.default = Template2;
