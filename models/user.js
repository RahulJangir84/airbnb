const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
   firstname:{
    type:[String,'firstname is required'],
    required:true,
   },
   lastname:{
    type:String,
   },
   email:{
    type:String,
    required:[true,'Email is required'],
    unique:true,
   },
   password:{
    type:String,
    required:[true,'Password is required'],
   },
   usertype:{
    type:String,
    enum:['guest','host'],
    default:'guest', 
   },
   favourite:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
   }],

});


module.exports=mongoose.model("user",userSchema); 
