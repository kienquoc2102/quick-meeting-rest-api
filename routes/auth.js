const router = require('express').Router()
const authController = require('../controllers/authController')
const middlewareController = require('../controllers/middlewareController')
const userController = require('../controllers/userController')

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router