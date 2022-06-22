const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: "postgres",
  host: "localhost",
  database: "bitriDB",
  password: "g4jahDuduk",
  port: 5432, // PORT POSTGRE
});

// connection.connect( (err) => { 
//   if (err) {
//     console.log("Something wrong on server Database!")
//     res.status(500).send("Something wrong on server Database!");
//   } else {
//     console.log("Database Connected!");
//   } ;
// });

module.exports = connection;