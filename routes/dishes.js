const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/:id/dishes", async (req, res) => {
  const locationID = req.params.id;

  try {
    const { data, error } = await supabase
      .from("dish")
      .select("*")
      .eq("location_id", locationID);

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
