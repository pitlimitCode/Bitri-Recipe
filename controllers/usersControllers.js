const model = require("../model/usersModel");

// SHOW ALL USERS
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one User on Database.");
    }
  } catch (error) {
    res.status(400).send("Something wrong while getting all users data.");
  }
};

// FIND USER BY ID
const showById = async (req, res) => {
  try {
    const { id } = req.body;
    const show = await model.showById(id);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one User id: ${id} on Database.`);
    }
  } catch (error) {
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// FIND USER BY NAME
const showByName = async (req, res) => {
  try {
    const { name } = req.body;
    const show = await model.showByName(name);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one User name: ${name} on Database.`);
    }
  } catch (error) {
    res.status(400).send("Something wrong while finding user data by name.");
  }
};

// ADD NEW USER / REGISTER
const newUser = async (req, res) => {
  
  try {
    const { name, email, phone_number, password, avatar } = req.body;
    const show = await model.newUser( name, email, phone_number, password, avatar);
    
      res.status(200).send(`Ok ${name}, your data succesfully to be added.`);
  } catch (error) {
    res.status(400).send("Something wrong while registering data, OR name or email has already on user data.");
      
  }

}

// EDIT USER DATA BY ID
const editUserData = (req, res) => {
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
}

// DELETE USER BY ID
const deleteUser = (req, res) => {
  const { id } = req.body;
  if (id) {
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
    res.status(400).send(`Email data: ${email}, not found`);
  }
}

// DELETE ALL USERS
const deleteAllUsers = (req, res) => {
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
}


module.exports = { showAll, showById, showByName, newUser, editUserData, deleteUser, deleteAllUsers };



// jika tanpa folder model :

// SHOW ALL USERS
// const showAll = async (req, res) => {
//   db.query(`SELECT * FROM users ORDER BY users.id ASC`,
//     (error, result) => {
//       if (result.rowCount > 1){
//         if (error) {
//           res.status(400).send("Something wrong while getting all users data.");
//         } else {
//           res.send({ data: result.rows, count_of_data: result.rowCount });
//         } 
//       } else {
//         res.status(200).send("No one User on Database.");
//       }
//     }
//   );
// };

// FIND USER BY ID
// const showById = async (req, res) => {
//   const { id } = req.body;
//   db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
//     if (error) {
//       res.status(400).send("Something wrong while finding user data by id.");
//     } else {
//       res.status(200).send({ data: result.rows, count_of_data: result.rowCount });
//     }
//   });
// };