"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNavConfig = void 0;
const Customer_1 = require("./Customer/Customer");
const add_invoice_1 = require("./Invoice/add-invoice");
const list_invoice_1 = require("./Invoice/list-invoice");
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
