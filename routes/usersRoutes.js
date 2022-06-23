const Router = require("express").Router();
const controller = require("../controllers/usersControllers");

// SHOW ALL USERS
Router.get("/users/show/all", controller.showAll);

// FIND USER BY ID
Router.get("/users/show/id", controller.showById);

// FIND USER BY NAME
Router.get("/users/show/name", controller.showByName); 

// ADD NEW USER / REGISTER
Router.post("/users/add", controller.newUser);

// EDIT USER DATA BY ID
Router.patch("/users/edit", controller.editUserData);

// DELETE USER BY ID OR EMAIL
Router.delete("/users/delete", controller.deleteUser);

// DELETE ALL USERS
Router.delete("/users/deleteall", controller.deleteAllUsers);

module.exports = Router;