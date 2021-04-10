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

router.post('/like', function(req, res, next) {
	var _id = req.body._id;
	var contents = req.body.contents;

	postModel.findOne({_id: _id}, function(err,post) {
		if(err){ //에러
			throw err;
		}
		else{    //에러아닐 경우
			post.like++;
			
			post.save(function(err) {
				if(err){
					throw err;
				}
				else{
					res.json({status: "SUCCESS"});
				}
			});
		}
	});
    
});

router.post('/unlike', function(req, res, next) {
	var _id = req.body._id;
	var contents = req.body.contents;
	postModel.findOne({_id: _id}, function(err, post) {
		if(err){
			throw err;
		}
		else{
			if(post.like > 0){
				post.like--;
				
				post.save(function(err) {
					if(err){
						throw err;
					}
					else{
						res.json({status: "SUCCESS"});
					}
				});
			}
		}
	});
});

module.exports = router;