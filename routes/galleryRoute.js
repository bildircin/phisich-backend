const express = require('express')
const router = express.Router()
const { updateGallery,
    getGallery,
    addGallery,
    deleteGallery } = require('../controllers/galleryController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/update', onlyAdmin, updateGallery)
router.get('/', getGallery)
router.post('/add', onlyAdmin, addGallery)
router.delete('/delete', onlyAdmin, deleteGallery)





module.exports = router