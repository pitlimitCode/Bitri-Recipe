const Router = require("express").Router();
const controller = require("../../controllers/users/showBy");

// SHOW ALL USERS
Router.get("/users/show/all", controller.showAll);

// FIND USER BY ID
Router.get("/users/show/id", controller.showById);

// FIND USER BY NAME
Router.get("/users/show/name", controller.showByName);

module.exports = Router;