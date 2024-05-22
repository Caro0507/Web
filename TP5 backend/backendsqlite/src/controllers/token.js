const status = require('http-status')
const CodeError = require('../util/CodeError.js')
const jws = require('jws')

module.exports = {

  async getToken(req, res) {
    // Get the value of the 'user' parameter from the URL and Set the token payload */
    const payload = req.params.user;
    // Generate a token with the defined payload and the secret key 'mysecret'*/
    const token = jws.sign({ payload, header: { alg: 'HS256' }, secret: 'mysecret' });
    // Return the generated token in the format { token: "TOK" } */
    res.status(200).json({ token });
  },
  
  async verifyTokenPresent(req, res, next) {
    // Code verifying that there is a token in the header */
    if (!req.headers || !req.headers.hasOwnProperty('x-access-token'))
      throw { code: 403, message: 'Token missing' }

    // Code verifying the validity of the token */
    if (!jws.verify(req.headers['x-access-token'], 'HS256', 'mysecret'))
      throw { code: 403, message: 'Token invalid' }

    // The token payload contains the user's login
    // We modify the request object to make the login available for the following middleware
    req.login = jws.decode(req.headers['x-access-token']).payload

    /*We call the following middleware function: */
    next()
  },

  async verifyLogin (req, res, next) {
    // check that the user present in the token corresponds to the one indicated in the URL (valid for requests for tags and bookmarks) 
    if (req.params.user !== req.login) throw new CodeError('The token does not match the user', status.BAD_REQUEST)
    next()
  }
}
