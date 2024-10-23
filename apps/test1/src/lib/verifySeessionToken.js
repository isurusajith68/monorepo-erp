"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySessionToken = void 0;
const jose_1 = require("jose");
const verifySessionToken = async (token) => {
    if (!token)
        return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await (0, jose_1.jwtVerify)(token, secret);
        if (!payload)
            return null;
        return payload;
    }
    catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};
exports.verifySessionToken = verifySessionToken;
