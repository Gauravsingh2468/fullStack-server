import type { Request, Response } from "express";
import { getUsers } from "../services/user.service.js";

export const getUserController = (
    req: Request,
    res: Response
) => {
    const users = getUsers();

    res.json({
        success: true,
        data: users
    });
};