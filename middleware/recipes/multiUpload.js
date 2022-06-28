const multer = require("multer");

// multiUpload to food video
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, "foodVideo" + req.body.id_user + Math.round(Math.random()*1E4) + "." + file.mimetype.split("/")[1]);
  },
  destination: "videos",
});
const multiUpload = multer({
  storage: storage,
  limits: {
    fileSize: 40 * 1000 * 1000, // 40 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "video/mkv" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/webm" ||
      file.mimetype == "video/3gp"
    ) {
      return cb(null, true);
    } else {
      return cb(null, false);
		}
  },
})

module.exports = multiUpload;
