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
    NewsImg:{
        type:Image,
    },
},
{
    timestamps:true
})

module.exports = mongoose.model('News',NewsSchema)