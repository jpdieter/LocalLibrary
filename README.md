# LocalLibrary 

![Library Image](public/images/LocalLibraryApp.png)

<!-- Live app: https://locallibrary-5sbd.onrender.com/ -->

## Introduction

Welcome to the LocalLibrary web application! This web app is designed to manage the resources of a local library, providing functionalities for both librarians and patrons to interact with the library's inventory and borrowing system.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Security](#security)
- [Acknowledgements](#acknowledgements)

## Features

- **Book Catalog**: Browse available books.
- **Search**: Find books by title, author, genre, or ISBN.
- **Availability**: Check if a book is currently available for borrowing.
- **Admin Features**: Library staff can create, update, and delete books, authors, genres, and instances.
- **Passport Authentication**: Secure login system with Passport.js
- **Password Reset**: Admin users can reset their passwords securely.
- **Responsive Design**: Ensures compatibility across devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap.
- **Backend**: Node.js (with Express.js) for server-side logic and Passport.js for authentication.
- **Database**: MongoDB (MongoDB Atlas for cloud-hosted MongoDB instances).
- **Version Control**: Git for version control, with GitHub for repository hosting.
- **Deployment**: Deployment on Render.

## Security

- Implement strict input validation to prevent injection attacks.
- Use Content Security Policy (CSP) to mitigate XSS attacks.
- Handle errors securely to avoid sensitive information exposure.
- Keep dependencies updated to address security vulnerabilities.

## Acknowledgements

- This project was inspired by the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web) and their tutorials on building web applications.
- We'd like to thank the open-source community for their contributions to the technologies used in this project.

Happy Reading! 📚📖
