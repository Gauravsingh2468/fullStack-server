import nodemailer from "nodemailer";
import {EMAIL_USER, EMAIL_PASSWORD} from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

export const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",
        html: `
            <div>
                <h2>Email Verification</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 2 minutes.</p>
            </div>
        `
    });
};