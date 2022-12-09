const express = require('express')
const router = express.Router()
const { getUser, addUser, loginUser, updateUsers, deleteUser, registerUser, verifyUser, resendActivation, resetPassword, resetLast } = require('../controllers/userController')
const { protect, onlyAdmin, registerOpen } = require('../helpers/checkToken')


router.get('/', onlyAdmin, getUser)
router.post('/add', onlyAdmin, addUser)
router.post('/login', loginUser)
router.put('/update', onlyAdmin, updateUsers)
router.delete('/delete', onlyAdmin, deleteUser)
router.post('/register', registerOpen, registerUser)
router.post('/verify', verifyUser)
router.post('/resendverification', resendActivation)
router.post('/resetpassword', resetPassword)
router.post('/preset', resetLast)

module.exports = router