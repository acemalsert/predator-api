const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true})
const UserSchema =  new mongoose.Schema({
    username:{
        type:String,
        max:25,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    comments:[CommentSchema]
},{timestamps:true})

module.exports=mongoose.model('User',UserSchema)