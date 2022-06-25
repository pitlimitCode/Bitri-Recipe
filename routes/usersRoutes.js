const Router = require("express").Router();
const controller = require("../controllers/usersControllers");


Router.get("/users/show/all", controller.showAll); // SHOW ALL USERS
Router.get("/users/show/id", controller.showById); // FIND USER BY ID
Router.get("/users/show/name", controller.showByName); // FIND USER BY NAME
Router.post("/users/add", controller.newUser); // ADD NEW USER / REGISTER
Router.patch("/users/edit", controller.editUserData); // EDIT USER DATA BY ID
Router.delete("/users/delete/id", controller.deleteUser); // DELETE USER BY ID
Router.delete("/users/deleteall", controller.deleteAllUsers); // DELETE ALL USERS

module.exports = Router;