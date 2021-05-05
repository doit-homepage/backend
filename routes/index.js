var express = require('express');
const { decode } = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* /info/list/:page */ //공지사항 목록 조회
router.get('list/:page', function(req, res, next) { //🤔
    var info_list = [];
    var query = 'select title, header, writer, date from doit.notice where notice.id'
    var data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});

    for (var s of data) {
        info_list.push({
            title: s.title,
            header: s.header,
            writer: s.writer,
            date: s.date,
            like: s.like
        });
    }res.json({ success: true, info_list: info_list })
});

module.exports = router;