const model = require("../../model/users/showBy");

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

module.exports = { showAll, showById, showByName };



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