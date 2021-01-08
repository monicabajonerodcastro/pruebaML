const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const { API_VERSION, IP_SERVER} = require("./config");

//Instatiate express
const app = express();

const port = process.env.port || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(`/api/${API_VERSION}/`, routes);

app.listen(port, "127.0.0.1", function() {
    console.log(`Server listening on http://${IP_SERVER}:${port}/api/${API_VERSION}`);
});

module.exports = app;