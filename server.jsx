const SchoolPage = require("./src/components/SchoolPage").default;
const React = require("react");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { renderToString } = require("react-dom/server");
const jwt_decode = require("jwt-decode");
const express = require("express");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const ejs = require("ejs");
const app = express();
const upload = multer();
const port = process.env.PORT || 3000;
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, detectSessionInUrl: false },
});

const s3 = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
});
const bucketName = "campus-eats";
const authorizedMimeTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

async function authorize(req, res, next) {
  const jwt = req.headers.authorization;

  if (!jwt) {
    res.status(401).json({
      code: "UNAUTHORIZED",
      message: "Authentication credentials are missing or invalid",
    });
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, detectSessionInUrl: false },
    global: {
      headers: {
        Authorization: jwt,
      },
    },
  });
  req.userClient = userClient;
  req.userID = jwt_decode(jwt).sub;
  next();
}

app.post(
  "/api/dishes",
  authorize,
  upload.single("dish-img"),
  async (req, res) => {
    const userClient = req.userClient;
    const file = req.file;

    const { data, error } = await userClient.rpc("fn_insert_dish", {
      p_name: req.body["dish-name"],
      p_location_id: req.body["location-id"],
      p_price: req.body["dish-price"],
      p_breakfast: !!req.body["dish-breakfast?"],
      p_lunch: !!req.body["dish-lunch?"],
      p_dinner: !!req.body["dish-dinner?"],
      p_image: generateKey(req.userID, file.mimetype.split("/")[1]),
    });

    console.log(data);
    console.log(error);
    // const file = req.body;
    // const contentType = req.get("Content-Type");
    // const userID = req.get("X-User-ID");
    // if (file === undefined) {
    //   res.status(400).json({
    //     code: "NO_FILE",
    //     message: "No file uploaded",
    //   });
    //   return;
    // } else if (!authorizedMimeTypes.includes(contentType)) {
    //   res.status(400).json({
    //     code: "INVALID_MIMETYPE",
    //     message: `Invalid image mimetype "${contentType}". Authorized mimetypes are ${authorizedMimeTypes}`,
    //   });
    //   return;
    // }
    // try {
    //   const imgKey = generateKey(userID, contentType.split("/")[1]);
    //   await s3.send(
    //     new PutObjectCommand({
    //       Bucket: bucketName,
    //       Key: generateKey(userID, imgKey),
    //       Body: file,
    //     })
    //   );
    //   res.status(200).json({
    //     code: "UPLOAD_SUCCESS",
    //     message: "Image uploaded successfully",
    //     imgKey,
    //   });
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    //   res.status(500).json({
    //     code: "UPLOAD_ERROR",
    //     message: "An error occurred while uploading the image",
    //   });
    // }
  }
);

app.get("/campus/:id/locations", async (req, res) => {
  const campusID = req.params.id;
  let initialState = await queryLocations(campusID);
  const campusName = initialState[0].campus_name;
  initialState = initialState
    .filter((location) => location.id !== null)
    .map((location) => ({
      type: "location",
      id: location.id,
      name: location.name,
      rating: location.rating,
      count: location.dish_count,
    }));
  const schoolPageApp = renderToString(
    <SchoolPage
      locations={initialState}
      campusName={campusName}
      campusID={campusID}
    />
  );
  const filePath = path.join(__dirname, "dist", "school-page.ejs");
  initialState = JSON.stringify(initialState);
  ejs.renderFile(
    filePath,
    { schoolPageApp, initialState, campusName, campusID },
    (err, html) => {
      if (err) {
        console.error("Error rendering template:", err);
        return res.status(500).end();
      }
      res.send(html);
    }
  );
});

async function queryLocations(campusID) {
  try {
    const { data, error } = await anonClient.rpc(
      "fn_get_approved_locations_at",
      {
        p_id: campusID,
      }
    );

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Internal Server Error" };
  }
}

function generateKey(userID, extension) {
  return `${userID}_${uuid()}.${extension}`;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
