# LocalLibrary 

![Library Image](public/images/LocalLibraryApp.png)

Live app: https://locallibrary-5sbd.onrender.com/

## Introduction

LocalLibrary is a web application designed to manage the resources of a local library, allowing both librarians and patrons to interact with the library catalog and borrowing system.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Security](#security)
- [QA Testing](#qa-testing-overview)
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

- Implements strict input validation to help prevent injection attacks.
- Use Content Security Policy (CSP) to mitigate XSS attacks.
- Handle errors securely to avoid sensitive information exposure.
- Keep dependencies updated to address security vulnerabilities.

## QA Testing Overview

This project uses a combination of manual testing, API testing, and UI automation to validate the core functionality of the LocalLibrary application.

The goal was not to test every possible edge case, but to focus on the most important user workflows and protect them against regressions.

### Manual Testing
Located in:
- `/qa/test-cases.md`

Manual testing was used first to explore the application and understand how features behaved before deciding what should be automated.

Covers:
- Navigation flows (Collection → Books → Book Details)
- Book details validation (title, author, ISBN, summary)
- Search functionality (exact, partial, empty input behavior)
- General UI behavior and edge cases

Manual testing also helped identify inconsistent search behavior, including:
- Empty searches returning the full catalog
- Full author searches behaving differently from partial author searches

### API Testing (Postman)
Located in:
- `/postman/LocalLibrary.postman_collection.json`

API testing was used to validate backend responses separately from the browser UI.

This helps verify:
- Status codes
- Response content
- Response times
- Basic security headers
- Search endpoint behavior

Endpoints tested:

- `/catalog/books`
- `/catalog/book/:id`
- `/search/submit`

### Running API Tests
1. Import the Postman collection
2. Run the collection runner
3. Review results in the test runner (all tests should pass)

### UI Automation Testing (Playwright)
Located in:
- `/tests/navigation.spec.ts`
- `/tests/search.spec.ts`

Playwright automation focuses on protecting stable, repeatable user workflows.

Current automated coverage includes:

- Navigation to the book catalog
- Navigation to individual book detail pages
- Book metadata validation
- Search functionality:
    - Exact title searches
    - Partial title searches
    - Empty search behavior

Notes:
- Tests use Playwright with role-based selectors (`getByRole`) where possible
- Assertions focus on user-visible behavior rather than implementation details
- Automation coverage was intentionally kept small and focused on high-value flows

## QA Strategy

This project follows a layered QA approach:
1. Manual exploratory testing to understand application behavior and identify edge cases
2. API testing to validate backend responses independently of the UI
3. UI automation to protect important user workflows from regressions
4. GitHub Actions CI integration to automatically run Playwright tests on pushes and pull requests

The focus was on building a maintainable QA workflow rather than maximizing the number of tests.

### Critical User Flows
- Searching for books
- Navigating between catalog pages
- Viewing book details
- Verifying metadata visibility
- Confirming routing and links behave correctly

### Focus Areas
- Catching regressions in navigation and search behavior
- Validating backend responses separately from the UI
- Keeping automation readable and maintainable
- Documenting unexpected or inconsistent behavior discovered during testing

## Install Project

1. Clone the repository:

```bash
git clone https://github.com/jpdieter/LocalLibrary.git
```

2. Navigate to the project directory:

```bash
cd LocalLibrary
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file:

```bash
touch .env
```

5. Configure the following environment variables inside `.env`:

```env
DATABASE_URL=your_mongodb_connection_string
NODE_ENV=production
SECRET_KEY=your_secret_key
```

6. Start the development server:

```bash
npm run devstart
```

7. Open the application in your browser:

```text
http://localhost:3000
```

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request.   

## Acknowledgements

- This project was inspired by the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web) and their tutorials on building web applications.
- We'd like to thank the open-source community for their contributions to the technologies used in this project.