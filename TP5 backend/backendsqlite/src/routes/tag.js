const express = require('express')
const router = express.Router()
const tag = require('../controllers/tag.js')
const user = require('../controllers/user.js')
const token = require('../controllers/token.js')


router.get('/bmt/:user/tags', tag.getTags)
router.post('/bmt/:user/tags', tag.newTag)
router.put('/bmt/:user/tags', user.denyRequest)
router.delete('/bmt/:user/tags', user.denyRequest)

router.get('/bmt/:user/tags/:tid', tag.verifyTag, tag.describeTag)
router.post('/bmt/:user/tags/:tid', user.denyRequest)
router.put('/bmt/:user/tags/:tid', tag.verifyTag, tag.updateTag)
router.delete('/bmt/:user/tags/:tid', tag.verifyTag, tag.deleteTag)


module.exports = router