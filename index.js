import app from "./src/app.js";
import db from "./src/config/db.js";
import { PORT } from "./src/config/env.js";

const getUsers = async () => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM users"
        );

        console.log(rows);

        return rows;
    } catch (error) {
        console.error("Query Failed:", error.message);
    }
};

getUsers();


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});