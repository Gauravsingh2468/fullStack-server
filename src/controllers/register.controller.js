import db from "../config/db.js";
import { sendOTPEmail } from "../services/email.services.js";
import { generateOTP } from "../services/otp.service.js";

export const RegisterUser = async (req, res) => {

    const insertQuerry = `INSERT INTO pending_users(user_name,name,email,password,mobile_no,otp,otp_expires_at)VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
        const {
            user_name,
            name,
            email,
            password,
            mobile_no
        } = req.body;

        if (!user_name) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        if (!mobile_no) {
            return res.status(400).json({
                success: false,
                message: "Mobile number is required"
            });
        }

        const [existingUser] = await db.query(
            `SELECT id FROM users
             WHERE user_name = ? OR email = ?`,
            [user_name, email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username or email already exists"
            });
        }

        const [existingPending] = await db.query(
            `SELECT id FROM pending_users
             WHERE user_name = ? OR email = ?`,
            [user_name, email]
        );

        if (existingPending.length > 0) {
            await db.query(
                `DELETE FROM pending_users
                 WHERE user_name = ? OR email = ?`,
                [user_name, email]
            );
        }

        const otp = generateOTP();
        const otpExpiresAt = new Date(
            Date.now() + 2 * 60 * 1000
        );

        await db.query(
            insertQuerry,
            [
                user_name,
                name,
                email,
                password,
                mobile_no,
                otp,
                otpExpiresAt
            ]
        );
        await sendOTPEmail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}