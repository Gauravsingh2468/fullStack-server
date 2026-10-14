import { randomInt } from "node:crypto";
export const generateOTP = () => {
    return randomInt(100000, 1000000).toString();
};