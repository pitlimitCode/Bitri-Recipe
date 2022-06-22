const model = require("../../model/comments/crud");

// SHOW 5 NEW RECIPES
const showNew = async (req, res) => {
  try {
    const { id_recipe } = req.body;
    const show = await model.showNew(id_recipe);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one comments history.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong while getting comments of a recipe.");
  }
};


module.exports = { showNew };