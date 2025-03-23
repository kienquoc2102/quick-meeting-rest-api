const router = require('express').Router()
const middlewareController = require('../controllers/middlewareController')
const userController = require('../controllers/userController')

router.get('/friends', middlewareController.verifyToken, userController.getFriend)
router.post('/addFriend', middlewareController.verifyToken, userController.addFriend)
router.get('/search', middlewareController.verifyToken, userController.searchUser)

module.exports = router