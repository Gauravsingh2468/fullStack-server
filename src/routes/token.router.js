import express from "express";
import { createToken } from "../controllers/token.controller.js";
import { RegisterUser } from "../controllers/register.controller.js";
import { AutoLogin } from "../controllers/autologin.controller.js";
import { VerifyUser } from "../controllers/verifyuser.controller.js";
import { verifyToken } from "../controllers/verifytoken.controller.js";
import { WebSocketApi } from "../controllers/websocket.controller.js";

const tokenRouter = express.Router();
tokenRouter.post("/login", createToken);
tokenRouter.post("/registerUser", RegisterUser);
tokenRouter.post("/verify", VerifyUser);
tokenRouter.get("/auto-login",verifyToken,AutoLogin);
tokenRouter.get("/websocket",WebSocketApi);
export default tokenRouter;