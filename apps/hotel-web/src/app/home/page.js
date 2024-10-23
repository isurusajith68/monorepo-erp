"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const link_1 = require("next/link");
const react_1 = require("react");
function page() {
    return (<div>
      <h1>Page</h1>
      <link_1.default href={'/select-template'}>
        <button_1.Button className="bg-green-500 ml-10">Create Web</button_1.Button>
      </link_1.default>

      {/* <Home></Home> */}
    </div>);
}
exports.default = page;
