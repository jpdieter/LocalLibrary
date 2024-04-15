// routes/search.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// // GET search page
// router.get('/', searchController.showSearchPage);

// GET search page
router.get('/', (req, res) => {
    res.redirect('/collection');
});


// POST search form submission
router.post('/submit', searchController.handleSearch); 

module.exports = router;
