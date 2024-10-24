"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInsertRoomDetailsMutation = exports.useUpdateRoomDetailsMutation = void 0;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const bapi = import.meta.env.VITE_API_BOOKINGAPI;
const useUpdateRoomDetailsMutation = () => {
    // console.log("aaaqqq",bapi)
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (params) => {
            try {
                const res = await axios_1.default.put(`${bapi}roomdetails/${params.id}`, params.dirtyValues);
                // console.log("ressssssssssssssssssssssss",res)
                return res;
            }
            catch (error) {
                console.error('Error in API call:', error);
                throw error;
            }
        },
    });
};
exports.useUpdateRoomDetailsMutation = useUpdateRoomDetailsMutation;
const useInsertRoomDetailsMutation = () => {
    // console.log("aaaqqq",bapi)
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (data) => {
            // console.log("helloooooo",data.data )
            // console.log("geeth",bapi + params.data.id)
            try {
                const res = await axios_1.default.post(`${bapi}roomdetails`, data.data);
                // console.log("ressssssssssssssssssssssss",res.data)
                return res.data;
            }
            catch (error) {
                console.error('Error in API call:', error);
                throw error;
            }
        },
    });
};
exports.useInsertRoomDetailsMutation = useInsertRoomDetailsMutation;
