import { useEffect, useState, useRef } from 'preact/hooks'

interface LazyLoadListProps {
  initialCount?: number
  loadMoreCount?: number
  totalCount: number
  contentType?: string // Filter by content type (blog, books, movies, etc.)
}

/**
 * LazyLoadList - A component for true lazy loading of content
 * Fetches and renders items only when the user scrolls near them
 */
export default function LazyLoadList({
  initialCount = 12,
  loadMoreCount = 12,
  totalCount,
  contentType = 'all',
}: LazyLoadListProps) {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(initialCount)
  const hasMore = offset < totalCount
  const observerTarget = useRef<HTMLLIElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const loadMore = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const typeParam = contentType !== 'all' ? `&type=${contentType}` : ''
      const response = await fetch(
        `/content-fragment?offset=${offset}&limit=${loadMoreCount}${typeParam}`
      )
      const html = await response.text()
      setHtmlContent((prev) => prev + html)
      setOffset((prev) => prev + loadMoreCount)
    } catch (error) {
      console.error('Failed to load more items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Set up IntersectionObserver to load more when scrolling near the bottom
    if (!hasMore || !observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Only trigger if intersecting, not already loading, and user has scrolled
        // Check boundingClientRect to ensure we're not in a render-loop
        if (entries[0].isIntersecting && !isLoading && entries[0].boundingClientRect.top > 0) {
          loadMore()
        }
      },
      {
        rootMargin: '200px', // Trigger when within 200px of the sentinel
      }
    )

    observer.observe(observerTarget.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, isLoading])

  if (!hasMore && !htmlContent) return null

  return (
    <>
      {/* Render dynamically loaded HTML content directly (as <li> elements) */}
      {htmlContent && <span ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />}

      {/* Sentinel element for IntersectionObserver */}
      {hasMore && <li ref={observerTarget} className="h-px list-none" aria-hidden="true" />}

      {/* Loading indicator and manual load more button */}
      {hasMore && (
        <li className="mt-8 flex list-none justify-center">
          {isLoading ? (
            <div className="text-tx-2 text-sm">Loading...</div>
          ) : (
            <button
              onClick={loadMore}
              className="text-tx-1 bg-bg-2 hover:bg-bg-3 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200"
              aria-label="Load more items"
            >
              Load More ({totalCount - offset} remaining)
            </button>
          )}
        </li>
      )}
    </>
  )
}
