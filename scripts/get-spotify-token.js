/**
 * Helper script to get Spotify refresh token
 * Run with: node scripts/get-spotify-token.js
 * 
 * Add your credentials here temporarily (DO NOT COMMIT)
 */

const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'
const REDIRECT_URI = 'http://localhost:3000'

console.log('\n🎵 Spotify Refresh Token Generator\n')
console.log('Follow these steps:\n')
console.log('1. Visit this URL in your browser:\n')
console.log(
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-currently-playing%20user-read-recently-played\n`
)
console.log('2. After authorizing, copy the "code" parameter from the redirect URL')
console.log('3. Run this command (replace YOUR_CODE with the code you copied):\n')

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

console.log(`curl -X POST "https://accounts.spotify.com/api/token" \\
  -H "Authorization: Basic ${basic}" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=${encodeURIComponent(REDIRECT_URI)}"\n`)

console.log('4. Copy the "refresh_token" value from the response')
console.log('5. Add it to your .env file\n')
