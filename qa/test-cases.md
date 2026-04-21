# Manual QA – Local Library Application

Application: https://locallibrary-5sbd.onrender.com/  
Testing Type: Manual Functional Testing  
Scope: Navigation, Search

---

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

---

## TC-004 – Book Search Functionality

Priority: High

Preconditions:
- App is accessible
- User is on Collection page

---

### 1. Exact Title Search

Steps:
1. Enter full book title in search field
2. Submit search

Expected:
- Matching book is returned

Actual:
- Matching result displayed

Status: Pass

---

### 2. Partial Title Search

Steps:
1. Enter partial title
2. Submit search

Expected:
- Relevant books are returned

Actual:
- Matching books displayed

Status: Pass

---

### 3. Empty Search

Steps:
1. Leave search empty
2. Submit

Expected:
- No results or empty state displayed

Actual:
- No results returned, page remains stable

Status: Pass