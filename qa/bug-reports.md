# Bug Reports

## BUG-001 - Empty Search Returns Full Catalog

Severity: Medium
Status: Open

### Steps to Reproduce
1. Navigate to `/collection`
2. Leave the search field empty
3. Click "Search"

### Expected Result
Application should either:
- prevent empty searches, or
- display an empty-state validation message

### Actual Result
Application returns the full catalog of books, authors, and genres.

### Impact
Behavior may confuse users and makes search validation inconsistent.


## BUG-002 - Full Author Search Does Not Return Matching Results

Severity: Medium
Status: Open

### Steps to Reproduce
1. Navigate to `/collection`
2. Search for `"George Orwell"`
3. Submit the search

### Expected Result
Matching author/book results should be returned

### Actual Result
No results are returned for full author names.

Partial searches like:
- `"George`"
- `"Orwell"`

do not return results successfully.

### Impact
Search behavior is inconsistent and may prevent users from finding expected results.