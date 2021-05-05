var express = require("express");
const study = require("../models/study");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/*스터디 상세조회 */
router.get("/study/:id", async function (req, res, next) {
  var values = {
    id: decoded.id,
  };

  var StudyDetailData = [];

  var query =
    "select study.title, study.header, study.content, study.start_date , study.end_date, study.student_num, study.teacher from doit.study where study.id = :id";
  const data = await db.sequelize.query(query, { replacements: values });

  for (var s of data) {
    StudyDetailData.push({
      title: s.title,
      header: s.header,
      content: s.content,
      start_date: s.start_date,
      end_date: s.end_date,
      student_num: s.student_num,
      teacher: s.teacher,
    });
  }
  res.json({ sucess: true, data: StudyDetailData });
});

module.exports = router;
