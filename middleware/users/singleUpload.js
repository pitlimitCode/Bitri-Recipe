const multer = require("multer");

// singleUpload to users avatar 
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, "avatar_" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
  // destination: (req, file, cb) => {
  // 	cb(null, 'images/users_avatar/')
  // },
  destination: "././images/users_avatar/",
});
const singleUpload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      console.log(file);
      return cb(null, true);
    } else {
      console.log(file);
      return cb(null, false);
		}
  },
  limits: {
    fileSize: 1000 * 1000, // 1 MB
  },
  storage: storage,
})

module.exports = singleUpload;
