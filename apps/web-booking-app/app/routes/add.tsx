// app/routes/customer/add.tsx

export default function AddCustomer() {
  return (
    <div>
      <h2>Add Customer</h2>
      <form>
        <div>
          <label htmlFor="name">Customer Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
