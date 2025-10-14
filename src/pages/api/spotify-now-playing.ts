import type { APIRoute } from 'astro'

const client_id = import.meta.env.SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

async function getNowPlaying() {
  const { access_token } = await getAccessToken()
  console.log('[Spotify API] Got access token, fetching from Spotify...')

  // Try to get currently playing
  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  })

  console.log('[Spotify API] Currently playing response status:', nowPlayingResponse.status)

  if (nowPlayingResponse.status === 204 || nowPlayingResponse.status >= 400) {
    console.log('[Spotify API] No current track, fetching recently played...')
    // Nothing is currently playing, get the last played track
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    })

    if (recentlyPlayedResponse.status === 200) {
      const recentData = await recentlyPlayedResponse.json()
      const lastPlayed = recentData.items[0]
      const track = lastPlayed?.track

      if (track) {
        const result = {
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '),
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
          album: track.album.name,
          playedAt: lastPlayed.played_at,
        }
        console.log('Returning recently played with playedAt:', result.playedAt)
        return result
      }
    }

    return { isPlaying: false }
  }

  const song = await nowPlayingResponse.json()
  console.log(
    '[Spotify API] Currently playing song:',
    song.item?.name,
    'is_playing:',
    song.is_playing
  )

  if (song.item === null || !song.is_playing) {
    console.log('[Spotify API] Nothing playing or paused, fetching recently played...')
    // If nothing is playing or paused, get recently played with timestamp
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    })

    if (recentlyPlayedResponse.status === 200) {
      const recentData = await recentlyPlayedResponse.json()
      const lastPlayed = recentData.items[0]
      const track = lastPlayed?.track

      if (track) {
        return {
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist: any) => artist.name).join(', '),
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
          album: track.album.name,
          playedAt: lastPlayed.played_at,
        }
      }
    }

    return { isPlaying: false }
  }

  const result = {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((artist: any) => artist.name).join(', '),
    albumImageUrl: song.item.album.images[0]?.url,
    songUrl: song.item.external_urls.spotify,
    album: song.item.album.name,
  }

  console.log('[Spotify API] Returning currently playing:', result.title)
  return result
}

export const GET: APIRoute = async () => {
  try {
    const response = await getNowPlaying()
    console.log('[Spotify API] Returning response:', response)

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return new Response(JSON.stringify({ isPlaying: false, error: 'Failed to fetch' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
