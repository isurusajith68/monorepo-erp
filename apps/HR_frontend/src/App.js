"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
function App() {
    const [count, setCount] = (0, react_1.useState)(0);
    return (<>
      <h1 className="text-8xl font-bold underline text-red-700">
        Hello world!
      </h1>
    </>);
}
exports.default = App;
