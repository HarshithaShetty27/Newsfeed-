const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000; // Change this if needed

app.use(cors()); // Allow frontend requests

const API_KEY = "78cb92e78a6e4c448902e593f576b531";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

app.get("/news", async (req, res) => {
    try {
        const query = req.query.q || "India"; // Default query is "India"
        const response = await axios.get(`${NEWS_API_URL}`, {
            params: {
                q: query,
                apiKey: API_KEY
            },
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching news" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
