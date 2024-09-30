'use client'

import TotalIncomeAmount from '@/components/features/reports/total-income-amount'
import TotalPurchuesAmount from '@/components/features/reports/total-purchus-amount'
import React, { useState } from 'react'

function Page() {
  const [sharedincome, SetSharedIncome] = useState<any>('')
  const [sharedpurchues, SetSharedPurcchues] = useState<any>('')

  const Balance = sharedincome - sharedpurchues

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-10">Total Cash Balance</div>
      <div className="flex justify-between w-full max-w-5xl px-5 ">
        <div className="w-1/2 rounded-lg p-5 mr-5">
          <div className="font-semibold text-xl mb-4">Cash Expense</div>
          <hr className="my-4 border-green-200" />
          <div className="space-y-4">
            <TotalPurchuesAmount SetSharedPurcchues={SetSharedPurcchues} />
            <hr className="my-4 border-green-100 border-2" />
          </div>
        </div>
        <div className="w-1/2 rounded-lg p-5 ml-5">
          <div className="font-semibold text-xl mb-4">Cash Income</div>
          <hr className="my-4 border-green-200" />
          <div className="space-y-4">
            <TotalIncomeAmount SetSharedIncome={SetSharedIncome} />
            <hr className="my-4 border-green-100  border-2" />
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] lg:ml-[40%] max-w-2xl px-5 mt-2">
        <div className="flex justify-between font-semibold text-xl p-5 rounded-lg">
          <span>Cash Balance</span>
          <span className="border-b-2 border-green-600">{Balance}.00 LKR</span>
        </div>
        <hr className="border-green-100 -mt-4  border-2" />
      </div>
    </div>
  )
}

export default Page
