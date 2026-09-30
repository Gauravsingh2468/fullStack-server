import type { User } from "../types/users.type.js";

export const getUsers = (): User[] => {
    return [
        {
            id: 1,
            name: "Gaurav",
            email: "gaurav@gmail.com"
        },
        {
            id: 2,
            name: "Rahul",
            email: "rahul@gmail.com"
        }
    ];
};