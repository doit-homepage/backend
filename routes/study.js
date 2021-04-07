var express = require('express');
const study = require('../models/study');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*스터디 상세조회 */
rrouter.get('/study/:id',function(req,res,next)
{
  var values ={
    id: decoded.id
  }
  var enterpriseData = []
  var query = "select study.title, study.header, study.content, study.start_date , study.end_date, study.student_num, study.teacher from doit.study where study.id = :id";
  await db.sequelize.query(query,{replacements: values}).spread(async function (results, subdata){
    for(var s of subdata){
      enterpriseData.push({

        title: study.title,
        header: study.header,
        content: study.content,
        start_date: study.start_date,
        end_date: study.end_date,
        student_num: study.student_num,
        teacher: study.teacher

      })

      var value2 = {
        id: decode.id,
      }

    }
  })


module.exports = router;
