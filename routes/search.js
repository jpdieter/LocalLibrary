// routes/search.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET search page
router.get('/', searchController.showSearchPage);

// POST search form submission
router.post('/submit', searchController.handleSearch); 

module.exports = router;
