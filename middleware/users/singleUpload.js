const multer = require("multer");

// singleUpload to users avatar 
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, "avatar_Id" + req.body.id + "." + file.mimetype.split("/")[1]);
  },
  // destination: (req, file, cb) => {
  // 	cb(null, 'images/users_avatar/')
  // },
  destination: "images/users_avatar/",
});
const singleUpload = multer({
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

module.exports = singleUpload;
