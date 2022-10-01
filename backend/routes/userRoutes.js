const expres = require('express')
const { registerUser, loginUser } = require("../controllers/userController.js")
const { createChat, getChat } = require('../controllers/conversationController')


const router = expres.Router()


//protect middleware

const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.get('/login', loginUser)
router.post('/chat', protect, createChat)
router.get('/chat', protect, getChat)

module.exports = router