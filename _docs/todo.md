# Project Todo List

## Backend Setup (Golang)
- [x] Setup Golang server
- [x] Implement API REST layer
- [x] Define API contract for security scanner endpoints
- [x] Create file scanning functionality
- [x] Implement security check engine with pluggable architecture
- [x] Add Cross Site Scripting (XSS) checker - detect `Alert()` in files
- [x] Add SQL Injection checker - detect quoted strings with SELECT, WHERE, %s patterns
- [x] Implement scan results data structure and API response
- [ ] Optimize file scanning functionality

## Frontend Setup (React)
- [x] Setup React application
- [x] Create input component for source code
- [x] Design and implement findings display component
- [x] Build scan configuration UI
- [ ] Add scan trigger functionality
- [ ] Implement results visualization/listing
- [ ] Style the security code scanner interface

## Security Checks Implementation
- [ ] **XSS Detection**: Scan HTML and JavaScript files for `Alert()` statements
- [ ] **SQL Injection Detection**: Find statements like `"... SELECT ... WHERE ... %s ..."`
- [ ] Design extensible architecture for adding new security checks
- [ ] Add file type filtering for relevant checks

## Testing & Validation
- [ ] Create test files with known vulnerabilities
- [ ] Test XSS detection with sample HTML/JS files
- [ ] Test SQL injection detection with sample code
- [ ] Validate scan configuration parameters
- [ ] Test end-to-end scanning workflow
