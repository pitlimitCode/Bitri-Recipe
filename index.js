const express = require("express");
const app = express(); 
const port = 8000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const helmet = require("helmet");
app.use(helmet());

const cors = require("cors");
app.use(cors());

// Routes
const userAllRoutes = require("./routes/usersRoutes");
const recipesRoutes = require("./routes/recipesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
app.use("/", userAllRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// LAST LISTEN
app.listen(port, () => console.log(`[nodemen] success running from port: '${port}'.`));