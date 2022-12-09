const express = require('express')
const router = express.Router()
const { updateMail,
    getMail,
    checkMail } = require('../controllers/emailController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/update', onlyAdmin, updateMail)
router.get('/', onlyAdmin, getMail)
router.get('/test', onlyAdmin, checkMail)





module.exports = router