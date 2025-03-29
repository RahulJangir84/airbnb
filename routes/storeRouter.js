// core modules
const path = require('path');

//external modules
const express = require('express');
const storeRouter = express.Router();

//local modules
const rootDir = require('../utils/pathutil');
const { getHomes,getBooking,getFavourite, getIndex,getHomeDetails,postAddToFavourite,deleteHome} = require('../controllers/homes');


storeRouter.get("/homes",getHomes);
storeRouter.get("/booking",getBooking);
storeRouter.get("/favourite-list",getFavourite);
storeRouter.get("/index",getIndex);
storeRouter.get("/homes/:id",getHomeDetails); 
storeRouter.post("/favourite-list",postAddToFavourite);
storeRouter.get("/deletehome/:id",deleteHome);
// : lagaya means id is a dynamic value baki without colon ka mtlb hai ki voh routes static hai

module.exports = storeRouter;