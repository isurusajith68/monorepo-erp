"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'http://localhost:8080';
const axiosInstance = axios_1.default.create({ baseURL: BASE_URL });
const getBookings = async () => {
    return (await axiosInstance.get('todos')).data;
};
exports.getBookings = getBookings;
