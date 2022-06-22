// cud = create(add), update(edit), and delete of users table data
const Router = require("express").Router();
const db = require("../../db");

// ADD NEW USER / REGISTER
Router.post("/users/add", (req, res) => {
  const { name, email, phone_number, password, avatar } = req.body;
  
  db.query(
    `INSERT INTO users (name, email, phone_number, password, avatar) VALUES ($1, $2, $3, $4, $5)`,
    [name, email, phone_number, password, avatar],
    (error, result) => {
      if (error) {
        console.log("error", error);
        res.status(400).send("Something wrong while registering data, OR name or email has already on user data.");
      } else {
        res.status(200).send(`${name}, your data succesfully to be added.`);
      }
      
    }
  );
});

// EDIT USER DATA BY ID
Router.patch("/users/edit", (req, res) => {
  const { id, name, email, phone_number, password, avatar } = req.body;
  
  db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("Something wrong while finding id data.");
    } else {
      if (result.rowCount > 0) {
        // name, email, and phone value can't be NULL
        let inpName = name || result?.rows[1]?.name; // not null
        let inpEmail = email || result?.rows[2]?.email; // not null
        let inpPhone_number = phone_number || null;
        let inpPassword = password || result?.rows[4]?.password; // not null
        let inpAvatar = avatar || null;

        let message = "";
        if (inpName) message += "name, ";
        if (inpEmail) message += "email, ";
        if (inpPhone_number) message += "phone, ";
        if (inpPassword) message += "password, ";
        if (inpAvatar) message += "avatar pic, ";

        db.query(
          `UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4, avatar = $5 WHERE id = $6`,
          [inpName, inpEmail, inpPhone_number, inpPassword, inpAvatar, id],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("Something wrong while editing data by id.");
            } else {
              res.status(200).send(`${message} from id: '${id}' successfully to be edited.`);
            }
          }
        );
      } else {
        res.status(400).send(`Data id: ${id} not found.`);
      }
    }
  });
});

// DELETE USER BY ID OR EMAIL
Router.delete("/users/delete", (req, res) => {
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

// DELETE ALL USERS
Router.delete("/users/deleteall", (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      res.status(400).send("Something wrong while deleting all data by Query code");
    } else {
      if (result.rowCount > 0) {
        db.query(`DELETE FROM users`, (error, result) => {
          if (error) {
            res.status(400).send("Something wrong while deleting all data after Query code");
          } else {
            res.status(200).send("All users data has been deleted.");
          }
        });
      } else {
        res.status(400).send("Query code to delete all data didn't work, because all user data not has a data.");
      }
    }
  });
});

module.exports = Router;