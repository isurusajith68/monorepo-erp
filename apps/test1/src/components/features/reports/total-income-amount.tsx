'use client'

import { useEffect, useState } from 'react'
import {
  getAllIncome,
  getAllIncomeCompany,
  getAllIncomePerson,
} from './group-incom-action'
import { getAllInvoices } from '../invoices/invoice-action'

// Define the type for the income item
interface IncomeItem {
  totalAmount: string
  totalpaid: string // Assuming totalAmount is a string; adjust if it's a number
}

const YourComponent = ({ SetSharedIncome }) => {
  const [income, setIncome] = useState<IncomeItem[]>([])
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [person, setPerson] = useState<IncomeItem[]>([])
  const [personIncome, setPersonIncome] = useState<number>(0)
  const [dueIncome, setDueIncome] = useState<number>(0)
  const [companyIncome, setCompanyIncome] = useState<number>(0)

  useEffect(() => {
    getAllInvoices().then((response) => {
      if (response.success) {
        setIncome(response.data) // Set the data directly to state

        // Calculate and set the total income
        const total = calculateTotalIncome(response.data)
        setTotalIncome(total)

        // Log totalAmount for each income item
        response.data.forEach((item) => {})
      } else {
        console.log('Error fetching income data')
      }
    })
    getAllIncomePerson().then((response) => {
      if (response.success) {
        setPerson(response.data) // Set the data directly to state

        // Calculate and set the total income
        const total = calculateTotalPerson(response.data)
        setPersonIncome(total)

        // Log totalAmount for each income item
        response.data.forEach((item) => {})
      } else {
        console.log('Error fetching income data')
      }
    })
    getAllIncomeCompany().then((response) => {
      if (response.success) {
        setCompanyIncome(response.data) // Set the data directly to state

        // Calculate and set the total income
        const total = calculateTotalCompany(response.data)
        setCompanyIncome(total)

        // Log totalAmount for each income item
        response.data.forEach((item) => {})
      } else {
        console.log('Error fetching income data')
      }
    })
    getAllInvoices().then((response) => {
      if (response.success) {
        setDueIncome(response.data) // Set the data directly to state

        // Calculate and set the total income
        const total = calculateTotalDue(response.data)
        setDueIncome(total)

        // Log totalAmount for each income item
        response.data.forEach((item) => {})
      } else {
        console.log('Error fetching income data')
      }
    })
  }, [])

  const calculateTotalIncome = (income: IncomeItem[]): number => {
    let totalIncome = 0
    income.forEach((item) => {
      totalIncome += parseFloat(item.totalpaid)
    })
    return totalIncome
  }
  const calculateTotalPerson = (income: IncomeItem[]): number => {
    let personIncome = 0
    income.forEach((item) => {
      personIncome += parseFloat(item.totalpaid)
    })
    return personIncome
  }
  const calculateTotalCompany = (income: IncomeItem[]): number => {
    let companyIncome = 0
    income.forEach((item) => {
      companyIncome += parseFloat(item.totalpaid)
    })
    return companyIncome
  }
  const calculateTotalDue = (income: IncomeItem[]): number => {
    let dueIncome = 0
    income.forEach((item) => {
      dueIncome += parseFloat(item.totalAmount) - parseFloat(item.totalpaid)
    })
    return dueIncome
  }

  const TotalInvoiceIncome = totalIncome + dueIncome

  const p = (e) => {
    SetSharedIncome(e.target.value)
  }

  useEffect(() => {
    const TotalInvoiceIncome = (totalIncome || 0) + (dueIncome || 0)
    SetSharedIncome(TotalInvoiceIncome !== null ? TotalInvoiceIncome : 0)
  }, [totalIncome, dueIncome, SetSharedIncome])

  return (
    <div>
      <div className="flex justify-between">
        <span>Total Invoice Amount</span>
        <span className="font-semibold">{totalIncome.toFixed(2)} LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Person</span>
        <span>{personIncome.toFixed(2)} LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Company</span>
        <span>{companyIncome.toFixed(2)} LKR</span>
      </div>
      <div className="flex justify-between">
        <span>Total Due Income</span>
        <span className="font-semibold">{dueIncome.toFixed(2)} LKR</span>
      </div>
      <hr className="my-4 border-2 border-green-300" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{TotalInvoiceIncome}.00 LKR</span>
      </div>
    </div>
  )
}

export default YourComponent
