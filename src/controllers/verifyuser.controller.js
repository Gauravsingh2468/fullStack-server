import db from "../config/db.js";

export const VerifyUser = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            });
        }

        const [pendingUsers] = await db.query(
            `SELECT * FROM pending_users
             WHERE email = ?`,
            [email]
        );

        if (pendingUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration request not found"
            });
        }

        const pendingUser = pendingUsers[0];

        if (pendingUser.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (new Date() > new Date(pendingUser.otp_expires_at)) {
            await db.query(
                `DELETE FROM pending_users WHERE email = ?`,
                [email]
            );

            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        await db.query(
            `INSERT INTO users
            (
                user_name,
                name,
                email,
                password,
                mobile_no
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                pendingUser.user_name,
                pendingUser.name,
                pendingUser.email,
                pendingUser.password,
                pendingUser.mobile_no
            ]
        );

        await db.query(
            `DELETE FROM pending_users
             WHERE email = ?`,
            [email]
        );

        return res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Verify User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};