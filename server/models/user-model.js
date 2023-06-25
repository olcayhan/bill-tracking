const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlenght:15
    },

    surname:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlenght:15
    },

    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    }
},{collection:"users"});

const User = mongoose.model("User",userSchema);

module.exports = User;