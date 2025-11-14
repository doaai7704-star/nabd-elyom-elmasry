// ===== server.js =====
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend server is running...");
});

app.post("/add-news", async (req, res) => {
  try {
    const response = await fetch("https://sheetdb.io/api/v1/rknvsoqikajg6", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error sending to SheetDB:", err);
    res.status(500).json({ error: "Failed to send to SheetDB" });
  }
});

app.get("/get-news", async (req, res) => {
  try {
    const response = await fetch("https://sheetdb.io/api/v1/rknvsoqikajg6");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching from SheetDB:", err);
    res.status(500).json({ error: "Failed to fetch from SheetDB" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
