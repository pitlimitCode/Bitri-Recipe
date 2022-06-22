const Router = require("express").Router();
const db = require("../../db");
const controller = require("../../controllers/comments/crud");

// SHOW NEWEST COMMENTS LIMIT 4
Router.get("/comments/new", controller.showNew);

// ADD NEW COMMENT
Router.post("/comments/add", (req, res) => {
  const { id_recipe, id_commenter, comment_text } = req.body;
  
  db.query(
    `INSERT INTO comments (id_recipe, id_commenter, comment_text) VALUES ($1, $2, $3)`,
    [id_recipe, id_commenter, comment_text],
    (error, result) => {
      if (error) {
        console.log("error", error);
        res.status(400).send("Something wrong while adding new comment.");
      } else {
        res.status(200).send(`Your comment succesfully to be added.`);
      }
      
    }
  );
});

// EDIT A COMMENT
Router.patch("/comments/edit", (req, res) => {
  const { id, id_recipe, id_commenter, comment_text } = req.body;
  
  db.query(`SELECT * FROM users WHERE id = $1, id_recipe = $2, id_commenter = $3`, [id_recipe, id_commenter, id], (error, result) => {
    if (error) {
      res.status(400).send("Something wrong while editing comment.");
    } else {
      if (result.rowCount > 0) {
        db.query(
          `UPDATE users SET inpComment_text = $1 WHERE id = $2`,
          [comment_text, id],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("Something wrong while editing comment.");
            } else {
              res.status(200).send(`Comment has been edited.`);
            }
          }
        );
      } else {
        res.status(400).send(`Data id: ${id} not found.`);
      }
    }
  });
});

// DELETE A COMMENT BY COMMENTS.ID
Router.delete("/comments/delete", (req, res) => {
  const { id, email } = req.body;

  if (id && email) {
    res.send(`Choose either 'id' or 'delete' as parameter to deleted data.`)
  } else if (id) {
    let inpId = id;
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        res.status(400).send("Something wrong while deleting data by id");
      } else {
        if (result.rowCount > 0) {
          db.query(`DELETE FROM users WHERE id = $1`, [id], () => {
            res.send(`Data id: ${inpId} succesfully to be deleted.`);
          });
        } else {
          res.status(400).send(`Id data: ${id}, not found`);
        }
      }
    });
  } else if (email) {
    let inpEmail = email;
    db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result) => {
      if (error) {
        res.status(400).send("Something wrong while deleting data by email");
      } else {
        if (result.rowCount > 0) {
          db.query(`DELETE FROM users WHERE email = $1`, [email], () => {
              res.send(`Data email: '${inpEmail}', succesfully to be deleted.`);
          });
        } else {
          res.status(400).send(`Email data: ${email}, not found`);
        }
      }
    });
  }

});

module.exports = Router;