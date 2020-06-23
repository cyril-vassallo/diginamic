var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('customers' , {customers1:
      ['Cyril','Isabelle']});
});

module.exports = router;
