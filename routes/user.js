var express = require('express');
var router = express.Router();
var db = require('../models/index')

var sequelize = require('sequelize')

var User = db.User

/* user 회원가입 */
router.post('/', function(req, res, next) {
  res.send('회원가입');
});

router.post('/login', function(req, res, next){
  res.send('로그인')
});

module.exports = router;
