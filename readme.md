# Security Code Scanner

Security Code Scanner is a lightweight demonstration tool designed to help developers understand basic security scanning concepts. This sample project features a React frontend for an intuitive user experience and a Golang backend that performs code scanning and vulnerability detection.

⚠️ This is a proof-of-concept, should never be deployed in production environments or used for actual security assessments. ⚠️

## API Contract

### Endpoint

**POST** `/api/scan/:scanType`

Upload a source code file for security scanning.

### Parameters

- `scanType` (path parameter): Type of scan to perform
  - `sqli` - SQL Injection scan
  - `xss` - Cross-Site Scripting scan
  - `full` - All available scans

### Request

```bash
curl --request POST \
  --url http://[HOST]:[PORT]/api/scan/[SCAN_TYPE] \
  --header 'Content-Type: multipart/form-data' \
  --form sample=@[FILE_PATH]
```

### Response

The API returns a JSON array containing all detected security patterns:

#### Response Structure

```json
[
  {
    "pattern": "string",
    "position": "number",
    "line": "number",
    "column": "number"
  }
]
```

#### Response Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Scan Occurrences",
  "description": "Array of pattern occurrences found during security scanning",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "The detected pattern or keyword",
        "minLength": 1
      },
      "position": {
        "type": "integer",
        "description": "Character position in the entire text/file",
        "minimum": 0
      },
      "line": {
        "type": "integer",
        "description": "Line number where the pattern was found",
        "minimum": 1
      },
      "column": {
        "type": "integer",
        "description": "Column number where the pattern starts",
        "minimum": 1
      }
    },
    "required": ["pattern", "position", "line", "column"],
    "additionalProperties": false
  }
}
```

#### Example Response

```json
[
  {
    "pattern": "select",
    "position": 17,
    "line": 2,
    "column": 7
  },
  {
    "pattern": "select",
    "position": 40,
    "line": 3,
    "column": 7
  },
  {
    "pattern": "where",
    "position": 279,
    "line": 5,
    "column": 96
  }
]
```

#### Status Codes

- `200 OK` - Scan completed successfully
- `500 Internal Server Error` - Server error during scanning