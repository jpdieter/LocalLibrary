const express = require('express'); //load the express module
const router = express.Router(); //load the express router

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//export for use in app.js
module.exports = router;
