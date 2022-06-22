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
    const show = await model.showByName(name);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one recipe name: ${name} on Database.`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong while finding recipe data by name.");
  }
};


module.exports = { showAll, showNew, showByName };