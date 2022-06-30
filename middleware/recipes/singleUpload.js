const multer = require("multer");

// singleUpload to food image
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, "foodImage_" + "_" + Math.round(Math.random()*1E4) + "." + file.mimetype.split("/")[1]);
  },
  destination: "images/food_images/",
});
const singleUpload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return cb(null, true);
    } else {
      return cb(null, false);
		}
  },
  limits: {
    fileSize: 1000 * 1000, // 1 MB
  },
  storage: storage,
})

module.exports = singleUpload;
