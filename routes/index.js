const express = require('express');
const router = express.Router();

// // GET home page.
// router.get("/", function (req, res) {
//   res.redirect("/catalog");
// });

// GET home page.
router.get("/", function (req, res) {
  res.render("index", { user: req.user }); // Pass req.user to the template
});

module.exports = router;

