"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_customer_1 = require("@/components/features/customers/add-customer");
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <add_customer_1.default id={params.id}/>
    </>);
};
exports.default = Page;
