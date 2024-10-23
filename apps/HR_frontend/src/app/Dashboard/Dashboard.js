"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const calendar_1 = require("@/components/ui/calendar");
const React = require("react");
function Dashboard() {
    const [date, setDate] = React.useState(new Date());
    return (<div>
      <div className="flex ml-20">
        <div className=" w-60 h-32 bg-green-100 border border-green-400">
          <div className="bg-green-300">
            <h1 className="text-center font-medium">Bookings</h1>
          </div>
        </div>
        <div className=" w-60 h-32 bg-green-100 ml-10 border border-green-400">
          <div className="bg-green-300">
            <h1 className="text-center font-medium">Registration</h1>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-10 ">
        <h1 className="text-xl font-bold">Booked Dates</h1>

        <div className="w-1/3 items-center bg-green-100 justify-center">
          <h1 className="text-center font-medium bg-green-400">Calendar</h1>

          <calendar_1.Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border"/>

          <button_1.Button className="bg-green-400 rounded " variant="outline">
            Button
          </button_1.Button>
        </div>
      </div>
    </div>);
}
exports.default = Dashboard;
