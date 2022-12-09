const express = require('express')
const router = express.Router()
const { updateMenus,
    addMenus,
    getMenus,
    deleteMenus } = require('../controllers/menuController')
const { protect, onlyAdmin } = require('../helpers/checkToken')

router.put('/update', onlyAdmin, updateMenus)
router.get('/', getMenus)
router.post('/add', onlyAdmin, addMenus)
router.delete('/delete', onlyAdmin, deleteMenus)





module.exports = router