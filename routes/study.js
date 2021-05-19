var express = require('express');
var router = express.Router();
var db = require('../models/index')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var async = require('async')

var sequelize = require('sequelize');
const { decode } = require('punycode');

var Study = db.Study

/* GET home page. */
router.post('/', function (req, res, next) {
  var token = req.headers['x-access-token']
  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    console.log("post");
    Study.create({
      title: req.body.title,
      header: req.body.header,
      content: req.body.content,
      date: req.body.date,
      writer: decoded.id,
      student_num: req.body.student_num
    })
      .then((data) => { res.json({ success: true, data }) })
      .catch((err) => {
        if (err) return res.json({ success: false, err })
      })
  })
});

module.exports = router;
