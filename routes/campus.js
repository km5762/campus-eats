const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const path = require("path");

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/search", async (req, res) => {
  const search = req.query.query;
  // const regexPattern = /(\b\w+&\w+\b|\b\w+\b)(?!$)/g;
  // const replacementString = "$1 &";
  // let query = search.replace(regexPattern, replacementString).trim();
  // query += query === "" ? "" : ":*";

  console.log(search);
  try {
    const { data, error } = await supabase
      .from("campus")
      .select()
      .ilike("name", `%${search}%`);

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/locations", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "dist", "school-page.html"));
});

module.exports = router;
