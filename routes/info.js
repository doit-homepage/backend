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
router.get('/:id',function(req,res,next)
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
router.post ('/like', function (req, res, next){
  var query = "select notice.id, title, header, writer, date, count(notice_id) from doit.notice left join doit.noticeLike on doit.notice.id = doit.noticeLike.notice_id  where notice.id = :id group by doit.notice.id"
  
  var user_id = req.body.userid
  var notice_id = req.body.noticeid
  

  let variable  = { user_id: req.body.userid, notice_id: req.body.noticeid };
  
  try {

    const post = await Post.findOne({ where: { id: req.body.userid } });
    
    await post.addLiker(req.body.noticeid);
    
    res.send('OK');
    
    } catch (error) {
    
    console.error(error);
    
    next(error);
    
    }

});

});

/*좋아요 취소 */

router.delete('/like/:id', function (req, res, next){

  try {

    const post = await Post.findOne({ where: { id: req.notice.id } });
    
    await post.removeLiker(req.user.id);
    
    res.send('OK');
    
    } catch (error) {
    
    console.error(error);
    
    next(error);
    
    }

  
});





module.exports = router;
