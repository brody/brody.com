import { useEffect, useState } from 'preact/hooks'

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumImageUrl?: string
  songUrl?: string
  album?: string
  playedAt?: string
  error?: string
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // If less than an hour, show minutes (minimum 1m)
  if (diffMinutes < 60 && diffMinutes >= 0) {
    return diffMinutes === 0 ? '1m ago' : `${diffMinutes}m ago`
  }

  // If less than a day, show hours
  if (diffHours < 24 && diffHours > 0) {
    return `${diffHours}h ago`
  }

  // If within the past week, show days
  if (diffDays <= 7 && diffDays > 0) {
    return `${diffDays}d ago`
  }

  // For older dates, format as "Sep 16" or "Sep 16, 2024" if not current year
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  // Include year if not current year
  if (year !== now.getFullYear()) {
    return `${month} ${day}, ${year}`
  }
  return `${month} ${day}`
}

export default function SpotifyNowPlaying() {
  console.log('[Spotify] SpotifyNowPlaying component rendering')
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('[Spotify] Component mounted, starting polling...')

    async function fetchNowPlaying() {
      console.log('[Spotify] Fetching now playing...')
      try {
        // Add cache-busting and no-cache headers
        const response = await fetch(`/api/spotify-now-playing?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (!response.ok) {
          console.error('Spotify API error:', response.status)
          setData({ isPlaying: false, error: 'API error' })
          return
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error)
        setData({ isPlaying: false, error: 'Failed to load' })
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()
    // Refresh every 10 seconds
    const interval = setInterval(fetchNowPlaying, 10000)
    console.log('[Spotify] Interval started:', interval)
    return () => {
      console.log('[Spotify] Component unmounting, clearing interval')
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    console.log('[Spotify] Rendering loading state')
    return (
      <li class="dashed-border py-8">
        <p class="text-tx-3 mb-4 text-sm">Loading Spotify...</p>
      </li>
    )
  }

  if (!data || data.error || !data.title) {
    console.log('[Spotify] No data or error, hiding component:', { data })
    return null // Don't show anything if there's an error or no data
  }
  
  console.log('[Spotify] Rendering track:', data.title)

  return (
    <li class="py-8 dashed-border">
      {/* <p class="mb-4 text-sm text-tx-3">{data.isPlaying ? 'Currently listening' : 'Last played'}</p> */}
      <div class="flex flex-row gap-6">
        {data.albumImageUrl && (
          <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={data.albumImageUrl}
              alt={`${data.album} album art`}
              width={80}
              height={80}
              class="h-[80px] w-[80px] rounded-sm object-cover"
              loading="eager"
            />
          </a>
        )}
        <div>
          <div class="pb-1 text-sm">
            <div class="text-tx-spotify flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                <path d="M9 15c1.5 -1 4 -1 5 .5" />
                <path d="M7 9c2 -1 6 -2 10 .5" />
              </svg>
              <p>
                {data.isPlaying
                  ? 'Now playing'
                  : data.playedAt
                    ? `Played ${formatRelativeTime(data.playedAt)}`
                    : 'Last played'}
              </p>
              {data.isPlaying && (
                <div class="flex h-[10px] items-end gap-0.5">
                  <div class="bg-tx-spotify animate-sound-bar-1 w-0.5 rounded-xs"></div>
                  <div class="bg-tx-spotify animate-sound-bar-2 w-0.5 rounded-xs"></div>
                  <div class="bg-tx-spotify animate-sound-bar-3 w-0.5 rounded-xs"></div>
                </div>
              )}
            </div>
          </div>
          {data.title && (
            <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
              <h2 class="text-h4 font-heading hover:text-tx-1 text-tx-0">{data.title}</h2>
            </a>
          )}
          {data.artist && <p class="text-tx-1 pt-0.5 text-sm">{data.artist}</p>}
        </div>
      </div>
    </li>
  )
}
