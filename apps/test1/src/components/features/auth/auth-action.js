"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOTP = exports.sendMail = exports.getUserById = exports.getSessionToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
exports.redirectToGoogleLogin = redirectToGoogleLogin;
exports.handleGoogleCallback = handleGoogleCallback;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_1 = require("cookie");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const headers_1 = require("next/headers");
const jose_1 = require("jose");
const nodemailer_1 = __importDefault(require("nodemailer"));
const SALT_ROUNDS = 10;
const registerUser = async (username, email, password) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
        db.exec(createTableQuery);
        const sqlCheck = `SELECT 1 FROM users WHERE email = ?`;
        const stmtCheck = db.prepare(sqlCheck);
        const userExists = stmtCheck.get(email);
        if (userExists) {
            return { success: false, message: 'User already exists' };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const sqlInsert = `INSERT INTO users (username,email, password) VALUES (?, ?, ?)`;
        const stmtInsert = db.prepare(sqlInsert);
        stmtInsert.run(username, email, hashedPassword);
        return { success: true, message: 'User registered successfully' };
    }
    catch (error) {
        console.error('Error in Server action-register-', error);
        return { success: false, message: error.message };
    }
    finally {
        db.close();
    }
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        const sqlSelect = `SELECT * FROM users WHERE email = ?`;
        const stmtSelect = db.prepare(sqlSelect);
        const user = stmtSelect.get(email);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid credentials' };
        }
        const token = createSessionToken(user.id);
        // const cookie = serialize("authToken", token, {
        //   httpOnly: true,
        //   maxAge: 60 * 60 * 24,
        //   path: "/",
        // });
        (0, headers_1.cookies)().set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        return {
            success: true,
            message: 'User logged in successfully',
            //   cookie,
        };
    }
    catch (error) {
        console.error('Error in Server action-login-', error);
        return { success: false, message: error.message };
    }
    finally {
        db.close();
    }
};
exports.loginUser = loginUser;
const logoutUser = async () => {
    try {
        const cookie = (0, cookie_1.serialize)('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0),
        });
        (0, headers_1.cookies)().set({
            name: 'authToken',
            value: '',
            httpOnly: true,
            maxAge: -1,
            path: '/',
        });
        return { success: true, message: 'Logged out successfully' };
    }
    catch (error) {
        console.error('Error in logoutUser action:', error);
        return { success: false, message: error.message };
    }
};
exports.logoutUser = logoutUser;
const createSessionToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: '1d' };
    console.log(jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options));
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
};
const getSessionToken = async () => {
    try {
        const token = await (0, headers_1.cookies)().get('authToken')?.value;
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        if (!token) {
            return null;
        }
        const { payload } = (await (0, jose_1.jwtVerify)(token, secret));
        console.log(payload, 'payload sssssssssssssssssssssssssssss');
        //check user id in db
        const user = await (0, exports.getUserById)(payload.userId);
        if (!user) {
            (0, headers_1.cookies)().set({
                name: 'authToken',
                value: '',
                httpOnly: true,
                maxAge: -1,
            });
            return null;
        }
        delete user.password;
        return user;
    }
    catch (error) {
        console.error('Error in getSessionToken action:', error);
        return null;
    }
};
exports.getSessionToken = getSessionToken;
const getUserById = async (userId) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    console.log(userId, 'userId');
    try {
        const sqlSelect = `SELECT * FROM users WHERE id = ?`;
        const stmtSelect = db.prepare(sqlSelect);
        const user = stmtSelect.get(userId);
        console.log(user, 'user');
        return user;
    }
    catch (error) {
        console.error('Error in Server action-getUserById-', error);
        return null;
    }
    finally {
        db.close();
    }
};
exports.getUserById = getUserById;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const storeOTP = (email, otp) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    db.exec(`CREATE TABLE IF NOT EXISTS otp (
  email TEXT PRIMARY KEY,
  otp_code TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
    const query = `INSERT OR REPLACE INTO otp (email, otp_code, created_at) VALUES (?, ?, datetime('now'))`;
    db.prepare(query).run(email, otp);
    db.prepare(`DELETE FROM otp WHERE created_at <= datetime('now', '-1 minute')`).run();
};
const sendMail = async (email) => {
    const otp = generateOTP();
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    const date = new Date();
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'isurusajith68@gmail.com',
            pass: 'nszv pknm htuv lqzw',
        },
    });
    // Mail options
    const mailOptions = {
        from: 'isurusajith@gmail.com',
        to: email,
        subject: 'Ceyinfo ERP OTP Verification',
        text: `Your OTP code is ${otp}. It will expire in 1 minute.`,
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #4CAF50;">Ceyinfo ERP OTP Verification</h2>
      <p>Dear user,</p>
      <p>Your OTP code is:</p>
      <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</div>
      <p>This OTP will expire in <strong>1 minute</strong>
        for security reasons. Please do not share this code with anyone.
      .</p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Best regards,<br>Ceyinfo</p>
    </div>
  `,
    };
    try {
        const sqlSelect = `SELECT * FROM users WHERE email = ?`;
        const stmtSelect = db.prepare(sqlSelect);
        const user = stmtSelect.get(email);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
        storeOTP(email, otp);
        return { success: true, message: `OTP sent to ${email}` };
    }
    catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: 'Failed to send OTP. Please try again.',
        };
    }
};
exports.sendMail = sendMail;
const verifyOTP = async (email, otp) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        const query = `SELECT * FROM otp WHERE email = ? AND otp_code = ? AND created_at > datetime('now', '-1 minute')`;
        const result = db.prepare(query).get(email, otp);
        if (result) {
            return { success: true, message: 'OTP verified successfully!' };
        }
        else {
            return { success: false, message: 'OTP is invalid or expired' };
        }
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        return {
            success: false,
            message: 'An error occurred while verifying OTP.',
        };
    }
};
exports.verifyOTP = verifyOTP;
const resetPassword = async (email, password) => {
    const db = new better_sqlite3_1.default(process.env.DB_NAME);
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const query = `UPDATE users SET password = ? WHERE email = ?`;
        db.prepare(query).run(hashedPassword, email);
        return { success: true, message: 'Password reset successfully!' };
    }
    catch (error) {
        console.error('Error resetting password:', error);
        return {
            success: false,
            message: 'An error occurred while resetting password.',
        };
    }
};
exports.resetPassword = resetPassword;
async function redirectToGoogleLogin() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent('https://acc.ceyinfo.cloud/auth/callback');
    const responseType = 'code';
    const scope = encodeURIComponent('openid email profile');
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=consent`;
    return authUrl;
}
async function handleGoogleCallback(code) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'https://acc.ceyinfo.cloud/auth/callback';
    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });
        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;
        // Fetch user information
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        //user info email check in db
        const db = new better_sqlite3_1.default(process.env.DB_NAME);
        const sqlSelect = `SELECT * FROM users WHERE email = ?`;
        const stmtSelect = db.prepare(sqlSelect);
        const user = stmtSelect.get(userInfo.email);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const token = createSessionToken(user.id);
        (0, headers_1.cookies)().set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            maxAge: 60 * 60 * 24,
        });
        return { success: true, message: 'User  found' };
    }
    catch (error) {
        console.error('Error during Google callback:', error);
        throw new Error('Failed to handle Google OAuth callback');
    }
}
