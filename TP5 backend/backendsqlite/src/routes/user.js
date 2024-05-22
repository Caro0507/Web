const express = require('express')
const router = express.Router()
const token = require('../controllers/token.js')
const user = require('../controllers/user.js')

/*USER DEFAULT FUNCTIONS*/
router.get('/users', user.getUsers)
router.post('/users', user.verifyDataPresent, user.verifyUsername, user.newUser)
router.put('/users', user.denyRequest)
router.delete('/users/', user.deleteAllUsers)

/*THE /whoami REQUEST */
router.get('/:user', token.verifyTokenPresent, user.verifyUsernamePresent, token.verifyLogin, user.getLogin)

module.exports = router
