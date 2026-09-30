import express from "express";
import userRoutes from "./src/routes/user.routes.js";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

export default app;