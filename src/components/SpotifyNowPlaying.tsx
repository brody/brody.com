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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

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

        // Preload the image if we have one
        if (result.albumImageUrl) {
          const img = new Image()
          img.onload = () => {
            setImageLoaded(true)
            // After first load, no longer initial
            if (isInitialLoad) {
              setTimeout(() => setIsInitialLoad(false), 600)
            }
          }
          img.onerror = () => {
            setImageLoaded(true) // Still show component even if image fails
          }
          img.src = result.albumImageUrl
        } else {
          setImageLoaded(true)
        }
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error)
        setData({ isPlaying: false, error: 'Failed to load' })
      }
    }

    fetchNowPlaying()
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [isInitialLoad])

  // Don't render until we have data and image is loaded
  if (!data || !imageLoaded || data.error || !data.title) {
    return null // Don't show anything if there's an error or no data
  }

  // Only show if currently playing OR played within the last 6 hours
  if (!data.isPlaying) {
    if (!data.playedAt) {
      return null
    }
    const playedAtDate = new Date(data.playedAt)
    const now = new Date()
    const diffHours = (now.getTime() - playedAtDate.getTime()) / (1000 * 60 * 60)

    if (diffHours > 6) {
      return null
    }
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      class={`bg-bg-2 hover:bg-bg-2/50 shadow-neutral-0/30 hover:shadow-neutral-0/20 fixed right-3 bottom-6 z-50 hidden h-24 w-70 overflow-hidden rounded-xl p-2 shadow-[0px_1px_2px_0px_inset] transition-all duration-300 hover:scale-102 md:block ${
        isInitialLoad ? 'animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0' : 'opacity-100'
      }`}
      style={isInitialLoad ? { transform: 'translateY(10px) scale(0.9)' } : {}}
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
        class="absolute top-0 right-0 bottom-0 left-0 -z-10 w-full self-stretch rounded-sm object-cover opacity-30 blur-[32px] transition-opacity duration-300"
        loading="eager"
      />
      {/* </div> */}
    </a>
  )
}
