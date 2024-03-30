//Route definitions. The controller functions are then called to handle the request.

const express = require("express");
const router = express.Router();
const flash = require('connect-flash');

// Require controller modules.
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

// Initialize connect-flash middleware
router.use(flash());

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next(); // User is authenticated, continue to the next middleware or route handler
  } else {
      // Set a flash error message
      req.flash('error', 'Please sign in to access this resource.');
      
      // Store the intended URL in the session
      req.session.returnTo = req.originalUrl;
      
      // Redirect to the login page
      res.redirect("/login");
  }
};


/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", isAuthenticated, book_controller.book_create_get);

// POST request for creating Book.
router.post("/book/create", isAuthenticated, book_controller.book_create_post);

// GET request to delete Book.
router.get("/book/:id/delete", isAuthenticated, book_controller.book_delete_get);

// POST request to delete Book.
router.post("/book/:id/delete", isAuthenticated, book_controller.book_delete_post);

// GET request to update Book.
router.get("/book/:id/update", isAuthenticated, book_controller.book_update_get);

// POST request to update Book.
router.post("/book/:id/update", isAuthenticated, book_controller.book_update_post);

// GET request for one Book.
router.get("/book/:id", book_controller.book_detail);

// GET request for list of all Book items.
router.get("/books", book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", isAuthenticated, author_controller.author_create_get);

// POST request for creating Author.
router.post("/author/create", isAuthenticated, author_controller.author_create_post);

// GET request to delete Author.
router.get("/author/:id/delete", isAuthenticated, author_controller.author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", isAuthenticated, author_controller.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", isAuthenticated, author_controller.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", isAuthenticated, author_controller.author_update_post);

// GET request for one Author.
router.get("/author/:id", author_controller.author_detail);

// GET request for list of all Authors.
router.get("/authors", author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", isAuthenticated, genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", isAuthenticated, genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", isAuthenticated, genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", isAuthenticated, genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", isAuthenticated, genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", isAuthenticated, genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstance/create", isAuthenticated, book_instance_controller.bookinstance_create_get);

// POST request for creating BookInstance.
router.post("/bookinstance/create", isAuthenticated, book_instance_controller.bookinstance_create_post);

// GET request to delete BookInstance.
router.get("/bookinstance/:id/delete", isAuthenticated, book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstance/:id/delete", isAuthenticated, book_instance_controller.bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/bookinstance/:id/update", isAuthenticated, book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstance/:id/update", isAuthenticated, book_instance_controller.bookinstance_update_post);

// GET request for one BookInstance.
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstances", book_instance_controller.bookinstance_list);

module.exports = router;

