export const LOCAL_STORAGE_KEY = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
};

export const QUERY_KEY = {
    lps: {
    all: ['lps'] as const,
    lists: () => [...QUERY_KEY.lps.all, 'list'] as const,
    list: (filters: {
      order?: string
      search?: string
      limit?: number
    }) => [...QUERY_KEY.lps.lists(), filters] as const,
    details: () => [...QUERY_KEY.lps.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEY.lps.details(), id] as const,
  },

    // user 관련
  user: {
    all: ['user'] as const,
    me: () => [...QUERY_KEY.user.all, 'me'] as const,
    detail: (id: number) => [...QUERY_KEY.user.all, 'detail', id] as const,
  },

  // 댓글 관련
  comments: {
    all: ['comments'] as const,
    lists: () => [...QUERY_KEY.comments.all, 'list'] as const,
    list: (filters: {
      lpId: number
      order?: string
      limit?: number
    }) => [...QUERY_KEY.comments.lists(), filters] as const,
  },
}as const
