/**
 * routes 
 * 
 * This file will contain the paths or routes that will expose to be used by the front-end.
 * "/"          =>  The 'health check' to verify the status of the app
 * "/items"     =>  The endpoint to get the list of items depending on the search criteria. 
 *                  That one must be the query string "search"
 * "/items/:id" =>  The endpoint to get the detail and description of the selected item
 */

const express = require("express");
const ItemController = require("../controllers/ItemController");

const api = express.Router();

api.get("/", (request, response) => response.json({message: "UP!"}));
api.get("/items", ItemController.searchItems);
api.get("/items/:id", ItemController.getProductDetail);

module.exports = api;