var express = require('express');
var router = express.Router();

const User = require("../models/Users");

/* GET users listing. */
router.get('.admin/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('.admin/users/create', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
