const db = require("../../db");

const showNew = (id_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(
    `SELECT users.name, comments.comment_text FROM comments JOIN users ON comments.id_commenter = users.id WHERE id_recipe = ${id_recipe} ORDER BY comments.id DESC LIMIT 4`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  })
};



module.exports = { showNew };