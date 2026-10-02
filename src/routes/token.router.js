import express from "express";
import { createToken } from "../controllers/token.controller.js";

const router = express.Router();

router.post("/login", createToken);

export default router;