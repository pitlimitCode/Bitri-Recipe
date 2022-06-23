const model = require("../model/recipeModel");

// SHOW ALL RECIPES
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one recipe on Database.");
    }
  } catch (error) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// SHOW 5 NEW RECIPES
const showNew = async (req, res) => {
  try {
    const show = await model.showNew();
    if (show.rowCount > 0){
      res.status(200).send({ count_of_data: show.rowCount, data: show.rows });
    } 
    if (show.rowCount == 0 ){
      res.send("No one recipe on Database.");
    }
  } catch (error) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// FIND RECIPES BY NAME
const showByName = async (req, res) => {
  try {
    const { name } = req.body;
    const nameLower = name.toLowerCase();

    const show = await model.showByName(nameLower);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one recipe name: '${name}' from recipes data.`);
    }
  } catch (error) {
    res.status(400).send("Something wrong while finding recipe data by name.");
  }
};

// ADD NEW RECIPE
const newRecipe = async (req, res) => {
  const { id_user, name, ingredients, step, image, video } = req.body;
  try {
    const show = await model.newRecipe(id_user, name, ingredients, step, image, video);
     res.status(200).send(`Your recipe: '${name}', succesfully to be added.`);
  } catch (error) {
    res.status(400).send("Something wrong while adding new recipe.");
  }
}

// EDIT RECIPE DATA BY ID
const editRecipe = async (req, res) => {
  const { id, id_user, name, ingredients, step, image, video } = req.body;
  try {
    const show = await modul.editRecipe(id);

    if (show.rowCount > 0) {
      let inpId_user = id_user || show?.rows[0]?.id_user; // not null
      let inpName = name || show?.rows[0]?.name; // not null
      let inpIngredients = ingredients || show?.rows[0]?.ingredients; // not null
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

      try {
        const show = await modul.editRecipe2(inpId_user, inpName, inpIngredients, inpStep, inpImage, inpVideo, id);
        res.status(200).send(`${message} recipe from id: '${id}' successfully to be edited.`);
      } catch (error) {
        res.status(400).send("Something wrong while edit recipe data by id.");
      }

    } else {
      res.status(400).send(`Recipe data id: ${id} not found.`);
    }
  } catch (error) {
    res.status(400).send("Something wrong while editing recipe data.");
    
  }
}

// DELETE RECIPE BY ID
const deleteRecipe = async (req, res) => {
  const { id } = req.body;
  if (id) {
    let inpId = id;
    try {
      const show = await model.deleteRecipe(id);
      if (show.rowCount > 0) {
          try {
            const show2 = await model.deleteRecipe2(id);
            res.send(`Recipe data id: ${inpId} succesfully to be deleted.`);
          } catch (error) {}
      } else {
        res.status(400).send(`Id data = ${id}, not found`);
      }
    } catch (error) {
      res.status(400).send("Something wrong while deleting recipe data by id");
    }
  } else ('Please input id recipe.')
}

module.exports = { showAll, showNew, showByName, newRecipe, editRecipe, deleteRecipe };