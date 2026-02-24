import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to Supabase using Railway environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Root route (so you don't see "Cannot GET /")
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ✅ Create Job Route
app.post("/create-job", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          prompt: prompt,
          status: "pending"
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      message: "Job created successfully",
      job: data
    });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Railway dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});