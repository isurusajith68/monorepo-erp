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
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const react_1 = __importStar(require("react"));
const table_1 = require("@/components/ui/table");
const purchase_action_1 = require("../purchase/purchase-action");
const invoice_action_1 = require("../invoices/invoice-action");
function FinacialSummary({ items }) {
    const [purchasedata, setPurchersData] = (0, react_1.useState)([]);
    const [invoicedata, setInvoiceData] = (0, react_1.useState)([]);
    const [searchstartdate, setSearchStartDate] = (0, react_1.useState)('');
    const [searchenddate, setSearchEndDate] = (0, react_1.useState)('');
    const [totalPurchaseAmount, setTotalPurchaseAmount] = (0, react_1.useState)(0);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = (0, react_1.useState)(0);
    const [totalbalance, setTotalBalance] = (0, react_1.useState)(0);
    const getPurches = async () => {
        const cus = await (0, purchase_action_1.getAllData)();
        const reversedData = cus.data.reverse();
        // Filter the data based on the date range
        const filteredData = reversedData.filter((item) => {
            const purchaseDate = new Date(item.purchasedate);
            const startDate = searchstartdate ? new Date(searchstartdate) : null;
            const endDate = searchenddate ? new Date(searchenddate) : null;
            return ((!startDate || purchaseDate >= startDate) &&
                (!endDate || purchaseDate <= endDate));
        });
        setPurchersData(filteredData);
        // Calculate the total amount for purchases
        const totalPurchaseAmount = filteredData.reduce((total, item) => {
            return total + (item.totalamount || 0);
        }, 0);
        setTotalPurchaseAmount(totalPurchaseAmount);
    };
    const getInvoices = async () => {
        const cus = await (0, invoice_action_1.getAllInvoices)();
        const reversedData = cus.data.reverse();
        // Filter the data based on the date range
        const filteredData = reversedData.filter((item) => {
            const invoiceDate = new Date(item.invoicedate);
            const startDate = searchstartdate ? new Date(searchstartdate) : null;
            const endDate = searchenddate ? new Date(searchenddate) : null;
            return ((!startDate || invoiceDate >= startDate) &&
                (!endDate || invoiceDate <= endDate));
        });
        setInvoiceData(filteredData);
        // Calculate the total amount for invoices
        const totalInvoiceAmount = filteredData.reduce((total, item) => {
            return total + parseFloat(item.totalAmount || 0);
        }, 0);
        setTotalInvoiceAmount(totalInvoiceAmount);
    };
    const handleSearch = () => {
        getPurches();
        getInvoices();
    };
    (0, react_1.useEffect)(() => {
        setTotalBalance(totalInvoiceAmount - totalPurchaseAmount);
    }, [totalPurchaseAmount, totalInvoiceAmount]);
    return (<div className="min-h-screen bg-gray-50 flex flex-col  py-10 mt-10">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-10 lg:ml-[40%]">
        Financial Summary
      </h1>

      {/* Date Range Selector */}
      <div className="flex space-x-4 mb-10 lg:ml-[10%]">
        <input_1.Input type="date" className="border border-green-500 rounded-md px-3 py-2 outline-none lg:w-44" placeholder="From" value={searchstartdate} onChange={(e) => setSearchStartDate(e.target.value)}/>
        <input_1.Input type="date" className="border border-green-500 rounded-md px-3 py-2 outline-none lg:w-44" placeholder="To" value={searchenddate} onChange={(e) => setSearchEndDate(e.target.value)}/>
        <button_1.Button className="bg-green-500 text-white px-4 py-2 rounded-md lg:w-24" onClick={handleSearch}>
          Run
        </button_1.Button>
      </div>

      {/* Summary Sections */}
      <div className="grid grid-cols-2 gap-6 lg:w-[96%] lg:ml-[2%]">
        {/* Purchase Summary */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-semibold text-l mb-4">Purchase Summary</h2>

          {/* Scrollable Table Container */}
          <div className="lg:h-[300px] overflow-y-scroll">
            <table_1.Table className="w-full">
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>P_No</table_1.TableHead>
                  <table_1.TableHead>Purchase Type</table_1.TableHead>
                  <table_1.TableHead>Project</table_1.TableHead>
                  <table_1.TableHead>Seller Name</table_1.TableHead>
                  <table_1.TableHead>Bill Date</table_1.TableHead>
                  <table_1.TableHead>Expense Amount</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {purchasedata.map((item, index) => (<table_1.TableRow key={index}>
                    <table_1.TableCell>{item.purchaseid}</table_1.TableCell>
                    <table_1.TableCell>{item.purchasetype}</table_1.TableCell>
                    <table_1.TableCell>{item.project}</table_1.TableCell>
                    <table_1.TableCell>{item.sellertype}</table_1.TableCell>
                    <table_1.TableCell>{item.purchasedate}</table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {item.totalamount}
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
          </div>

          <hr className="border-green-300 mt-5"/>

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalPurchaseAmount}.00 LKR</p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white rounded-lg  p-5 ">
          <h2 className="font-semibold text-l mb-4">Invoice Summary</h2>
          <div className="lg:h-[300px] overflow-y-scroll">
            <table_1.Table className="w-96">
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>Invoice_No</table_1.TableHead>
                  <table_1.TableHead>Invoice Type</table_1.TableHead>
                  <table_1.TableHead>Project</table_1.TableHead>
                  <table_1.TableHead>Company or Person</table_1.TableHead>
                  <table_1.TableHead>Invoice Date</table_1.TableHead>
                  <table_1.TableHead>Income Amount</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {invoicedata.map((item, index) => (<table_1.TableRow key={index}>
                    <table_1.TableCell>{item.invoiceid}</table_1.TableCell>
                    <table_1.TableCell>{item.ctype}</table_1.TableCell>
                    <table_1.TableCell>{item.project}</table_1.TableCell>
                    <table_1.TableCell>{item.itype}</table_1.TableCell>
                    <table_1.TableCell>{item.invoicedate}</table_1.TableCell>
                    <table_1.TableCell className="text-center">
                      {item.totalAmount}{' '}
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
          </div>
          <hr className="border-green-300 mt-5"/>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalInvoiceAmount}.00 LKR</p>
          </div>
        </div>
      </div>

      {/* Expense and Income Summary */}
      <div className="lg:w-[40%] lg:ml-[50%] mt-10 p-5 bg-green-50 rounded-lg ">
        <div className="flex justify-between mb-4 font-bold">
          <div>
            <label className="block font-semibold">Expence</label>
            <input_1.Input type="text" value={`${totalPurchaseAmount}.00 LKR`} readOnly className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2"/>
          </div>
          <div>
            <label className="block font-semibold">Income</label>
            <input_1.Input type="text" placeholder="LKR" value={`${totalInvoiceAmount}.00 LKR`} className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2"/>
          </div>
        </div>
        <hr className="border-gray-300 my-4"/>
        <div className="flex  text-xl font-bold">
          <span>Balance</span>
          <input_1.Input type="text" placeholder="LKR" value={`${totalbalance}.00 LKR`} className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 lg:w-[50%] ml-10"/>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <div>
            <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
            </span>
          </div>
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
            Writes Upside-Down
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation,
            including upside-down. It even works in outer space.
          </p>
        </div>
      </div>
    </div>);
}
exports.default = FinacialSummary;
