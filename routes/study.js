var express = require('express');
const study = require('../models/study');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* /study/list/:page */ //스터디 목록 조회
router.get('list/:page', function(req, res, next) {
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