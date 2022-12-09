const express = require('express')
const router = express.Router()
const { updateAirdrops,
    addAirdrops,
    getAirdrops,
    deleteAirdrops } = require('../controllers/airdropController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/update', onlyAdmin, updateAirdrops)
router.get('/', getAirdrops)
router.post('/add', onlyAdmin, addAirdrops)
router.delete('/delete', onlyAdmin, deleteAirdrops)





module.exports = router