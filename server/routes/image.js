// const express = require("express");
// const multer = require("multer");
// const ImageSchema = require("../models/image");
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "./server/uploads",
//   filename: function (req, file, cb) {
//     cb(null, "IMG-" + Date.now() + file.originalname);
//   },
// });

// const filefilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   filefilter,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
// }).single("myImage");

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

// module.exports = router;
