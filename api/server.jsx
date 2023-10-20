/* eslint-disable camelcase */
const SchoolPage = require("../src/components/SchoolPage").default;
const React = require("react");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { renderToString } = require("react-dom/server");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
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
  const jwtHeader = req.headers.authorization;

  if (!jwtHeader) {
    return res.status(401).json({
      code: "MISSING_TOKEN",
      message: "Required authentication token is missing.",
    });
  } else {
    const jwtToken = jwtHeader.split(" ")[1];
    jwt.verify(jwtToken, process.env.SUPABASE_JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          code: "INVALID_TOKEN",
          message: "Provided authentication token is invalid.",
        });
      } else {
        const userClient = createClient(supabaseUrl, supabaseAnonKey, {
          auth: { persistSession: false, detectSessionInUrl: false },
          global: {
            headers: {
              Authorization: jwtHeader,
            },
          },
        });
        req.userClient = userClient;
        req.userID = jwt_decode(jwtHeader).sub;
        next();
      }
    });
  }
}

async function validateImage(req, res, next) {
  const { file } = req;

  if (file) {
    const { mimetype } = file;
    const key = generateKey(req.userID, mimetype.split("/")[1]);

    if (!authorizedMimeTypes.includes(mimetype)) {
      return res.status(415).json({
        code: "INVALID_MIMETYPE",
        message: `Invalid image mimetype "${mimetype}". Authorized mimetypes are ${authorizedMimeTypes}`,
      });
    }

    req.imageKey = key;
  }

  next();
}

async function handleInsertion(req, res, rpc, params) {
  const { userClient } = req;

  const { data, error } = await userClient.rpc(rpc, params);

  if (error) {
    return res.status(500).json({
      code: "SUPABASE_POSTGREST_ERROR",
      message: error.message,
    });
  } else {
    const { successful, code, next_post_at, new_row } = data;

    if (!successful && code === "43000") {
      return res.status(429).json({
        code: "TOO_MANY_REQUESTS",
        message: "The rate limit for this action has been exceeded.",
        nextPostAt: next_post_at,
      });
    } else if (!successful) {
      return res.status(500).json({
        code: "SUPABASE_POSTGREST_ERROR",
        message: `Insertion failed with Postgres error code: ${code}`,
        nextPostAt: next_post_at,
      });
    } else if (successful) {
      if (req.file) {
        try {
          await s3.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: req.imageKey,
              Body: req.file.buffer,
            })
          );
        } catch (error) {
          return res.status(500).json({
            code: "UPLOAD_ERROR",
            message: error.message,
          });
        }
        return res.status(200).json({
          code: "POST_WITH_IMAGE_SUCCESS",
          message: "Image uploaded successfully and database has been updated.",
          nextPostAt: next_post_at,
          newRow: new_row,
          newImage: req.imageKey,
        });
      } else {
        return res.status(200).json({
          code: "POST_WITHOUT_IMAGE_SUCCESS",
          message: "Database has been successfully updated",
          nextPostAt: next_post_at,
          newRow: new_row,
        });
      }
    }
  }
}

app.post(
  "/api/dishes",
  authorize,
  upload.single("content-image"),
  validateImage,
  async (req, res) => {
    await handleInsertion(req, res, "fn_insert_dish", {
      p_name: req.body["dish-name"],
      p_location_id: req.body["location-id"],
      p_price: req.body["dish-price"],
      p_breakfast: !!req.body["dish-breakfast?"],
      p_lunch: !!req.body["dish-lunch?"],
      p_dinner: !!req.body["dish-dinner?"],
      p_image: req.imageKey,
    });
  }
);

app.post(
  "/api/reviews",
  authorize,
  upload.single("content-image"),
  validateImage,
  async (req, res) => {
    await handleInsertion(req, res, "fn_insert_review", {
      p_rating: req.body["review-rating"] ?? 0,
      p_dish_id: req.body["dish-id"],
      p_comments: req.body["review-comments"],
      p_verdict: req.body["review-verdict"],
      p_image: req.imageKey,
    });
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

module.exports = app;
