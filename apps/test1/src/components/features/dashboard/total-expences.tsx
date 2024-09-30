'use client'

import React, { useEffect, useState } from 'react'
import { getAllData } from '../purchase/purchase-action'

function TotalExpense() {
  const [expense, setExpenses] = useState<any[]>([])
  const [incomexpense, setIncomExpenses] = useState<any[]>([])

  useEffect(() => {
    getAllData().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        setExpenses(reversedData) // Set the reversed array to state
        reversedData.forEach((purchases: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
    getAllData().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        setIncomExpenses(reversedData) // Set the reversed array to state
        reversedData.forEach((purchases: { totalamount: any }) => {})
      } else {
        console.log('error')
      }
    })
  }, [])

  const calculateTotalexpences = (expense: any[]) => {
    let totalExpense = 0
    expense.forEach((invoice) => {
      totalExpense += parseFloat(invoice.totalpaid)
    })
    return totalExpense
  }
  const calculateTotalDueexpences = (expense: any[]) => {
    let totalExpense = 0
    expense.forEach((invoice) => {
      totalExpense +=
        parseFloat(invoice.totalamount) - parseFloat(invoice.totalpaid)
    })
    return totalExpense
  }

  return (
    <div className="flex ">
      <div>
        <p className="text-sm text-green-700">Expense Paid</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalexpences(expense)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
      <div className="border-l border-green-200 mx-4 lg:ml-[28%] md:ml-[10%]"></div>
      <div className="lg:ml-[2%]">
        <p className="text-sm text-green-700">The Cost to be Paid</p>
        <div className="flex gap-1">
          <label className="text-lg font-medium">
            {calculateTotalDueexpences(incomexpense)}.00
          </label>
          <p className="text-lg font-medium text-green-700">LKR</p>
        </div>
      </div>
    </div>
  )
}

export default TotalExpense
