const Book = require("../models/book"); // Import the Book model
const SearchLog = require('../models/search');
const Genre = require('../models/genre');
const Author = require('../models/author');

// search.js

// GET /search route handler
exports.showSearchPage = function(req, res) {
    // Handle search logic here
    res.render('search', {title: 'Search'});
  };

  // Handle search form submission
  exports.handleSearch = function(req, res) {
    const searchTerm = req.body.q;
  
   // Perform search logic
  Promise.all([
    // Search for books by title or ISBN
    Book.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } }, // Search in title
        { isbn: { $regex: new RegExp(searchTerm, 'i') } }   // Search in ISBN
      ]
    }).populate('author'), // Populate author information for each book
    // Search for authors by name
    Author.find({
      $or: [
        { first_name: { $regex: new RegExp(searchTerm, 'i') } }, // Search in first name
        { family_name: { $regex: new RegExp(searchTerm, 'i') } }  // Search in last name
      ]
    }),
    // Search for genres by name
    Genre.find({ name: { $regex: new RegExp(searchTerm, 'i') } })
  ])
  .then(([bookResults, authorResults, genreResults]) => {
    res.render('searchResults', {
      title: 'Search Results',
      searchTerm,
      bookResults,
      authorResults,
      genreResults
    });
  })
  .catch(err => {
    console.error('Error occurred during search:', err);
    res.status(500).send('Internal Server Error');
  });
};