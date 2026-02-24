// 1️⃣ Load environment variables
require("dotenv").config();

// 2️⃣ Import packages
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// 3️⃣ Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ Connect to Supabase using .env variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 5️⃣ Create Job Route
app.post("/create-job", async (req, res) => {
  try {
    const { email, transition } = req.body;

    const { data, error } = await supabase
      .from("jobs") // Make sure your table name is "jobs"
      .insert([
        {
          email: email,
          transition: transition,
          status: "pending",
          output_url: null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({
      message: "Job saved to database!",
      job: data[0],
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 6️⃣ Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});