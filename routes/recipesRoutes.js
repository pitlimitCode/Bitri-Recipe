const Router = require("express").Router();
const controller = require("../controllers/recipesControllers");

const multer  = require('multer')
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '././images/food_images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: fileStorage });

Router.get("/recipes/show/all", controller.showAll); // SHOW ALL RECIPES
Router.get("/recipes/pagination/", controller.showInPages); // SHOW RECIPES IN PAGES
Router.get("/recipes/show/new", controller.showNew); // SHOW 5 NEW RECIPES
Router.get("/recipes/show/id", controller.showById); // FIND RECIPE BY ID
Router.get("/recipes/show/name", controller.showByName); // FIND RECIPE BY NAME
Router.post("/recipes/add",  upload.single('avatar'), controller.newRecipe); // ADD NEW RECIPE
Router.patch("/recipes/edit", controller.editRecipe); // EDIT RECIPE DATA BY ID
Router.delete("/recipes/delete", controller.deleteRecipe); // DELETE RECIPE BY ID

module.exports = Router;