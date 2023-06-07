const SchoolPage = require("./src/components/SchoolPage").default;
const React = require("react");
const campusRouter = require("./routes/campus");
const dishesRouter = require("./routes/dishes");
const { renderToString } = require("react-dom/server");
const locations = require("./routes/locations");
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/campus", campusRouter);
app.use("/api/campus", locations.router);
app.use("/api/locations", dishesRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/campus/:id/locations", async (req, res) => {
  let initialState = await locations.queryLocations(req.params.id);
  initialState = initialState.map((location) => ({
    type: "location",
    id: location.id,
    name: location.name,
    rating: location.rating,
    count: location.dish_count,
  }));
  const name = req.query.name;
  const schoolPageApp = renderToString(
    <SchoolPage locations={initialState} name={name} />
  );
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
