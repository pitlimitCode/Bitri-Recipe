const model = require("../model/usersModel"); 
const bcrypt = require('bcrypt');
const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// var token = jwt.sign({ foo: 'bar' }, process.env.JWK_KEY, { expiresIn: 60 * 60 }, { algorithm: process.env.JWK_ALG }, 
//   // function(err, token) {
//   //   console.log(token);
//   //   console.log(process.env.JWK_KEY); 
//   //   console.log(process.env.JWK_ALG);
//   // }
// );
// // console.log(token);

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
  } catch (err) {
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
      res.send(`No one User id: '${id}' on Database.`);
    }
  } catch (err) {
    res.status(400).send("Something wrong while finding user data by id.");
  }
};

// FIND USER BY NAME
const showByName = async (req, res) => {
  try {
    const { name } = req.body;
    const nameLower = name.toLowerCase();

    const show = await model.showByName(nameLower);
    if (show.rowCount > 0){
      res.status(200).send({ data: show.rows, count_of_data: show.rowCount });
    } 
    if (show.rowCount == 0 ){
      res.send(`No one User name: '${name}' on Database.`);
    }
  } catch (err) {
    res.status(400).send("Something wrong while finding user data by name.");
  }
};

// ADD NEW USER / REGISTER
const newUser = async (req, res, next) => {
  const { name, email, phone_number, password } = req.body;
  const hash = await bcrypt.hash(password, 5);
    try {
      const show = await model.newUser( name, email, phone_number, hash);
      try {
        const show2 = await model.userLogin(email);
        var token = jwt.sign(
          show2.rows[0],
          process.env.JWK_KEY,
          { expiresIn: 60 * 60 }, // EXPIRED TOKEN IN n SECOND
          { algorithm: process.env.JWK_ALG }
        );
        
        res.status(200).send(`Ok '${name}', your data succesfully to be added...
        Your id_user = ${show2.rows[0].id}
        Your Token is : 
        ${token}`);
      } catch (err) {
        res.status(400).send("Success register but failed to Log In." + err);
      }
    } catch (err) {
      res.status(400).send("Please try another 'name' and/or 'email'.");
    }
};

// USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const show = await model.userLogin(email);
    const compare = await bcrypt.compare(password, show.rows[0].password);
    if(compare == true) {

      var token = jwt.sign(
        show.rows[0],
        process.env.JWK_KEY,
        { expiresIn: 600 }, // EXPIRED TOKEN IN n SECOND
        { algorithm: process.env.JWK_ALG }
      );
      
      res.status(200).send(`Success to login...
      Hi ${show.rows[0].name}, [id: ${show.rows[0].id}], your Token is : 
      ${token}`);

    } else {
      res.send(`Wrong password !`);
    }
  } catch (err) {
    res.send("Please try another email to Log In.");
  }
};

// ADD USER AVATAR
const addAvatar = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      try {
        const avatar = req?.file?.path || 'images/defaultAvatar.jpeg';
        const show = await model.showById(decoded.id);
        if (show.rowCount > 0) {
          try {
            const show2 = await model.addAvatar( decoded.id, avatar);
            res.status(200).send(`Ok id: '${decoded.id}', your avatar succesfully to be added.`);
          } catch (err) {
            res.status(400).send("Something wrong while adding your avatar.");
          }
        } else { res.status(400).send(`Data id: '${decoded.id}' not found.`) }
      } catch {
        res.status(400).send(`Something wrong while getting data id: '${decoded.id}', for adding user avatar.`);
      }
    }
  })
}

// EDIT USER DATA BY ID
const editUserData = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      try {
        const { name, email, phone_number, password } = req.body;
        const show = await model.showById(decoded.id);
        if (show.rowCount > 0) {
          let inpName = name || show?.rows[0]?.name; // not null
          let inpEmail = email || show?.rows[0]?.email; // not null
          let inpPhone_number = phone_number || null;
          let inpPassword = password || show?.rows[0]?.password; // not null

          let message = "";
          if (inpName) message += "name, ";
          if (inpEmail) message += "email, ";
          if (inpPhone_number) message += "phone, ";
          if (inpPassword) message += "password, ";

          try {
            const show2 = await model.editUserData(inpName, inpEmail, inpPhone_number, inpPassword, decoded.id);
            res.status(200).send(`${message} from id: '${decoded.id}' successfully to be edited.`);
          } catch (err) { 
            console.log(err);
            res.status(400).send("Something wrong while editing data by id.") }
        } else { res.status(400).send(`Data id: '${decoded.id}' not found.`) }
      } catch (err) {
        res.status(400).send("Something wrong while editing user data.");
      }
    }
  })
}

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  jwt.verify(req.rawHeaders[1].split(' ')[1], process.env.JWK_KEY, async function(err, decoded) {
    if (err) {
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      let inpId = decoded.id;
      try {
        const show = await model.showById(decoded.id);
        if (show.rows[0].id !== decoded.id) {
          console.log(show);
          console.log(show.id);
          console.log(decoded.id);
          res.status(400).send("You cann't delete other user account.");
        } else if (show.rowCount > 0) {
          try{
            const show2 = await model.deleteUser(decoded.id);
            res.send(`Data id: '${inpId}' succesfully to be deleted.`);
          } catch (err) {
            res.status(400).send("Something wrong while deleting data.");
          }
        } else {
          res.status(400).send(`Id data: '${decoded.id}', not found.`);
        }
      } catch {
        res.status(400).send(`Something wrong while getting data: '${decoded.id}', id for deleting data.`);
      }
    }
  })
}

// DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
  // try {
  //   const show = await model.deleteAllUsers();
  //   res.status(200).send(`All data has been deleted.`);
  // } catch (err) {
  //   res.status(400).send(`Something wrong when deleting all data.`);
  // }
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
  deleteAllUsers,
};