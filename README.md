# Stream Sniper

Posting Comments on a YouTube Video & YouTube Live Stream

## Configuration

In order to use this project, you need to obtain API credentials from Google. Update the `config.js` file with the following information:

## config.js

```javascript
// Google API key for authentication
const apiKey = 'YOUR_GOOGLE_API_KEY';

// OAuth credentials for Google API authentication
const clientId = 'YOUR_GOOGLE_CLIENT_ID';
const clientSecret = 'YOUR_GOOGLE_CLIENT_SECRET';

// Exporting the authentication credentials for external use
export default { apiKey, clientId, clientSecret };
