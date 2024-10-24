"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetDocumentsAll = exports.useActions = void 0;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const useActions = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return (0, react_query_1.useQuery)({
        queryKey: ['actions'],
        queryFn: async () => {
            const response = await axios_1.default.get(`${apiUrl}getactions`);
            console.log('response', response);
            return response.data;
        },
    });
};
exports.useActions = useActions;
const useGetDocumentsAll = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return (0, react_query_1.useQuery)({
        queryKey: ['documentsAll'],
        queryFn: async () => {
            const response = await axios_1.default.get(`${apiUrl}documentsall`);
            console.log('response', response);
            return response.data;
        },
    });
};
exports.useGetDocumentsAll = useGetDocumentsAll;
