const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");

const userAllRoutes = require("./routes/usersRoutes")
const recipesRoutes = require("./routes/recipesRoutes")
const commentsRoutes = require("./routes/commentsRoutes")

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// from router
app.use("/", userAllRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// console of running port
app.listen(port, () => console.log(`Success nodemon from port: '${port}'`) );