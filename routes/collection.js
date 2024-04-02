//Route definitions. The controller functions are then called to handle the request.
const express = require("express");
const router = express.Router();
const flash = require('connect-flash');

// Require controller modules.
const book_controller = require("../controllers/bookController");

// GET collection home page.
router.get("/", book_controller.index) 

module.exports = router;
