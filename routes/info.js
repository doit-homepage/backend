var express = require('express');
const { decode } = require('jsonwebtoken');
const { token } = require('morgan');
const db = require('../models');
const notice = require('../models/notice');
var router = express.Router();

/* GET home page. */

/* 공지사항 상세조회*/
router.get('/info/:id',function(req,res,next)
{
  var values ={
    id: decoded.id
  }
  var enterpriseData = []
  var query = "select notice.title, notice.header, notice.writer, notice.date , notice.content, notice.picture, notice.file from doit.notice where notice.id = :id";
  await db.sequelize.query(query,{replacements: values}).spread(async function (results, subdata){
    for(var s of subdata){
      enterpriseData.push({

        title: notice.title,
        header: notice.header,
        writer: notice.writer,
        date: notice.date,
        content: notice.content,
        picture: notice.picture,
        file: notice.file
      })
      var value2 = {
        id: decode.id,
      }

    }
  })


/*좋아요 등록*/
router.post ('/', function (req, res, next){
  Info.creat({
    id: req.body.id
  })
  .then((data) => { res.json({ success: true, data }) })
  .catch((err) => { 
    if (err) return res.json({ success: false, err })
  })
});

/*좋아요 취소 */
/*
router.delete('/', function (req, res, next){
  .then((data) => { res.json({ success: true, data }) })
  .catch((err) => { 
    if (err) return res.json({ success: false, err })
  })
});
*/




module.exports = router;
