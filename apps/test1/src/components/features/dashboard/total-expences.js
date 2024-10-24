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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const purchase_action_1 = require("../purchase/purchase-action");
function TotalExpense() {
    const [expense, setExpenses] = (0, react_1.useState)([]);
    const [incomexpense, setIncomExpenses] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (0, purchase_action_1.getAllData)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setExpenses(reversedData); // Set the reversed array to state
                reversedData.forEach((purchases) => { });
            }
            else {
                console.log('error');
            }
        });
        (0, purchase_action_1.getAllData)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setIncomExpenses(reversedData); // Set the reversed array to state
                reversedData.forEach((purchases) => { });
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const calculateTotalexpences = (expense) => {
        let totalExpense = 0;
        expense.forEach((invoice) => {
            totalExpense += parseFloat(invoice.totalpaid);
        });
        return totalExpense;
    };
    const calculateTotalDueexpences = (expense) => {
        let totalExpense = 0;
        expense.forEach((invoice) => {
            totalExpense +=
                parseFloat(invoice.totalamount) - parseFloat(invoice.totalpaid);
        });
        return totalExpense;
    };
    return (<div className="flex ">
      <div>
        <p className="text-sm text-green-700">Expense Paid</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalexpences(expense)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
      <div className="border-l border-green-200 mx-4 lg:ml-[28%] md:ml-[10%]"></div>
      <div className="lg:ml-[2%]">
        <p className="text-sm text-green-700">The Cost to be Paid</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalDueexpences(incomexpense)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
    </div>);
}
exports.default = TotalExpense;
