const Sequelize = require('sequelize')
const db = require('./database.js')
const users = require('./users.js')

const tags = db.define('tags', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(128),
        validate: {
            is: /^[a-z\-'\s]{1,128}$/i
        },
        allowNull: false,
        unique: 'actions_unique'
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: users,
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        unique: 'actions_unique'
    }
}, {
    timestamps: false,
    uniqueKey: {
        actions_unique: {
            fields: ['name', 'user_id']
        }
    }
})

module.exports = tags