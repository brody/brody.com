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
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNowPlaying() {
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
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div class="overflow-hidden fixed right-3 bottom-6 z-50 p-2 h-24 rounded-xl opacity-0 transition-all duration-300 bg-bg-2 w-70">
        {/* <div class="flex flex-row gap-6 blur-md">
          <div class="flex-shrink-0 w-20 h-20 rounded-sm bg-ui-2"></div>
          <div class="flex-1 min-w-0">
            <div class="pb-1 text-sm">
              <div class="text-tx-3 flex items-center gap-1.5">
                <p>Loading</p>
              </div>
            </div>
            <h2 class="text-h4 font-heading text-tx-3">Baby Shark</h2>
            <p class="text-tx-3 pt-0.5 text-sm">Pinkfong</p>
          </div>
        </div> */}
      </div>
    )
  }

  if (!data || data.error || !data.title) {
    return null // Don't show anything if there's an error or no data
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="hidden overflow-hidden fixed right-3 bottom-6 z-50 p-2 h-24 rounded-xl transition-all duration-300 bg-bg-2 w-70 hover:scale-105 md:block"
    >
      {/* <div class="overflow-hidden fixed right-3 bottom-6 z-50 p-2 h-24 rounded-xl bg-bg-2 w-70"> */}
      {/* <p class="mb-4 text-sm text-tx-3">{data.isPlaying ? 'Currently listening' : 'Last played'}</p> */}
      <div class="flex flex-row gap-3 items-end">
        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={`${data.album} album art`}
            width={80}
            height={80}
            class="object-cover w-20 h-20 rounded-lg"
            loading="eager"
          />
        )}
        <div class="flex-1 mb-1 min-w-0">
          <div class="pb-1 text-[10px] uppercase">
            <div class="text-tx-3 flex items-center gap-1.5">
              <p>
                {data.isPlaying
                  ? 'Now playing'
                  : data.playedAt
                    ? `Played ${formatRelativeTime(data.playedAt)}`
                    : 'Last played'}
              </p>
              {data.isPlaying && (
                <div class="flex h-[6px] items-end gap-0.5">
                  <div class="bg-tx-3 animate-sound-bar-1 w-0.25 rounded-xs"></div>
                  <div class="bg-tx-3 animate-sound-bar-2 w-0.25 rounded-xs"></div>
                  <div class="bg-tx-3 animate-sound-bar-3 w-0.25 rounded-xs"></div>
                </div>
              )}
            </div>
          </div>
          {data.title && (
            // <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
            <h2 class="text-sm truncate font-heading hover:text-tx-1 text-tx-0">{data.title}</h2>
            // </a>
          )}
          {data.artist && <p class="text-tx-1 truncate pt-0.5 text-xs">{data.artist}</p>}
        </div>
      </div>
      <img
        src={data.albumImageUrl}
        alt={`${data.album} album art`}
        class="object-cover absolute top-0 right-0 bottom-0 left-0 self-stretch w-full rounded-sm opacity-30 blur-2xl -z-10"
        loading="eager"
      />
      {/* </div> */}
    </a>
  )
}
