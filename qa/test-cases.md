# Manual QA – Local Library Application

Application: https://locallibrary-5sbd.onrender.com/  
Testing Type: Manual Functional Testing  
Scope: Navigation, Search

## TC-002 – Book Catalog Navigation

Priority: High

Preconditions:
- App is accessible
- User is on landing page

Steps:
1. Click "View Collection" from landing page
2. Click "Total Books"
3. Confirm navigation to book catalog page
4. Return to landing page
5. Use top navigation → Collection
6. Click "Total Books" again

Expected:
- Both paths open `/catalog/books`
- Book list loads without errors

Actual:
- Navigation worked from both entry points
- Book list displayed successfully

Status: Pass


## TC-004 – Book Search Functionality

Priority: High

Preconditions:
- App is accessible
- User is on Collection page

### 1. Exact Title Search

Steps:
1. Enter full book title in search field
2. Submit search

Expected:
- Matching book is returned

Actual:
- Matching result displayed

Status: Pass


### 2. Partial Title Search

Steps:
1. Enter partial title
2. Submit search

Expected:
- Relevant books are returned

Actual:
- Matching books displayed

Status: Pass


### 3. Empty Search

Steps:
1. Leave search field empty
2. Submit the search

Expected:
- No results or an empty-state message is displayed

Actual:
- Application returns all books, authors, and genres

Status: 
- FAIL (Behavior does not match expected search validation)

### 4. Author Name Search

Steps:
1. Enter full author name in search field
2. Submit the search

Expected:
- Search returns matching author name

Actual:
- Full author name returns no results
- Partial author searches ("George", "Orwell") returned correct author

Status:
- FAIL (Full author search behavior inconsistent with partial matching)


## TC-004 – Book Search Functionality

Priority: High

Preconditions:
- App is accessible
- User is on Collection page

### 1. Exact Title Search

Steps:
1. Enter full book title in search field
2. Submit search

Expected:
- Matching book is returned

Actual:
- Matching result displayed

Status: Pass


## TC-005 – Book Details Page

Preconditions:
- App is accessible
- User is on Collection page

Steps:
1. Click on Total Books
2. Click on Book Title
3. Verify book details page loads
4. Go back to Collection page
5. Use top navigation → Collection → Books
6. Click "Total Books" again


Expected:
- Both paths open correct book details page
- URL contains `/catalog/books/<id>`
- Title visible
- Author visible

Actual:
- Both paths successfully opened the selected book details page
- Title and author information displayed correctly

Status: Pass


## TC-PM-001: Get Book Catalog (Public API)

**Endpoint:**
GET /catalog/books

**Tool Used:**
Postman

**Test Type:**
API / Functional

**Assertions Verified:**
- Status code = 200
- Response time < 2s
- Content-Type = text/html
- Response body is not empty
- Security headers (CSP) present

**Result:**
PASS

**Notes:**
Endpoint returns HTML-rendered book catalog with security headers and rate limiting enabled.

## TC-PM-002 - Get Book Details Page

Endpoint:
GET /catalog/book/:id

Tool:
Postman

Assertions Verified:
- Status code = 200
- Response body contains expected book title
- Response contains author information
- Content-Type = text/html
- Response time acceptable

Result:
PASS

## TC-PM-003 - Search Endpoint

Endpoint:
POST /search/submit

Assertions Verified:
- Status code = 200
- Response contains expected search result
- Response time acceptable
- Content-Type = text/html

Result:
PASS