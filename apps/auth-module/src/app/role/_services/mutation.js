"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("axios"));
const useMuate = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return (0, react_query_1.useMutation)({
        mutationFn: async (newRole) => {
            const response = await axios_1.default.post(`${apiUrl}addrole`, newRole);
            console.log(response);
            return response.data;
        },
    });
};
exports.default = useMuate;
