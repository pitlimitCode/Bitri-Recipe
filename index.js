const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require('cors'); // cors

const userAllRoutes = require("./routes/usersRoutes")
const recipesRoutes = require("./routes/recipesRoutes")
const commentsRoutes = require("./routes/commentsRoutes")

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// FROM ROUTES
app.use("/", userAllRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// LISTEN END
app.listen(port, () => console.log(`Success nodemon from port: '${port}'`) );