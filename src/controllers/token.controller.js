import { generateToken } from "../services/token.service.js";

export const createToken = (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: "userName and password are required"
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