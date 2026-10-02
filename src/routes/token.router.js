import express from "express";
import { createToken } from "../controllers/token.controller.js";
const tokenRouter = express.Router();
tokenRouter.post("/login", createToken);
export default tokenRouter;