"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideBar;
const link_1 = require("next/link");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const image_1 = require("next/image");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_action_1 = require("../auth/auth-action");
function SideBar() {
    const [showSalesSubmenu, setShowSalesSubmenu] = (0, react_1.useState)(false);
    const [showPurchasesSubmenu, setShowPurchasesSubmenu] = (0, react_1.useState)(false);
    const [showProjectSubmenu, setShowProjectSubmenu] = (0, react_1.useState)(false);
    const [showBankSubmenu, setShowBankSubmenu] = (0, react_1.useState)(false);
    const [showReceiptSubmenu, setShowReceiptSubmenu] = (0, react_1.useState)(false);
    const [showReportSubmenu, setShowReportSubmenu] = (0, react_1.useState)(false);
    const toggleSalesSubmenu = () => setShowSalesSubmenu(!showSalesSubmenu);
    const togglePurchasesSubmenu = () => setShowPurchasesSubmenu(!showPurchasesSubmenu);
    const toggleProjectSubmenu = () => setShowProjectSubmenu(!showProjectSubmenu);
    const toggleBankSubmenu = () => setShowBankSubmenu(!showBankSubmenu);
    const toggleReceiptSubmenu = () => setShowReceiptSubmenu(!showReceiptSubmenu);
    const toggleReportSubmenu = () => setShowReportSubmenu(!showReportSubmenu);
    const router = (0, navigation_1.useRouter)();
    const handleLogout = async () => {
        try {
            const response = await (0, auth_action_1.logoutUser)();
            if (response.success) {
                window.location.href = '/login';
            }
            else {
                console.error('Logout failed:', response.message);
            }
        }
        catch (error) {
            console.error('Logout request failed:', error);
        }
    };
    return (<div className="h-screen w-[240px] fixed top-0 left-0 bg-white border-r overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Sidebar header */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-green-300">
          <link_1.default href="/" className="flex items-center gap-2 font-semibold">
            <image_1.default src="/group5.png" alt="Logo" width={150} height={50} className="pt-2"/>
          </link_1.default>
        </div>

        {/* Sidebar content */}

        <div className="flex-1 p-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-4">
            <div className="flex">
              <div className="pt-2 ">
                <dropdown_menu_1.DropdownMenu>
                  <dropdown_menu_1.DropdownMenuTrigger asChild>
                    <link_1.default href="#" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary font-bold text-lg text-green-600">
                      Add New <lucide_react_1.CirclePlus className="h-5 w-5"/>
                    </link_1.default>
                  </dropdown_menu_1.DropdownMenuTrigger>
                  <dropdown_menu_1.DropdownMenuContent align="end">
                    <dropdown_menu_1.DropdownMenuItem>
                      <link_1.default href="/customers/add/">Customer</link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuItem>
                      <link_1.default href="/invoices/add/">Invoice</link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuItem>
                      <link_1.default href="/projects/add/">Project</link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                  </dropdown_menu_1.DropdownMenuContent>
                </dropdown_menu_1.DropdownMenu>
              </div>
            </div>

            <link_1.default href="/dashboard/" className="pt-4 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary cursor-pointer text-green-600">
              <lucide_react_1.CircleGauge className="h-4 w-5"/>
              Dashboard
            </link_1.default>

            <div>
              <link_1.default href="#" onClick={toggleSalesSubmenu} className="flex items-center w-full gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary cursor-pointer text-green-600">
                <lucide_react_1.HandCoins className="h-4 w-5"/>
                Sales and Payments
              </link_1.default>
              {showSalesSubmenu && (<div className="pl-8">
                  <div className="pt-1">
                    <link_1.default href="/customers/list" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                      <lucide_react_1.Users className="h-4 w-4"/>
                      Customers
                    </link_1.default>
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

                  <link_1.default href="/invoices/list" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                    <lucide_react_1.ClipboardList className="h-4 w-4"/>
                    Invoices
                  </link_1.default>
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
                </div>)}
            </div>

            <div>
              <link_1.default href="#" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600" onClick={togglePurchasesSubmenu}>
                <lucide_react_1.CircleDollarSign className="h-4 w-5"/>
                Expenses{' '}
              </link_1.default>
              {showPurchasesSubmenu && (<div className="pl-8">
                  <link_1.default href="/vendors/list" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                    <lucide_react_1.Users className="h-4 w-4"/>
                    Vendor
                  </link_1.default>
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

                  <link_1.default href="/purchases/list" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                    <lucide_react_1.ClipboardList className="h-4 w-4"/>
                    Purchases
                  </link_1.default>
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
                </div>)}
            </div>

            <div>
              <link_1.default onClick={toggleProjectSubmenu} href="/projects" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                <lucide_react_1.FileClock className="h-4 w-5"/>
                Projects
              </link_1.default>
              {showProjectSubmenu && (<div className="pl-8">
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
                </div>)}
            </div>

            <div>
              <link_1.default onClick={toggleBankSubmenu} href="/bank" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                <lucide_react_1.Landmark className="h-4 w-5"/>
                Banks
              </link_1.default>
              {showBankSubmenu && (<div className="pl-8">
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
                </div>)}
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
              <link_1.default onClick={toggleReportSubmenu} href="/reports" className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600">
                <lucide_react_1.LineChart className="h-4 w-5"/>
                Reports
              </link_1.default>
              {showReportSubmenu && (<div className="pl-8">
                  <div className="pt-1">
                    <div className=" gap-2">
                      <button_1.Button variant="ghost" className="text-[11px]  py-0.5 h-6 w-[80%] border-solid border-2 bg-green-50 border-green-600 text-green-600" onClick={() => {
                router.push(`/reports/finacial-summary`);
            }}>
                        Finacial Summary
                      </button_1.Button>
                      <button_1.Button variant="ghost" className=" text-[11px] mt-2 py-0.5 h-6 w-[80%] border-solid border-2 bg-green-50 border-green-600 text-green-600" onClick={() => {
                router.push(`/reports/project-finacial-summary`);
            }}>
                        Project Finacial Summary
                      </button_1.Button>
                    </div>
                  </div>
                </div>)}
            </div>
            <div>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary text-green-600" onClick={handleLogout}>
                <lucide_react_1.CircleUser className="h-4 w-5"/>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>);
}
