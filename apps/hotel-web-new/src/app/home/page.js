"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
function Home() {
    return (<div>
      <h1>Home</h1>
      <react_router_dom_1.Link to={'/select-template'}>
        <button_1.Button className="bg-green-500 ml-10">Create Web</button_1.Button>
      </react_router_dom_1.Link>
    </div>);
}
exports.default = Home;
