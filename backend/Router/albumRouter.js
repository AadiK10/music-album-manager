const express = require('express');
const { addAlbum, showAlbums, showAlbumById, editAlbum, deleteAlbum } = require('../Controller/albumController');

const router = express.Router()

router.post("/",addAlbum)
router.get("/",showAlbums)
router.get("/:id",showAlbumById)
router.put("/:id",editAlbum)
router.delete("/:id",deleteAlbum)

module.exports = router