const model = require("../model/recipeModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();


// SHOW ALL RECIPES
const showAll = async (req, res) => {
  try {
    const show = await model.showAll();
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send("No one recipe on Database.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// SHOW RECIPES IN PAGES
const showInPages = async (req, res) => {
  try {
    const { limit, pages } = req.body;
    const show = await model.showInPages(limit, pages);
    if (show.rowCount > 0){
      res.status(200).send({ limit_of_data: limit, data: show.rows, pages: pages });
    } 
    if (show.rowCount == 0 ){
      res.send("No one Recipe on Database.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// SHOW 5 NEW RECIPES
const showNew = async (req, res) => {
  try {
    const show = await model.showNew();
    if (show.rowCount > 0){
      res.status(200).send({ count_of_data: show.rowCount, data: show.rows });
    } 
    if (show.rowCount == 0 ){
      res.send("No one recipe on Database.");
    }
  } catch (err) {
    res.status(400).send("Something wrong while getting all recipes data.");
  }
};

// FIND RECIPE BY ID
const showById = async (req, res) => {
  try {
    const { id } = req.body;
    const show = await model.showById(id);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one Recipe id: '${id}' on Database.`);
    }
  } catch (err) {
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// FIND RECIPES BY NAME
const showByName = async (req, res) => {
  try {
    const { name } = req.body;
    const nameLower = name.toLowerCase();

    const show = await model.showByName(nameLower);
    if (show.rowCount > 0){
      res.send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one recipe name: '${name}' from recipes data.`);
    }
  } catch (err) {
    res.status(400).send("Something wrong while finding recipe data by name.");
  }
};

// ADD NEW RECIPE
const newRecipe = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      const id_user = decoded.id;
      try {
        const image = req?.file?.path || 'images/defaultAvatar.jpeg';
        const { name, ingredients, step } = req.body;
        // console.log(req);
        // console.log(name);
        // console.log(ingredients);
        // console.log(step);
        try {
          const show = await model.newRecipe(id_user, name, ingredients, step, image );
          res.status(200).send(`Your recipe: '${name}', succesfully to be added.`);
        } catch (err) {
          res.status(400).send("Something wrong while adding new recipe." + err.message);
        }
      } catch (err) {
        // console.log(err);
        res.status(400).send('Error in req.body data.');
      }
    }
  })
}

// ADD VIDEO TO RECIPE
const newVideo = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {


      const { id, id_user } = req.body;
      const video = req?.file?.path || '';
      try {
        const show = await model.showById(id);
          if (show.rowCount > 0) {
            let inpId = id;
            let inpId_user = id_user || show?.rows[0]?.id_user; // not null
            let inpVideo = video || null;

            let message = "";
            if (inpId_user) message += "id_user, ";
            if (inpVideo) message += "video, ";

            try {
              const show2 = await model.editRecipe(inpId_user, inpVideo, inpId);
              res.status(200).send(`Success to add video.`);
            } catch (err) {
              res.status(400).send("Something wrong while adding video recipe.");
            }
          } else {
            res.status(400).send(`Recipe data id: '${id}' not found.`);
          }
      } catch (err) {
        res.status(400).send("Something wrong while search id for adding video recipe.");
      }

    }
  })
}

// EDIT RECIPE DATA BY ID
const editRecipe = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      try {
        const { id, name, ingredients, step } = req.body;
        // console.log(req);
        // console.log(id);
        // console.log(name);
        // console.log(ingredients);
        // console.log(step);
        try {
          const show = await model.showById(id);
          // console.log(show);
          if (show.rowCount > 0) {
            let inpId = id;
            let inpId_user = decoded.id // not null
            let inpName = name || show?.rows[0]?.name // not null
            let inpIngredients = ingredients || show?.rows[0]?.ingredients; // not null
            let inpStep = step || null;

            let message = "";
            if (inpId_user) message += "id_user, ";
            if (inpName) message += "name, ";
            if (inpIngredients) message += "ingredients, ";
            if (inpStep) message += "step, ";

            try {
              const show = await model.editRecipe(inpId_user, inpName, inpIngredients, inpStep, inpId);
              res.status(200).send(`${message} recipe from id: '${inpId}' successfully to be edited.`);
            } catch (err) {
              res.status(400).send("Something wrong while edit recipe data by id.");
            }

          } else {
            res.status(400).send(`Recipe data id: '${id}' not found.`);
          }
        } catch (err) {
          res.status(400).send("Something wrong while editing recipe data.");
        }
      } catch (err) {
        res.status(400).send("Error in req.body data.");
      }
    }
  })
}

// EDIT IMAGE RECIPE BY ID
const editImage = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      try {
        const inpImage = req?.file?.path || 'images/defaultAvatar.jpeg';
        const { id } = req.body;
        // console.log(req);
        // console.log(id);
        try {
          const show = await model.showById(id);
          // console.log(show);
          if (show.rowCount > 0) {
            let inpId = id;
            let inpId_user = decoded.id // not null

            let message = "";
            if (inpId_user) message += "id_user, ";
            if (inpImage) message += "image, "

            try {
              const show = await model.editRecipe(inpImage, inpId);
              res.status(200).send(`${message} recipe from id: '${inpId}' successfully to be edited.`);
            } catch (err) {
              res.status(400).send("Something wrong while edit recipe data by id.");
            }

          } else {
            res.status(400).send(`Recipe data id: '${id}' not found.`);
          }
        } catch (err) {
          res.status(400).send("Something wrong while editing recipe data.");
        }
      } catch (err) {
        res.status(400).send("Error in req.body data.");
      }
    }
  })
}

// DELETE RECIPE BY ID
const deleteRecipe = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      const { id } = req.body;
      if (id) {
        let inpId = id;
        try {
          const show = await model.showById(id);
          console.log(show);
          console.log(decoded.id);
          if (show.rowCount > 0) {
            if (show.rows[0].id_user !== decoded.id) {
              res.status(400).send("You cann't delete other user recipe.");
            } else {
              try {
                const show2 = await model.deleteRecipe(id);
                res.status(200).send(`Recipe data id: '${inpId}' succesfully to be deleted.`);
              } catch (err) {
                res.status(400).send("Something wrong while deleting recipe data by id");
              }
            }
          } else {
            res.status(400).send(`No one Recipe id: '${id}' on Database.`);
          }
        } catch (err) {
          console.log(err);
          res.status(400).send(`Something wrong while searching id: '${id}' before delete it.`);
        }
      } else {
        'Please input id recipe.'
      }
    }
  })
}

module.exports = {
  showAll,
  showInPages,
  showNew,
  showById,
  showByName,
  newRecipe,
  newVideo,
  editRecipe,
  editImage,
  deleteRecipe,
};