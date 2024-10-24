"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRegistrations = useGetRegistrations;
exports.useGetAllRegisrations = useGetAllRegisrations;
exports.useGetPrevRegistration = useGetPrevRegistration;
exports.useGetNextRegistraion = useGetNextRegistraion;
exports.useGetPhoneNumber = useGetPhoneNumber;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const bapi = import.meta.env.VITE_API_BOOKINGAPI;
function useGetRegistrations(id) {
    return (0, react_query_1.useQuery)({
        queryKey: ['registration', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}registration/${id ?? 0}`);
            return data1.data.data;
        },
    });
}
function useGetAllRegisrations() {
    // const bapi = import.meta.env.VITE_API_BOOKINGAPI
    // console.log("first",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['allregistration'],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}allregistration`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetPrevRegistration(id) {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['prev', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}registration/prev/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetNextRegistraion(id) {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("qqqqqqqqqqqqqqqqqqqqqqqqq",id)
    return (0, react_query_1.useQuery)({
        queryKey: ['next', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}registration/next/${id ?? 0}`);
            // data1 = await Axios.get(`http://localhost:4000/bookings/28`);
            return data1.data.data;
        },
    });
}
function useGetPhoneNumber(id) {
    return (0, react_query_1.useQuery)({
        queryKey: ['phone', id],
        queryFn: async () => {
            let data1;
            data1 = await axios_1.default.get(`${bapi}booking-by-phone/${id ?? 0}`);
            return data1.data.data;
        },
    });
}
