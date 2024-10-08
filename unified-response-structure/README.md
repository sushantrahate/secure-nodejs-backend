# Unified Response Structure for Success and Error Handling

This project provides a utility function `createResponse` standardizes the structure of success and error responses for easy debugging and consistency.

It helps developers create a consistent structure across the application and Scale response structure in future.

## Features

1. Consistency

   By using a centralized response function, the API returns consistent response structures, making it easier for frontend developers to parse and handle.

2. Ease of Maintenance of response messages

   All messages for success and error responses are stored in a constants file. This allows developers to update messages without changing multiple files.

3. Improved Error Handling

   It becomes easier to manage different types of errors, such as 400 (Bad Request) or 500 (Internal Server Error), using predefined error messages.

4. Scalability

   The createResponse function can be extended to include more fields (e.g., metadata, errors) without affecting the entire codebase.

## Project Structure

```bash
src
├── constants
│   └── messages.ts   # Contains all the success and error messages
├── controllers
│   └── user.controller.ts  # Sample controller using createResponse
├── utils
│   └── response.util.ts  # Contains the createResponse function
└── app.ts   # Application entry point

```

## To Run

```bash
npm run dev
```

## Sample Response

```json
// Success Response
curl -X GET http://localhost:3000/api/user

{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User found successfully",
  "statusCode": 200,
  "error": null,
  "metadata": null,
  "timestamp": "2024-10-08T13:09:09.426Z"
}
```

```json
curl -X POST http://localhost:3000/api/user \
  -H "Content-Type: application/json" \
  -d '{"email": "jane@example.com"}'

{
   "success": false,
   "data": null,
   "message": "Provided user data is invalid",
   "statusCode": 400,
   "error": null,
   "metadata": null,
   "timestamp": "2024-10-08T13:07:21.135Z"
}
```
