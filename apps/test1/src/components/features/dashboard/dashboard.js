"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
const react_1 = require("react");
const total_income_1 = require("./total-income");
const total_expences_1 = require("./total-expences");
const auth_action_1 = require("../auth/auth-action");
function AdminDashboard() {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const getUserData = async () => {
            const user = await (0, auth_action_1.getSessionToken)();
            // console.log(user, "user");
            if (!user) {
                return window.location.replace('/login');
            }
            setUser(user);
        };
        getUserData();
    }, []);
    if (!user) {
        return <div className=" mt-12">Loading...</div>;
    }
    return (<div className="p-8 bg-gray-50 min-h-screen mt-12">
      <h1 className="text-3xl font-bold mb-6">
        Hello {user && user.username}!
      </h1>
      <hr className="border-green-300 mb-8"/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Total Income */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Total Income</h2>
          <hr className="border-green-300 mb-8"/>
          <total_income_1.default></total_income_1.default>
        </div>

        {/* Total Expense */}
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Total Expense</h2>
          <hr className="border-green-300 mb-8"/>
          <total_expences_1.default></total_expences_1.default>
        </div>
      </div>
    </div>);
}
