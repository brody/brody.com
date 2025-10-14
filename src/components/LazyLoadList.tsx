import { useEffect, useState, useRef } from 'preact/hooks'

interface LazyLoadListProps {
  initialCount?: number
  loadMoreCount?: number
  totalCount: number
}

/**
 * LazyLoadList - A reusable component for lazy loading list items
 * This component hides items beyond the initial count and shows them when scrolling near the bottom
 */
export default function LazyLoadList({
  initialCount = 12,
  loadMoreCount = 12,
  totalCount,
}: LazyLoadListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const hasMore = visibleCount < totalCount
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide items beyond the visible count
    const items = document.querySelectorAll('[data-lazy-item]')
    items.forEach((item, index) => {
      if (index >= visibleCount) {
        ;(item as HTMLElement).style.display = 'none'
      } else {
        ;(item as HTMLElement).style.display = ''
      }
    })
  }, [visibleCount])

  useEffect(() => {
    // Set up IntersectionObserver to load more when scrolling near the bottom
    if (!hasMore || !observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + loadMoreCount, totalCount))
        }
      },
      {
        rootMargin: '100px', // Trigger when within 100px of the sentinel
      }
    )

    observer.observe(observerTarget.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loadMoreCount, totalCount, visibleCount])

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreCount, totalCount))
  }

  if (!hasMore) return null

  return (
    <>
      {/* Sentinel element for IntersectionObserver */}
      <div ref={observerTarget} className="h-px" />

      {/* Manual load more button as fallback */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={loadMore}
          className="text-tx-1 bg-bg-2 hover:bg-bg-3 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200"
          aria-label="Load more items"
        >
          Load More ({totalCount - visibleCount} remaining)
        </button>
      </div>
    </>
  )
}
