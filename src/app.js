import express from "express";
import cors from "cors";
import tokenRouter from "./routes/token.router.js";

const app = express();
app.use(cors({
    origin: "https://myapp.example.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cors());
app.use(express.json());
app.use("/api", tokenRouter);
export default app;