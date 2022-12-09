const express = require('express')
const router = express.Router()
const { getContent } = require('../controllers/contentController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.get('/', onlyAdmin, getContent)



module.exports = router