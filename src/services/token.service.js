import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const generateToken = (userName, password ) => {
    const token = jwt.sign(
        {userName,password},
        JWT_SECRET,
        {
            expiresIn: `${15}d`
        }
    );
}