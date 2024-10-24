"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const ButtonTest = () => {
    return (<>
      <div className="">
        <button className="bg-red-300 text-red-900">Button</button>
        <button className="bg-green-600 text-red-900">pasindu</button>
        <p className="text-blue-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero magnam
          ea accusantium, similique, incidunt ab corporis ex minus reprehenderit
          doloribus soluta voluptate. Cupiditate dignissimos quam fuga fugit
          debitis, qui deserunt!
        </p>
        <button_1.Button>Click me</button_1.Button>
      </div>
    </>);
};
exports.default = ButtonTest;
