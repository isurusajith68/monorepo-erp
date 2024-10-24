"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = loader;
const react_1 = require("@remix-run/react");
const db_server_1 = require("~/db.server");
async function loader({ request }) {
    const roomsResult = await db_server_1.client.query('SELECT COUNT(*) FROM hotelrooms');
    const roomtypesResult = await db_server_1.client.query('SELECT COUNT(*) FROM hotelroomtypes');
    const offersResult = await db_server_1.client.query('SELECT COUNT(*) FROM hoteloffers');
    const roomsCount = roomsResult.rows[0].count;
    const roomtypesCount = roomtypesResult.rows[0].count;
    const offersCount = offersResult.rows[0].count;
    return {
        roomsCount,
        roomtypesCount,
        offersCount,
    };
}
function Index() {
    const data = (0, react_1.useLoaderData)();
    return (<div className="ml-[18.4%] h-screen mt-16">
      <div className="flex">
        <div className="w-[25%] h-32 bg-slate-100 mt-[15%] ml-[5%] shadow-lg rounded-sm">
          <div className="w-full bg-blue-400 text-white text-center">
            <h1>Total Room</h1>
          </div>
          <div className="text-center align-middle mt-[10%]">
            <h1>0{data.roomsCount}</h1>
          </div>
        </div>

        <div className="w-[25%] h-32 bg-slate-100 mt-[15%] ml-[5%] shadow-lg rounded-sm">
          <div className="w-full bg-blue-400 text-white text-center">
            <h1>Total Room Types</h1>
          </div>
          <div className="text-center align-middle mt-[10%]">
            <h1>0{data.roomtypesCount}</h1>
          </div>
        </div>

        <div className="w-[25%] h-32 bg-slate-100 mt-[15%] ml-[5%] shadow-lg rounded-sm">
          <div className="w-full bg-blue-400 text-white text-center">
            <h1>Recent Offers</h1>
          </div>
          <div className="text-center align-middle mt-[10%]">
            <h1>0{data.offersCount}</h1>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = Index;
