const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: "postgres",
  host: "localhost",
  database: "bitriDB",
  password: "g4jahDuduk",
  port: 5432, // PORT POSTGRE
}); 

module.exports = connection;



// const Postgre = require('pg').Pool;
// require('dotenv').config();

// const connection = new Postgre({
// 	user: process.env.DB_USER,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_NAME,
// 	password: process.env.DB_PASS,
// 	port: process.env.DB_PORT,
// });

// module.exports = connection;