var express = require('express');
var router = express.Router();
var fs = require("fs");

// router.get('/read', function(req, res, next) {
// let dataJson = fs.readFileSync('data.json', 'utf8')
// res.json(JSON.parse(dataJson))
// });

router.get('/read', function (req, res, next) {

  fs.readFile('data.json', 'utf8', (err, data) => {
    res.json(JSON.parse(data))
  });

});

module.exports = router;
