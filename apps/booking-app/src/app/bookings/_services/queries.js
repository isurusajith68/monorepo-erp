"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBooking = useGetBooking;
exports.useGetPrevBooking = useGetPrevBooking;
exports.useGetNextBooking = useGetNextBooking;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("axios");
function useGetBooking(id) {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['booking', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetPrevBooking(id) {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['prev', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}prev/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetNextBooking(id) {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['next', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}next/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
