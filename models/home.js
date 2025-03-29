//core modules hai toh directly access kar skte hai 
const path= require('path');
const fs=require('fs');

const {getDb} = require('../utils/databaseUtil');
const {ObjectId}  =require('mongodb');

//
const rootDir = require('../utils/pathutil');

//fake database

class Home {
    constructor(houseName, location, pricePerNight, rating, photoUrl, description,_id){
        this.houseName = houseName;
        this.location = location;
        this.pricePerNight = pricePerNight;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
        if(_id){
        this._id = _id;
        } 
    }

    save(){
        const db = getDb();
        if(this.id){ //update
            return db.collection('homes')
            .updateOne(
                {_id:new ObjectId(String(this.id))},
                {$set:this}
            );
        }
        else{ //insert
            return db.collection('homes').insertOne(this);
        }
    }
    
    static fetchAll(){
      const db = getDb();
     return db.collection('homes').find().toArray(); 
    }
    static findById(homeId){
        // console.log("homeId",homeId);
        const db = getDb();
        return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next(); 
          }
    static deleteById(homeId){
        const db = getDb();
        return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
}
}

module.exports=Home;