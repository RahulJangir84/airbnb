const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

const url = process.env.MONGODB_URI;

let _db;

function mongoconnect(callback) {
    MongoClient.connect(url).then(client => {
        callback(client);
        _db = client.db('airbnb');
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log("Error in connection", err);
    });
}

const getDb = () => {
    if (!_db) {
        throw new Error("No database found");
    }
    return _db;
}

module.exports = {mongoconnect,getDb};
