const express = require("express");
const ItemController = require("../controllers/ItemController");

const api = express.Router();

api.get("/items", ItemController.searchItems);
api.get("/items/:id", ItemController.getProductDetail);

module.exports = api;