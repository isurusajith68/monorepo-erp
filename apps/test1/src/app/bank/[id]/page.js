"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bankform_1 = require("@/components/features/bank/bankform");
const react_1 = require("react");
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <bankform_1.default id={params.id}/>
    </>);
};
exports.default = Page;
