var express = require('express');
var router = express.Router();
var db = require('../models/index.js')
var async = require('async')


/* GET home page. */
router.get('/main', async function (req, res, next) {
    var info_list = [];
    var query = 'select title, header, writer, date, like from Notice LIMIT 2'
    const data = await db.sequelize.query(query, { replacements: values });
    for (var s of data) {
        info_list.push({
            header: s.header,
            title: s.title,
            writer: s.writer,
            date: s.date,
            like: s.like
        });
    }
    var study_list = [];
    var query = 'select title, header, teacher, date, student_num from Study LIMIT 2'
    data = await db.sequelize.query(query, { replacements: values })
    for (var s of data) {
        study_list.push({
            header: s.header,
            title: s.title,
            teacher: s.teacher,
            date: s.date,
            student_num: s.student_num,
        });
    }
    res.json({ success: true, info_list: info_list, study_list: study_list })
});

module.exports = router;
