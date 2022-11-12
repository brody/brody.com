// _data/lastfm.js

const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

const API_KEY = process.env.LASTFM_KEY;

const USERNAME = 'brodym';
const API = 'http://ws.audioscrobbler.com/2.0/';

module.exports = async () => {
  try {
    const json = await Cache(
      `${API}?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=3`,
      { duration: '30s', type: 'json' },
    );
    return json;
  } catch (ex) {
    console.log(ex);
    return [];
  }
};

// https://ws.audioscrobbler.com/2.0/?callback=&?method=user.getrecenttracks&format=json&limit=1&user=brodym&api_key=75176bb2349e51a475ea56ac979f7dc4&_=1535163214017
