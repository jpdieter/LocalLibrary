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

## QA Testing Overview

This project includes manual testing, API testing, and UI automation testing to validate core functionality of the LocalLibrary application.

### Manual Testing
Located in:
- `/qa/test-cases.md`

Covers:
- Navigation flows (Collection → Books)
- Search functionality (exact, partial, empty input)
- UI behavior validation

### API Testing (Postman)
Located in:
- `/postman/LocalLibrary.postman_collection.json`

Covers:
- Book catalog endpoint validation
- Search functionality testing
- Response validation (status codes, headers, response time)
- Basic security header verification

### How to Run API Tests
1. Import the Postman collection
2. Run the collection runner
3. Verify all tests pass (green status)

### UI Automation Testing (Playwright)
Located in:
- `/tests/navigation.spec.ts`
- `/tests/search.spec.ts`

Covers:
- Navigation flow validation (Landing → Collection → Books catalog)
- Search functionality behavior across multiple input types:
   - Exact book title search (e.g. "1984")
   - Partial title search (e.g. "19" returning "1984")
   - Author search behavior (e.g. "Orwell" and "George Orwell")

Notes:
- Tests are written using Playwright
- Role-based selectors (getByRole) are used where possible for stability and accessibility alignment
- Search tests validate both functional correctness and real user behavior patterns (exact vs partial matching behavior)

## QA Strategy

This project focuses on the main user workflows in the application, with an emphasis on catching regressions in search and navigation rather than trying to cover every possible edge case.

### Critical User Flows
- Book search (exact titles, partial matches, and author-based queries)
- Navigation between the catalog and search results
- Correct display and linking of search results

### Approach
- Manual exploratory testing to understand expected behavior and identify edge cases
- API testing (Postman) to confirm backend responses and status codes are correct
- UI automation (Playwright) to protect key flows from regressions

### Focus
- Preventing regressions in search behavior as the application changes
- Making sure the UI behaves the way a user would expect during search and navigation
- Verifying that core end-to-end user flows continue to work correctly

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