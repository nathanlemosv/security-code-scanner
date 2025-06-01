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
- [x] Optimize file scanning functionality

## Frontend Setup (React)
- [x] Setup React application
- [x] Create input component for source code
- [x] Design and implement findings display component
- [x] Build scan configuration UI
- [x] Add scan trigger functionality
- [x] Implement results visualization/listing
- [ ] Style the security code scanner interface

## Security Checks Implementation
- [x] **XSS Detection**: Scan HTML and JavaScript files for `Alert()` statements
- [x] **SQL Injection Detection**: Find statements like `"... SELECT ... WHERE ... %s ..."`
- [x] Design extensible architecture for adding new security checks

## Testing & Validation
- [x] Create test files with known vulnerabilities
- [x] Test XSS detection with sample HTML/JS files
- [x] Test SQL injection detection with sample code
- [x] Validate scan configuration parameters
- [x] Test end-to-end scanning workflow
