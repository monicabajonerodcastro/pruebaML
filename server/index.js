'use strict'

const app = require("./app");
const port = process.env.port || 3977;

const { API_VERSION, IP_SERVER } = require("./config");

app.listen(port, function() {
    console.log(`Server listening on http://${IP_SERVER}:${port}/api/${API_VERSION}`);
  });