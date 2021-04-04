var express = require('express');
var router = express.Router();
var db = require('../models/index.js')
var async = require('async')


/* GET home page. */
router.get('/', async function (req, res, next) {
    var info_list = [];
    var query = 'select title, header, writer, date from doit.notice order by date desc'
    var data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});
    var count=0;
    for (var s of data) {
        if(count===2){
            break;
        }
        info_list.push({
            header: s.header,
            title: s.title,
            writer: s.writer,
            date: s.date
        });
        count++;
    }
    var study_list = [];
    query = 'select title, header, date, student_num from doit.study order by date desc'
    data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});
    count=0;
    for (var s of data) {
        if(count===2){
            break;
        }
        study_list.push({
            header: s.header,
            title: s.title,
            date: s.date,
            student_num: s.student_num,
        });
        count++;
    }
    res.json({ success: true, info_list: info_list, study_list: study_list })
});

module.exports = router;
