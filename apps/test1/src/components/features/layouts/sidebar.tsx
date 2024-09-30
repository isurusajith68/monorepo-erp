'use client'
import Link from 'next/link'
import {
  Bell,
  CircleDollarSign,
  CircleGauge,
  CirclePlus,
  CircleUser,
  ClipboardList,
  FileClock,
  Gauge,
  HandCoins,
  Home,
  Landmark,
  LineChart,
  Menu,
  Package,
  Package2,
  ReceiptText,
  Search,
  ShoppingCart,
  Users,
  Plus,
  List,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutUser } from '../auth/auth-action'

export default function SideBar() {
  const [showSalesSubmenu, setShowSalesSubmenu] = useState(false)
  const [showPurchasesSubmenu, setShowPurchasesSubmenu] = useState(false)
  const [showProjectSubmenu, setShowProjectSubmenu] = useState(false)
  const [showBankSubmenu, setShowBankSubmenu] = useState(false)
  const [showReceiptSubmenu, setShowReceiptSubmenu] = useState(false)
  const [showReportSubmenu, setShowReportSubmenu] = useState(false)

  const toggleSalesSubmenu = () => setShowSalesSubmenu(!showSalesSubmenu)
  const togglePurchasesSubmenu = () =>
    setShowPurchasesSubmenu(!showPurchasesSubmenu)
  const toggleProjectSubmenu = () => setShowProjectSubmenu(!showProjectSubmenu)
  const toggleBankSubmenu = () => setShowBankSubmenu(!showBankSubmenu)
  const toggleReceiptSubmenu = () => setShowReceiptSubmenu(!showReceiptSubmenu)
  const toggleReportSubmenu = () => setShowReportSubmenu(!showReportSubmenu)

  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      if (response.success) {
        window.location.href = '/login'
      } else {
        console.error('Logout failed:', response.message)
      }
    } catch (error) {
      console.error('Logout request failed:', error)
    }
  }

  return (
    <div className="h-screen w-[240px] fixed top-0 left-0 bg-white border-r overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-300">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/group5.png"
              alt="Logo"
              width={150}
              height={50}
              className="pt-2"
            />
          </Link>
        </div>

        {/* Sidebar content */}

        <div className="flex-1 p-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-4">
            <div className="flex">
              <div className="pt-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary font-bold text-lg text-green-600"
                    >
                      Add New <CirclePlus className="h-5 w-5" />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/customers/add/">Customer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/invoices/add/">Invoice</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/projects/add/">Project</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Link
              href="/dashboard/"
              className="pt-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary cursor-pointer text-green-600"
            >
              <CircleGauge className="h-4 w-5" />
              Dashboard
            </Link>

            <div>
              <Link
                href="#"
                onClick={toggleSalesSubmenu}
                className="flex items-center w-full gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary cursor-pointer text-green-600"
              >
                <HandCoins className="h-4 w-5" />
                Sales and Payments
              </Link>
              {showSalesSubmenu && (
                <div className="pl-8">
                  <div className="pt-1">
                    <Link
                      href="/customers/list"
                      className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                    >
                      <Users className="h-4 w-4" />
                      Customers
                    </Link>
                    <div className="flex gap-2">
                      {/* <Button
                        variant="ghost"
                        className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/customers/add`);
                        }}
                      >
                        New
                      </Button>
                      <Button
                        variant="ghost"
                        className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/customers/list`);
                        }}
                      >
                        List
                      </Button> */}
                    </div>
                  </div>

                  <Link
                    href="/invoices/list"
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                  >
                    <ClipboardList className="h-4 w-4" />
                    Invoices
                  </Link>
                  <div className="flex gap-2">
                    {/* <Button
                      variant="ghost"
                      className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => {
                        router.push(`/invoices/add`);
                      }}
                    >
                      New
                    </Button>
                    <Button
                      variant="ghost"
                      className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => {
                        router.push(`/invoices/list`);
                      }}
                    >
                      List
                    </Button> */}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                onClick={togglePurchasesSubmenu}
              >
                <CircleDollarSign className="h-4 w-5" />
                Expenses{' '}
              </Link>
              {showPurchasesSubmenu && (
                <div className="pl-8">
                  <Link
                    href="/vendors/list"
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                  >
                    <Users className="h-4 w-4" />
                    Vendor
                  </Link>
                  <div className="flex gap-2">
                    {/* <Button
                      variant="ghost"
                      className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => {
                        router.push(`/vendors`);
                      }}
                    >
                      New
                    </Button>
                    <Button
                      variant="ghost"
                      className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => {
                        router.push(`/vendors/list`);
                      }}
                    >
                      List
                    </Button> */}
                  </div>

                  <Link
                    href="/purchases/list"
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                  >
                    <ClipboardList className="h-4 w-4" />
                    Purchases
                  </Link>
                  <div className="flex gap-2">
                    {/* <Button
                      variant="ghost"
                      className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => { 
                        router.push(`/purchases`);
                      }}
                    >
                      New
                    </Button>
                    <Button
                      variant="ghost"
                      className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                      onClick={() => {
                        router.push(`/purchases/list`);
                      }}
                    >
                      List
                    </Button> */}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Link
                onClick={toggleProjectSubmenu}
                href="/projects"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
              >
                <FileClock className="h-4 w-5" />
                Projects
              </Link>
              {showProjectSubmenu && (
                <div className="pl-8">
                  <div className="pt-1">
                    <div className="flex gap-2">
                      {/* <Button
                        variant="ghost"
                        className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/projects/add`);
                        }}
                      >
                        New
                      </Button>
                      <Button
                        variant="ghost"
                        className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/projects`);
                        }}
                      >
                        List
                      </Button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Link
                onClick={toggleBankSubmenu}
                href="/bank"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
              >
                <Landmark className="h-4 w-5" />
                Banks
              </Link>
              {showBankSubmenu && (
                <div className="pl-8">
                  <div className="pt-1">
                    <div className="flex gap-2">
                      {/* <Button
                        variant="ghost"
                        className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/bank/add`);
                        }}
                      >
                        New
                      </Button>
                      <Button
                        variant="ghost"
                        className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/bank`);
                        }}
                      >
                        List
                      </Button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <Link
              href="/reciepts"
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
            >
              <ReceiptText className="h-4 w-5" />
              Receipts
            </Link> 

            {/* <div>
              <Link
                onClick={toggleReceiptSubmenu}
                href="/reciepts"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
              >
                <ReceiptText className="h-4 w-5" />
                Receipts
              </Link>
              {showReceiptSubmenu && (
                <div className="pl-8">
                  <div className="pt-1">
                    <div className="flex gap-2">
                      {/* <Button
                        variant="ghost"
                        className="text-[11px] ml-11 py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/reciepts/add`);
                        }}
                      >
                        New
                      </Button>
                      <Button
                        variant="ghost"
                        className="ml-2 text-[11px]  py-0.5 h-4 w-2 border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/reciepts`);
                        }}
                      >
                        List
                      </Button> 
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            <div>
              <Link
                onClick={toggleReportSubmenu}
                href="/reports"
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
              >
                <LineChart className="h-4 w-5" />
                Reports
              </Link>
              {showReportSubmenu && (
                <div className="pl-8">
                  <div className="pt-1">
                    <div className=" gap-2">
                      <Button
                        variant="ghost"
                        className="text-[11px]  py-0.5 h-6 w-[80%] border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/reports/finacial-summary`)
                        }}
                      >
                        Finacial Summary
                      </Button>
                      <Button
                        variant="ghost"
                        className=" text-[11px] mt-2 py-0.5 h-6 w-[80%] border-solid border-2 bg-green-50 border-green-600 text-green-600"
                        onClick={() => {
                          router.push(`/reports/project-finacial-summary`)
                        }}
                      >
                        Project Finacial Summary
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <button
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600"
                onClick={handleLogout}
              >
                <CircleUser className="h-4 w-5" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
