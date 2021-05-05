var express = require('express');
const { decode } = require('jsonwebtoken');
const { token } = require('morgan');
const db = require('../models');
const notice = require('../models/notice');
var router = express.Router();

var Notice = db.Notice;
var NoticeLike = db.NoticeLike;

/* GET home page. */

/* 공지사항 상세조회*/
/*
router.get('/:id',function(req,res,next)
{
  var values ={
    id: params.id
  }

  var NoticeDetailData = []
  var query = "select notice.title, notice.header, notice.writer, notice.date , notice.content, notice.picture, notice.file from doit.notice where notice.id = :id";
  await db.sequelize.query(query,{replacements: values}).spread(async function (results, subdata){
    for(var s of subdata){

      NoticeDetailData.push({

        title: s.title,
        header: s.header,
        writer: s.writer,
        date: s.date,
        content: s.content,
        picture: s.picture,
        file: s.file
      })
      
      res.json({sucess: true, data: NoticeDetailData})
    
    }
  })
*/

/*좋아요 등록*/
router.post ('/like', async function (req, res, next){
  
  var user_id = req.body.userid
  var notice_id = req.body.noticeid
  
  let variable  = { user_id: req.body.userid, notice_id: req.body.noticeid };
  
  try {

    const Notice = await NoticeLike.findOne({ where: { user_id: req.body.userid, notice_id: req.body.notice_id } });
    
    if(NoticeLike.length() == 0){
      NoticeLike.create({user_id: req.body.userid , notice_id: req.body.noticeid})
      res.json({success : true})
    }
    
    else{
      res.send({err: '이미 좋아요를 했습니다.'})
    }
  } catch (err){

  }
});


/*좋아요 취소 */

router.delete('/like/:id', async function (req, res, next){

  try {
    const Notice = await NoticeLike.findOne({ where: { user_id: req.body.userid, notice_id: req.body.notice_id } });
    
    if(NoticeLike.length() == 0){
      res.send({err: '...'})
    }
    else{
      NoticeLike.delete({user_id: req.body.userid , notice_id: req.body.noticeid})
      res.json({success : false})
    }
  }catch (err) { 

  }
    
  
});





module.exports = router;
