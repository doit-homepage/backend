var express = require('express');
const { decode } = require('jsonwebtoken');
const { token } = require('morgan');
const db = require('../models');
const notice = require('../models/notice');
var router = express.Router();

var Notice = db.Notice('../modesl/notice');
var NoticeLike = db.NoticeLike('../models/noticeLike');

/* GET home page. */

/* 공지사항 상세조회*/
router.get('/info/:id',function(req,res,next)
{
  var values ={
    id: decoded.id
  }

  var NoticeDetailData = []
  var query = "select notice.title, notice.header, notice.writer, notice.date , notice.content, notice.picture, notice.file from doit.notice where notice.id = :id";
  await db.sequelize.query(query,{replacements: values}).spread(async function (results, subdata){
    for(var s of subdata){
      NoticeDetailData.push({

        title: notice.title,
        header: notice.header,
        writer: notice.writer,
        date: notice.date,
        content: notice.content,
        picture: notice.picture,
        file: notice.file
      })
    
    }
  })


/*좋아요 등록*/
router.post ('/info/like', function (req, res, next){
  var query = "select notice.id, title, header, writer, date, count(notice_id) from doit.notice left join doit.noticeLike on doit.notice.id = doit.noticeLike.notice_id  where notice.id = :id group by doit.notice.id"
  
  var userId = req.body.userid
  var noticeId = req.body.noticeid

  let variable = {};
  if (req.body.userId) {
    variable = { userId: req.body.userid };
  } else {
    variable = { noticeId: req.body.noticeid };
  }

  NoticeLike.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

  if(history) { // 했던 기록이 있다면
    $("#like").hide(); // 숨기거나 disabled 처리를 한다
    }
    
});

/*좋아요 취소 */

router.delete('/info/like/:id', function (req, res, next){

  
});





module.exports = router;
