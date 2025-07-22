const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');

dotenv.config();

const app = express();
const port = 3000;

// Session config
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000
}));

// Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Step 1: Redirect to consent screen
app.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  res.redirect(url);
});

// Step 2: Handle callback and exchange code
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    res.send('Authentication successful! Tokens stored in session.');
  } catch (err) {
    res.status(500).send('Error exchanging code for token');
  }
});

// Step 3: Access Google Calendar using tokens
app.get('/calendar', async (req, res) => {
  if (!req.session.tokens) return res.redirect('/auth');

  oauth2Client.setCredentials(req.session.tokens);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(result.data.items);
  } catch (error) {
    res.status(500).send('Failed to fetch events');
  }
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
