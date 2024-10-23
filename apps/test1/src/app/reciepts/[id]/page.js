"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipt_form_1 = require("@/components/features/reciepts/recipt-form");
const react_1 = require("react");
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <recipt_form_1.default id={params.id}/>
    </>);
};
exports.default = Page;
