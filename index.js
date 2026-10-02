import app from "./src/app.js";
import { PORT } from "./src/config/env.js";
import cors from "cors";

app.use(cors({
    origin: "https://myapp.example.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});