var express = require("express");
const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const db = require("../models");
var router = express.Router();
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var async = require("async");
var sequelize = require("sequelize");
var Notice = db.Notice;
var NoticeLike = db.NoticeLike;

/* GET home page. */

/* 공지사항 상세조회*/

router.get("/:id", async function (req, res, next) {
  var values = {
    id: Number(req.params.id),
  };
  var NoticeDetailData = [];
  var query =
    "select notice.title, notice.header, notice.writer, notice.date , notice.content, notice.picture, notice.file from doit.notice where notice.id = :id";
  var data = await db.sequelize.query(query, { replacements: values , type: db.sequelize.QueryTypes.SELECT});
  console.log(data)
  for (var s of data) {
    NoticeDetailData.push({
      title: s.title,
      header: s.header,
      writer: s.writer,
      date: s.date,
      content: s.content,
      picture: s.picture,
      file: s.file,
    });
  }
  console.log(NoticeDetailData)
  res.json({ success: true, data: NoticeDetailData });
});

/*좋아요 등록*/
router.post("/like", async function (req, res, next) {
  const data = await NoticeLike.findOne({
    where: { user_id: req.body.userid, notice_id: req.body.notice_id },
  });
  console.log(data);
  if (data == null) {
    NoticeLike.create({
      user_id: req.body.userid,
      notice_id: req.body.notice_id,
    });
    res.json({ success: true });
  } else {
    NoticeLike.delete({
      user_id: req.body.userid,
      notice_id: req.body.notice_id,
    });
    res.json({ success: false });
  }
});

router.post('/', function (req, res, next) {
  var token = req.headers['x-access-token']
  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    Notice.create({
      title: req.body.title,
      header: req.body.header,
      content: req.body.content,
      date: req.body.date,
      writer: decoded.id
  })
      .then((data) => { res.json({ success: true, data }) })
      .catch((err) => {
        if (err) return res.json({ success: false, err })
      })

  })
});

module.exports = router;
