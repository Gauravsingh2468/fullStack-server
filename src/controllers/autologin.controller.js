export const AutoLogin = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Auto login successful",
            user: req.user
        });

    } catch (error) {
        console.error("Auto Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};