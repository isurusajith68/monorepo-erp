"use strict";
// app/routes/customer/add.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddCustomer;
function AddCustomer() {
    return (<div>
      <h2>Add Customer</h2>
      <form>
        <div>
          <label htmlFor="name">Customer Name:</label>
          <input type="text" id="name" name="name"/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>);
}
