"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const group_perches_action_1 = require("./group-perches-action");
const YourComponent = ({ SetSharedPurcchues }) => {
    const [income, setIncome] = (0, react_1.useState)([]);
    const [totalIncome, setTotalIncome] = (0, react_1.useState)(0);
    const [dueIncome, setDueIncome] = (0, react_1.useState)(0);
    const [goods, SetGoods] = (0, react_1.useState)([]);
    const [service, SetService] = (0, react_1.useState)([]);
    const [assets, SetAssets] = (0, react_1.useState)([]);
    const [utilities, SetUtilities] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (0, group_perches_action_1.getAllProjectDueAmount)().then((response) => {
            if (response.success) {
                setIncome(response.data); // Set the data directly to state
                // Calculate and set the total income
                const total = calculateTotalIncome(response.data);
                setTotalIncome(total);
                // Log totalAmount for each income item
                response.data.forEach((item) => { });
            }
            else {
                console.log('Error fetching income data');
            }
        });
        (0, group_perches_action_1.getAllPurches)().then((response) => {
            if (response.success) {
                setDueIncome(response.data); // Set the data directly to state
                // Calculate and set the total income
                const total = calculateTotalDue(response.data);
                setDueIncome(total);
                // Log totalAmount for each income item
                response.data.forEach((item) => { });
            }
            else {
                console.log('Error fetching income data');
            }
        });
        (0, group_perches_action_1.getAllGoods)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                SetGoods(reversedData); // Set the reversed array to state
                // Log goods IDs to the console
                reversedData.forEach((goods) => { });
            }
            else {
                console.log('error');
            }
        });
        (0, group_perches_action_1.getAllService)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                SetService(reversedData); // Set the reversed array to state
                reversedData.forEach((service) => { });
            }
            else {
                console.log('error');
            }
        });
        (0, group_perches_action_1.getAllAssets)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                SetAssets(reversedData); // Set the reversed array to state
                reversedData.forEach((assets) => { });
            }
            else {
                console.log('error');
            }
        });
        (0, group_perches_action_1.getAllUtilities)().then((response) => {
            if (response.success) {
                const reversedData = response.data.reverse(); // Reverse the array
                SetUtilities(reversedData); // Set the reversed array to state
                reversedData.forEach((utilities) => { });
            }
            else {
                console.log('error');
            }
        });
    }, []);
    const calculateTotalService = (service) => {
        let totalIncome = 0;
        service.forEach((service) => {
            totalIncome += parseFloat(service.totalpaid);
        });
        return totalIncome;
    };
    const calculateTotalGoods = (goods) => {
        let totalIncome = 0;
        goods.forEach((goods) => {
            totalIncome += parseFloat(goods.totalpaid);
        });
        return totalIncome;
    };
    const calculateTotalAssets = (assets) => {
        let totalIncome = 0;
        assets.forEach((assets) => {
            totalIncome += parseFloat(assets.totalpaid);
        });
        return totalIncome;
    };
    const calculateTotalUtilities = (utilities) => {
        let totalIncome = 0;
        utilities.forEach((utilities) => {
            totalIncome += parseFloat(utilities.totalpaid);
        });
        return totalIncome;
    };
    const p = (e) => {
        SetSharedPurcchues(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        const TotalInvoiceIncome = (totalIncome || 0) + (dueIncome || 0);
        SetSharedPurcchues(TotalInvoiceIncome !== null ? TotalInvoiceIncome : 0);
    }, [totalIncome, dueIncome, SetSharedPurcchues]);
    const calculateTotalIncome = (income) => {
        return income.reduce((total, item) => total + parseFloat(item.totalpaid), 0);
    };
    const calculateTotalDue = (income) => {
        return income.reduce((due, item) => due + (parseFloat(item.totalamount) - parseFloat(item.totalpaid)), 0);
    };
    return (<div>
      <div className="flex justify-between">
        <span>Total Purchases Amount</span>
        <span className="font-semibold">{totalIncome.toFixed(2)} LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Goods</span>
        <span>{calculateTotalGoods(goods)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Service</span>
        <span>{calculateTotalService(service)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Assets</span>
        <span>{calculateTotalAssets(assets)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Utilities</span>
        <span>{calculateTotalUtilities(utilities)}.00 LKR</span>
      </div>
      <div className="flex justify-between">
        <span>Total Due Purchases</span>
        <span className="font-semibold">{dueIncome.toFixed(2)} LKR</span>
      </div>
      <hr className="my-4 border-2 border-green-300"/>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{(totalIncome + dueIncome).toFixed(2)} LKR</span>
      </div>
    </div>);
};
exports.default = YourComponent;
