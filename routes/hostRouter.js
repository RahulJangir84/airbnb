//coremodules
const path = require('path');

const express = require('express');
const hostRouter = express.Router();

//local modules
const rootDir = require('../utils/pathutil');
const {getaddHome} = require('../controllers/hostcontroller');
const {postaddHome} = require('../controllers/hostcontroller');
const {getHostHomes} = require('../controllers/hostcontroller');
const {getEditHome} = require('../controllers/hostcontroller');
const {postEditHome }= require('../controllers/hostcontroller');
const {deleteHome} = require('../controllers/hostcontroller');

hostRouter.get("/add-home", getaddHome); //getaddHome is a handler function which handles the get request for the add home page
hostRouter.post("/add-home", postaddHome);
hostRouter.get("/host-home-list", getHostHomes);
hostRouter.get("/edithome/:homeId",getEditHome); 
hostRouter.post("/edithome",postEditHome);
hostRouter.get("/deletehome/:homeId",deleteHome);

exports.hostRouter = hostRouter;
