"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNavConfig = void 0;
const Customer_1 = __importDefault(require("./Customer/Customer"));
const add_invoice_1 = __importDefault(require("./Invoice/add-invoice"));
const list_invoice_1 = __importDefault(require("./Invoice/list-invoice"));
exports.routeNavConfig = [
    { path: 'customers', element: <Customer_1.default></Customer_1.default> },
    {
        navTitle: 'Invoices',
        path: 'invoice',
        // element: <Invoice/>, if nested no element
        children: [
            {
                navTitle: 'add',
                path: 'add',
                element: <add_invoice_1.default />,
                children: [],
            },
            {
                navTitle: 'list',
                path: 'nestlist',
                children: [
                    {
                        navTitle: 'list',
                        path: 'list',
                        element: <list_invoice_1.default />,
                        children: [],
                    },
                ],
            },
        ],
    },
];
