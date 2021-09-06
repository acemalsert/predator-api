const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports=mongoose.model('Forum',ForumSchema)