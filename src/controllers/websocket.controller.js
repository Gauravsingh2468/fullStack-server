
export const WebSocketApi = (req, res) => {
    res.status(200).json({
        success: true,
        message: "WebSocket endpoint is available"
    });
};
