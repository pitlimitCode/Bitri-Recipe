const model = require("../model/commentsModel");

// SHOW ALL COMMENTS PUBLIC
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one Comment record in this apps.");
    }
  } catch (error) {
    res.status(400).send("Something wrong while comment data.");
  }
};

// SHOW NEWEST COMMENTS AND LIMIT IT
const showNew = async (req, res) => {
  try {
    const { id_recipe, limit } = req.body;
    const show = await model.showNew(id_recipe, limit);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one comments history.");
    }
  } catch (error) {
    res.status(400).send("Something wrong while getting comments of a recipe.");
  }
};

// ADD NEW COMMENT
const newComment = async (req, res) => {
  const { id_recipe, id_commenter, comment_text } = req.body;
  try {
    const show = await model.newComment(id_recipe, id_commenter, comment_text);
    res.status(200).send(`Your comment succesfully to be added.`);
  } catch (error) {
    res.status(400).send("Something wrong while adding new comment.");
  }
}

// EDIT A COMMENT BY ID
const editComment = async (req, res) => {
  const { id, id_recipe, id_commenter, comment_text } = req.body;
  try {
    const show = await model.editComment(id_recipe, id_commenter);
    if (show.rowCount > 0) {
      try {
        const show2 = await model.editComment2(id, comment_text);
        res.status(200).send(`Comment has been edited.`);  
      } catch (error) {
        res.status(400).send("Something wrong while editing comment.");
      }
    } else {
      res.status(400).send(`Data id: ${id} not found.`);
    }
  } catch (error) {
    res.status(400).send("Something wrong in data input for editing comment.");
  }
}

// DELETE A COMMENT BY COMMENTS.ID
const deleteComment = async (req, res) => {
  const { id } = req.body;
  if (id) {
    let inpId = id;
    
    try {
      const show = await model.deleteComment(id);
      if (show.rowCount > 0) {
        try {
          const show2 = await model.deleteComment2(id);
          res.send(`Data id: ${inpId} succesfully to be deleted.`);
        } catch (error) { }
      } else {
        res.status(400).send(`Id data: ${id}, not found`);
      }
    } catch (error) {
      res.status(400).send("Something wrong while deleting data by id");
    }
  } 
}


module.exports = { showAll, showNew, newComment, editComment, deleteComment };