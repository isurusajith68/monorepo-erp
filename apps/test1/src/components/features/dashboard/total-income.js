"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const invoice_action_1 = require("../invoices/invoice-action");
function TotalIncome() {
    const [invoices, setInvoices] = (0, react_1.useState)([]);
    const [dueincome, setDueIncom] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (0, invoice_action_1.getAllData)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setInvoices(reversedData); // Set the reversed array to state
                reversedData.forEach((invoice) => { });
            }
            else {
                console.log('error');
            }
        });
        (0, invoice_action_1.getAllData)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                setDueIncom(reversedData); // Set the reversed array to state
                reversedData.forEach((dueincome) => { });
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const calculateTotalIncome = (invoices) => {
        let totalIncome = 0;
        invoices.forEach((invoice) => {
            totalIncome += parseFloat(invoice.totalpaid);
        });
        return totalIncome;
    };
    const calculateTotalDueIncome = (dueincome) => {
        let totalIncome = 0;
        invoices.forEach((invoice) => {
            totalIncome +=
                parseFloat(invoice.totalAmount) - parseFloat(invoice.totalpaid);
        });
        return totalIncome;
    };
    return (<div className="flex">
      <div>
        <p className="text-sm text-green-700">Income Received</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalIncome(invoices)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
      <div className="border-l border-green-200 mx-4 lg:ml-[28%] md:ml-[10%]"></div>
      <div className="lg:ml-[2%]">
        <p className="text-sm text-green-700">Income to be Received</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalDueIncome(dueincome)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
    </div>);
}
exports.default = TotalIncome;
