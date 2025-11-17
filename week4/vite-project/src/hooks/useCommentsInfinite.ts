import { useInfiniteQuery } from '@tanstack/react-query'
import { getComments } from '../apis/comment'
import type { GetCommentsParams } from '../types/comment'
import { QUERY_KEY } from '../constants/key'

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

interface UseCommentsInfiniteParams {
  lpId: number
  order?: 'asc' | 'desc'
  limit?: number
}

export const useCommentsInfinite = ({
  lpId,
  order = 'asc',
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
}: UseCommentsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.comments.list({ lpId, order, limit }),
    queryFn: ({ pageParam }) => {
      const params: GetCommentsParams = {
        lpId,
        cursor: pageParam,
        limit,
        order,
      }
      return getComments(params)
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
    },
  })
}