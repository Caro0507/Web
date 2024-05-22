const Sequelize = require('sequelize')
const db = require('./database.js')
const bookmarks = db.define('bookmarks', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull:false,
        unique: true
    },
    description:{
        type: Sequelize.STRING(255),
        allowNull:false
    },
    link:{
        type: Sequelize.STRING(255),
        allowNull:false
    }
});




module.exports = bookmarks