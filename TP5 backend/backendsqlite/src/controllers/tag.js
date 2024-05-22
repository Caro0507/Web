const status = require('http-status')
const tagModel = require('../models/tags.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
require('mandatoryenv').load(['TOKENSECRET'])


module.exports = {

  async getTags (req, res) {

    if (!has(req.params, 'user')) throw new CodeError('You must specify the user', status.BAD_REQUEST)
    const { user } = req.params

    // find tags of username 
    const tags = await tagModel.findAll({ where: { user_id: req.user.id }, attributes: ['id', 'name', 'user_id'] })

    res.json({ status: true, message: user + '\'s tags', data: tags })
  },

  async newTag (req, res) {
    // new tag name 
    const data = JSON.parse(req.body.data)
    const name = data.name

    // user id to add tag 
    const user = req.user.id

    await tagModel.create({ name: name, user_id: user })
    res.json({ status: true, message: 'Tag ' + name + ' added (user: ' + user + ')' })
  },

  async describeTag (req, res) {

    const data = req.data

    res.json({ status: true, message: 'Tag description', data })
  },

  async updateTag(req, res) {
    // get information to update 
    const data = JSON.parse(req.body.data)
    const name = data.name

    // recover user_id and tag_id 
    const login = req.user.id
    const tid = req.tid

    // update 
    await tagModel.update({ name }, { where: { id: tid, user_id: login } })
    res.json({ status: true, message: 'Tag updated' })
  },

  async deleteTag (req, res) {
    const tid = req.tid
    await tagModel.destroy({ where: { id: tid } })
    res.json({ status: true, message: 'Tag deleted' })
  },

  async verifyTag(req, res, next) {

    if (!has(req.params, 'tid')) throw new CodeError('You must specify the tag id', status.BAD_REQUEST)

    // define req.tid for other functions 
    const { tid } = req.params
    req.tid = tid

    const data = await tagModel.findOne({ where: { id: tid }, attributes: ['id', 'name', 'user_id'] })
    if (!data) throw new CodeError('Tag not found', status.NOT_FOUND)

    // define req.data for other functions 
    req.data = data

    next()
  }
}
