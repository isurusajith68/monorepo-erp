"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_projects_1 = require("@/components/features/projects/form-projects");
const react_1 = require("react");
const Page = ({ params }) => {
    return (<>
      {/* <div>Page {params.id}</div> */}
      <form_projects_1.default pid={params.pid}/>
    </>);
};
exports.default = Page;
