import db from "../config/db.js";
import { generateToken } from "../services/token.service.js";

export const createToken = async (req, res) => {

    const querry = "SELECT * FROM users where user_name = ?";
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "userName and password are required"
            });
        }
        const user_name = userName
        const [rows] = await db.query(
            querry,
            [user_name]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const user = rows[0];

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = generateToken(userName, password);

        return res.status(200).json({
            success: true,
            message: "Token generated successfully",
            data: {
                token
            }
        });

    } catch (error) {
        console.error("Token generation error:", error);

        return res.status(500).json({
            success: false,
            message: "Token generation failed"
        });
    }
};