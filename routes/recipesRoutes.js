const Router = require("express").Router();
const controller = require("../controllers/recipesControllers");

// SHOW ALL RECIPES
Router.get("/recipes/show/all", controller.showAll);

// SHOW 5 NEW RECIPES
Router.get("/recipes/show/new", controller.showNew); 
 
// FIND RECIPE BY NAME
Router.get("/recipes/show/name", controller.showByName);

// ADD NEW RECIPE
Router.post("/recipes/add", controller.newRecipe);

// EDIT RECIPE DATA BY ID
Router.patch("/recipes/edit", controller.editRecipe);

// DELETE RECIPE BY ID
Router.delete("/recipes/delete", controller.deleteRecipe);

module.exports = Router;