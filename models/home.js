const { default: mongoose } = require("mongoose");

const homeSchema = new mongoose.Schema({
    houseName:{type: String, required: true},
    location:{type: String,required:true},
    pricePerNight:{type: Number,required:true},
    rating:{type:Number,required:true},
    photo:String,
    description:String,
    rulesFileName: String,
});



module.exports=mongoose.model("Home",homeSchema); 

