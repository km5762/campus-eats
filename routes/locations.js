const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/", async (req, res) => {
  const campusID = req.query.id;

  try {
    const { data, error } = await supabase
      .from("location")
      .select()
      .eq("campus_id", campusID);

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
