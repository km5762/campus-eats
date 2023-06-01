import React from "react";
import SchoolPage from "./src/components/SchoolPage";
const { renderToString } = require("react-dom/server");
const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
require("dotenv").config();

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static(path.join(__dirname, "dist")));

const campusRouter = require("./routes/campus");
const locationsRouter = require("./routes/locations");

app.use("/api/campus", campusRouter);
app.use("/api/locations", locationsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/campus/:id/locations", async (req, res) => {
  const schoolPageApp = renderToString(<SchoolPage />);
  const filePath = path.join(__dirname, "dist", "school-page.ejs");
  ejs.renderFile(filePath, { schoolPageApp }, (err, html) => {
    if (err) {
      console.error("Error rendering template:", err);
      return res.status(500).end();
    }
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
