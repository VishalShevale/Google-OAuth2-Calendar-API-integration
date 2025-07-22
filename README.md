# Google OAuth2 Calendar API Integration

This project demonstrates how to implement Google OAuth 2.0 (Authorization Code Flow) with the Google Calendar API using Node.js and Express. It allows users to authenticate via Google, obtain access and refresh tokens, and securely fetch calendar events.

## Features

- Google OAuth 2.0 Authorization Code Flow
- Session-based access and refresh token handling
- Integration with Google Calendar API (read-only access)
- Automatic token refresh handling
- Built with Express and the official Google APIs SDK

## Technology Stack

- Node.js
- Express.js
- googleapis (Google API client for Node.js)
- dotenv (environment variable management)
- cookie-session (session-based token storage)

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/VishalShevale/Google-OAuth2-Calendar-API-integration.git

cd Google-OAuth2-Calendar-API-integration

### 2. Install Dependencies

npm install

### 3. Create a .env File
Create a .env file in the project root and add the following:

GOOGLE_CLIENT_ID=your-google-client-id

GOOGLE_CLIENT_SECRET=your-google-client-secret

GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback

SESSION_SECRET=your-session-secret

### 4. Start the Server

node index.js

Visit http://localhost:3000/auth in your browser to initiate authentication.

### API Endpoints
Route	Description
/auth	Redirects user to Google OAuth consent screen
/oauth2callback	Handles the redirect and exchanges code for tokens
/calendar	Fetches upcoming events from user's calendar

### Example Calendar Response

[
  {
    "summary": "Meeting with Team",
    "start": { "dateTime": "2025-07-23T10:00:00+05:30" },
    "end": { "dateTime": "2025-07-23T11:00:00+05:30" }
  }
]

### References
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)  
  Official documentation on how Google's OAuth 2.0 Authorization Code Flow works.

- [Google Calendar API Overview](https://developers.google.com/calendar/api)  
  Documentation for integrating and working with Google Calendar API.

- [Google API Node.js Client (googleapis)](https://github.com/googleapis/google-api-nodejs-client)  
  Official Node.js client library to interact with Google APIs.

- [Google Cloud Console](https://console.cloud.google.com/)  
  Dashboard for creating OAuth credentials and enabling APIs.

- [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes)  
  List of available scopes for various Google services.

- [cookie-session (npm)](https://www.npmjs.com/package/cookie-session)  
  Lightweight cookie-based session middleware for Express.

- [dotenv (npm)](https://www.npmjs.com/package/dotenv)  
  Loads environment variables from a `.env` file into `process.env`.

- [Express.js Official Site](https://expressjs.com/)  
  Web framework used to create the server and route structure.

- [Node.js Official Site](https://nodejs.org/)  
  JavaScript runtime environment used for backend development in this project.

### Notes
The .env file is excluded from version control for security.

All tokens are stored in session using cookie-session middleware.

This project uses the official Google API SDK to handle authentication and API calls.

### License
This project is licensed under the MIT License.

### Author
Vishal Shevale
