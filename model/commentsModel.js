const db = require("./db");

// SHOW ALL COMMENTS PUBLIC
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM comments ORDER BY id DESC`,
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  })
}; 

// SHOW NEWEST COMMENTS AND LIMIT IT
const showNew = (id_recipe, limit) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT users.name, comments.comment_text FROM comments JOIN users ON comments.id_commenter = users.id WHERE id_recipe = $1 ORDER BY comments.id DESC LIMIT $2`,
      [id_recipe, limit],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  });
};

// ADD NEW COMMENT
const newComment = (id_recipe, id_commenter, comment_text) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO comments (id_recipe, id_commenter, comment_text) VALUES ($1, $2, $3)`,
      [id_recipe, id_commenter, comment_text],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  });
};

// EDIT A COMMENT BY ID
const editComment = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM comments WHERE id = $1`, [id],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  });
};
const editComment2 = (id, id_commenter, comment_text) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    console.log(id_commenter);
    console.log(comment_text);
    db.query(
      `UPDATE comments SET comment_text = $1 WHERE id_commenter = $2 AND id = $3`,
      [comment_text, id_commenter, id],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  });
};

// DELETE A COMMENT BY ID
const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM comments WHERE id = $1`, [id], (error, result) => {
      if (error) {
        if (error) { reject (error) } else { resolve (result); }
      }
    });
  });
};
const deleteComment2 = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM comments WHERE id = $1`, [id], (error, result) => {
      if (error) {
        if (error) { reject (error) } else { resolve (result); }
      }
    });
  });
};

module.exports = {
  showAll,
  showNew,
  newComment,
  editComment,
  editComment2,
  deleteComment,
  deleteComment2,
};