import Customer from "./Customer/Customer";
import AddInvoice from "./Invoice/add-invoice";
import Invoice from "./Invoice/Invoice";
import ListInvoice from "./Invoice/list-invoice";

export const routeNavConfig = [
  { path: "customers", element: <Customer></Customer> },
  {
    navTitle: "Invoices",
    path: "invoice",
    // element: <Invoice/>, if nested no element
    children: [
      {
        navTitle: "add",
        path: "add",
        element: <AddInvoice/>,
        children: [],
      },
      {
        navTitle: "list",
        path: "nestlist",
        
        children: [ {
            navTitle: "list",
            path: "list",
            element: <ListInvoice/>,
            children: [],
          }],
      },
    ],
  },
];
