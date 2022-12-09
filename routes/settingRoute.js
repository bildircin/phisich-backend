const express = require('express')
const router = express.Router()
const { updateSettings, getSettings } = require('../controllers/settingsController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/updatesettings', onlyAdmin, updateSettings)
router.get('/', getSettings)




module.exports = router