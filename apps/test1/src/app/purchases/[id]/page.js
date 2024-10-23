"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const form_purchase_1 = require("@/components/features/purchase/form-purchase");
const react_1 = require("react");
function page({ params }) {
    return (<div>
      <form_purchase_1.default id={params.id}/>
    </div>);
}
