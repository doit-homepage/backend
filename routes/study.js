var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*스터디 목록 조회 */
router.get('/read/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, title, header, content, start_date, end_date, student_num, date, teacher , student_number , name , writer" +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') content ,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('read', {title:"글 상세", row:row[0]});
    });
});

module.exports = router;
