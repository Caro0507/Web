const status = require('http-status')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const userModel = require("../models/users.js")
const bookmarkModel = require("../models/bookmarks.js")
module.exports = {
    async getBookmarkById (req, res) {
        if (!has(req.params, ['user','id'])) throw new CodeError('You must specify the Tag id and User', status.BAD_REQUEST)
        const { user,id } = req.params
        const userCompte = await userModel.findOne({ where: {name : user} })
        const bookmark = await userCompte.getBookmarks({where: { id :  [id] }})
        if (!bookmark) throw new CodeError('bookmark not found', status.BAD_REQUEST)
        res.json({ status: true, message: 'Returning bookmark', bookmark })
    },
    async newBookmark (req, res) {
        if (!has(req.params,['user'])) throw new CodeError('You must specify the User', status.BAD_REQUEST)
        const data = JSON.parse(req.body.data)
        if (!has(data, ['title'])) throw new CodeError('You must specify the Bookmark title', status.BAD_REQUEST)
        const { user } = req.params
        const userCompte = await userModel.findOne({ where: { name : user} })
        await userCompte.createBookmark(data)
        console.log(data)
        res.json({status: true, message: 'Bookmark Added'})
    },
    async deleteBookmark (req, res) {
        if (!has(req.params, ['user','id'])) throw new CodeError('You must specify the id', status.BAD_REQUEST)
        const { user, id } = req.params
        const userCompte = await userModel.findOne({ where: {name : user} })
        const sup = bookmarkModel.destroy({where:  {id, userId:userCompte.id} }   )
        res.json({ status: true, message: 'Bookmark deleted' })
    },
    async updateBookmark (req, res) {
        if (!has(req.params,['user','id'])) throw new CodeError('You must specify the User', status.BAD_REQUEST)
        const { user,id } = req.params
        const data = JSON.parse(req.body.data)
        if (!has(data, ['title'])) throw new CodeError('You must specify the title,description or link', status.BAD_REQUEST)
        const userCompte = await userModel.findOne({ where: {"name" : user} })
        const bookmark = await userCompte.getBookmarks({where: { id : [id] }})
        if (bookmark==0) throw new CodeError('Bookmark not found', status.BAD_REQUEST)
        bookmark[0].update(data)
        res.json({ status: true, message: 'Bookmark updated',bookmark })
    },
    async getBookmarks (req, res) {
        if (!has(req.params,['user'])) throw new CodeError('You must specify the User', status.BAD_REQUEST)
        const { user } = req.params
        const userCompte = await userModel.findOne({ where: {name : user} })
        const data = await userCompte.getBookmarks()
        res.json({ status: true, message: 'Returning Bookmark', data })
    }
}
