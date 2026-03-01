const albumModel = require("../Model/albumModel")

const addAlbum = async(req,res)=>{
    try {
        const {albumName, artist, releaseYear, genre, coverImage} = req.body
        const data = await albumModel.create({albumName, artist, releaseYear, genre, coverImage})
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const showAlbums = async(req,res)=>{
    try {
        const data = await albumModel.find()
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const showAlbumById = async(req,res)=>{
    try {
        const data = await albumModel.findById(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

const editAlbum = async(req,res)=>{
    try {
        await albumModel.findByIdAndUpdate(req.params.id,req.body)
        res.json("album updated succcessfully...")
    } catch (error) {
        console.log(error);
    }
}

const deleteAlbum = async(req,res)=>{
    try {
        await albumModel.findByIdAndDelete(req.params.id)
        res.json("album deleted succcessfully...")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addAlbum,showAlbums,showAlbumById,editAlbum,deleteAlbum}