const book = require('../models/book');
const search = require('../models/search');

// search.js

// GET /search route handler
exports.showSearchPage = function(req, res) {
    // Handle search logic here
    res.render('search', {title: 'Search'});
  };
  
  const Book = require("../models/book");

  // Handle search form submission
  exports.handleSearch = function(req, res) {
    const searchTerm = req.body.q;
  
    // Perform search logic
    Book.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } }, // Search in title
        { isbn: { $regex: new RegExp(searchTerm, 'i') } },   // Search in ISBN
      ]
    })
    .populate('author') // Assuming you want to populate author information
    .then(results => {
      res.render('searchResults', { title: 'Search Results', results });
    })
    .catch(err => {
      console.error('Error occurred during search:', err);
      res.status(500).send('Internal Server Error');
    });
  };
  
    
    // // For demonstration purposes, let's just send back the search term
    // res.send('Search results for: ' + searchTerm);