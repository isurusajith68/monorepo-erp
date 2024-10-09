// app/routes/customer.tsx

import { Outlet, Link } from "@remix-run/react";

export default function CustomerLayout() {
  return (
    <div>
      <h1>Customer Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add">Add Customer</Link>
          </li>
          <li>
            <Link to="list">Customer List</Link>
          </li>
        </ul>
      </nav>
      
      {/* Renders nested routes */}
    
    </div>
  );
}
