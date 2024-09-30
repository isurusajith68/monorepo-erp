'use client'

import React, { useEffect, useState } from 'react'
import { getAllData } from '../invoices/invoice-action'

function TotalIncome() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [dueincome, setDueIncom] = useState<any[]>([])

  useEffect(() => {
    getAllData().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        setInvoices(reversedData) // Set the reversed array to state
        reversedData.forEach((invoice: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
    getAllData().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        setDueIncom(reversedData) // Set the reversed array to state
        reversedData.forEach((dueincome: { totalAmount: any }) => {})
      } else {
        console.log('error')
      }
    })
  }, [])

  const calculateTotalIncome = (invoices: any[]) => {
    let totalIncome = 0
    invoices.forEach((invoice) => {
      totalIncome += parseFloat(invoice.totalpaid)
    })
    return totalIncome
  }

  const calculateTotalDueIncome = (dueincome: any[]) => {
    let totalIncome = 0
    invoices.forEach((invoice) => {
      totalIncome +=
        parseFloat(invoice.totalAmount) - parseFloat(invoice.totalpaid)
    })
    return totalIncome
  }

  return (
    <div className="flex">
      <div>
        <p className="text-sm text-green-700">Income Received</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalIncome(invoices)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
      <div className="border-l border-green-200 mx-4 lg:ml-[28%] md:ml-[10%]"></div>
      <div className="lg:ml-[2%]">
        <p className="text-sm text-green-700">Income to be Received</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalDueIncome(dueincome)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
    </div>
  )
}

export default TotalIncome
