const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    albumName:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    releaseYear:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
},{timestamps:true})

module.exports = mongoose.model("album",albumSchema)