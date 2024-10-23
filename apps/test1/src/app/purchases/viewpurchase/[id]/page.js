"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = page;
const purchase_view_1 = require("@/components/features/purchase/purchase-view");
const react_1 = require("react");
function page({ params }) {
    return (<div>
      <purchase_view_1.default id={params.id}/>
    </div>);
}
