'use client'
import React, { useEffect, useRef, useState } from 'react'
import { getInvoice } from './invoice-action'

const InvoicePrint = ({ id }) => {
  const invoiceRef = useRef()
  const [invoiceData, setInvoiceData] = useState(null)

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (id) {
        const response = await getInvoice(Number(id))
        if (response.success) {
          setInvoiceData(response.data)
        } else {
          console.error('Failed to fetch invoice data.')
        }
      }
    }

    fetchInvoiceData()
  }, [id]) // Dependency array: fetch data when id changes

  console.log('first', invoiceData)

  const handlePrint = () => {
    const printContent = invoiceRef.current // Get the content to print
    const windowToPrint = window.open('', '', 'width=800,height=600')
    windowToPrint.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .container {
              width: 100%;
              margin: 0 auto;
              padding: 20px;
              box-sizing: border-box;
            }
            .printable {
              padding: 8px;
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .table-main {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .table-small {
              border:none;
              border-collapse: collapse;
              margin-top: 20px;
              
            }
            .margin-b{
            margin-bottom: 40px;
            }
            .th-main, .td-main {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
            .text-right {
              text-align: right;
            }
            .text-center {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `)
    windowToPrint.document.close()
    windowToPrint.focus()
    windowToPrint.print()
  }

  return (
    <div className="container mx-auto p-4">
      {/* Invoice Layout */}
      <div
        ref={invoiceRef}
        className="p-8 bg-white border rounded shadow-md printable"
      >
        <h1 className="text-4xl font-bold mb-4 text-center">Invoice</h1>
        {invoiceData ? ( // Check if invoiceData is loaded before rendering
          <>
            <div className="mb-4 ">
              <strong>Invoice ID:</strong> {invoiceData.invoiceid}
            </div>
            <div className="mb-4 ">
              <strong>Invoice No:</strong> {invoiceData.invoiceno}
            </div>
            <div className="mb-4">
              <strong>Customer Name:</strong> {invoiceData.customername}
            </div>
            <div className="mb-4">
              <strong>Invoice Date:</strong> {invoiceData.invoicedate}
            </div>
            <div className="mb-4">
              <strong>Due Date:</strong> {invoiceData.duedate}
            </div>

            <table className="w-full border-collapse table-main">
              <thead>
                <tr>
                  <th className="border p-2 th-main">Description</th>
                  <th className="border p-2 th-main">Quantity</th>
                  <th className="border p-2 th-main">Price</th>
                  <th className="border p-2 th-main">Tax</th>
                  <th className="border p-2 th-main">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Loop through item details */}
                {invoiceData.invoicedetails?.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center td-main">
                      {item.itemdetails}
                    </td>
                    <td className="border p-2 text-right td-main">
                      {item.quentity}
                    </td>
                    <td className="border p-2 text-right td-main">
                      {item.price}
                    </td>
                    <td className="border p-2 text-right td-main">
                      {item.tax}
                    </td>
                    <td className="border p-2 text-right td-main">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="ml-[700px] mt-10 small-table">
              <tr className="h-10">
                <td>
                  <strong>Sub Total:</strong>
                </td>
                <td>{invoiceData.subtotal} LKR</td>
              </tr>
              <tr className="h-10">
                <td>
                  <strong>Discount:</strong>
                </td>
                <td>{invoiceData.discount} %</td>
              </tr>
              <tr className="h-10">
                <td>
                  <strong>Total Amount:</strong>
                </td>
                <td> {invoiceData.totalAmount} LKR</td>
              </tr>
              <tr className="h-10">
                <td>
                  <strong>Total Paid:</strong>
                </td>
                <td> {invoiceData.totalpaid} LKR</td>
              </tr>
              <tr className="h-10">
                <td>
                  <strong>Amount Due:</strong>
                </td>
                <td> {invoiceData.totalAmount - invoiceData.totalpaid} LKR</td>
              </tr>
            </table>
            {/* <div className="mt-4 ">
              <div className="mb-4">
                <strong>Sub Total:</strong> {invoiceData.subtotal} LKR
              </div>
              <div className="mb-4">
                <strong>Discount:</strong> {invoiceData.discount} %
              </div>
              <div className="mb-4">
                <strong>Total Amount:</strong> {invoiceData.totalAmount} LKR
              </div>
              <div className="mb-4">
                <strong>Total Paid:</strong> {invoiceData.totalpaid} LKR
              </div>
              <div className="mb-4">
                <strong>Amount Due:</strong>{" "}
                {invoiceData.totalAmount - invoiceData.totalpaid} LKR
              </div>
            </div> */}
          </>
        ) : (
          <p>Loading...</p> // Display loading text while fetching data
        )}
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        type="button"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Print Invoice
      </button>
    </div>
  )
}

export default InvoicePrint
