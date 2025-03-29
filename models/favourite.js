
const mongodb = require('mongodb');
const {getDb} = require('../utils/databaseUtil');

class favourite{
    constructor(houseId){
        this.houseId = houseId;
    }


save(){
    const db=getDb();
    return db.collection('favourite')
    .insertOne(this);
}


  
 getFavourite(callback){
    const db=getDb();
    db.collection('favourite').find().toArray().then(favourite=>{
        callback(favourite);
    })
    };
    
    
 deleteHome(id,callback){
      const db=getDb();
      db.collection('favourite').deleteOne({id:id}).then(result=>{
        console.log(result);
        callback(result);
      })
    }

}

module.exports =favourite;
