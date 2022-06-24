const db = require("./db");

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


// EDIT USER DATA BY ID
const editUserData = ( id ) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    })
  })
}
const editUserData2 = (inpName, inpEmail, inpPhone_number, inpPassword, inpAvatar, id) => {
  return new Promise((resolve, reject) => {  
    db.query(`UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4, avatar = $5 WHERE id = $6`,
      [inpName, inpEmail, inpPhone_number, inpPassword, inpAvatar, id],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    )
  })
}

// DELETE USER BY ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id],
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    )
  })
}

// DELETE ALL USERS
const deleteAllUsers = () => {
  db.query(`DELETE FROM users`), 
  (error, result) => {
    if (error) { reject (error) } else { resolve (result); }
  }
}

module.exports = {
  showAll,
  showById,
  showByName,
  newUser,
  editUserData,
  editUserData2,
  deleteUser,
  deleteAllUsers
};