const express = require("express");

const {
  addNewArticle,
  uploadImage,
  uploadArrayImage,
} = require("../controllers/articles");

const {
  getAllPosts,
  getNameFromEmail,
  eachUserPosts,
  UpdateFields,
  getOneArticle,
} = require("../controllers/posts");

const {
  signUp,
  activateAccount,
  signIn,
  forgotPassword,
  resetPassword,
} = require("../controllers/authentication");

const router = express.Router();

router.post("/add-new-article", addNewArticle);

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/activate-account", activateAccount);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/all-posts", getAllPosts);

router.post("/get-user-details", getNameFromEmail);

router.post("/image-upload", uploadImage);

router.post("/get-post-of-user", eachUserPosts);

router.post("/update-fields-of-user", UpdateFields);

router.post("/image-upload-array", uploadArrayImage);

router.post("/get-one-article", getOneArticle);

//router.post("/update-article-withImage", )

module.exports = router;
