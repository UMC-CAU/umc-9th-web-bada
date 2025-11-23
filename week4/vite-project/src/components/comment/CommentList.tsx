import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCommentsInfinite } from '../../hooks/useCommentsInfinite.ts'
import CommentItem from './CommentItem'
import CommentSkeleton from './CommentSkeleton'
import CommentInput from './CommentInput'

export const UI = {
  SKELETON_COUNT_INITIAL: 12,
  SKELETON_COUNT_LOADING_MORE: 6,
  MAX_VISIBLE_TAGS: 3,
  INTERSECTION_THRESHOLD: 0.1,
} as const

interface CommentListProps {
  lpId: number
}

const CommentList = ({ lpId }: CommentListProps) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentsInfinite({ lpId, order: 'asc' })

  // 무한 스크롤 Ref
  const sentinelRef = useRef<HTMLDivElement>(null)

  // 댓글을 하나의 배열로
  const comments = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) ?? [],
    [data]
  )

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {

      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  // Intersection Observer 설정
  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: UI.INTERSECTION_THRESHOLD,
      rootMargin: '200px',
    })

    observer.observe(sentinelRef.current)

    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <div className="mt-12 border-t border-gray-800 pt-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        댓글 {comments.length > 0 && `(${comments.length})`}
      </h2>

      <CommentInput lpId={lpId} />

      {isError && (
  <div className="text-center bg-red-800 text-white px-6 py-4 rounded-lg shadow-md my-4">
    <h2 className="text-lg font-bold mb-1">오류 발생</h2>
    <p>댓글을 불러올 수 없습니다.</p>
  </div>
)}

      {isLoading && (
        <div className="space-y-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="space-y-0">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="space-y-0">
              {Array.from({ length: 3 }).map((_, index) => (
                <CommentSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}

          <div ref={sentinelRef} className="h-20" />

          {!hasNextPage && comments.length > 0 && (
            <p className="text-center text-gray-400 py-4">
              모든 댓글을 불러왔습니다.
            </p>
          )}

          {comments.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              첫 댓글을 작성해보세요!
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default CommentList