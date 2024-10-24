"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const total_income_amount_1 = __importDefault(require("@/components/features/reports/total-income-amount"));
const total_purchus_amount_1 = __importDefault(require("@/components/features/reports/total-purchus-amount"));
const react_1 = __importStar(require("react"));
function Page() {
    const [sharedincome, SetSharedIncome] = (0, react_1.useState)('');
    const [sharedpurchues, SetSharedPurcchues] = (0, react_1.useState)('');
    const Balance = sharedincome - sharedpurchues;
    return (<div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-10">Total Cash Balance</div>
      <div className="flex justify-between w-full max-w-5xl px-5 ">
        <div className="w-1/2 rounded-lg p-5 mr-5">
          <div className="font-semibold text-xl mb-4">Cash Expense</div>
          <hr className="my-4 border-green-200"/>
          <div className="space-y-4">
            <total_purchus_amount_1.default SetSharedPurcchues={SetSharedPurcchues}/>
            <hr className="my-4 border-green-100 border-2"/>
          </div>
        </div>
        <div className="w-1/2 rounded-lg p-5 ml-5">
          <div className="font-semibold text-xl mb-4">Cash Income</div>
          <hr className="my-4 border-green-200"/>
          <div className="space-y-4">
            <total_income_amount_1.default SetSharedIncome={SetSharedIncome}/>
            <hr className="my-4 border-green-100  border-2"/>
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] lg:ml-[40%] max-w-2xl px-5 mt-2">
        <div className="flex justify-between font-semibold text-xl p-5 rounded-lg">
          <span>Cash Balance</span>
          <span className="border-b-2 border-green-600">{Balance}.00 LKR</span>
        </div>
        <hr className="border-green-100 -mt-4  border-2"/>
      </div>
    </div>);
}
exports.default = Page;
