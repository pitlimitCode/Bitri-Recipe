const Router = require("express").Router();
const controller = require("../../controllers/recipes/crud");
const db = require("../../db");

// SHOW ALL RECIPES
Router.get("/recipes/show/all", controller.showAll);

// SHOW 5 NEW RECIPES
Router.get("/recipes/show/new", controller.showNew);

// FIND RECIPE BY NAME
Router.get("/recipes/show/name", controller.showByName);

// ADD NEW RECIPE
Router.post("/recipes/add", (req, res) => {
  const { id_user, name, ingredients, step, image, video } = req.body;
  
  db.query(
    `INSERT INTO recipes (id_user, name, ingredients, step, image, video) VALUES ($1, $2, $3, $4, $5, $6)`,
    [id_user, name, ingredients, step, image, video],
    (error, result) => {
      if (error) {
        console.log(error.message);
        res.status(400).send("Something wrong while adding new recipe.");
      } else {
        res.status(200).send(`Your recipe: ${name}, succesfully to be added.`);
      }
      
    }
  );
});

// EDIT RECIPE DATA BY ID
Router.patch("/recipes/edit", (req, res) => {
  const { id, id_user, name, ingredients, step, image, video } = req.body;
  
  db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
    if (error) {
      console.log(error.message);
      res.status(400).send("Something wrong while editing recipe data.");
    } else {
      if (result.rowCount > 0) {
        // name, email, and phone value can't be NULL
        let inpId_user = id_user || result?.rows[1]?.id_user; // not null
        let inpName = name || result?.rows[2]?.name; // not null
        let inpIngredients = ingredients || result?.rows[3]?.ingredients; // not null
        let inpStep = step || null;
        let inpImage = image || null;
        let inpVideo = video || null;

        let message = "";
        if (inpId_user) message += "id_user, ";
        if (inpName) message += "name, ";
        if (inpIngredients) message += "ingredients, ";
        if (inpStep) message += "step, ";
        if (inpImage) message += "image, ";
        if (inpVideo) message += "video, ";

        db.query(
          `UPDATE recipes SET id_user = $1, name = $2, ingredients = $3, step = $4, image = $5, video = $6 WHERE id = $7`,
          [inpId_user, inpName, inpIngredients, inpStep, inpImage, inpVideo, id],
          (error, result) => {
            if (error) {
              res.status(400).send("Something wrong while edit recipe data by id.");
            } else {
              res.status(200).send(`${message} recipe from id: '${id}' successfully to be edited.`);
            }
          }
        );
      } else {
        res.status(400).send(`Recipe data id: ${id} not found.`);
      }
    }
  });
});

// DELETE RECIPE BY ID
Router.delete("/recipes/delete", (req, res) => {
  const { id } = req.body;

  if (id) {
    let inpId = id;
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) {
        res.status(400).send("Something wrong while deleting recipe data by id");
      } else {
        if (result.rowCount > 0) {
          db.query(`DELETE FROM recipes WHERE id = $1`, [id], () => {
            res.send(`Recipe data id: ${inpId} succesfully to be deleted.`);
          });
        } else {
          res.status(400).send(`Id data = ${id}, not found`);
        }
      }
    });
  } 
});

module.exports = Router;