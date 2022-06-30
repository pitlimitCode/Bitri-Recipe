const Router = require("express").Router();
const controller = require("../controllers/usersControllers");
const singleUpload = require("../middleware/users/singleUpload");
// const middleware = require("../middleware/verifyToken");

Router.get("/users/show/all", controller.showAll); // SHOW ALL USERS
Router.get("/users/show/id", controller.showById); // FIND USER BY ID
Router.get("/users/show/name", controller.showByName); // FIND USER BY NAME
Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.post("/users/login", controller.userLogin); // LOGIN
Router.patch("/users/addavatar", singleUpload.single('avatar'), controller.addAvatar); // ADD USER AVATAR
Router.patch("/users/edit", controller.editUserData); // EDIT USER DATA BY ID
Router.delete("/users/delete/id", controller.deleteUser); // DELETE USER BY ID
Router.delete("/users/deleteall", controller.deleteAllUsers); // DELETE ALL USERS

module.exports = Router;