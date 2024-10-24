"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBooking = useGetBooking;
exports.useGetAllBooking = useGetAllBooking;
exports.useGetPrevBooking = useGetPrevBooking;
exports.useGetNextBooking = useGetNextBooking;
exports.useGetAllRoomDetails = useGetAllRoomDetails;
exports.useGetAllRoom = useGetAllRoom;
exports.useGetAllRoomBooking = useGetAllRoomBooking;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const bapi = import.meta.env.VITE_API_BOOKINGAPI;
function useGetBooking(id) {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['booking', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}bookings/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetAllBooking() {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['allbookings'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}allbookings`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetPrevBooking(id) {
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['prev', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}bookings/prev/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetNextBooking(id) {
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['next', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}bookings/next/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetAllRoomDetails() {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['allroomdetails'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}allroomdetails`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetAllRoom() {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['room'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`http://localhost:4000/lib`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetAllRoomBooking() {
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['room'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`http://localhost:4000/library`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
