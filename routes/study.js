var express = require('express');
var router = express.Router();
var db = require('../models/index')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var async = require('async')

var sequelize = require('sequelize')

var Study = db.Study

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log("post");
  Study.create({ 
    title: req.body.title, 
    header: req.body.header, 
    content: req.body.content, 
    date: req.body.date,
    writer: req.body.writer,
  })
    .then((data) => { res.json({ success: true, data }) })
    .catch((err) => {
      if (err) return res.json({ success: false, err })
    })
});

module.exports = router;
