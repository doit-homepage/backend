var express = require('express');
var router = express.Router();
var db = require('../models/index')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var async = require('async')

var sequelize = require('sequelize')

var User = db.User

/* user 회원가입 */
router.post('/', function (req, res, next) {
  var salt = Math.round((new Date().valueOf() * Math.random()))
  req.body.pw = crypto.createHash('sha512').update(req.body.pw + salt).digest('hex')
  User.create({ id: req.body.id, 
    pw: req.body.pw, 
    name: req.body.name, 
    gender: req.body.gender, 
    major: req.body.major,
    student_number: req.body.student_num,
    birth: req.body.birth,
    phone_num: req.body.phone_num,
    email: req.body.email,
    isAdmin: false,
    salt: salt })
    .then((data) => { res.json({ success: true, data }) })
    .catch((err) => {
      if (err) return res.json({ success: false, err })
    })
});

/*  /user/login post */
router.post('/login', function (req, res, next) {
  try {
    User.findByPk(req.body.id)
      .then((data) => {
        if (data && data.pw === crypto.createHash('sha512').update(req.body.pw + data.salt).digest('hex')) {
          var payload = {
            id: data.id
          }
          var options = { expiresIn: 60 * 60 * 24 }
          jwt.sign(payload, process.env.JWT_KEY, options, function (err, token) {
            console.log(err)
            if (err) return res.json({ success: false, err: err })
            return res.send({ success: true, data: token, name: data.name })
          })
        } else {
          res.json({ succes: false, err: '아이디와 패스워드를 확인해주세요' })
        }
      })
  } catch (err) {
    console.log(err)
    res.json({ succes: false, err })
  }
});
router.post('/checkId', function (req, res, next) {
  console.log(req.body)
  checkUserRegValidation(req, res, next)
})
router.post('/checkNumber', function (req, res, next) {
  checkStudentNumber(req, res, next)
})

function checkUserRegValidation(req, res, next) { // 중복 확인
  var isValid = true
  async.waterfall(
    [function (callback) {
      User.findOne({
        where: { id: req.body.id }
      }).then((data) => {
        if (data) {
          isValid = false
          console.log('중복')
        }
        callback(null, isValid)
      })
    }], function (err, isValid) {
      if (err) return res.json({ success: false, message: err })
      if (isValid) {
        res.json({ success: true })
      } else {
        res.json({ success: false, err: 'already ID' })
      }
    }
  )
}

function checkStudentNumber(req, res, next) { // 중복 확인
  var isValid = true
  async.waterfall(
    [function (callback) {
      User.findOne({
        where: { student_number: req.body.student_num }
      }).then((data) => {
        if (data) {
          isValid = false
          console.log('중복')
        }
        callback(null, isValid)
      })
    }], function (err, isValid) {
      if (err) return res.json({ success: false, message: err })
      if (isValid) {
        res.json({ success: true })
      } else {
        res.json({ success: false, err: 'already ID' })
      }
    }
  )
}

module.exports = router;
