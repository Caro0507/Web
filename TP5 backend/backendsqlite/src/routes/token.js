const express = require('express')
const router = express.Router()
const user = require('../controllers/user.js')
const token = require('../controllers/token.js')

/*TOKEN PART */
router.get('/getjwtDeleg/:user', user.verifyUsernamePresent, token.getToken)
router.post('/getjwtDeleg/:user', user.denyRequest)
router.put('/getjwtDeleg/:user', user.denyRequest)
router.delete('/getjwtDeleg/:user', user.denyRequest)