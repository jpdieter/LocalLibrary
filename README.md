# LocalLibrary 

![Library Image](public/images/LocalLibraryApp.png)

Live app: https://locallibrary-5sbd.onrender.com/

## Introduction

Welcome to the LocalLibrary web application! This web app is designed to manage the resources of a local library, providing functionalities for both librarians and patrons to interact with the library's inventory and borrowing system.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Security](#security)
- [Install Project](#install-project)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features

- **Book Catalog**: Browse available books.
- **Search**: Find books by title, author, genre, or ISBN.
- **Availability**: Check if a book is currently available for borrowing.
- **Admin Features**: Library admins can manage books, authors, genres, and instances. (Admin features only appear after sign-in)
- **Password Reset**: Library admins can reset their passwords securely.
- **Passport Authentication**: Secure login system with Passport.js
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

## Install Project

1. Clone the repo
   ```bash
   git clone https://github.com/jpdieter/LocalLibrary.git
   ```
2. Navigate to the LocalLibrary directory.

3. Install dependencies:

   ```bash
   npm install

4. Create env file:   

     ```bash
   touch .env

5. Within the .env file, configure the following variables for your database and Express session secret:
   
   DATABASE_URL= MongoDB Atlas URL
   
   NODE_ENV=production
   
   SECRET_KEY=

   Save the file.
 
6. Start the server:

   ```bash
   npm run devstart
   ```
   
7. Open the app in your web browser:

   ```
   http://localhost:3000
   ```

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request.   

## Acknowledgements

- This project was inspired by the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web) and their tutorials on building web applications.
- We'd like to thank the open-source community for their contributions to the technologies used in this project.

Happy Reading! 📚📖
