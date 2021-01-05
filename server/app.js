const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const {API_VERSION, IP_SERVER, PORT} = require("./config");

//Load routings
const routes = require("./routes/routes.js");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(`/api/${API_VERSION}`, routes);


module.exports = app;