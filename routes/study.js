var express = require("express");
const study = require("../models/study");
var router = express.Router();
var db = require('../models/index')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var async = require('async')

var sequelize = require('sequelize');
const { decode } = require('punycode');

var Study = db.Study

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/*스터디 상세조회 */
router.get("/study/:id", async function (req, res, next) {
  var values = {
    id: decoded.id,
  };

  var StudyDetailData = [];

  var query =
    "select study.title, study.header, study.content, study.start_date , study.end_date, study.student_num, study.teacher from doit.study where study.id = :id";
  const data = await db.sequelize.query(query, { replacements: values });

  for (var s of data) {
    StudyDetailData.push({
      title: s.title,
      header: s.header,
      content: s.content,
      start_date: s.start_date,
      end_date: s.end_date,
      student_num: s.student_num,
      teacher: s.teacher,
    });
  }
  res.json({ sucess: true, data: StudyDetailData });
})

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
