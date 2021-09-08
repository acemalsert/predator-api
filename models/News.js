const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
    },
    category:{
        type:Number,
        min:1,
        max:4,
        required:true,
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('News',NewsSchema)