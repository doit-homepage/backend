var path = require('path')
var Sequelize = require('sequelize')

var env = process.env.NODE_ENV || 'development'
var config = require('../config/config.json')[env]
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config)
db.sequelize = sequelize;


db.User = require('./user.js')(sequelize, Sequelize)
db.Notice = require('./notice.js')(sequelize, Sequelize)
db.NoticeLike = require('./noticeLike.js')(sequelize, Sequelize)
db.Study = require('./study.js')(sequelize, Sequelize)
db.StudyGroup = require('./studyGroup.js')(sequelize, Sequelize)
db.teacherGroup = require('./teacherGroup.js')(sequelize, Sequelize)
db.StudyGroupCheck = require('./studyGroupCheck.js')(sequelize, Sequelize)

module.exports = db