'use strict'

const app = require("./app");
const port = process.env.port || 3001;

const { API_VERSION, IP_SERVER } = require("./config");

app.listen(port, "127.0.0.1", function() {
    console.log(`Server listening on http://${IP_SERVER}:${port}/api/${API_VERSION}`);
  });