const express = require('express')
const router = express.Router()
const { updateSocials,
    getSocials,
    addSocials,
    deleteSocials } = require('../controllers/socialController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/update', onlyAdmin, updateSocials)
router.get('/', getSocials)
router.post('/add', onlyAdmin, addSocials)
router.delete('/delete', onlyAdmin, deleteSocials)





module.exports = router