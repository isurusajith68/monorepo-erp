"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const main_page_1 = __importDefault(require("../select-template/_component/template1/template1-home/main-page"));
function page() {
    return (<div className="flex flex-col md:flex-row">
      <main_page_1.default></main_page_1.default>
    </div>);
}
exports.default = page;
