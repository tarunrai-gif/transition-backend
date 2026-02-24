import express from "express";

const app = express();

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// CRITICAL PART
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});