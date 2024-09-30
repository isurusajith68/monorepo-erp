'use client'

import React, { useEffect, useState } from 'react'
import TotalIncome from './total-income'
import TotalExpense from './total-expences'
import { getSessionToken } from '../auth/auth-action'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUserData = async () => {
      const user = await getSessionToken()
      // console.log(user, "user");
      if (!user) {
        return window.location.replace('/login')
      }

      setUser(user)
    }

    getUserData()
  }, [])

  if (!user) {
    return <div className=" mt-12">Loading...</div>
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-12">
      <h1 className="text-3xl font-bold mb-6">
        Hello {user && user.username}!
      </h1>
      <hr className="border-green-300 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Total Income */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Total Income</h2>
          <hr className="border-green-300 mb-8" />
          <TotalIncome></TotalIncome>
        </div>

        {/* Total Expense */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Total Expense</h2>
          <hr className="border-green-300 mb-8" />
          <TotalExpense></TotalExpense>
        </div>
      </div>
    </div>
  )
}
