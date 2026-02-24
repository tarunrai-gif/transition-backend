import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Test create-job route (NO database)
app.post("/create-job", (req, res) => {
  console.log("Request received:", req.body);

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  return res.json({
    message: "Route is working ✅",
    promptReceived: prompt
  });
});

// Railway dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});