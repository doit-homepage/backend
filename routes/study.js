var express = require('express');
const study = require('../models/study');
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
  console.log(token)
  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    console.log("post");
    var date = new Date();
    console.log(date)
    Study.create({
      title: req.body.title,
      header: req.body.header,
      content: req.body.content,
      start_date:req.body.start_date,
      end_date: req.body.end_date,
      date: date,
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

/* /study/list/:page */ //스터디 목록 조회
router.get('list/:page', async function(req, res, next) {
  var study_list = [];
    var query = 'select title, header, content, start_date, end_date, student_num, date from doit.study where study.id'
    var study_data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});

    var page = params.page
    var count = 0;

    for (var s of study_data) {
      if(count >= 10 * (page-1) + 1 && count <= page * 10) {
        study_list.push({
            title: s.title,
            header: s.header,
            content: s.content,
            start_date:s.date,
            end_date:s.date,
            student_num: s.num,
            date: s.date
        });
      }
    }res.json({ success: true, study_list: study_list })
});

module.exports = router;