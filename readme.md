# Security Code Scanner

Security Code Scanner is a lightweight demonstration tool designed to help developers understand basic security scanning concepts. This sample project features a React frontend for an intuitive user experience and a Golang backend that performs code scanning and vulnerability detection.   

⚠️ This is a proof-of-concept, should never be deployed in production environments or used for actual security assessments. ⚠️

## Features

- **Simple Source Code Scanning**: Scan your project directory for potential security vulnerabilities
- **Multiple Security Checks**: Currently supports detection for:
    - Cross-Site Scripting (XSS) vulnerabilities in HTML/JS files
    - SQL Injection vulnerabilities in code
- **Configurable Scanning**: Customize scan parameters based on your project's needs
- **Clear Results Visualization**: Easy-to-understand presentation of scanning results
- **Extensible Architecture**: Designed to allow adding new security checks with minimal effort

## API Contract

The scanner provides a REST API for programmatic scanning:

**POST** `/api/scan/:scan_type`

Upload a source code file for security scanning:

```bash
curl --request POST \
  --url http://[HOST]:[PORT]/api/scan/[SCAN_TYPE] \
  --header 'Content-Type: multipart/form-data' \
  --form sample=@[FILE_PATH]