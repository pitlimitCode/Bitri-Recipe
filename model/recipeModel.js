const db = require("./db");

// SHOW ALL RECIPES
const showAll = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes ORDER BY id ASC`,
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  })
};

// SHOW RECIPES IN PAGES
const showInPages = (limit, pages) => {
  return new Promise((resolve, reject) => {
    offset = (pages - 1)*limit;
    const x = `SELECT * FROM recipes ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
    db.query( x ,
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  })
};

// SHOW 5 NEW RECIPES
const showNew = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT recipes.id AS Id_recipe, users.name AS name, recipes.name AS name_recipe FROM recipes JOIN users ON recipes.id_user = users.id ORDER BY recipes.id DESC LIMIT 5`,
      (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    );
  })
};

//FIND RECIPE BY ID
const showById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    })
  })
}

// FIND RECIPES BY NAME
const showByName = (nameLower) => {
  return new Promise((resolve, reject) => {
    const x = `SELECT users.name AS name, recipes.name AS name_recipe, recipes.ingredients, recipes.step FROM recipes JOIN users ON recipes.id_user = users.id WHERE LOWER(recipes.name) LIKE '%${nameLower}%'`;
    db.query( x,
    (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    });
  })
}

// ADD NEW RECIPE
const newRecipe = (id_user, name, ingredients, step, image, video) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (id_user, name, ingredients, step, image, video) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_user, name, ingredients, step, image, video], (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    )
  })
}

// EDIT RECIPE DATA BY ID
const editRecipe = (inpId_user, inpName, inpIngredients, inpStep, inpImage, inpVideo, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET id_user = $1, name = $2, ingredients = $3, step = $4, image = $5, video = $6 WHERE id = $7`,
      [inpId_user, inpName, inpIngredients, inpStep, inpImage, inpVideo, id], (error, result) => {
        if (error) { reject (error) } else { resolve (result); }
      }
    )
  })
};

// DELETE RECIPE BY ID
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) { reject (error) } else { resolve (result); }
    })
  })
}

module.exports = {
  showAll,
  showInPages,
  showNew,
  showById,
  showByName,
  newRecipe,
  editRecipe,
  deleteRecipe,
};