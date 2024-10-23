"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteBookingMutation = exports.useInsertBookingMutation = exports.useUpdateBookingMutation = void 0;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("axios");
const useUpdateBookingMutation = () => {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("aaaqqq",bapi)
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (params) => {
            // console.log("paramsss",params.dirtyValues )
            // console.log("paramsss",bapi + params.id)
            try {
                const res = await axios_1.default.put(`${bapi}${params.id}`, params.dirtyValues);
                // console.log("ressssssssssssssssssssssss",res)
                return res;
            }
            catch (error) {
                console.error('Error in API call:', error);
                throw error;
            }
        },
        // onSettled: async (_, error, variables) => {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     await queryClient.invalidateQueries({ queryKey: ["booking"] });
        //     await queryClient.invalidateQueries({
        //       queryKey: ["booking", { id: variables.id }],
        //     });
        //   }
        // },
    });
    // const mutation = useMutation({
    //            mutationFn: (params : any) => {
    //              return Axios.put(`${process.env.DB_NAME}${params.id}`, params.dirtyValues);
    //            },
    //          });
    //  return mutation;
};
exports.useUpdateBookingMutation = useUpdateBookingMutation;
const useInsertBookingMutation = () => {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("aaaqqq",bapi)
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (data) => {
            // console.log("helloooooo",data.data )
            // console.log("geeth",bapi + params.data.id)
            try {
                const res = await axios_1.default.post(`${bapi}`, data.data);
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
exports.useInsertBookingMutation = useInsertBookingMutation;
const useDeleteBookingMutation = () => {
    const bapi = import.meta.env.VITE_API_BOOKINGAPI;
    // console.log("aaaqqq",bapi)
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (data) => {
            // console.log("helloooooo",data.data )
            // console.log("geeth",bapi + params.data.id)
            try {
                const res = await axios_1.default.delete(`${bapi}delete/${data.id}`, data.id);
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
exports.useDeleteBookingMutation = useDeleteBookingMutation;
