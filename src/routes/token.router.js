import express from "express";
import { createToken } from "../controllers/token.controller.js";
const tokenRouter = express.Router();
router.post("/login", createToken);
export default tokenRouter;