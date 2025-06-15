const { default: mongoose } = require("mongoose");

const homeSchema = new mongoose.Schema({
    houseName:{type: String, required: true},
    location:{type: String,required:true},
    pricePerNight:{type: Number,required:true},
    rating:{type:Number,required:true},
    photo:String,
    description:String,
});


//prehook hai jismai agar koi ghar delete karta hai toh favourite bhi delete ho jayega
//with the help of findOneAndDelete


// homeSchema.pre('findOneAndDelete',async function(next) {
//     const homeId=this.getQuery()["_id"];
//     await favourite.deleteMany({homeId:homeId});
//     next();
// })

module.exports=mongoose.model("Home",homeSchema); 

