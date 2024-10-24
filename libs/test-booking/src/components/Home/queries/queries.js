"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetAllRoom = useGetAllRoom;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
// const bapi = import.meta.env.VITE_API_BOOKINGAPI
function useGetAllRoom() {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['room'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`http://localhost:4000/lib`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1;
        },
    });
}
