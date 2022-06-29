const db = require("./db");
const multer = require("multer");

// SHOW ALL USERS
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY id DESC`,
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    );
  })
};

// FIND USER BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    });
  })
}

// FIND USER BY NAME
const showByName = (nameLower) => {
  return new Promise((resolve, reject) => {
    const x = `SELECT * From users WHERE LOWER(name) LIKE '%${nameLower}%'`;
    db.query( x,
    // db.query(`SELECT * FROM users WHERE name = $1`, [name],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    });
  })
}

// ADD NEW USER / REGISTER
const newUser = ( name, email, phone_number, password ) => { 
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4)`,
    [name, email, phone_number, password],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// USER LOGIN
const userLogin = ( email ) => { 
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [email],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// ADD USER AVATAR
const addAvatar = ( id, avatar ) => { 
  return new Promise((resolve, reject) => {
    db.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, id],
    (err, result) => {
      if (err) { reject (err) } else { resolve (result); }
    })
  })
}

// EDIT USER DATA BY ID
const editUserData = (inpName, inpEmail, inpPhone_number, inpPassword, id) => {
  return new Promise((resolve, reject) => {  
    db.query(`UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4 WHERE id = $5`,
      [inpName, inpEmail, inpPhone_number, inpPassword, id],
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    )
  })
}

// DELETE USER BY ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id],
      (err, result) => {
        if (err) { reject (err) } else { resolve (result); }
      }
    )
  })
}

// DELETE ALL USERS
const deleteAllUsers = () => {
  db.query(`DELETE FROM users`), 
  (err, result) => {
    if (err) { reject (err) } else { resolve (result); }
  }
}

module.exports = {
  showAll,
  showById,
  showByName,
  newUser,
  userLogin,
  addAvatar,
  editUserData,
  deleteUser,
  deleteAllUsers
};