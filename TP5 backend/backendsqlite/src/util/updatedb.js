const userModel = require('../models/users.js')
const tagModel = require('../models/tags.js')
const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  await userModel.create({
    username: 'userA'
  })
  await userModel.create({
    username: 'userB'
  })
  await tagModel.create({
    name: 'tagA', user_id: 1
  })
  await tagModel.create({
    name: 'tagB', user_id: 2
  })
})()
