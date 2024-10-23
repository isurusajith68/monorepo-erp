"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const page_1 = require("./_component/template1/page");
const page_2 = require("./_component/template2/page");
const page_3 = require("./_component/template4/page");
const page_4 = require("./_component/template3/page");
const page_5 = require("./_component/template6/page");
const page_6 = require("./_component/template5/page");
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
