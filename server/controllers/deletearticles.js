const Article = require("../models/articles");

const express = require("express");
const multer = require("multer");
const ImageSchema = require("../models/image");
const ImageArraySchema = require("../models/imageArray");

const storage = multer.diskStorage({
  destination: "./server/uploads",
  filename: function (req, file, cb) {
    cb(null, "IMG-" + Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  filefilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
}).single("myImage");

const uploadArray = multer({
  storage,
  filefilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
}).array("imgCollection", 6);

exports.uploadImage = (req, res) => {
  return upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: `error in uploading ${err}`,
      });
    }

    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);

    const url = "http://" + req.get("host") + "/uploads/" + req.file.filename;
    console.log(url);
    const newImage = new ImageSchema({
      imageName: req.file.originalname,
      imageData: url,
    });

    newImage.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: `error in saving to database ${err}`,
        });
      }

      console.log(result);
      return res.json({
        success: true,
        document: result,
      });
    });
  });
};

exports.uploadArrayImage = (req, res) => {
  return uploadArray(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: `error in uploading ${err}`,
      });
    }

    const reqFiles = [];
    const url = "http://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/uploads/" + req.files[i].filename);
    }

    const imageArray = new ImageArraySchema({
      imgCollection: reqFiles,
    });

    imageArray.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: `error in saving to database ${err}`,
        });
      }

      console.log(result);
      return res.json({
        success: true,
        document: result,
      });
    });
  });
};

exports.addNewArticle = (req, res) => {
  const {
    title,
    description,
    markdown,
    author,
    images,
    imagePath,
    postedByEmail,
    cusineImages,
    cusineImagesPath,
    cusineImagesDescription,
    visitedPlaceImages,
    visitedPlacesImagesPath,
    visitedPlacesImagesDescription,
  } = req.body;

  const newArticle = new Article({
    title,
    description,
    markdown,
    author,
    images,
    imagePath,
    postedByEmail,
    cusineImages,
    cusineImagesPath,
    cusineImagesDescription,
    visitedPlaceImages,
    visitedPlacesImagesPath,
    visitedPlacesImagesDescription,
  });

  newArticle.save((err, articleData) => {
    if (err)
      return res.status(401).json({
        error: `error in saving to database ${err}`,
      });
    return res.json(articleData);
  });
};

// router.post("/image-upload", (req, res) => {
//   return upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({
//         error: `error in uploading ${err}`,
//       });
//     }

//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file);

//     const newImage = new ImageSchema({
//       imageName: req.file.originalname,
//       imageData: req.file.path,
//     });

//     newImage.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: `error in saving to database ${err}`,
//         });
//       }
//       console.log(result);
//       return res.json({
//         success: true,
//         documnet: result,
//       });
//     });
//   });
// });
