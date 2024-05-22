const status = require('http-status')
const userModel = require('../models/users.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')
const bcrypt = require('bcrypt')
const jws = require('jws')
require('mandatoryenv').load(['TOKENSECRET'])
const { TOKENSECRET } = process.env

function validPassword(password) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
}

module.exports = {

  /*returns the list of users*/
  async getUsers(req, res) {
    const data = await userModel.findAll({ attributes: ['id', 'username'] })
    res.status(200).json({ message: 'Returning users', data })
  },

  /*creates a new user */
  async newUser(req, res) {
    const username = JSON.parse(req.body.data).username
    await userModel.create({ username })
    res.json({ status: true, message: 'User Added' })
  },

  /*deletes all users in the table*/
  async deleteAllUsers(req, res) {
    await userModel.destroy({ truncate: true })
    res.json({ status: true, message: 'All users deleted' })
  },

  /*prohibits user from making a specific request on that route */
  async denyRequest(req, res, next) {
    return res.status(405).json({ error: 'Method not allowed' });
  },

  async getLogin(req, res) {
    const token = req.headers['x-access-token'];
    const decoded = jws.decode(token).payload;
    /*Return the decoded login value in the data field of the response*/
    return res.status(200).json({ data: decoded });
  },

  /** MIDDLEWARE FUNCTIONS **/

  async verifyDataPresent(req, res, next) {
    /*code verifying that there is a data in body */
    if (!has(req.body, ['data'])) throw new CodeError('No data found', status.BAD_REQUEST)
    next()
  },

  async verifyUsernamePresent(req, res, next) {
    const username = req.params.user;
    /*check that the user present in the token exists in the database*/
    const existingUser = await userModel.findOne({ where: { username: username } })
    if (!existingUser) throw new CodeError('Username not found', status.BAD_REQUEST)
    req.user = existingUser
    next()
  },

  async verifyUsername(req, res, next) {
    /*code verifying that there is username in data*/
    const data = JSON.parse(req.body.data)
    if (!has(data, ['username'])) throw new CodeError('You must specify the username', status.BAD_REQUEST)

    /*code verifying the size of username*/
    const username = data.username
    if (username.length > 16 || username.length == 0)
      throw new CodeError('You must specify a username with a minimum length of 1 and a maximum length of 16 characters ', status.BAD_REQUEST)

    /*code verifying the content of username*/
    if (!/^[a-z\-'\s]{1,16}$/i.test(username))
      throw new CodeError('Username must only contain letters, spaces, hyphens, and apostrophes', status.BAD_REQUEST)

    /*code verifying the uniqueness of username*/
    const existingUser = await userModel.findOne({ where: { username: username } })
    if (existingUser) {
      throw new CodeError('Username already exists', status.BAD_REQUEST)
    }
    next()
  }
}
