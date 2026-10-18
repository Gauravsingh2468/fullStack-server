
import { WebSocketServer, WebSocket } from "ws";

let wss;

export const initializeWebSocket = (server) => {
    wss = new WebSocketServer({
        server,
        path: "/api/websocket"
    });

    wss.on("connection", (socket) => {
        console.log("WebSocket client connected");

        socket.on("close", () => {
            console.log("WebSocket client disconnected");
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error.message);
        });
    });

    return wss;
};

export const sendOtpToAuthorizedClient = ({ event, otp }) => {
    if (!wss) {
        throw new Error("WebSocket server is not initialized");
    }

    let sent = 0;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: event,
                otp: otp
            }));

            sent++;
        }
    });

    console.log("OTP sent to connected clients:", sent);

    if (sent === 0) {
        throw new Error("No WebSocket clients connected");
    }
};
