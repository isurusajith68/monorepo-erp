'use client'

import { useEffect, useState } from 'react'
import {
  getAllAssets,
  getAllGoods,
  getAllProjectDueAmount,
  getAllPurches,
  getAllService,
  getAllUtilities,
} from './group-perches-action'

// Define the type for the income item
interface IncomeItem {
  totalAmount: string
  totalpaid: string // Assuming totalAmount is a string; adjust if it's a number
}

const YourComponent = ({ SetSharedPurcchues }) => {
  const [income, setIncome] = useState<IncomeItem[]>([])
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [dueIncome, setDueIncome] = useState<any>(0)
  const [goods, SetGoods] = useState<any[]>([])
  const [service, SetService] = useState<any[]>([])
  const [assets, SetAssets] = useState<any[]>([])
  const [utilities, SetUtilities] = useState<any[]>([])

  useEffect(() => {
    getAllProjectDueAmount().then((response) => {
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
    getAllPurches().then((response) => {
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
    getAllGoods().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        SetGoods(reversedData) // Set the reversed array to state
        // Log goods IDs to the console
        reversedData.forEach((goods: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
    getAllService().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        SetService(reversedData) // Set the reversed array to state

        reversedData.forEach((service: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
    getAllAssets().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        SetAssets(reversedData) // Set the reversed array to state
        reversedData.forEach((assets: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
    getAllUtilities().then((response) => {
      if (response.success) {
        const reversedData = response.data.reverse() // Reverse the array
        SetUtilities(reversedData) // Set the reversed array to state

        reversedData.forEach((utilities: { totalpaid: any }) => {})
      } else {
        console.log('error')
      }
    })
  }, [])
  const calculateTotalService = (service: any[]) => {
    let totalIncome = 0
    service.forEach((service) => {
      totalIncome += parseFloat(service.totalpaid)
    })
    return totalIncome
  }
  const calculateTotalGoods = (goods: any[]) => {
    let totalIncome = 0
    goods.forEach((goods) => {
      totalIncome += parseFloat(goods.totalpaid)
    })
    return totalIncome
  }
  const calculateTotalAssets = (assets: any[]) => {
    let totalIncome = 0
    assets.forEach((assets) => {
      totalIncome += parseFloat(assets.totalpaid)
    })
    return totalIncome
  }
  const calculateTotalUtilities = (utilities: any[]) => {
    let totalIncome = 0
    utilities.forEach((utilities) => {
      totalIncome += parseFloat(utilities.totalpaid)
    })
    return totalIncome
  }

  const p = (e) => {
    SetSharedPurcchues(e.target.value)
  }

  useEffect(() => {
    const TotalInvoiceIncome = (totalIncome || 0) + (dueIncome || 0)
    SetSharedPurcchues(TotalInvoiceIncome !== null ? TotalInvoiceIncome : 0)
  }, [totalIncome, dueIncome, SetSharedPurcchues])

  const calculateTotalIncome = (income: IncomeItem[]): number => {
    return income.reduce((total, item) => total + parseFloat(item.totalpaid), 0)
  }

  const calculateTotalDue = (income: IncomeItem[]): number => {
    return income.reduce(
      (due, item) =>
        due + (parseFloat(item.totalamount) - parseFloat(item.totalpaid)),
      0,
    )
  }

  return (
    <div>
      <div className="flex justify-between">
        <span>Total Purchases Amount</span>
        <span className="font-semibold">{totalIncome.toFixed(2)} LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Goods</span>
        <span>{calculateTotalGoods(goods)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Service</span>
        <span>{calculateTotalService(service)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Assets</span>
        <span>{calculateTotalAssets(assets)}.00 LKR</span>
      </div>
      <div className="flex justify-between ml-10 text-sm">
        <span>Utilities</span>
        <span>{calculateTotalUtilities(utilities)}.00 LKR</span>
      </div>
      <div className="flex justify-between">
        <span>Total Due Purchases</span>
        <span className="font-semibold">{dueIncome.toFixed(2)} LKR</span>
      </div>
      <hr className="my-4 border-2 border-green-300" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{(totalIncome + dueIncome).toFixed(2)} LKR</span>
      </div>
    </div>
  )
}

export default YourComponent
