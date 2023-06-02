import SchoolPage from "./src/components/SchoolPage";
const React = require("react");
const campusRouter = require("./routes/campus");
const { renderToString } = require("react-dom/server");
const locations = require("./routes/locations");
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

app.use("/api/campus", campusRouter);
app.use("/api/locations", locations.router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/campus/:id/locations", async (req, res) => {
  let initialState = await locations.queryLocations(req.params.id);
  const schoolPageApp = renderToString(<SchoolPage locations={initialState} />);
  const filePath = path.join(__dirname, "dist", "school-page.ejs");
  initialState = JSON.stringify(initialState);
  ejs.renderFile(filePath, { schoolPageApp, initialState }, (err, html) => {
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
