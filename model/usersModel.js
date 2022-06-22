const db = require("../db");

// SHOW ALL USERS
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY users.id ASC`,
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  })
};

// FIND USER BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id],
    (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    });
  })
}

// FIND USER BY NAME
const showByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name = $1`, [name],
    (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    });
  })
}

// ADD NEW USER / REGISTER
const newUser = ( name, email, phone_number, password, avatar ) => { 
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (name, email, phone_number, password, avatar) VALUES ($1, $2, $3, $4, $5)`,
    [name, email, phone_number, password, avatar],
    (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    })
  })
}

module.exports = { showAll, showById, showByName, newUser };