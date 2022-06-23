const Router = require("express").Router();
const controller = require("../controllers/commentsControllers");

// SHOW ALL COMMENTS PUBLIC
Router.get("/comments/all", controller.showAll);

// SHOW NEWEST COMMENTS AND LIMIT IT
Router.get("/comments/new", controller.showNew);
 
// ADD NEW COMMENT
Router.post("/comments/add", controller.newComment);

// EDIT A COMMENT BY ID
Router.patch("/comments/edit", controller.editComment);

// DELETE A COMMENT BY ID
Router.delete("/comments/delete", controller.deleteComment);

module.exports = Router;