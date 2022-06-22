const db = require("../../db");

const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY users.id ASC`,
      (error, result) => {
        if (error) {
          reject (error);
        } else {
          resolve (result);
        }
      }
    );
  })
};


const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject (error);
      } else {
        resolve (result);
      }
    });
  })
}

const showByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name = $1`, [name], (error, result) => {
      if (error) {
        reject (error);
      } else {
        resolve (result);
      }
    });
  })
}

module.exports = { showAll, showById, showByName };