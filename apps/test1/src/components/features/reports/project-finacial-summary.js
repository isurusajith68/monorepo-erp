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
const select_1 = require("@/components/ui/select");
const project_action_1 = require("../projects/project-action");
function ProjectFinacialSummary() {
    const [projects, setProjects] = (0, react_1.useState)([]);
    const [searchType, setSearchType] = (0, react_1.useState)('all');
    const [purchasedata, setPurchersData] = (0, react_1.useState)([]);
    const [invoicedata, setInvoiceData] = (0, react_1.useState)([]);
    const [totalPurchaseAmount, setTotalPurchaseAmount] = (0, react_1.useState)(0);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = (0, react_1.useState)(0);
    const [totalbalance, setTotalBalance] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const fetchProjects = async () => {
            const response = await (0, project_action_1.getAllProjects)();
            if (response.success) {
                setProjects(response.data);
            }
        };
        fetchProjects();
    }, []);
    const getPurches = async () => {
        const cus = await (0, project_action_1.SelectProjects)();
        const reversedData = cus.data.reverse();
        console.log('firsttttttttttttttttttttttt', reversedData);
        // Filter the data based on the date range
        const filteredData = reversedData.filter((item) => {
            const matchesProjectType = searchType === 'all' ||
                item.pname.toLowerCase() === searchType.toLowerCase();
            return matchesProjectType;
        });
        setPurchersData(filteredData);
        // Calculate the total amount for purchases
        const totalPurchaseAmount = filteredData.reduce((total, item) => {
            return total + (item.totalamount || 0);
        }, 0);
        setTotalPurchaseAmount(totalPurchaseAmount);
    };
    const getInvoices = async () => {
        const cus = await (0, project_action_1.SelectInvoices)();
        const reversedData = cus.data.reverse();
        // Filter the data based on the date range
        const filteredData = reversedData.filter((item) => {
            const matchesProjectType = searchType === 'all' ||
                item.pname.toLowerCase() === searchType.toLowerCase();
            return matchesProjectType;
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
        Project Financial Summary
      </h1>

      {/* Date Range Selector */}
      <div className="flex space-x-4 mb-10 lg:ml-[10%]">
        <h4>Project</h4>
        <select_1.Select onValueChange={(value) => setSearchType(value)} defaultValue="all">
          <select_1.SelectTrigger className="w-[200px] rounded border-2 border-green-600">
            <select_1.SelectValue placeholder="Select a Vendor Name"/>
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectGroup>
              <select_1.SelectItem value={'all'}>All</select_1.SelectItem>
              {projects.map((project) => (<select_1.SelectItem key={project.pid} value={project.pname} // Removed unnecessary template string
        >
                  {project.pname}
                </select_1.SelectItem>))}
            </select_1.SelectGroup>
          </select_1.SelectContent>
        </select_1.Select>
        <button_1.Button className="bg-green-500 text-white px-4 py-2 rounded-md lg:w-24" onClick={handleSearch}>
          Run
        </button_1.Button>
      </div>

      {/* Summary Sections */}
      <div className="grid grid-cols-2 gap-8 lg:w-[96%] lg:ml-[2%]">
        {/* Purchase Summary */}
        <div className="bg-white rounded-lg  p-5">
          <h2 className="font-semibold text-l mb-4">
            Project Expences Summary
          </h2>
          <table_1.Table className="lg:w-[100%]">
            <table_1.TableHeader>
              <table_1.TableRow>
                <table_1.TableHead>Project_No</table_1.TableHead>
                <table_1.TableHead>Project Name</table_1.TableHead>
                <table_1.TableHead>Project Type</table_1.TableHead>
                <table_1.TableHead>Project Amount</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {purchasedata.map((item, index) => (<table_1.TableRow key={index} className={index % 2 === 0
                ? 'hover:bg-green-100'
                : 'hover:bg-green-100'}>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.project}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.totalamount}
                  </table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
          <hr className="border-green-300 mt-5"/>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalPurchaseAmount}.00 LKR</p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white rounded-lg  p-5">
          <h2 className="font-semibold text-l mb-4">Project Income Summary</h2>
          <table_1.Table className="w-full">
            <table_1.TableHeader>
              <table_1.TableRow>
                <table_1.TableHead>Project_No</table_1.TableHead>
                <table_1.TableHead>Project Name</table_1.TableHead>
                <table_1.TableHead>Project Type</table_1.TableHead>
                <table_1.TableHead>Income Amount</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {invoicedata.map((item, index) => (<table_1.TableRow key={index} className={index % 2 === 0
                ? 'hover:bg-green-100'
                : 'hover:bg-green-100'}>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.project}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-center px-4 py-2">
                    {item.totalAmount}
                  </table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
          <hr className="border-green-300 mt-5"/>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalInvoiceAmount}.00 LKR</p>
          </div>
        </div>
      </div>

      {/* Expense and Income Summary */}
      <div className="lg:w-[40%] lg:ml-[50%] mt-10 p-5 bg-green-100 rounded-lg ">
        <div className="flex justify-between mb-4">
          <div>
            <label className="block font-semibold">Expence</label>
            <input_1.Input type="text" value={`${totalPurchaseAmount}.00 LKR`} readOnly className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 font-semibold"/>
          </div>
          <div>
            <label className="block font-semibold">Income</label>
            <input_1.Input type="text" value={`${totalInvoiceAmount}.00 LKR`} className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 font-semibold"/>
          </div>
        </div>
        <hr className="border-gray-300 my-4"/>
        <div className="flex font-bold text-xl">
          <span>Balance</span>
          <input_1.Input type="text" value={`${totalbalance}.00 LKR`} placeholder="LKR" className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 lg:w-[50%] ml-10"/>
        </div>
      </div>
    </div>);
}
exports.default = ProjectFinacialSummary;
