const Router = require("express").Router();
const controller = require("../controllers/usersControllers");

const multer  = require('multer')
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '././images/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: fileStorage });

Router.get("/users/show/all", controller.showAll); // SHOW ALL USERS
Router.get("/users/show/id", controller.showById); // FIND USER BY ID
Router.get("/users/show/name", controller.showByName); // FIND USER BY NAME
Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.patch("/users/edit", controller.editUserData); // EDIT USER DATA BY ID
Router.patch("/users/useravatar", upload.single('avatar'), controller.addAvatar); // ADD USER AVATAR
Router.delete("/users/delete/id", controller.deleteUser); // DELETE USER BY ID
Router.delete("/users/deleteall", controller.deleteAllUsers); // DELETE ALL USERS

module.exports = Router;