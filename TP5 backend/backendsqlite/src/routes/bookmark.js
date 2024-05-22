const express = require('express')
const router = express.Router()
const bookmark = require('../controllers/bookmark.js')

router.get('/bmt/:user/bookmarks/:id', bookmark.getBookmarkById)
router.delete('/bmt/:user/bookmarks/:id', bookmark.deleteBookmark)
router.put('/bmt/:user/bookmarks/:id', bookmark.updateBookmark)
router.get('/bmt/:user/bookmarks', bookmark.getBookmarks)
router.post('/bmt/:user/bookmarks', bookmark.newBookmark)



module.exports = router