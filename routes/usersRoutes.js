const Router = require("express").Router();
const controller = require("../controllers/usersControllers");
const multer = require('multer');


// // 1
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 			cb(null, '././images/users_avatar');
// 	},
// 	filename: (req, file, cb) => {
// 			cb(null, file.originalname)
// 	}
// });
// const upload = multer({
// 	storage: storage,
// 	fileFilter: (req, file, cb) => {
// 			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
// 					cb(null, true);
// 			} else {
// 					cb(null, false);
// 					return cb(new err('Allowed only .png, .jpg, .jpeg and .gif'));
// 			}
// 	}
// });


// 2
const storage = multer.diskStorage({
	destination: '././images/users_avatar/',
	filename: (req, file, cb) => {
		cb(null, 'avatar_Id' + req.body.id + '.' +file.mimetype.split('/')[1]);
	},
})
const upload = multer({ 
	storage: storage,
	// limits: {fileSize: 40000 },
	// fileFilter: (req, file, cb) => {
	// 	const type = file.mimetype.split('/')[1];
	// 	if(type !== 'png' && type !== 'jpeg' && type !== 'jpg') {
	// 		return cb(new Error("Please input file type png / jpeg / jpg"))
	// 	}
	// },
});
  

Router.get("/users/show/all", controller.showAll); // SHOW ALL USERS
Router.get("/users/show/id", controller.showById); // FIND USER BY ID
Router.get("/users/show/name", controller.showByName); // FIND USER BY NAME
Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.post("/users/login", controller.userLogin); // LOGIN
Router.patch("/users/addavatar", upload.single('avatar'), controller.addAvatar); // ADD USER AVATAR
Router.patch("/users/edit", controller.editUserData); // EDIT USER DATA BY ID
Router.delete("/users/delete/id", controller.deleteUser); // DELETE USER BY ID
Router.delete("/users/deleteall", controller.deleteAllUsers); // DELETE ALL USERS

module.exports = Router;