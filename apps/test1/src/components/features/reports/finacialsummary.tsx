'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllData } from '../purchase/purchase-action'
import { getAllInvoices } from '../invoices/invoice-action'

function FinacialSummary({ items }) {
  const [purchasedata, setPurchersData] = useState([])
  const [invoicedata, setInvoiceData] = useState([])
  const [searchstartdate, setSearchStartDate] = useState('')
  const [searchenddate, setSearchEndDate] = useState('')
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0)
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0)
  const [totalbalance, setTotalBalance] = useState(0)

  const getPurches = async () => {
    const cus = await getAllData()
    const reversedData = cus.data.reverse()

    // Filter the data based on the date range
    const filteredData = reversedData.filter((item) => {
      const purchaseDate = new Date(item.purchasedate)
      const startDate = searchstartdate ? new Date(searchstartdate) : null
      const endDate = searchenddate ? new Date(searchenddate) : null

      return (
        (!startDate || purchaseDate >= startDate) &&
        (!endDate || purchaseDate <= endDate)
      )
    })

    setPurchersData(filteredData)

    // Calculate the total amount for purchases
    const totalPurchaseAmount = filteredData.reduce((total, item) => {
      return total + (item.totalamount || 0)
    }, 0)

    setTotalPurchaseAmount(totalPurchaseAmount)
  }

  const getInvoices = async () => {
    const cus = await getAllInvoices()
    const reversedData = cus.data.reverse()

    // Filter the data based on the date range
    const filteredData = reversedData.filter((item) => {
      const invoiceDate = new Date(item.invoicedate)
      const startDate = searchstartdate ? new Date(searchstartdate) : null
      const endDate = searchenddate ? new Date(searchenddate) : null

      return (
        (!startDate || invoiceDate >= startDate) &&
        (!endDate || invoiceDate <= endDate)
      )
    })

    setInvoiceData(filteredData)

    // Calculate the total amount for invoices
    const totalInvoiceAmount = filteredData.reduce((total, item) => {
      return total + parseFloat(item.totalAmount || 0)
    }, 0)

    setTotalInvoiceAmount(totalInvoiceAmount)
  }

  const handleSearch = () => {
    getPurches()
    getInvoices()
  }

  useEffect(() => {
    setTotalBalance(totalInvoiceAmount - totalPurchaseAmount)
  }, [totalPurchaseAmount, totalInvoiceAmount])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  py-10 mt-10">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-10 lg:ml-[40%]">
        Financial Summary
      </h1>

      {/* Date Range Selector */}
      <div className="flex space-x-4 mb-10 lg:ml-[10%]">
        <Input
          type="date"
          className="border border-green-500 rounded-md px-3 py-2 outline-none lg:w-44"
          placeholder="From"
          value={searchstartdate}
          onChange={(e) => setSearchStartDate(e.target.value)}
        />
        <Input
          type="date"
          className="border border-green-500 rounded-md px-3 py-2 outline-none lg:w-44"
          placeholder="To"
          value={searchenddate}
          onChange={(e) => setSearchEndDate(e.target.value)}
        />
        <Button
          className="bg-green-500 text-white px-4 py-2 rounded-md lg:w-24"
          onClick={handleSearch}
        >
          Run
        </Button>
      </div>

      {/* Summary Sections */}
      <div className="grid grid-cols-2 gap-6 lg:w-[96%] lg:ml-[2%]">
        {/* Purchase Summary */}
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-semibold text-l mb-4">Purchase Summary</h2>

          {/* Scrollable Table Container */}
          <div className="lg:h-[300px] overflow-y-scroll">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>P_No</TableHead>
                  <TableHead>Purchase Type</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Seller Name</TableHead>
                  <TableHead>Bill Date</TableHead>
                  <TableHead>Expense Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasedata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.purchaseid}</TableCell>
                    <TableCell>{item.purchasetype}</TableCell>
                    <TableCell>{item.project}</TableCell>
                    <TableCell>{item.sellertype}</TableCell>
                    <TableCell>{item.purchasedate}</TableCell>
                    <TableCell className="text-center">
                      {item.totalamount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <hr className="border-green-300 mt-5" />

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalPurchaseAmount}.00 LKR</p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white rounded-lg  p-5 ">
          <h2 className="font-semibold text-l mb-4">Invoice Summary</h2>
          <div className="lg:h-[300px] overflow-y-scroll">
            <Table className="w-96">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice_No</TableHead>
                  <TableHead>Invoice Type</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Company or Person</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>Income Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoicedata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.invoiceid}</TableCell>
                    <TableCell>{item.ctype}</TableCell>
                    <TableCell>{item.project}</TableCell>
                    <TableCell>{item.itype}</TableCell>
                    <TableCell>{item.invoicedate}</TableCell>
                    <TableCell className="text-center">
                      {item.totalAmount}{' '}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <hr className="border-green-300 mt-5" />
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
            <Input
              type="text"
              value={`${totalPurchaseAmount}.00 LKR`}
              readOnly
              className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Income</label>
            <Input
              type="text"
              placeholder="LKR"
              value={`${totalInvoiceAmount}.00 LKR`}
              className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2"
            />
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex  text-xl font-bold">
          <span>Balance</span>
          <Input
            type="text"
            placeholder="LKR"
            value={`${totalbalance}.00 LKR`}
            className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 lg:w-[50%] ml-10"
          />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <div>
            <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              ></svg>
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
    </div>
  )
}

export default FinacialSummary
