"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Button1;
const button_1 = require("@/components/ui/button");
const action_1 = require("./action");
function Button1() {
    const database = async () => {
        //get all files
        const filesInTheFolder = await (0, action_1.getFiles1)('C:/Users/User/Desktop/New folder');
        console.log('files of the folder', filesInTheFolder);
        //execute only one file
        await (0, action_1.oneFile)(filesInTheFolder);
    };
    return (<div>
      database <br></br>
      <button_1.Button className="bg-red-400" onClick={database} type="button">
        add
      </button_1.Button>
    </div>);
}
