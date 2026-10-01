
const express = require("express");

const app = express();

app.use(express.json());

// Basic API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Node.js server is working!"
    });
});

// Get users
app.get("/users", (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: "Gaurav", age: 22 },
            { id: 2, name: "Rahul", age: 25 }
        ]
    });
});

// POST API
app.post("/users", (req, res) => {
    const user = req.body;

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});