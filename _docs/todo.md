# Project Todo List

## Backend Setup (Golang)
- [x] Setup Golang server
- [x] Implement API REST layer
- [x] Define API contract for security scanner endpoints
- [x] Create file scanning functionality
- [ ] Implement security check engine with pluggable architecture
- [ ] Add Cross Site Scripting (XSS) checker - detect `Alert()` in HTML/JS files
- [ ] Add SQL Injection checker - detect quoted strings with SELECT, WHERE, %s patterns
- [ ] Create scan configuration parameter handling
- [ ] Implement scan results data structure and API response
- [ ] Optimize file scanning functionality

## Frontend Setup (React)
- [ ] Setup React application
- [ ] Create path input component for source code location
- [ ] Build scan configuration UI (parameters input)
- [ ] Design and implement findings display component
- [ ] Add scan trigger functionality
- [ ] Implement results visualization/listing
- [ ] Add loading states and error handling
- [ ] Style the security scanner interface

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

## Project Requirements
**Tech Stack**: React (Frontend) + Golang (Backend)
**Core Features**:
1. Path input for source code scanning
2. Configurable scan parameters
3. Security vulnerability detection
4. UI component for displaying findings
   **Security Checks**:
- Cross Site Scripting (XSS): Detect `Alert()` in HTML/JS files
- SQL Injection: Detect pattern `"... SELECT ... WHERE ... %s ..."`
- Extensible architecture for future security checks