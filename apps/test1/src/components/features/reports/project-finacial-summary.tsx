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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getAllProjects,
  SelectInvoices,
  SelectProjects,
} from '../projects/project-action'

function ProjectFinacialSummary() {
  const [projects, setProjects] = useState<any[]>([])
  const [searchType, setSearchType] = useState('all')
  const [purchasedata, setPurchersData] = useState([])
  const [invoicedata, setInvoiceData] = useState([])
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0)
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0)
  const [totalbalance, setTotalBalance] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getAllProjects()
      if (response.success) {
        setProjects(response.data)
      }
    }

    fetchProjects()
  }, [])

  const getPurches = async () => {
    const cus = await SelectProjects()
    const reversedData = cus.data.reverse()

    console.log('firsttttttttttttttttttttttt', reversedData)

    // Filter the data based on the date range
    const filteredData = reversedData.filter((item) => {
      const matchesProjectType =
        searchType === 'all' ||
        item.pname.toLowerCase() === searchType.toLowerCase()
      return matchesProjectType
    })

    setPurchersData(filteredData)

    // Calculate the total amount for purchases
    const totalPurchaseAmount = filteredData.reduce((total, item) => {
      return total + (item.totalamount || 0)
    }, 0)

    setTotalPurchaseAmount(totalPurchaseAmount)
  }

  const getInvoices = async () => {
    const cus = await SelectInvoices()
    const reversedData = cus.data.reverse()

    // Filter the data based on the date range
    const filteredData = reversedData.filter((item) => {
      const matchesProjectType =
        searchType === 'all' ||
        item.pname.toLowerCase() === searchType.toLowerCase()
      return matchesProjectType
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
        Project Financial Summary
      </h1>

      {/* Date Range Selector */}
      <div className="flex space-x-4 mb-10 lg:ml-[10%]">
        <h4>Project</h4>
        <Select
          onValueChange={(value) => setSearchType(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-[200px] rounded border-2 border-green-600">
            <SelectValue placeholder="Select a Vendor Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'all'}>All</SelectItem>
              {projects.map((project) => (
                <SelectItem
                  key={project.pid}
                  value={project.pname} // Removed unnecessary template string
                >
                  {project.pname}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="bg-green-500 text-white px-4 py-2 rounded-md lg:w-24"
          onClick={handleSearch}
        >
          Run
        </Button>
      </div>

      {/* Summary Sections */}
      <div className="grid grid-cols-2 gap-8 lg:w-[96%] lg:ml-[2%]">
        {/* Purchase Summary */}
        <div className="bg-white rounded-lg  p-5">
          <h2 className="font-semibold text-l mb-4">
            Project Expences Summary
          </h2>
          <Table className="lg:w-[100%]">
            <TableHeader>
              <TableRow>
                <TableHead>Project_No</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Project Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchasedata.map((item, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'hover:bg-green-100'
                      : 'hover:bg-green-100'
                  }
                >
                  <TableCell className="text-center px-4 py-2">
                    {item.project}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.totalamount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr className="border-green-300 mt-5" />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{totalPurchaseAmount}.00 LKR</p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white rounded-lg  p-5">
          <h2 className="font-semibold text-l mb-4">Project Income Summary</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Project_No</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Income Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicedata.map((item, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'hover:bg-green-100'
                      : 'hover:bg-green-100'
                  }
                >
                  <TableCell className="text-center px-4 py-2">
                    {item.project}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.pname}
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    {item.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr className="border-green-300 mt-5" />
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
            <Input
              type="text"
              value={`${totalPurchaseAmount}.00 LKR`}
              readOnly
              className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 font-semibold"
            />
          </div>
          <div>
            <label className="block font-semibold">Income</label>
            <Input
              type="text"
              value={`${totalInvoiceAmount}.00 LKR`}
              className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 font-semibold"
            />
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex font-bold text-xl">
          <span>Balance</span>
          <Input
            type="text"
            value={`${totalbalance}.00 LKR`}
            placeholder="LKR"
            className="border border-green-500 rounded-md px-3 py-2 outline-none mt-2 lg:w-[50%] ml-10"
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectFinacialSummary
