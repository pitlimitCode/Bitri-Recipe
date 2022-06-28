const multer = require("multer");

// singleUpload to food image
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, "foodImage" + req.body.id_user + Math.round(Math.random()*1E4) + "." + file.mimetype.split("/")[1]);
  },
  destination: "images/food_images/",
});
const multiUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1000 * 1000, // 1 MB
  },
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
})

module.exports = multiUpload;
