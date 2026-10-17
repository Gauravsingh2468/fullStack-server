
import express from "express";
import cors from "cors";
import http from "http";
import tokenRouter from "./routes/token.router.js";
import { initializeWebSocket } from "./services/websocket.services.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api", tokenRouter);

const server = http.createServer(app);

initializeWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`WebSocket running at ws://localhost:${PORT}/api/websocket`);
});

export { app, server };
export default app;
