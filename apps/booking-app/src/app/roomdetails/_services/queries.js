"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRoomDetails = useGetRoomDetails;
exports.useGetAllRoomDetails = useGetAllRoomDetails;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const bapi = import.meta.env.VITE_API_BOOKINGAPI;
function useGetRoomDetails(id) {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['roomdetails', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}roomdetails/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetAllRoomDetails() {
    //   console.log("check")
    return (0, react_query_1.useQuery)({
        queryKey: ['allroomdetails'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}allroomdetails`);
            //   console.log("dataaaaaaaa",data1)
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
