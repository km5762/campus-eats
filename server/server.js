const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
require("dotenv").config();

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static(path.join(__dirname, "dist")));

const campusRouter = require("./routes/campus");
app.use("/campus", campusRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
