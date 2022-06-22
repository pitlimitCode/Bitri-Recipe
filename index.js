const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");

const userAllRoutes = require("./routes/users/showBy")
const userFindByRoutes = require("./routes/users/cud")
const recipesRoutes = require("./routes/recipes/crud")
const commentsRoutes = require("./routes/comments/crud")

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
app.use("/", userAllRoutes);
app.use("/", userFindByRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// console of running port
app.listen(port, () => console.log(`Running program from port: '${port}'`) );