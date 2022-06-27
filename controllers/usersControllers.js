const model = require("../model/usersModel"); 
const bcrypt = require('bcrypt');
require('dotenv').config();

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'apaajaaaa', { algorithm: 'HS256' }, function(err, token) {
  // console.log(token);
});

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
      res.send(`No one User id: '${id}' on Database.`);
    }
  } catch (error) {
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
  } catch (error) {
    res.status(400).send("Something wrong while finding user data by name.");
  }
};

// ADD NEW USER / REGISTER
const newUser = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;
    const hash = await bcrypt.hash(password, 5);
      try {
        const show = await model.newUser( name, email, phone_number, hash);
        res.status(200).send(`Ok '${name}', your data succesfully to be added.`);
      } catch (error) {
        console.log(error.message);
        res.status(400).send("Please try another 'name' and/or 'email'.");
      }
  } catch {
    console.log(error.message);
    res.status(400).send("Something wrong registering data.");
  }
};

// userLogin
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const show = await model.userLogin(email);
    const compare = await bcrypt.compare(password, show.rows[0].password);
    if(compare == true) {
      res.status(200).send(`Success to login.`);
    } else {
      res(`Wrong password !`);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Please try another email to Log In.");
  }
};

// pindahkan multer ke controller && nambah multi - multipart 
//
const addAvatar = async (req, res) => {
  try {
    const { id } = req.body;
    const avatar = req?.file?.path || 'images/defaultAvatar.jpeg';
    const show = await model.showById(id);
    if (show.rowCount > 0) {
      try {
        const show2 = await model.addAvatar( id, avatar);
        res.status(200).send(`Ok id: '${id}', your avatar succesfully to be added.`);
      } catch (error) {
        console.log(error);
        res.status(400).send("Something wrong while adding your avatar.");
      }
    } else { res.status(400).send(`Data id: '${id}' not found.`) }

  } catch {
    res.status(400).send(`Something wrong while getting data: '${id}', id for adding user avatar.`);
  }
}

// EDIT USER DATA BY ID
const editUserData = async (req, res) => {
  try {
    const { id, name, email, phone_number, password, avatar } = req.body;

    const show = await model.showById(id);

    if (show.rowCount > 0) {
      let inpName = name || show?.rows[0]?.name; // not null
      let inpEmail = email || show?.rows[0]?.email; // not null
      let inpPhone_number = phone_number || null;
      let inpPassword = password || show?.rows[0]?.password; // not null
      let inpAvatar = avatar || null;

      let message = "";
      if (inpName) message += "name, ";
      if (inpEmail) message += "email, ";
      if (inpPhone_number) message += "phone, ";
      if (inpPassword) message += "password, ";
      if (inpAvatar) message += "avatar pic, ";

      try {
        const show2 = await model.editUserData(inpName, inpEmail, inpPhone_number, inpPassword, inpAvatar, id);
        res.status(200).send(`${message} from id: '${id}' successfully to be edited.`);
      } catch { res.status(400).send("Something wrong while editing data by id.") }
    } else { res.status(400).send(`Data id: '${id}' not found.`) }
  } catch (error) {
    res.status(400).send("Something wrong while editing user data.");
  }
}

// DELETE USER BY ID
const deleteUser = async (req, res) => {
  const {id} = req.body;
  let inpId = id;
  try {
    const show = await model.showById(id);
    if (show.rowCount > 0) {
      try{
        const show2 = await model.deleteUser(id);
        res.send(`Data id: '${inpId}' succesfully to be deleted.`);
      } catch {
        res.status(400).send("Something wrong while deleting data.");
      }
    } else {
      res.status(400).send(`Id data: '${id}', not found.`);
    }
  } catch {
    res.status(400).send(`Something wrong while getting data: '${id}', id for deleting data.`);
  }
}

// DELETE ALL USERS
const deleteAllUsers = async (req, res) => {
  try {
    const show = await model.deleteAllUsers();
    res.status(200).send(`All data has been deleted.`);
  } catch (error) {
    res.status(400).send(`Something wrong when deleting all data.`);
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
  deleteAllUsers,
};