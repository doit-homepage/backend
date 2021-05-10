var express = require('express');
const { decode } = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* /info/list/:page */ //공지사항 목록 조회
router.get('/list/:page', function(req, res, next) { //🤔 sqld
    var info_list = [];
    var query = 'select notice.title, notice.header, notice.writer, notice.date from doit.notice order by notice.date desc'
    var data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT});

	var page = params.page
	var count = 0;
    for (var s of data) {
		if(count >= 10 * (page-1) + 1 && count <= page * 10) {
			info_list.push({
				title: s.title,
				header: s.header,
				writer: s.writer,
				date: s.date,
				like: s.like
			});
		} 
    }
	res.json({ success: true, info_list: info_list })
});

module.exports = router;