
import { WebSocketServer } from "ws";

export const initializeWebSocket = (server) => {
    const wss = new WebSocketServer({
        server,
        path: "/api/websocket"
    });

    wss.on("connection", (socket) => {
        console.log("WebSocket client connected");

        socket.on("message", (message) => {
            console.log("Received:", message.toString());

            socket.send(JSON.stringify({
                success: true,
                message: "Message received",
                data: message.toString(),
                name: "santosh mama"
            }));
        });

        socket.on("close", () => {
            console.log("Client disconnected");
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error.message);
        });
    });

    return wss;
};
