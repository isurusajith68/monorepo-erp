"use strict";
// app/routes/customer.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomerLayout;
const react_1 = require("@remix-run/react");
function CustomerLayout() {
    return (<div>
      <h1>Customer Page</h1>
      <nav>
        <ul>
          <li>
            <react_1.Link to="/add">Add Customer</react_1.Link>
          </li>
          <li>
            <react_1.Link to="list">Customer List</react_1.Link>
          </li>
        </ul>
      </nav>

      {/* Renders nested routes */}
    </div>);
}
