const db = require("../db");

const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes ORDER BY recipes.id ASC`,
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

const showNew = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT recipes.id AS Id_recipe, users.name AS name, recipes.name AS name_recipe FROM recipes JOIN users ON recipes.id_user = users.id ORDER BY recipes.id DESC LIMIT 5`,
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

const showByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT users.name AS name, recipes.name AS name_recipe, recipes.ingredients, recipes.step FROM recipes JOIN users ON recipes.id_user = users.id WHERE recipes.name = $1", 
    [name],
    (error, result) => {
      if (error) {
        reject (error);
      } else {
        resolve (result);
      }
    });
  })
}


module.exports = { showAll, showNew, showByName  };