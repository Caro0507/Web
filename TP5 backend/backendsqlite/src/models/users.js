const Sequelize = require('sequelize')
const db = require('./database.js')

const users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(16),
    validate: {
      is: /^[a-z\-'\s]{1,16}$/i
    },
    allowNull: false,
    unique: true
  },
}, { timestamps: false })

module.exports = users

users.hasMany(tags);
users.hasMany(bookmarks);
tags.belongsTo(users);
bookmarks.belongsTo(users);
bookmarks.belongsToMany(tags, {through: 'bookmark_tags'});
tags.belongsToMany(bookmarks, {through: 'bookmark_tags'});
module.exports = users

/*
const bookmarks = db.define('bookmarks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    },
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    },
    allowNull: false
  },
  link: {
    type: Sequelize.STRING(128),
    validate: {
      is: /^[a-z\-'\s]{1,128}$/i
    },
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: users,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
}, {
  timestamps: false,
  uniqueKeys: {
    bookmarks_unique: {
      fields: ['link', 'user_id']
    }
  }
})
module.exports = bookmarks

const bookmark_tags = db.define('bookmark_tags', {
  bookmark_id: {
    type: Sequelize.INTEGER,
    references: {
      model: bookmarks,
      key: 'id'
    },
  },
  tag_id: {
    type: Sequelize.INTEGER,
    references: {
      model: tags,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  timestamps: false,
  uniqueKeys: {
    bookmark_tags_unique: {
      fields: ['bookmark_id', 'tag_id']
    }
  }
})
module.exports = bookmark_tags


*/