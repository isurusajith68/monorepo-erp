"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const sample_lib_1 = require("@erp/sample-lib");
const react_1 = require("react");
function Home() {
    (0, react_1.useEffect)(() => { }, []);
    return (<div>
      <h1>Sample App</h1>
      <p>1 + 2 = {(0, sample_lib_1.add)(1, 2)}</p>
      <div>
        <a href="/test1">Go to Test</a>
      </div>
    </div>);
}
