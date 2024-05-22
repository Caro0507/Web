const jws = require('jws')
const CodeError = require("../util/CodeError");
const status = require("http-status");
const router = require('express').Router()

function verifieTokenPresent(req,res,next) {
    // Code vérifiant qu'il y a bien un token dans l'entête
    if (!req.headers || !req.headers.hasOwnProperty('x-access-token'))
        throw {code: 403, message: 'Token missing'}
    // Code vérifiant la validité du token
    if (!jws.verify(req.headers['x-access-token'],'HS256', 'bonjour'))
        throw {code: 403, message: 'Token invalid'}
    // Le payload du token contient le login de l'utilisateur
    // On modifie l'objet requête pour mettre le login à disposition pour les middleware suivants
    req.login=jws.decode(req.headers['x-access-token']).payload
    // On appelle la fonction middleware suivante :
    next()
}
function verifieUser(req, res, next){
    const { user } = req.params
    if(user != req.login)  throw new CodeError('Permmision denied', status.BAD_REQUEST)
    next()
}
//verifier les token , si besoin , on veirifer le login et user sont pariel.
//router.use('/api',verifieTokenPresent)
router.use('/bmt/:user',verifieTokenPresent,verifieUser)

router.use(require('./token'))
router.use(require('./user'))
router.use(require('./tag'))
router.use(require('./bookmark'))
module.exports = router
