const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const comicsRouter = require("./Comics/comics.router")
const tvRouter = require("./tv/tv.router")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/comics", comicsRouter)
app.use("/tv", tvRouter)

app.use(notFound);
app.use(errorHandler);

module.exports = app;