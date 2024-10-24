"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
function Template1() {
    return (<div>
      <div className="ml-10">
        <h1>Template 1</h1>
        <p>This is a template 1</p>
      </div>

      <div className="bg-slate-100 border-2 w-[100%] text-center ml-10">
        <img src="/img/Screenshot 2024-09-09 211107.png" width={500} height={10} alt={'hh'}/>
      </div>
      <react_router_dom_1.Link to={'/create-template1'}>
        <button_1.Button className="mt-2 ml-[90%]">Use This</button_1.Button>
      </react_router_dom_1.Link>
    </div>);
}
exports.default = Template1;
